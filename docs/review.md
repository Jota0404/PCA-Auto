# PCA-Auto — Revisão humana

**Status:** PARCIALMENTE DEFINIDO  
**Última atualização:** 2026-09-22

## 1. Objetivo

A revisão humana é a etapa que permite que o usuário confira e resolva pendências identificadas pelo sistema antes de considerar os dados aptos.

## 2. Fluxo conceitual

```
Importação
   ↓
Normalização
   ↓
Validação
   ↓
Pendências
   ↓
Revisão humana
   ↓
Aprovação
   ↓
PCA pronto
```

## 3. Princípios

- O sistema deve explicar por que uma pendência existe.
- O usuário deve conseguir identificar a origem do dado.
- Correções devem ser explícitas.
- Alterações relevantes devem ser auditáveis.
- O sistema não deve "resolver" silenciosamente uma dúvida do usuário.

## 4. Capacidades previstas

A interface conceitualmente deverá permitir:

- listar pendências;
- filtrar;
- visualizar o item;
- visualizar o valor de origem;
- corrigir quando permitido;
- reenviar para validação;
- aprovar item;
- acompanhar o progresso.

## 5. O que ainda precisa de validação

- quais informações o usuário precisa visualizar simultaneamente;
- quais correções podem ser feitas no sistema;
- quais correções devem voltar para a origem;
- se a aprovação é por item, lote ou PCA;
- necessidade de comentários/justificativas;
- necessidade de comparação entre valor original e corrigido;
- necessidades de diferentes perfis.

## 6. Regra de auditoria

Quando o usuário alterar um valor relevante:

- registrar valor anterior;
- registrar novo valor;
- identificar usuário/processo;
- registrar momento;
- registrar motivo quando a regra exigir.

## 7. Critério de aceite futuro

O usuário operacional deve conseguir revisar um lote real sem depender do desenvolvedor para interpretar cada pendência.

Esse critério será validado no piloto.
