# PCA-Auto — Auditoria de negócio

**Status:** PARCIALMENTE DEFINIDO  
**Última atualização:** 2026-09-22

## Objetivo

Manter uma trilha verificável das decisões e ações relevantes executadas dentro do PCA-Auto.

## Diferença para logs técnicos

### Log técnico

Responde perguntas como:

- houve erro?
- em qual serviço?
- qual exceção?
- qual requisição?

### Auditoria de negócio

Responde perguntas como:

- quem alterou o item?
- qual era o valor original?
- qual foi o novo valor?
- qual regra foi aplicada?
- qual ação foi aprovada?
- qual foi o resultado?

## Eventos conceituais

Exemplos:

- IMPORT_STARTED
- IMPORT_COMPLETED
- VALIDATION_COMPLETED
- ITEM_BLOCKED
- ITEM_REVIEWED
- ITEM_APPROVED
- ITEM_STARTED
- ITEM_COMPLETED
- ITEM_FAILED

A taxonomia definitiva ainda depende do fluxo real.

## Requisitos

Cada evento relevante deve, quando aplicável, guardar:

- identificador;
- tipo;
- momento;
- ator;
- entidade;
- estado anterior;
- estado posterior;
- origem;
- resultado;
- contexto suficiente para auditoria.

## Princípio

A auditoria deve permitir reconstruir o caminho do dado sem registrar segredos ou informações desnecessárias.

## Pendente

- schema definitivo;
- retenção;
- consulta;
- exportação;
- controles de acesso;
- relação com versionamento do PCA.
