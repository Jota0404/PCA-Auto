# PCA-Auto — Banco de dados

**Status:** PARCIALMENTE DEFINIDO  
**Última atualização:** 2026-09-23

## Estado atual

- PostgreSQL é o banco escolhido.
- Prisma é o ORM.
- O schema vigente possui os modelos `Pca`, `PcaItem`, `CatalogItem`, `Execution` e `ExecutionItem`.
- O modelo persistido atual não possui uma entidade `Batch` separada.
- O schema definitivo do produto ainda pode evoluir após validação do processo real.

## Princípios

- manter integridade relacional;
- preservar origem dos dados;
- registrar estados persistidos;
- permitir retomada de processamento;
- separar histórico/auditoria quando necessário;
- evitar modelar capacidades enterprise antes da validação.

## Entidades persistidas atuais

### Pca
Plano de Contratações Anual.

### PcaItem
Necessidade/linha do PCA.

### CatalogItem
Representação do item de catálogo relacionada ao PCA quando aplicável.

### Execution
Unidade persistida de execução/processamento.

### ExecutionItem
Item associado a uma execução.

## Conceitos ainda não persistidos como modelo próprio

O termo `Batch` aparece em documentação conceitual anterior como unidade de processamento/importação/execução em lote. O schema vigente não possui esse modelo.

Até que exista uma decisão específica, usar `Execution`/ `ExecutionItem` ao descrever o modelo persistido atual.

## Pendente

- versionamento do PCA;
- chaves e relacionamentos definitivos;
- histórico de alterações;
- retenção;
- índices;
- estratégia de auditoria;
- estratégias de idempotência;
- modelo multi-tenant, quando aplicável no futuro.
