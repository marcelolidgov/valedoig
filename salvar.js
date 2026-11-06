// Salva arquivos no GitHub (add + commit + push) num único comando.
// Uso: node salvar.js "mensagem do commit" arquivo1 [arquivo2 ...]
const { execFileSync } = require('child_process');
const [msg, ...arquivos] = process.argv.slice(2);
if (!msg || !arquivos.length) { console.error('Uso: node salvar.js "mensagem" arquivo1 [arquivo2 ...]'); process.exit(1); }
const git = (...a) => execFileSync('git', a, { cwd: __dirname, stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
git('add', '--', ...arquivos);
const corpo = `${msg}\n\nCo-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01Lmrf1LJoRSqLQGKKwMCvt8`;
git('-c', 'user.name=Redação Vale do Iguaçu', '-c', 'user.email=atendimento02@e10marketing.com.br', 'commit', '-q', '-m', corpo);
git('push', '-q', 'origin', 'main');
console.log('Salvo:', git('log', '--oneline', '-1'));
