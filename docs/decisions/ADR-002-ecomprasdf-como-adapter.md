# ADR-002 — e-ComprasDF isolado por adapter

**Status:** Aceita  
**Data:** 2026-09-22

## Contexto

O e-ComprasDF é um sistema externo ao domínio do PCA-Auto.

A investigação atual possui rotas observadas, mas ainda não possui request, sessão, resposta e confirmação de operação fechados de ponta a ponta.

## Decisão

A integração com o e-ComprasDF será isolada por uma fronteira de adapter.

O domínio e os casos de uso não devem depender diretamente de:

- DOM;
- Playwright;
- seletores;
- detalhes HTTP do portal;
- cookies;
- rotas específicas.

## Consequências

- a integração pode ser substituída/testada isoladamente;
- o Nível 1 continua utilizável sem execução externa;
- testes de integração podem usar fixtures;
- mudanças no portal devem ficar confinadas à camada de infraestrutura.

## Regra de produção

A execução real permanece bloqueada até que haja evidência reproduzível do request, sessão, resposta e mecanismo de confirmação.

## Possível evolução

Quando existir um mecanismo oficial/estável de integração, o adapter poderá migrar de automação de UI para esse mecanismo sem alterar o domínio do PCA-Auto.
