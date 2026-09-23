# PCA Auto — Documento de Arquitetura de Software (DAS)

**Versão:** 0.9  
**Status:** arquitetura base definida; infraestrutura de produção ainda não fechada  
**Data:** 2026-09-22

## 1. Objetivo

Descrever a arquitetura técnica do PCA Auto, as fronteiras dos componentes, os fluxos de comunicação, a persistência e a integração com o e-ComprasDF.

## 2. Arquitetura lógica

```text
                    ┌──────────────────────────┐
                    │        Usuário            │
                    │      Navegador Web       │
                    └────────────┬─────────────┘
                                 │ HTTPS
                                 ▼
                    ┌──────────────────────────┐
                    │ Next.js / React           │
                    │ UI + rotas da aplicação   │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ Camada de Aplicação       │
                    │ casos de uso / orquestração│
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ Camada de Domínio         │
                    │ regras / estados / tipos   │
                    └───────┬──────────┬────────┘
                            │          │
               ┌────────────┘          └─────────────┐
               ▼                                      ▼
    ┌──────────────────────┐             ┌────────────────────────┐
    │ Infraestrutura       │             │ PostgreSQL + Prisma     │
    │ Excel / HTTP /       │             │ persistência             │
    │ Playwright / adapters│             └────────────────────────┘
    └──────────┬───────────┘
               │
               ├──────────────► XLSX
               │
               └──────────────► e-ComprasDF
```

## 3. Camadas

### 3.1 Interface — app/

Responsável por:

- telas;
- navegação;
- interação com usuário;
- rotas/endpoints Next.js quando necessários.

Não deve conter regras de negócio críticas.

### 3.2 Aplicação — src/application/

Responsável por:

- casos de uso;
- coordenação de etapas;
- transações;
- chamadas ao domínio;
- integração entre persistência e adapters.

### 3.3 Domínio — src/domain/

Responsável por:

- entidades;
- estados;
- regras de negócio;
- validações que não dependem de infraestrutura.

O domínio não deve importar Playwright, DOM, Prisma ou detalhes HTTP.

### 3.4 Infraestrutura — src/infrastructure/

Responsável por:

- Prisma/PostgreSQL;
- leitura de Excel;
- HTTP;
- Playwright;
- adapters externos;
- mecanismos técnicos de execução.

## 4. Comunicação e fluxo principal

### 4.1 Nível 1 — Assistido

```
Usuário
  ↓
Upload XLSX
  ↓
Importador Excel
  ↓
Modelo interno
  ↓
Validação
  ↓
Pendências
  ↓
Revisão humana
  ↓
Consolidação
  ↓
PCA pronto
```

### 4.2 Nível 2 — Integrado

```
PCA pronto
  ↓
Caso de uso de execução
  ↓
EComprasAdapter
  ├── HTTP
  └── Playwright, quando necessário
  ↓
e-ComprasDF
  ↓
Consulta de confirmação
  ↓
Estado confirmado
  ↓
Persistência / auditoria
```

## 5. Isolamento do e-ComprasDF

O e-ComprasDF deve ser tratado como sistema externo.

A fronteira é representada por EComprasAdapter.

Responsabilidades do adapter:

- autenticação/sessão quando aplicável;
- consulta;
- resolução de identidade técnica;
- preparação/envio;
- leitura de resposta;
- verificação de confirmação;
- tradução de falhas externas.

Responsabilidades que não pertencem ao adapter:

- decidir regras de negócio do PCA;
- consolidar demandas;
- substituir códigos de origem;
- resolver ambiguidades de negócio.

## 6. Resolução de identidade

O ItemResolver trabalha com a diferença entre:

- código de catálogo informado na origem;
- eventual ItemId interno exigido pelo portal.

Fluxo:

```
codigoCatalogo
      ↓
cache local
      ↓
e-ComprasDF, quando necessário
      ↓
ItemId + dados de identificação
      ↓
validação de correspondência
```

Nenhuma correspondência ambígua deve ser aceita automaticamente.

## 7. Banco de dados

PostgreSQL é a persistência principal.

Prisma é a camada ORM.

O schema atual contém:

- Pca;
- PcaItem;
- CatalogItem;
- Execution;
- ExecutionItem.

O DER e o dicionário de dados documentam o estado atual.

## 8. Integração com arquivos

ExcelJS é usado para leitura de XLSX.

O importador deve:

- ler a estrutura esperada;
- converter valores;
- preservar origem;
- devolver erros de importação explicitamente.

O importador não deve consultar o e-ComprasDF.

## 9. Estados e execução

Estados persistidos permitem retomada:

```
PENDING → VALIDATED → IN_PROGRESS → COMPLETED
                             │
                             └──────→ ERROR
```

O estado COMPLETED somente é permitido após confirmação verificável.

## 10. Simulação

SIMULATION é o modo de segurança inicial.

Nenhuma operação real deve ser executada quando o modo estiver ativo.

PRODUCTION deve permanecer bloqueado por configuração até a evidência técnica necessária existir.

## 11. Infraestrutura e hospedagem

### Estado atual

O projeto possui arquitetura compatível com:

- aplicação Next.js/Node.js;
- banco PostgreSQL;
- navegador Chromium/Playwright quando necessário.

### O que ainda não foi decidido

- provedor de hospedagem;
- estratégia de ambientes;
- domínio;
- CI/CD definitivo;
- secret manager;
- backups gerenciados;
- observabilidade de produção;
- alta disponibilidade.

Essas escolhas devem ocorrer quando o produto estiver pronto para um ambiente persistente de produção.

## 12. Segurança arquitetural

Princípios:

- secrets fora do código;
- menor privilégio;
- não persistir senha do e-ComprasDF na aplicação sem mecanismo aprovado;
- não expor credenciais em logs;
- separar auditoria de logs técnicos;
- falhar explicitamente em situações ambíguas.

## 13. Testabilidade

A arquitetura favorece:

- unit tests para domínio;
- integration tests para persistência e casos de uso;
- E2E para fluxos de usuário;
- contract tests para o adapter e-ComprasDF quando o contrato for comprovado.

## 14. Decisões arquiteturais relacionadas

- ADR-001 — Excel como fonte de verdade dos códigos;
- ADR-002 — e-ComprasDF como adapter;
- ADR-003 — ambiguidade e confirmação.

