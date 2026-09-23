# PCA-Auto — Domínio

**Status:** PARCIALMENTE DEFINIDO  
**Última atualização:** 2026-09-23

## 1. Objetivo

Registrar o modelo de domínio atual sem congelar prematuramente detalhes que ainda precisam ser observados no processo real.

## 2. Entidades centrais

### PCA

Representa um Plano de Contratações Anual em determinado contexto de órgão/período.

**Estado atual:** modelo conceitual.

Ainda precisam ser definidos com o processo real:

- identificação;
- período;
- órgão/unidade;
- versão;
- status definitivo;
- metadados de origem;
- regras de publicação/alteração.

### PcaItem

Representa uma necessidade/linha do PCA processada pelo sistema.

Conceitos já conhecidos:

- código de catálogo;
- descrição;
- quantidade;
- valor;
- data desejada;
- prioridade;
- modalidade;
- estado de processamento.

### Execution

Representa uma execução persistida do processamento.

### ExecutionItem

Representa a associação de um item do PCA a uma execução e seu resultado/status dentro dessa execução.

O schema Prisma vigente utiliza `Execution` e `ExecutionItem`. O termo conceitual `Batch` não deve ser tratado como entidade persistida independente enquanto não houver decisão específica que justifique isso.

## 3. Estados preliminares

### Item

```
PENDING
VALIDATED
IN_PROGRESS
COMPLETED
ERROR
```

Esses estados são preliminares e devem ser confirmados com o fluxo real.

### PCA

```
DRAFT
READY
RUNNING
COMPLETED
BLOCKED
ERROR
```

Também preliminar.

### Execution

```
CREATED
RUNNING
COMPLETED
PARTIAL
ERROR
```

Também preliminar.

## 4. Princípios do domínio

### Fonte de verdade

O código de catálogo tem origem no arquivo de entrada. O domínio deve preservar essa origem.

### Ambiguidade

Não existe transição automática para um resultado que não possa ser identificado com segurança.

### Conclusão

`COMPLETED` representa conclusão comprovada, não apenas tentativa de execução.

### Retomada

O domínio deve suportar execução interrompida e retomada sem repetir automaticamente itens concluídos.

## 5. Versionamento

O PCA pode sofrer alterações durante seu ciclo de vida. O modelo atual ainda não define a estratégia definitiva de versionamento.

**Status:** PRECISA DE VALIDAÇÃO + DECISÃO.

## 6. Identidade técnica do item

O código informado pela entrada e o `ItemId` interno do e-ComprasDF são conceitos diferentes.

O domínio não deve tratar `ItemId` como substituto do código de negócio.

## 7. Próxima evolução

O modelo deve ser revisado após:

1. Excel real;
2. fluxo real de revisão;
3. observação do ciclo de vida do PCA;
4. definição da persistência real;
5. validação do fluxo de execução.
