# ADR-003 — Ambiguidade e confirmação verificável

**Status:** Aceita  
**Data:** 2026-09-22

## Contexto

Uma automação de sistema governamental pode produzir respostas inesperadas ou múltiplas correspondências.

Tratar uma correspondência "parecida" como correta pode gerar alteração de dados ou indicar sucesso quando a operação não foi confirmada.

## Decisão

O PCA-Auto deve:

1. sinalizar ambiguidades;
2. bloquear quando não houver segurança suficiente;
3. exigir revisão quando necessário;
4. só marcar `COMPLETED` após confirmação verificável.

## Consequências

- menos automação silenciosa;
- mais rastreabilidade;
- possibilidade de mais revisões humanas;
- maior confiança no estado persistido.

## Relação com execução

O fim de uma requisição não é, por si só, confirmação de sucesso.

A implementação deve distinguir:

- tentativa;
- resposta recebida;
- resultado interpretado;
- confirmação do estado externo.

## Reversão

Qualquer flexibilização desta política exigiria evidência forte e uma nova decisão arquitetural.
