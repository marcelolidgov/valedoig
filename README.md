# Agente de publicação — valedoig.com.br

Painel: Lenium CMS v4.2.10 (tema v10) — `https://valedoig.com.br/admin/`
Login: variáveis `VALEDOIG_EMAIL` e `VALEDOIG_SENHA`.
User-Agent liberado na hospedagem: `... ValedoigAgente/1.0` (em `lib.js`).

## Uso

```bash
node publicar.js materias/01-tarcisio.json              # ensaio: preenche e tira print, não envia
node publicar.js materias/01-tarcisio.json --publicar   # cadastra/agenda de verdade (só após "ok")
```

## O que faz

1. Faz login no painel.
2. Escolhe o próximo horário livre da grade 07h, 10h, 12h, 15h, 18h (folga mínima de 15 min;
   horário ocupado = já existe notícia não-rascunho naquela hora). `agendamento` no JSON força um horário (`{"data":"2026-10-30","hora":10}`) ou `"agora"`.
   Foto: `foto.url` (baixa) ou `foto.arquivo` (local, relativo à pasta da matéria).
3. Baixa a foto de capa e converte para JPG de até 1280 px.
4. Preenche categoria, destaque, chapéu, fonte, título, subtítulo, texto (HTML no padrão do site:
   `<p>` e intertítulos em `<p><strong>`), foto + crédito e data/hora.
5. Marca as redes pelos plugins do próprio painel (os campos são injetados porque o jQuery dos plugins
   vem de CDN fora da rede liberada):
   - `whatsapp_post` — iSocial Post WhatsApp (envia título + link ao grupo configurado)
   - `instagram_post` + `legenda_instagram` — iSocial Post Instagram (feed)
   - `instagram_storie` — iSocial Post Instagram (stories) — ligado por padrão
   - `facebook_post` + `facabook_push_txt` — Facebook Post Automático
   Os plugins respeitam o agendamento: só disparam quando a notícia entra no ar.
6. Com `--publicar`, envia e confirma a notícia na lista; salva `materias/<nome>-resultado.json`.

## Formato da matéria (JSON)

Ver `materias/01-tarcisio.json`. Em `texto`, cada item é um parágrafo; itens iniciados por `## ` viram intertítulo.
Categorias e destaques válidos estão em `publicar.js` (`CATEGORIAS`, `DESTAQUES`).

## Outros comandos

```bash
node verificar.js "trecho do título"   # confere home + status no WhatsApp/Instagram
node corrigir.js <id> "de" "para"            # corrige texto/título já cadastrado (não reenvia redes)
node reenviar.js <id> storie|post|whatsapp|facebook
```

Atenção: os plugins só disparam no **cadastro**. Salvar uma edição com a opção marcada (`reenviar.js`)
não gerou o envio no teste de 29/10/2026 (storie da notícia 340). Por isso, marque tudo já no cadastro.
