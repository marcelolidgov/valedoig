const { chromium } = require('playwright');
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 ValedoigAgente/1.0';
const BASE = 'https://valedoig.com.br/admin/';
async function abrir() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1400, height: 1000 }, locale: 'pt-BR', timezoneId: 'America/Sao_Paulo' });
  // scripts externos (jquery, cdnjs, lenium) estão fora da rede liberada e travam o carregamento
  await ctx.route('**/*', r => {
    const h = new URL(r.request().url()).hostname;
    return /(^|\.)valedoig\.com\.br$/.test(h) ? r.continue() : r.abort();
  });
  ctx.setDefaultTimeout(60000);
  const page = await ctx.newPage();
  return { browser, ctx, page };
}
module.exports = { abrir, UA, BASE };
async function login(page) {
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  if (await page.$('input[name=password]')) {
    await page.fill('input[name=email]', process.env.VALEDOIG_EMAIL);
    await page.fill('input[name=password]', process.env.VALEDOIG_SENHA);
    await page.click('input[type=submit]', { noWaitAfter: true });
    await page.waitForSelector('a[href*="logout.php"]', { state: 'attached' });
  }
  if (await page.$('input[name=password]')) throw new Error('Login falhou');
}
module.exports.login = login;
