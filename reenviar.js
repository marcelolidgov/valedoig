// Reenvia uma notícia já publicada para uma rede, salvando a edição com só aquele plugin marcado.
// Uso: node reenviar.js <id da notícia> storie|post|whatsapp|facebook
const { abrir, login } = require('./lib');
const CAMPOS = { storie: ['instagram_storie'], post: ['instagram_post'], whatsapp: ['whatsapp_post'], facebook: ['facebook_post'] };
const [id, rede] = process.argv.slice(2);
if (!id || !CAMPOS[rede]) { console.error('Uso: node reenviar.js <id> storie|post|whatsapp|facebook'); process.exit(1); }
(async () => {
  const { browser, page } = await abrir();
  try {
    await login(page);
    await page.goto(`https://valedoig.com.br/admin/index.php?pg=noticias&id=${id}`, { waitUntil: 'domcontentloaded' });
    const f = 'form[enctype="multipart/form-data"]';
    const titulo = await page.inputValue(`${f} input[name=titulo]`);
    if (!titulo) throw new Error(`Notícia ${id} não encontrada`);
    console.log(`Notícia ${id}: ${titulo} (acao=${await page.inputValue(`${f} input[name=acao]`)})`);
    await page.evaluate(({ sel, campos }) => {
      const form = document.querySelector(sel);
      for (const c of campos) { const el = document.createElement('input'); el.type = 'hidden'; el.name = c; el.value = 'S'; form.appendChild(el); }
    }, { sel: f, campos: CAMPOS[rede] });
    await Promise.all([page.waitForLoadState('domcontentloaded'), page.click(`${f} input[type=submit]`)]);
    await page.waitForTimeout(2000);
    console.log('Retorno do painel:', (await page.$eval('.msg-form', e => e.innerText).catch(() => '(sem mensagem)')).trim());
  } finally { await browser.close(); }
})().catch(e => { console.error('ERRO:', e.message); process.exit(1); });
