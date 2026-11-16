# Log de varreduras

## 11/11/2026 17:10 — ciclo manual (horários que ainda vão ao ar hoje: 19h e 21h)
- Fontes: Instagram (12 perfis via business_discovery). Clima e Defesa Civil: simepar.br, inmet, defesacivil.pr.gov.br e pc.pr.gov.br bloqueados na rede (sem acesso); nenhuma previsão publicada.
- Publicadas:
  - 406, 19h00 de 11/11 — "Pais têm até 13 de novembro para procurar a Central de Vagas em União da Vitória" (fonte: Portal da Cidade, origem: post de 11/11 20h07). Atenção: texto curto, só a legenda. Revisar se faltar detalhe.
  - 407, 21h00 de 11/11 — "São Mateus do Sul conquista Selo Diamante de Transparência 2026" (fonte: Prefeitura de São Mateus do Sul, origem: reel de 11/11 18h36).
- Descartadas: vídeo da UB Play sobre alagamento no Jacu (só legenda curta, não publicado); fiação solta (vídeo); operações policiais e Unespar/UGV (fora da prioridade ou sem utilidade pública clara).
- Perfil julianohassan76 é pessoal: a API não lê.
- 11/11/2026 17:15 — teste a pedido do usuário (matéria enviada, 17h do usuário): matéria 408 (JSON 64), "Detran-PR reforça regras de renovação da CNH após mudanças de 2026", fonte Agência Estadual de Notícias, publicada imediatamente ("agora") para teste, fora da grade.
- 11/11/2026 — matéria 66 (rascunho do usuário, com ok): Moro anuncia quatro secretários; publicada no horário livre da grade do usuário (12/11 12h, agendada).
- 12/11/2026 — matéria 67 (convite da audiência pública LOA 2027, Paula Freitas), publicada imediatamente a pedido do usuário, sem foto.

## 16/11/2026 07:03 — varredura de teste (sessão de automação; nada publicado)
- Credenciais: `VALEDOIG_EMAIL` e `VALEDOIG_SENHA` ausentes no ambiente → publicação bloqueada. Nenhuma matéria foi enviada.
- Acessíveis: valedoig.com.br (admin), www.vvale.com.br/noticias (com notícias de 14 a 16/11), www.gazetadopovo.com.br, www.parana.pr.gov.br (AEN, redireciona para /aen).
- Bloqueados ou sem acesso: Instagram e Graph API (business_discovery, sem token), simepar.br, policiacivil.pr.gov.br, inmet, defesacivil.pr.gov.br, oiguassu.com.br, portaldacidade.com.br, uniaodavitoria.portaldacidade.com (403), portouniao.sc.gov.br (403), prefeituras e câmaras locais.
- Busca na web (WebSearch) funciona, mas não traz notícias do dia: resultados de semanas ou meses atrás.
- Candidatos vistos (não publicados, cobertura insuficiente ou já passou):
  - Natal Luz de União 2026 (abertura em 14/11): evento já iniciado; sem dados oficiais verificados.
  - 3ª etapa do Circuito de Corrida de Rua em Porto União (15/11): evento já realizado; utilidade baixa.
  - Campeonato Regional de Voleibol em União da Vitória (15/11): evento já realizado.
  - Prisão de suspeito em Porto União pela morte de uma moradora de Lança (PM, 14/11): exige texto sem nomes de vítima nem suspeito; precisa de fonte oficial (PM/PC) antes de publicar.
  - Temporal que atingiu Mallet (15/11): fora da área de cobertura da política.
- Próximo passo: adicionar as credenciais no ambiente e liberar o acesso à Graph API, se quiser as fontes do Instagram.
