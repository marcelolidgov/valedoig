// Muda data/hora de uma notícia já cadastrada (sem marcar redes de novo).
// Uso: node reagendar.js <id> AAAA-MM-DD HH [MM]
const { abrir, login } = require('./lib');
const [id, data, hora, minuto = '0'] = process.argv.slice(2);
if (!id || !/^\d{4}-\d{2}-\d{2}$/.test(data || '') || !hora) { console.error('Uso: node reagendar.js <id> AAAA-MM-DD HH [MM]'); process.exit(1); }
(async () => {
  const { browser, page } = await abrir();
  try {
    await login(page);
    await page.goto(`https://valedoig.com.br/admin/index.php?pg=noticias&id=${id}`, { waitUntil: 'domcontentloaded' });
    const f = 'form[enctype="multipart/form-data"]';
    const titulo = await page.inputValue(`${f} input[name=titulo]`);
    if (!titulo) throw new Error(`Notícia ${id} não encontrada`);
    const antes = `${await page.inputValue(`${f} input[name=data]`)} ${await page.inputValue(`${f} input[name=hora]`)}:${await page.inputValue(`${f} input[name=minuto]`)}`;
    await page.fill(`${f} input[name=data]`, data);
    await page.fill(`${f} input[name=hora]`, String(+hora));
    await page.fill(`${f} input[name=minuto]`, String(+minuto));
    await page.fill(`${f} input[name=segundo]`, '0');
    await Promise.all([page.waitForLoadState('domcontentloaded'), page.click(`${f} input[type=submit]`)]);
    await page.waitForTimeout(2000);
    console.log(`Notícia ${id}: ${titulo}\nAntes: ${antes} -> Agora: ${data} ${+hora}:${String(+minuto).padStart(2, '0')}`);
    console.log('Retorno do painel:', (await page.$eval('.msg-form', e => e.innerText).catch(() => '(sem mensagem)')).trim());
  } finally { await browser.close(); }
})().catch(e => { console.error('ERRO:', e.message); process.exit(1); });
