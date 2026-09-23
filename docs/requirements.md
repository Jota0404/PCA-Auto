# PCA-Auto — Requisitos

**Status:** PARCIALMENTE DEFINIDO  
**Última atualização:** 2026-09-22

> Este documento registra requisitos que já podem orientar o MVP e marca explicitamente os que ainda dependem de validação no piloto.

## 1. Requisitos funcionais já identificados

### RF-001 — Importar Excel

O sistema deve permitir importar uma planilha XLSX compatível com o contrato de entrada definido em `docs/excel-format.md`.

**Status:** PARCIALMENTE DEFINIDO.

### RF-002 — Preservar o código de origem

O código informado no Excel deve ser preservado durante o fluxo.

O sistema não deve substituir silenciosamente o código por outro encontrado por descrição ou similaridade.

**Status:** DEFINIDO.

### RF-003 — Normalizar dados

O sistema deve converter a estrutura de entrada para um modelo interno consistente antes da validação de negócio.

**Status:** PARCIALMENTE DEFINIDO.

### RF-004 — Validar dados

O sistema deve aplicar regras de validação e identificar inconsistências ou pendências.

**Status:** HIPÓTESE — regras concretas dependem do Excel e do processo reais.

### RF-005 — Exibir pendências

O sistema deve permitir identificar quais itens possuem problemas e por quê.

**Status:** PARCIALMENTE DEFINIDO.

### RF-006 — Permitir revisão humana

O usuário deve conseguir revisar e corrigir pendências antes de considerar um item pronto.

**Status:** PARCIALMENTE DEFINIDO.

### RF-007 — Preparar PCA

O sistema deve produzir uma representação interna dos itens aptos à conclusão do PCA e, no Nível 1, uma saída utilizável pelo usuário.

**Status:** HIPÓTESE / PRECISA DE VALIDAÇÃO.

### RF-008 — Registrar histórico

O sistema deve manter informação suficiente para saber o que aconteceu com cada item/processamento.

**Status:** PARCIALMENTE DEFINIDO.

### RF-009 — Executar de forma resumível

Quando a execução for implementada, o sistema deve conseguir retomar processamento sem reexecutar automaticamente itens já concluídos.

**Status:** PRINCÍPIO DEFINIDO; mecanismo pendente.

### RF-010 — Confirmar conclusão

Um item só pode receber estado `COMPLETED` quando existir confirmação verificável.

**Status:** DEFINIDO.

## 2. Requisitos para execução futura

### RF-011 — Resolver identidade técnica

Quando necessário, a integração deve resolver o `ItemId` correspondente ao código fornecido sem alterar a origem do código.

**Status:** HIPÓTESE DE INTEGRAÇÃO; depende de evidência real.

### RF-012 — Simular execução

A integração deve possuir modo de simulação antes da produção.

**Status:** DEFINIDO como princípio/arquitetura.

### RF-013 — Registrar erros de execução

Falhas devem ser persistidas com etapa e contexto suficientes para investigação.

**Status:** PARCIALMENTE DEFINIDO.

## 3. Requisitos de auditoria

### RF-014 — Auditoria de negócio

Registrar eventos relevantes, incluindo pelo menos:

- usuário/processo responsável;
- item afetado;
- dado de origem;
- ação executada;
- regra aplicada quando aplicável;
- resultado;
- momento da ação.

**Status:** PARCIALMENTE DEFINIDO — schema ainda não fechado.

### RF-015 — Diferenciar log técnico e auditoria

Logs de infraestrutura não substituem a trilha de auditoria de negócio.

**Status:** DEFINIDO.

## 4. Requisitos ainda dependentes do piloto

- regras completas de validação;
- campos obrigatórios reais;
- comportamento esperado para dados incompletos;
- modelo de revisão humana;
- estados definitivos de Item/PCA/Batch;
- versionamento do PCA;
- critérios numéricos de aceitação;
- volume e desempenho necessários;
- necessidade real de perfis/permissões adicionais.

## 5. Requisitos não funcionais

Ainda não há limiares definitivos para:

- disponibilidade;
- latência;
- throughput;
- retenção de dados;
- RTO/RPO;
- escalabilidade;
- SLA.

Esses requisitos devem ser especificados quando houver evidência suficiente para um ambiente persistente de produção.

## 6. Rastreabilidade

Todo requisito novo deve ter:

- identificador;
- status;
- fonte/origem;
- justificativa;
- teste ou evidência esperada quando aplicável.

Nenhuma regra de negócio deve ser criada apenas porque facilita a implementação.
