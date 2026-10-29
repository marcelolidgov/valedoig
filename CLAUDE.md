# Agente de publicação — valedoig.com.br

Ver `README.md` para os comandos. Regras combinadas com a redação:

- **Nunca publicar/agendar sem o "ok" explícito do usuário.** Antes, mostrar título, linha fina, texto,
  categoria, destaque, horário e os textos de Instagram/Facebook, e rodar o ensaio (`node publicar.js <json>`).
- Horário: próximo livre da grade 07h, 10h, 12h, 15h, 18h (o agente calcula). Só usar `"agendamento": "agora"`
  quando o usuário pedir publicação imediata.
- Redes em toda matéria, pelos plugins do painel: site, WhatsApp, Instagram feed (legenda = 1º parágrafo +
  rodapé padrão), Instagram **storie** e Facebook. Os plugins só disparam no cadastro — marcar tudo antes de enviar.
- Matérias de outros veículos: reescrever com texto próprio, manter dados e citações fiéis, `fonte` = veículo,
  último parágrafo "Com informações de/da <veículo>." Intertítulos: itens `## ` no JSON.
- Foto sem autoria conhecida: crédito "Foto: Reprodução".
- Hashtag regional: `#ValeDoIguaçu` / `#valedoiguacu`.
- Cada matéria fica em `materias/NN-slug.json` (+ foto). Commitar após publicar.

## Ambiente

- Login: variáveis `VALEDOIG_EMAIL` e `VALEDOIG_SENHA`.
- Domínios que precisam estar liberados na rede do ambiente: `valedoig.com.br`, `www.valedoig.com.br`,
  o site de origem da matéria (ex.: `www.gazetadopovo.com.br`) e, para baixar fotos, o domínio de mídia dele
  (ex.: `media.gazetadopovo.com.br`).
- A hospedagem libera o painel para o User-Agent `ValedoigAgente/1.0` e a faixa de IP 160.79.106.0/24.
  Se o painel voltar a dar 403, é o firewall da hospedagem (não a Cloudflare).
- Gera Post (arte de storie para download) devolve imagem vazia — problema do plugin; abrir chamado na Lenium.
- A autorização do plugin Instagram expira em 06/11/2026 (renovar em Plugins → iSocial Post Instagram).
