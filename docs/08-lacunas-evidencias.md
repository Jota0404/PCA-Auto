# PCA Auto — Lacunas, Pendências e Evidências Necessárias

**Versão:** 0.9  
**Status:** documento de controle de lacunas  
**Data:** 2026-09-22

## 1. Objetivo

Este documento registra explicitamente o que **ainda não está suficientemente definido, comprovado ou validado** no PCA Auto.

A existência de uma lacuna não significa que o desenvolvimento deva ser interrompido. O objetivo é evitar que hipóteses sejam tratadas como fatos e deixar claro qual evidência é necessária para promover cada ponto a requisito/decisão definitivo.

## 2. Lacunas prioritárias

| ID | Lacuna | Categoria | Impacto | Evidência necessária | Documento afetado |
|---|---|---|---|---|---|
| GAP-001 | Excel real da Candangolândia | Entrada | Alto | Arquivo XLSX real, preferencialmente anonimizado | ERS, DER, Dicionário, Excel Format |
| GAP-002 | Processo operacional real da RA-CAND | Processo | Alto | Entrevista/observação do fluxo atual | Visão, ERS, User Stories, Testes |
| GAP-003 | Schema definitivo do Excel | Dados | Alto | Análise do arquivo real + exemplos de variações | ERS, Dicionário |
| GAP-004 | Regras locais de validação | Negócio | Alto | Regras utilizadas no processo real e casos de exemplo | ERS, Validação, Testes |
| GAP-005 | Regras de consolidação e duplicidade | Negócio | Alto | Exemplos reais de demandas consolidadas | ERS, Domínio, User Stories, DER |
| GAP-006 | Participantes e permissões internas | Acesso | Médio/Alto | Mapeamento de perfis, responsabilidades e ações | ERS, DAS, DER |
| GAP-007 | Fluxo HTTP completo de inclusão no e-ComprasDF | Integração | Alto | Captura autenticada de request, payload, headers, redirects e resposta | ERS, DAS, Execução |
| GAP-008 | Resolução exata de ItemId | Integração | Alto | Captura de consulta e correspondência código → ItemId | ERS, DAS, Dicionário |
| GAP-009 | Critério técnico de confirmação da operação | Integração | Alto | Evidência reproduzível do estado externo após a operação | ERS, DAS, Testes |
| GAP-010 | Máquina de estados definitiva do e-ComprasDF | Integração | Alto | Observação documentada das transições reais | ERS, DAS, Testes |
| GAP-011 | Tratamento definitivo de rejeição/devolução/correção | Negócio/Integração | Alto | Casos reais e regras oficiais aplicáveis | ERS, User Stories, Testes |
| GAP-012 | Formato definitivo da saída “PCA pronto” | Produto | Médio | Validação com usuário operacional | Visão, ERS, User Stories, Testes |
| GAP-013 | Estratégia de versionamento do PCA | Dados | Médio | Decisão baseada no ciclo real de alterações | DER, Dicionário, DAS |
| GAP-014 | Modelo definitivo de auditoria | Dados/Segurança | Médio | Eventos que precisam ser reconstruídos no piloto | ERS, DER, Dicionário, Testes |
| GAP-015 | Segurança mínima de produção | Segurança | Alto | Decisão sobre autenticação, secrets, acesso, backup e incidentes | ERS, DAS |
| GAP-016 | Política de retenção | Segurança/Dados | Médio | Requisitos operacionais e jurídicos aplicáveis | ERS, DAS, Dicionário |
| GAP-017 | Hospedagem e ambientes | Infraestrutura | Médio | Decisão do ambiente de desenvolvimento, homologação e produção | DAS, Deploy |
| GAP-018 | Metas de desempenho/volume | Não funcional | Médio | Volume real e medições do piloto | ERS, Testes, DAS |
| GAP-019 | Baseline de tempo, erros e retrabalho | Validação de produto | Alto | Medição do processo manual | Visão, Roadmap |
| GAP-020 | Evidência de valor do Nível 1 | Validação de produto | Alto | Comparação processo atual × PCA Auto | Visão, Roadmap, Testes |

## 3. Bloqueadores para a próxima etapa

### Gate 1 — Entrada real

Não deve ser promovido a concluído enquanto não houver:

- Excel real;
- processo atual observado;
- estrutura de entrada reproduzível.

### Gate 2 — Validação

Não deve ser promovido a concluído enquanto não houver:

- regras reais implementadas;
- exemplos positivos e negativos;
- pendências corretamente classificadas.

### Gate 3 — Revisão

Não deve ser promovido a concluído enquanto um usuário operacional não conseguir revisar um caso real sem depender do desenvolvedor.

### Gate 4 — Resultado

Não deve ser promovido a concluído enquanto não houver comparação do processo manual com o PCA Auto.

### Gate 5 — Integração

Não deve ser promovido a concluído enquanto não houver evidência reproduzível de:

1. sessão;
2. request;
3. payload;
4. resposta;
5. redirects;
6. confirmação;
7. tratamento de erro;
8. retomada.

## 4. O que já está suficientemente definido para continuar

As lacunas acima não bloqueiam o desenvolvimento de toda a solução.

Já existe base suficiente para avançar em:

- arquitetura em camadas;
- separação entre domínio, aplicação e infraestrutura;
- importação e normalização como conceitos;
- validação como etapa própria;
- revisão humana;
- consolidação como capacidade do produto;
- persistência de estados;
- adapter para e-ComprasDF;
- modo de simulação;
- auditoria como princípio;
- testes unitários/integrados/E2E como estratégia.

## 5. Evidência esperada para cada tipo de lacuna

### Evidência documental

Legislação, manual, especificação oficial ou documentação técnica.

### Evidência observacional

Tela, fluxo, processo real ou entrevista com usuário operacional.

### Evidência técnica

Request/response, fixture, captura de rede, teste reproduzível ou comportamento confirmado do software.

### Evidência de produto

Medição antes/depois, caso real concluído e feedback do usuário.

Nenhuma dessas categorias deve ser substituída por suposição.

## 6. Regra de atualização

Quando uma lacuna for resolvida:

1. registrar a evidência;
2. atualizar este documento;
3. atualizar o documento técnico afetado;
4. transformar a hipótese em requisito/decisão quando apropriado;
5. adicionar ou atualizar testes;
6. atualizar backlog e user stories;
7. registrar ADR quando a decisão alterar a arquitetura.

## 7. Ordem recomendada para fechar as lacunas

1. Excel real da Candangolândia.
2. Processo real da Candangolândia.
3. Schema definitivo da entrada.
4. Regras de validação e consolidação.
5. Perfis e permissões.
6. Saída do Nível 1.
7. Métricas de baseline.
8. Integração autenticada do e-ComprasDF.
9. Critérios de confirmação.
10. Segurança e infraestrutura de produção.

## 8. Estado

Este documento deve permanecer vivo até que o produto atinja uma versão documental estável para o ambiente de produção.
