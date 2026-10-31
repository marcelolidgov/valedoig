// Corrige um trecho no texto/título/linha fina de uma notícia já cadastrada (sem disparar redes).
// Uso: node corrigir.js <id> "<de>" "<para>"
const { abrir, login } = require('./lib');
const [id, de, para] = process.argv.slice(2);
if (!id || !de || para === undefined) { console.error('Uso: node corrigir.js <id> "<de>" "<para>"'); process.exit(1); }
(async () => {
  const { browser, page } = await abrir();
  try {
    await login(page);
    await page.goto(`https://valedoig.com.br/admin/index.php?pg=noticias&id=${id}`, { waitUntil: 'domcontentloaded' });
    const f = 'form[enctype="multipart/form-data"]';
    let total = 0;
    for (const sel of ['textarea[name=texto]', 'input[name=titulo]', 'input[name=subtitulo]', 'input[name=descricao_foto]']) {
      const v = await page.inputValue(`${f} ${sel}`);
      const n = v.split(de).length - 1;
      if (n) { await page.fill(`${f} ${sel}`, v.split(de).join(para)); total += n; console.log(`${sel}: ${n} troca(s)`); }
    }
    if (!total) { console.log('Nada a corrigir.'); return; }
    await Promise.all([page.waitForLoadState('domcontentloaded'), page.click(`${f} input[type=submit]`)]);
    await page.waitForTimeout(2000);
    console.log('Retorno do painel:', (await page.$eval('.msg-form', e => e.innerText).catch(() => '(sem mensagem)')).trim());
  } finally { await browser.close(); }
})().catch(e => { console.error('ERRO:', e.message); process.exit(1); });
