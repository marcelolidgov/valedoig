// Confere a notícia no site e o status nos plugins de redes. Uso: node verificar.js "<trecho do título>"
const { abrir, login } = require('./lib');
const t = process.argv[2];
(async () => {
  const { browser, page } = await abrir();
  try {
    await login(page);
    for (const [id, rede] of [[14, 'WhatsApp'], [13, 'Instagram']]) {
      await page.goto(`https://valedoig.com.br/admin/index.php?pg=plugins&id=${id}&acao=configurar&acao2=buscar&status=`, { waitUntil: 'domcontentloaded' });
      const rows = await page.$$eval('table tr', (trs, t) => trs.map(x => x.innerText.replace(/\s+/g, ' ')).filter(x => x.includes(t)), t);
      console.log(`${rede}:`, rows.length ? rows.join(' | ') : 'sem registro');
    }
    await page.goto('https://valedoig.com.br/', { waitUntil: 'domcontentloaded' });
    console.log('Na home:', (await page.content()).includes(t) ? 'sim' : 'não');
  } finally { await browser.close(); }
})();
