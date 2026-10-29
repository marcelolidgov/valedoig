// Agente de publicação valedoig.com.br (Lenium CMS v4 / tema v10)
// Uso: node publicar.js materias/<arquivo>.json            -> só prepara e tira prints (não envia)
//      --sem-foto                                          -> ignora a foto de capa
//      node publicar.js materias/<arquivo>.json --publicar -> cadastra/agenda de verdade
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { abrir, login, UA } = require('./lib');

const ADMIN = 'https://valedoig.com.br/admin/index.php';
const HORARIOS = [7, 10, 12, 15, 18];
const CATEGORIAS = { 'Brasil': 33, 'Cidades': 32, 'Concursos': 29, 'Cultura': 34, 'Economia': 30, 'Editorial': 42, 'Educação': 35, 'Entretenimento': 26, 'Especiais': 38, 'Esportes': 25, 'Geral': 1, 'Internacional': 36, 'Polícia': 31, 'Política': 28, 'Saúde': 37, 'Tecnologia': 27 };
const DESTAQUES = { 'nenhum': 1, 'slide': 2, 'manchete': 3, 'lista home': 5, 'urgente': 11 };

const arq = process.argv[2];
const PUBLICAR = process.argv.includes('--publicar');
if (!arq) { console.error('Uso: node publicar.js materias/x.json [--publicar]'); process.exit(1); }
const m = JSON.parse(fs.readFileSync(arq, 'utf8'));
const dirMat = path.dirname(arq);
const nome = path.basename(arq, '.json');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Padrão do site: parágrafos em <p>, intertítulos como <p><strong>
function montaHtml(blocos) {
  return blocos.map(b => b.startsWith('## ') ? `<p><strong>${esc(b.slice(3))}</strong></p>` : `<p>${esc(b)}</p>`).join('\n');
}

function agoraSP() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date()).map(x => [x.type, x.value]));
  return { data: `${p.year}-${p.month}-${p.day}`, min: (+p.hour % 24) * 60 + +p.minute };
}
const maisDias = (iso, n) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

// Horários ocupados = notícias (inclusive agendadas) com data/hora na grade
async function horariosOcupados(page) {
  const ocup = new Set();
  for (let p = 1; p <= 2; p++) {
    await page.goto(`${ADMIN}?pg=noticias_lista&p=${p}`, { waitUntil: 'domcontentloaded' });
    const txt = await page.$$eval('table tr', trs => trs.map(t => t.innerText));
    for (const t of txt) {
      const r = t.match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/);
      if (r && !/Rascunho/.test(t)) ocup.add(`${r[3]}-${r[2]}-${r[1]} ${+r[4]}`);
    }
  }
  return ocup;
}

function proximoHorario(ocup) {
  const { data, min } = agoraSP();
  for (let d = 0; d < 7; d++) {
    const dia = maisDias(data, d);
    for (const h of HORARIOS) {
      if (d === 0 && h * 60 <= min + 15) continue; // precisa de folga mínima de 15 min
      if (!ocup.has(`${dia} ${h}`)) return { data: dia, hora: h };
    }
  }
  throw new Error('Nenhum horário livre em 7 dias');
}

function preparaFoto() {
  if (!m.foto || process.argv.includes('--sem-foto')) return null;
  if (m.foto.arquivo) return path.resolve(dirMat, m.foto.arquivo);
  const bruto = path.join(dirMat, `${nome}-orig`);
  const final = path.join(dirMat, `${nome}.jpg`);
  if (!fs.existsSync(final)) {
    execFileSync('curl', ['-sSL', '-A', UA, '-o', bruto, m.foto.url]);
    execFileSync('convert', [bruto + '[0]', '-resize', '1280x1280>', '-strip', '-quality', '85', final]);
    fs.unlinkSync(bruto);
  }
  return final;
}

(async () => {
  const { browser, page } = await abrir();
  try {
    await login(page);
    let ag = m.agendamento;
    if (ag === 'agora') {
      const { data, min } = agoraSP();
      ag = { data, hora: Math.floor(min / 60), minuto: min % 60 };
      console.log(`Publicação imediata: ${data} ${ag.hora}:${String(ag.minuto).padStart(2, '0')}`);
    } else if (!ag) {
      ag = proximoHorario(await horariosOcupados(page));
      console.log(`Próximo horário livre: ${ag.data} ${String(ag.hora).padStart(2, '0')}h`);
    }
    const foto = preparaFoto();

    await page.goto(`${ADMIN}?pg=noticias`, { waitUntil: 'domcontentloaded' });
    const f = 'form[enctype="multipart/form-data"]';
    await page.selectOption(`${f} select[name=id_cat]`, String(CATEGORIAS[m.categoria]));
    await page.selectOption(`${f} select[name=destino]`, String(DESTAQUES[m.destaque.toLowerCase()]));
    await page.fill(`${f} input[name=chapeu]`, m.chapeu);
    await page.fill(`${f} input[name=fonte]`, m.fonte || '');
    await page.fill(`${f} input[name=titulo]`, m.titulo);
    await page.fill(`${f} input[name=subtitulo]`, m.subtitulo);
    await page.fill(`${f} textarea[name=texto]`, montaHtml(m.texto));
    if (foto) {
      await page.setInputFiles(`${f} input[name=foto]`, foto);
      await page.fill(`${f} input[name=descricao_foto]`, m.foto.credito || '');
    }
    await page.fill(`${f} input[name=data]`, ag.data);
    await page.fill(`${f} input[name=hora]`, String(ag.hora));
    await page.fill(`${f} input[name=minuto]`, String(ag.minuto || 0));
    await page.fill(`${f} input[name=segundo]`, '0');

    // Campos dos plugins (normalmente inseridos via jQuery, que não carrega aqui)
    const r = m.redes || {};
    await page.evaluate(({ sel, r }) => {
      const form = document.querySelector(sel);
      const add = (name, value, tag = 'input') => {
        const el = document.createElement(tag);
        if (tag === 'input') el.type = 'hidden';
        el.name = name; el.value = value; el.className = 'campo-agente';
        form.appendChild(el);
      };
      if (r.whatsapp) add('whatsapp_post', 'S');
      if (r.instagram_post) { add('instagram_post', 'S'); add('legenda_instagram', r.legenda_instagram || '', 'textarea'); }
      if (r.instagram_storie) add('instagram_storie', 'S');
      if (r.facebook) { add('facebook_post', 'S'); add('facabook_push_txt', r.facebook_texto || ''); }
    }, { sel: f, r });

    await page.screenshot({ path: path.join(dirMat, `${nome}-form.png`), fullPage: true });
    const resumo = await page.$$eval(`${f} [name]`, els => els.filter(e => !['token', 'texto', 'legenda_instagram'].includes(e.name) && e.type !== 'file').map(e => `${e.name}=${(e.tagName === 'SELECT' ? e.selectedOptions[0]?.text : e.value || '').slice(0, 90)}`));
    console.log(resumo.join('\n'));

    if (!PUBLICAR) { console.log('\n[ensaio] Formulário preenchido, NADA foi enviado. Rode com --publicar após aprovação.'); return; }

    await Promise.all([page.waitForLoadState('domcontentloaded'), page.click(`${f} input[type=submit]`)]);
    await page.waitForTimeout(2000);
    const msg = await page.$eval('.msg-form', e => e.innerText).catch(() => '');
    console.log('Retorno do painel:', msg.trim() || '(sem mensagem)', page.url());
    await page.screenshot({ path: path.join(dirMat, `${nome}-enviado.png`), fullPage: false });

    await page.goto(`${ADMIN}?pg=noticias_lista`, { waitUntil: 'domcontentloaded' });
    const linha = await page.$$eval('table tr', (trs, t) => {
      const tr = trs.find(x => x.innerText.includes(t));
      return tr ? { txt: tr.innerText.replace(/\s+/g, ' '), link: tr.querySelector('a')?.href } : null;
    }, m.titulo);
    if (!linha) throw new Error('Notícia não encontrada na lista após envio');
    console.log('Na lista:', linha.txt, '\nLink:', linha.link);
    fs.writeFileSync(path.join(dirMat, `${nome}-resultado.json`), JSON.stringify({ ...linha, agendamento: ag }, null, 2));
  } finally {
    await browser.close();
  }
})().catch(e => { console.error('ERRO:', e.message); process.exit(1); });
