# Política de seleção — agente de varredura (valedoig.com.br)

Autorizada pelo dono do projeto em 11/11/2026. Vale para as publicações **autônomas** do agente.
Matérias enviadas pelo usuário seguem o fluxo com "ok" explícito (ver `CLAUDE.md`).

## Cotas
- **Grade autônoma: 07h, 10h, 14h, 19h e 21h** (uma matéria por horário, 5 por dia). Horários 12h e 17h são do usuário.
- Varreduras: ~06h30 (alimenta 07h, 10h e 14h) e ~13h30 (alimenta 14h, 19h e 21h), horário de Brasília.
- Se uma varredura não achar nada que cumpra os critérios, não completa a cota. Não forçar matéria fraca.
- Horário: próximo horário livre da grade autônoma (07h, 10h, 14h, 19h, 21h). Nunca usar 12h ou 17h.

## Prioridade de fontes (em ordem)
1. **Emergência e risco à população:** Defesa Civil (alerta de chuva, enchente, rio, deslizamento), Corpo de Bombeiros, interdições de rodovias, queda de energia ou água em grande escala.
2. **Previsão do tempo** para a região (União da Vitória, Porto União, Paulo Frontin, Paula Freitas, Bituruna, Cruz Machado, General Carneiro, São Mateus do Sul).
3. **Prefeituras** da região: União da Vitória, Porto União, Bituruna, Cruz Machado, São Mateus do Sul, Paula Freitas, General Carneiro, Paulo Frontin.
4. **Câmaras de vereadores:** União da Vitória, Porto União (sessões, votações, projetos de lei com efeito na população).
5. **Polícia** (PM, PC, PRF): ocorrências de interesse público, operações, alertas e orientações. Ocorrências menores sem interesse público não entram.
6. **Outros:** UGV, Unespar, UB Play TV, Portal da Cidade, Detran-PR, Sanepar, Copel, Assembleia Legislativa — só se tiver utilidade clara para o leitor local.

## Critérios para publicar (todos obrigatórios)
- Notícia nova (publicada nas últimas 24 h na fonte) e ainda não publicada no portal. Checar antes com `verificar.js "<trecho do título>"` e na home.
- Utilidade ou interesse público para a região.
- Dados verificáveis em fonte oficial ou em veículo conhecido. Se a informação depender só de uma legenda curta, procurar a fonte completa antes ou não publicar.
- Texto próprio, fiel aos dados e às citações. Nunca copiar trechos longos.

## Não publicar (ou não sem decisão do usuário)
- Nome de vítima, testemunha, menor de idade ou suspeito antes de condenação. Usar "um homem de 35 anos", "uma mulher", etc.
- Conteúdo de cunho político-eleitoral durante período eleitoral, boatos, conteúdo sem fonte identificável.
- Conteúdo que expõe pessoa privada ou a intimidade de alguém.
- Matéria com dúvida sobre dados ou sobre se já foi publicada: vai para a fila do usuário em `agente/fila-usuario.md`.

## Formato obrigatório (mesmo das matérias com ok)
- Redação com texto próprio, fonte no campo `fonte` e último parágrafo "Com informações de/da <órgão ou veículo>."
- Foto: só usar se a fonte permitir ou tiver crédito. Sem autoria conhecida, crédito "Foto: Reprodução".
- Redes em toda matéria (site, WhatsApp, Instagram feed e storie, Facebook), pelos plugins do painel.
- Hashtag regional: `#ValeDoIguaçu` / `#valedoiguacu`.
- JSON em `materias/NN-slug.json`, resultado em `materias/NN-slug-resultado.json`. Commitar após publicar.

## Registro
Toda varredura registra em `agente/log-varredura.md`: data e hora, fontes consultadas, o que foi publicado (com número da matéria e horário), o que foi descartado e por quê.

## Limites conhecidos
- Fontes de clima e Defesa Civil (Simepar, INMET, Defesa Civil PR) podem não estar liberadas na rede do ambiente. Se bloquear, registrar no log e pedir liberação; não inventar previsão.
- Vídeos (reels) só têm a legenda como texto. Matéria só com legenda de vídeo é rasa: preferir fonte com texto.
