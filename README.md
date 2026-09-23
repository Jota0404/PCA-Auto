# PCA Auto

**Plataforma de apoio à preparação, validação, consolidação e automação controlada do Plano de Contratações Anual (PCA).**

**Versão documental:** 0.9  
**Status do produto:** em validação e desenvolvimento do MVP  
**Contexto inicial:** Administração Regional da Candangolândia — DF  
**Repositório:** Jota0404/PCA-Auto

## 1. O que é

O PCA Auto é um software que organiza o fluxo de dados do PCA antes e, em evolução controlada, durante sua execução no e-ComprasDF.

O produto separa claramente:

```
Entrada → Normalização → Validação → Revisão → Consolidação → PCA pronto
                                                   ↓
                                        Execução integrada futura
```

O e-ComprasDF continua sendo o sistema oficial. O PCA Auto não pretende substituí-lo.

## 2. Problema

O projeto parte da hipótese de que a preparação do PCA envolve trabalho manual, consolidação de demandas, validações, correções e operações repetitivas.

A magnitude dessa dor ainda precisa ser medida no processo real da Candangolândia.

## 3. Público-alvo

- servidores responsáveis por demandas do PCA;
- gestores do PCA;
- participantes da revisão/aprovação;
- administradores técnicos do sistema.

## 4. Escopo atual

### Incluído

- importação de Excel;
- normalização;
- validação;
- pendências;
- revisão humana;
- consolidação;
- preparação de PCA;
- persistência;
- execução controlada;
- auditoria;
- integração isolada com e-ComprasDF.

### Não incluído no MVP

- ERP;
- financeiro completo;
- marketplace;
- mobile;
- gestão completa de contratos;
- IA generativa sem caso de uso validado;
- multi-tenant enterprise;
- dezenas de integrações não validadas.

## 5. Stack

### Front-end e aplicação

- Next.js 15
- React 19
- TypeScript 5.9
- Node.js

### Persistência

- PostgreSQL
- Prisma 6

### Automação e integração

- Playwright
- HTTP
- ExcelJS
- jsdom

### Validação e testes

- Zod
- Vitest

## 6. Arquitetura

O projeto usa arquitetura em camadas:

```
app/
  ↓
src/application/
  ↓
src/domain/
  ↓
src/infrastructure/
```

O domínio não depende de Playwright, DOM, HTTP ou Prisma.

O e-ComprasDF é isolado pelo EComprasAdapter.

## 7. Banco de dados

O schema atual possui:

- PCA;
- PcaItem;
- CatalogItem;
- Execution;
- ExecutionItem.

PostgreSQL é o banco oficial do estágio atual.

Consulte [DER](./docs/04-der.md) e [Dicionário de Dados](./docs/05-dicionario-de-dados.md).

## 8. Regras fundamentais

1. Código de origem é preservado.
2. Ambiguidade não é resolvida silenciosamente.
3. COMPLETED exige confirmação verificável.
4. SIMULATION não altera o e-ComprasDF.
5. Credenciais não ficam no código ou em logs.
6. Integração externa permanece isolada.
7. O sistema deve ser retomável e rastreável.

## 9. Documentação principal

| Documento | Objetivo |
|---|---|
| [Visão e Escopo](./docs/01-visao-e-escopo.md) | visão, problema, público e limites |
| [ERS](./docs/02-ers.md) | requisitos funcionais, regras e restrições |
| [DAS](./docs/03-das.md) | arquitetura e comunicação entre componentes |
| [DER](./docs/04-der.md) | modelagem relacional atual |
| [Dicionário de Dados](./docs/05-dicionario-de-dados.md) | campos e tipos persistidos |
| [User Stories](./docs/06-user-stories.md) | histórias para backlog |
| [Plano de Testes](./docs/07-plano-de-testes.md) | testes e critérios de aceitação |
| [Lacunas e Evidências](./docs/08-lacunas-evidencias.md) | o que ainda falta definir, validar ou comprovar |
| [Onboarding de Desenvolvedor](./docs/09-onboarding-desenvolvedor.md) | guia de entrada para novos desenvolvedores |

## 10. O que ainda falta

A documentação já possui um registro formal das lacunas do produto. As principais são:

- Excel real da Candangolândia;
- processo operacional real;
- schema definitivo da entrada;
- regras locais de validação e consolidação;
- participantes e permissões internas;
- formato definitivo da saída “PCA pronto”;
- baseline de tempo, erros e retrabalho;
- fluxo HTTP autenticado completo do e-ComprasDF;
- resolução exata de \`ItemId\`;
- critério técnico de confirmação da operação;
- máquina de estados definitiva do fluxo externo;
- segurança e infraestrutura de produção;
- política de retenção e metas de desempenho.

Consulte [Lacunas e Evidências](./docs/08-lacunas-evidencias.md) para a lista completa, prioridade e evidência necessária para fechar cada ponto.

## 11. Documentação técnica complementar

- [Status da documentação](./docs/status.md)
- [Produto](./docs/product.md)
- [Requisitos legados/de apoio](./docs/requirements.md)
- [Domínio](./docs/domain.md)
- [Validação](./docs/validation.md)
- [Revisão humana](./docs/review.md)
- [Formato Excel](./docs/excel-format.md)
- [Arquitetura detalhada](./docs/architecture.md)
- [Fluxo de execução](./docs/execution-flow.md)
- [Status da integração e-ComprasDF](./docs/ecompras-integration-status.md)
- [Investigação e-ComprasDF](./docs/ecompras-investigation.md)
- [Runbook de captura de rede](./docs/network-capture-runbook.md)
- [Banco de dados](./docs/database.md)
- [API](./docs/api.md)
- [Segurança](./docs/security.md)
- [Testes](./docs/testing.md)
- [Deploy](./docs/deployment.md)
- [Auditoria](./docs/audit.md)
- [Roadmap](./docs/roadmap.md)
- [Backlog](./docs/backlog.md)
- [Riscos](./docs/risks.md)
- [ADRs](./docs/decisions/)

## 12. Estrutura do projeto

```text
app/                    interface e rotas Next.js
src/domain/             regras e tipos centrais
src/application/        casos de uso/orquestração
src/infrastructure/     banco, Excel, HTTP e e-ComprasDF
src/services/           serviços de apoio
prisma/                 schema e migrações
tests/                  testes
scripts/                investigação e simulação
docs/                   documentação
```

## 13. Estado atual

O projeto está em fase de validação do produto e consolidação da especificação.

### Já definido

- visão incremental;
- arquitetura em camadas;
- PostgreSQL + Prisma;
- Excel como entrada inicial;
- adapter para e-ComprasDF;
- estados preliminares;
- princípios de segurança e auditabilidade;
- modo de simulação.

### Ainda depende de evidência

- Excel real da Candangolândia;
- processo operacional real;
- schema definitivo da entrada;
- regras locais detalhadas;
- fluxo HTTP completo de inclusão;
- resolução/confirmação de ItemId;
- critério técnico final de sucesso;
- infraestrutura de produção.

## 14. Como começar

```bash
npm install
npm run typecheck
npm test
npm run dev
```

Para trabalhar com banco:

```bash
npm run db:generate
npm run db:migrate
```

Para entender o projeto antes de alterar código, leia primeiro o [Onboarding de Desenvolvedor](./docs/09-onboarding-desenvolvedor.md).

## 15. Regra documental

A documentação é parte do produto.

Toda mudança relevante deve refletir, conforme o caso:

- requisitos;
- arquitetura;
- modelo de dados;
- testes;
- user stories/backlog;
- decisões;
- status documental.

Não preencher lacunas com suposições apenas para aparentar completude.
