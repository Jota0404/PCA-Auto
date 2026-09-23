# PCA-Auto — Estratégia de testes

**Status:** PARCIALMENTE DEFINIDO  
**Última atualização:** 2026-09-22

## Estado atual conhecido

Em um estado registrado anteriormente do projeto:

- `npm run typecheck` passou;
- `npm test` passou com 11 suítes e 30 testes;
- `npx prisma generate` passou.

Esses resultados representam um estado de desenvolvimento registrado e devem ser verificados novamente após mudanças relevantes.

## Estratégia

### Testes unitários

Prioridade para:

- regras de domínio;
- normalização;
- validação;
- transições de estado;
- tratamento de ambiguidades.

### Testes de integração

Para:

- PostgreSQL/Prisma;
- importação real;
- persistência;
- casos de uso.

### E2E

Para fluxos de usuário:

- importar;
- revisar;
- validar;
- preparar;
- executar quando essa etapa existir.

### Contract tests

Quando a integração externa for comprovada, testar o contrato esperado do adapter do e-ComprasDF usando evidências capturadas/fixtures controladas.

### Testes de regressão

Toda correção de regra relevante deve gerar um teste de regressão.

## Regra

Não criar uma suíte complexa de automação externa antes de o fluxo do e-ComprasDF ser comprovado.

## Critério mínimo

Toda funcionalidade nova deve manter:

- typecheck;
- testes existentes;
- novos testes para comportamento crítico;
- documentação correspondente quando mudar uma decisão ou contrato.
