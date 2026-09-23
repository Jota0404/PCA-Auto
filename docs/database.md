# PCA-Auto — Banco de dados

**Status:** PARCIALMENTE DEFINIDO  
**Última atualização:** 2026-09-22

## Estado atual

- PostgreSQL é o banco escolhido.
- Prisma é o ORM.
- O domínio já identifica conceitos como PCA, PcaItem e Batch.
- O schema definitivo ainda não foi fechado.

## Princípios

- manter integridade relacional;
- preservar origem dos dados;
- registrar estados persistidos;
- permitir retomada de processamento;
- separar histórico/auditoria quando necessário;
- evitar modelar capacidades enterprise antes da validação.

## Entidades candidatas

### PCA
Plano de Contratações Anual.

### PcaItem
Necessidade/linha do PCA.

### Batch
Unidade de importação/processamento.

### AuditEvent
Evento de auditoria de negócio.

### ExecutionEvent
Evento relacionado à execução técnica/operacional.

Essas entidades são conceituais até que o fluxo real e os requisitos definitivos sejam validados.

## Pendente

- versionamento do PCA;
- chaves e relacionamentos definitivos;
- histórico de alterações;
- retenção;
- índices;
- estratégia de auditoria;
- estratégias de idempotência;
- modelo multi-tenant, quando aplicável no futuro.
