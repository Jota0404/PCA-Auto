# PCA Auto — Dicionário de Dados

**Versão:** 0.9  
**Status:** baseado no schema Prisma atual  
**Data:** 2026-09-22

## 1. Objetivo

Descrever os campos persistidos no banco de dados atual do PCA Auto.

Os tipos abaixo seguem a modelagem Prisma atual; a representação SQL final é gerada pelo Prisma/PostgreSQL.

## 2. Tabela: pca

| Campo | Tipo lógico | Obrigatório | Chave | Descrição |
|---|---|---:|---|---|
| id | inteiro | sim | PK | Identificador interno do PCA |
| ano | inteiro | sim | índice | Ano de referência do PCA |
| unidade | texto | sim | — | Unidade associada ao PCA |
| nome | texto | sim | — | Nome/identificação do PCA |
| status | enum | sim | — | Estado de processamento do PCA |
| createdAt | datetime | sim | — | Data/hora de criação |
| updatedAt | datetime | sim | — | Data/hora da última atualização |

### Enum pca.status

- DRAFT
- READY
- RUNNING
- COMPLETED
- BLOCKED
- ERROR

## 3. Tabela: catalog_item

| Campo | Tipo lógico | Obrigatório | Chave | Descrição |
|---|---|---:|---|---|
| id | inteiro | sim | PK | Identificador interno do registro |
| codigoCatalogo | texto | sim | UK | Código de catálogo fornecido/identificado para o item |
| itemId | inteiro | sim | índice | Identificador técnico interno observado no e-ComprasDF |
| descricao | texto | sim | — | Descrição do item |
| unidade | texto | sim | — | Unidade de medida/apresentação |
| createdAt | datetime | sim | — | Data/hora de criação |
| updatedAt | datetime | sim | — | Data/hora da última atualização |

**Regra:** ItemId não substitui o código de negócio/origem.

## 4. Tabela: pca_item

| Campo | Tipo lógico | Obrigatório | Chave | Descrição |
|---|---|---:|---|---|
| id | inteiro | sim | PK | Identificador interno do item do PCA |
| pcaId | inteiro | sim | FK | PCA ao qual o item pertence |
| catalogItemId | inteiro | não | FK | Referência opcional ao cache de catálogo |
| codigoCatalogo | texto | sim | índice | Código informado pela origem |
| itemId | inteiro | não | — | Identificador técnico externo resolvido |
| descricao | texto | não | — | Descrição do item |
| unidade | texto | não | — | Unidade do item |
| quantidade | decimal | não | — | Quantidade prevista |
| valorEstimado | decimal | não | — | Estimativa preliminar do valor |
| dataDesejada | datetime | não | — | Data desejada para contratação/aquisição |
| prioridade | texto | não | — | Prioridade informada |
| modalidade | texto | não | — | Modalidade preliminar |
| statusExecucao | enum | sim | índice | Estado do processamento do item |
| mensagemErro | texto | não | — | Última mensagem de erro persistida |
| createdAt | datetime | sim | — | Data/hora de criação |
| updatedAt | datetime | sim | — | Data/hora da última atualização |

### Enum pca_item.statusExecucao

- PENDING
- VALIDATED
- IN_PROGRESS
- COMPLETED
- ERROR

## 5. Tabela: execucao

| Campo | Tipo lógico | Obrigatório | Chave | Descrição |
|---|---|---:|---|---|
| id | inteiro | sim | PK | Identificador da execução |
| pcaId | inteiro | sim | FK | PCA processado |
| inicio | datetime | sim | — | Início da execução |
| fim | datetime | não | — | Fim da execução |
| status | enum | sim | índice | Estado do lote |
| totalItens | inteiro | sim | — | Quantidade total de itens no lote |
| itensSucesso | inteiro | sim | — | Itens concluídos com sucesso |
| itensErro | inteiro | sim | — | Itens que terminaram em erro |

### Enum execucao.status

- CREATED
- RUNNING
- COMPLETED
- PARTIAL
- ERROR

## 6. Tabela: execucao_item

| Campo | Tipo lógico | Obrigatório | Chave | Descrição |
|---|---|---:|---|---|
| id | inteiro | sim | PK | Identificador do registro |
| executionId | inteiro | sim | FK | Execução à qual pertence |
| pcaItemId | inteiro | sim | FK | Item processado |
| inicio | datetime | sim | — | Início do processamento do item |
| fim | datetime | não | — | Fim do processamento |
| status | texto | sim | índice | Estado técnico/operacional observado |
| etapa | texto | sim | — | Etapa do processamento |
| mensagem | texto | não | — | Mensagem de resultado/erro |

## 7. Campos e dados que ainda não existem no schema

Ainda não são persistidos como entidades próprias:

- usuário;
- papel/perfil;
- unidade demandante;
- lote de importação;
- evento de auditoria;
- regra de validação;
- versão do PCA;
- histórico de alterações;
- configuração de integração;
- evidência de confirmação externa.

A necessidade desses campos deve ser validada antes de uma migração estrutural.

## 8. Regras de dados

- chaves estrangeiras devem manter integridade;
- códigos de origem devem ser preservados;
- valores monetários usam Decimal;
- estados com ciclo de vida controlado usam enum quando já estabilizados;
- dados sensíveis não devem ser persistidos sem justificativa e controle adequado.

