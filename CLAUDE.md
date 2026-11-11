# Agente de publicação — valedoig.com.br

Ver `README.md` para os comandos. Regras combinadas com a redação (a redação concordou com a publicação autônoma em 11/11/2026):

## Modo autônomo

- O agente coleta, redige e publica **sem aprovação prévia**, dentro dos limites abaixo.
- **Teto diário:** até 5 matérias por dia. Acima disso, a matéria fica para o próximo dia livre da grade.
- **Horário:** próximo livre da grade 07h, 10h, 12h, 15h, 18h (o agente calcula). Sem horário livre no dia,
  usar o primeiro do dia seguinte. O usuário pode autorizar outro horário, que fica registrado no JSON como `agendamento`.
- **Pauta:** registrar cada matéria em `publicadas.json` com a fonte e o link. Não repetir a mesma pauta em 7 dias.
- **Antes de publicar:** rodar a validação (`node publicar.js <json>` sem `--publicar`) e conferir o ensaio. Só enviar o que passou.
- **Reprovada duas vezes:** descartar a pauta e registrar o motivo.

## Fontes e checagem

- **Fonte primária ou dois veículos** para qualquer fato sobre pessoa, número, eleição ou investigação.
- **Facebook e redes sociais:** um post só pode virar matéria se houver confirmação em órgão oficial, comunicado
  ou veículo com apuração própria. Post sozinho não basta.
- **Boato:** não publicar, nem registrar como pauta.
- **Sites de notícia e prefeituras:** só as fontes listadas em `fontes.json`.

## Regras editoriais

- Matéria de outro veículo: texto próprio, dados e citações fiéis à fonte, `fonte` = veículo, último parágrafo
  "Com informações de/da <veículo>." Intertítulos: itens `## ` no JSON.
- Investigado ou preso é "suspeito" ou "investigado", nunca "criminoso", "bandido" etc.
- Foto sem autoria conhecida: crédito "Foto: Reprodução".
- Hashtag regional: `#ValeDoIguaçu` / `#valedoiguacu`.
- Cada matéria fica em `materias/NN-slug.json` (+ foto). Commitar após publicar.
- Redes em toda matéria, pelos plugins do painel: site, WhatsApp, Instagram feed (legenda = 1º parágrafo +
  rodapé padrão), Instagram **storie** e Facebook. Os plugins só disparam no cadastro — marcar tudo antes de enviar.

## Ambiente

- Login: variáveis `VALEDOIG_EMAIL` e `VALEDOIG_SENHA`.
- Token da API do Facebook: variável `FACEBOOK_APP_TOKEN`, informada pelo formulário seguro, nunca no chat ou no repositório.
- Domínios que precisam estar liberados na rede do ambiente: `valedoig.com.br`, `www.valedoig.com.br`,
  o site de origem da matéria e, para baixar fotos, o domínio de mídia dele. Já liberados: `www.gazetadopovo.com.br`,
  `www.parana.pr.gov.br`. Facebook (`graph.facebook.com`) e cada site novo precisam de liberação aprovada pelo usuário.
- A hospedagem libera o painel para o User-Agent `ValedoigAgente/1.0` e a faixa de IP 160.79.106.0/24.
  Se o painel voltar a dar 403, é o firewall da hospedagem (não a Cloudflare).
- Gera Post (arte de storie para download) devolve imagem vazia — problema do plugin; abrir chamado na Lenium.
- A autorização do plugin Instagram expira em 06/11/2026 (renovar em Plugins → iSocial Post Instagram).
- Instagram (perfis) não é varrido: a API e os termos da plataforma não permitem. Posts do Instagram chegam
  por print enviado pelo usuário ou pelos sites que os republicam.
