# PCA-Auto — Status da documentação e do projeto

> Documento vivo de governança técnica. Ele registra o que já está definido, o que ainda é hipótese e quais evidências precisam ser obtidas antes de fechar a documentação definitiva.

**Status geral:** baseline documental 0.9 + validação do produto e consolidação técnica  
**Última atualização:** 2026-09-23

## Pacote documental principal

| Documento | Status | Observação |
|---|---|---|
| 01 — Visão e Escopo | BASELINE | visão, problema, público e fronteiras definidos em nível de produto |
| 02 — ERS | BASELINE PARCIAL | requisitos estruturados; regras locais e integração ainda possuem lacunas |
| 03 — DAS | BASELINE | arquitetura em camadas definida; infraestrutura de produção ainda não fechada |
| 04 — DER | BASELINE ATUAL | representa o schema Prisma vigente, não o modelo enterprise futuro |
| 05 — Dicionário de Dados | BASELINE ATUAL | deriva diretamente do schema Prisma vigente |
| 06 — User Stories | BASELINE | backlog funcional inicial |
| 07 — Plano de Testes | BASELINE | critérios gerais e casos principais |
| README.md | BASELINE | entrada principal do projeto |
| 08 — Lacunas e Evidências | CONTROLE | registro central do que ainda falta |
| 09 — Onboarding de Desenvolvedor | BASELINE | guia de entrada baseado na documentação existente |

## Regra de promoção para DEFINIDO

Uma decisão ou requisito só deve ser promovido para **DEFINIDO** quando houver evidência suficiente para sustentá-lo:

- evidência do piloto;
- comportamento reproduzível do sistema;
- pesquisa/documentação externa concluída;
- ou decisão arquitetural registrada.

Não preencher lacunas com suposições apenas para deixar a documentação aparentemente completa.

## Legenda

| Status | Significado |
|---|---|
| DEFINIDO | Decisão ou comportamento suficientemente estabelecido para orientar implementação |
| PARCIALMENTE DEFINIDO | Existe uma base clara, mas ainda faltam detalhes |
| HIPÓTESE | Proposta ainda não comprovada |
| PRECISA DE VALIDAÇÃO | Depende de teste/observação no produto ou no órgão piloto |
| PRECISA DE PESQUISA | Depende de investigação externa |
| PRECISA DE DECISÃO | Há alternativas relevantes ainda não escolhidas |
| BASELINE | Documentado com nível de detalhe suficiente para registro, mas ainda sujeito a evolução |

## Registro formal das lacunas

O documento [08 — Lacunas e Evidências](./08-lacunas-evidencias.md) é a fonte central para saber o que ainda falta definir, validar ou comprovar.

As lacunas prioritárias são:

1. Excel real da Candangolândia.
2. Processo operacional real da unidade.
3. Schema definitivo da entrada.
4. Regras locais de validação e consolidação.
5. Perfis, participantes e permissões internas.
6. Formato definitivo da saída “PCA pronto”.
7. Baseline de tempo, erros e retrabalho.
8. Fluxo HTTP autenticado completo do e-ComprasDF.
9. Resolução exata de \`ItemId\`.
10. Critério técnico de confirmação da operação.
11. Máquina de estados definitiva do fluxo externo.
12. Tratamento completo de rejeições, devoluções e correções.
13. Segurança e infraestrutura de produção.
14. Política de retenção.
15. Metas de volume e desempenho.

## Mapa da documentação de apoio

| Documento | Status | Próxima evidência / ação |
|---|---|---|
| product.md | PARCIALMENTE DEFINIDO | validar problema, proposta de valor e escopo do Nível 1 |
| current-process.md | PESQUISA CONCLUÍDA / PRECISA DE VALIDAÇÃO LOCAL | comparar referência normativa com o processo real |
| requirements.md | PARCIALMENTE DEFINIDO | consolidar com a ERS principal após validação |
| domain.md | PARCIALMENTE DEFINIDO | validar entidades e estados com dados reais |
| architecture.md | DEFINIDO (base) | detalhar somente quando houver necessidade |
| excel-format.md | PRECISA DE VALIDAÇÃO | obter Excel real e fechar schema versionado |
| validation.md | HIPÓTESE | mapear regras reais e medir falsos positivos |
| review.md | PARCIALMENTE DEFINIDO | validar fluxo com usuário operacional |
| execution-flow.md | PARCIALMENTE DEFINIDO | fechar após evidência de integração real |
| ecompras-integration-status.md | PRECISA DE PESQUISA + VALIDAÇÃO | capturar payload, sessão, resposta e confirmação |
| security.md | HIPÓTESE / PRECISA DE DECISÃO | fechar segurança mínima do piloto |
| database.md | PARCIALMENTE DEFINIDO | alinhar após estabilização do modelo |
| api.md | HIPÓTESE | definir somente quando contratos forem necessários |
| testing.md | PARCIALMENTE DEFINIDO | alinhar com o plano de testes principal |
| deployment.md | HIPÓTESE | decidir antes do ambiente persistente de produção |
| roadmap.md | PARCIALMENTE DEFINIDO | atualizar pelos gates de evidência |
| backlog.md | PARCIALMENTE DEFINIDO | manter sincronizado com user stories |
| risks.md | DEFINIDO (nível conceitual) | recalibrar com evidências |
| decisions/ | EM CONSOLIDAÇÃO | registrar decisões que mudam o rumo |

## O que a pesquisa externa já fechou

A documentação externa e normativa já sustenta como referência:

- o PCA recebe demandas de unidades requisitantes/demandantes;
- diferentes órgãos utilizam DFDs, planilhas e documentos intermediários;
- há camadas de consolidação antes da aprovação final em diversos contextos;
- o fluxo do e-ComprasDF envolve responsáveis pelo preenchimento, Gestor do PCA e Ordenador de Despesas;
- o Gestor pode consolidar, agrupar e aprovar/rejeitar;
- o Ordenador participa da aprovação/finalização;
- itens dependem do catálogo do e-ComprasDF;
- o estado de conclusão deve ser distinguido de uma simples tentativa de requisição.

Consulte current-process.md e ecompras-integration-status.md para as evidências e limitações.

## O que ainda depende de evidência local/técnica

- Excel real da Candangolândia;
- processo operacional real;
- regras locais detalhadas;
- participantes e permissões internas;
- schema definitivo da entrada;
- comportamento final do fluxo autenticado do e-ComprasDF;
- payload e sessão da operação de inclusão;
- critério técnico de confirmação;
- volume real;
- baseline de tempo, retrabalho e erros;
- infraestrutura de produção;
- política de retenção.

## Gates de maturidade

1. **Gate 1 — Entrada real:** Excel real importável e processo atual observado.
2. **Gate 2 — Validação:** regras aplicadas corretamente e pendências identificadas.
3. **Gate 3 — Revisão:** usuário consegue revisar e corrigir de forma controlada.
4. **Gate 4 — Resultado:** comparação antes/depois demonstra valor mensurável.
5. **Gate 5 — Generalização:** outro ambiente consegue utilizar o Nível 1.
6. **Gate 6 — Contratação:** existe caminho real para uma primeira venda externa.
7. **Gate 7 — Operação:** suporte, segurança e implantação são sustentáveis.
8. **Gate 8 — Escala:** existe evidência para multi-órgão e evolução enterprise.

## Regra de manutenção

Quando uma hipótese for resolvida, atualizar:

1. este arquivo;
2. o documento técnico afetado;
3. requisitos/decisões relacionados;
4. backlog e user stories;
5. testes;
6. ADR, quando a decisão for arquitetural.
