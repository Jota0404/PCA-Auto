# PCA Auto — Onboarding de Desenvolvedor

**Versão:** 0.9  
**Status:** guia de entrada baseado na documentação e no estado atual conhecido do código  
**Data:** 2026-09-23

## 1. Para que serve este documento

Este é o ponto de entrada para um desenvolvedor que está conhecendo o PCA Auto pela primeira vez.

Ele explica:
- qual é o objetivo do produto;
- qual é o fluxo pretendido;
- qual arquitetura foi definida;
- quais partes já estão implementadas;
- quais partes ainda não podem ser consideradas definitivas;
- onde encontrar cada informação.

Este documento **não cria requisitos, regras ou comportamentos novos**. Quando uma informação não está comprovada, ela é tratada como pendente.

## 2. Leia nesta ordem

1. [01 — Visão e Escopo](./01-visao-e-escopo.md) — o que é, problema, público e limites.
2. [02 — ERS](./02-ers.md) — requisitos funcionais, regras e restrições.
3. [03 — DAS](./03-das.md) — como os componentes se organizam.
4. [04 — DER](./04-der.md) e [05 — Dicionário de Dados](./05-dicionario-de-dados.md) — como os dados estão modelados.
5. [06 — User Stories](./06-user-stories.md) — como as funcionalidades são quebradas.
6. [07 — Plano de Testes](./07-plano-de-testes.md) — como validar o comportamento.
7. [08 — Lacunas e Evidências](./08-lacunas-evidencias.md) — o que ainda falta definir, validar ou comprovar.
8. Este documento — mapa de entrada e navegação.

## 3. Objetivo final

A visão registrada para o produto é:

**apoiar a preparação, validação, consolidação, revisão e, em evolução controlada, execução do PCA no contexto do e-ComprasDF.**

Fluxo conceitual documentado:

```text
Entrada de dados
    ↓
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
Consolidação
    ↓
PCA pronto
    ↓
Execução controlada no e-ComprasDF
```

A execução integrada é uma evolução. O produto deve conseguir entregar valor no Nível 1 sem depender da automação do sistema governamental.

O e-ComprasDF permanece como sistema oficial.

## 4. Arquitetura definida

A arquitetura registrada utiliza:

```text
app/
    ↓
src/application/
    ↓
src/domain/
    ↓
src/infrastructure/
```

### app/

Interface e endpoints da aplicação Next.js.

### src/application/

Casos de uso e orquestração.

### src/domain/

Tipos, entidades e regras centrais.

O domínio não deve depender diretamente de Playwright, DOM, HTTP ou Prisma.

### src/infrastructure/

Dependências técnicas e externas, incluindo PostgreSQL, Excel, HTTP, e-ComprasDF e Playwright quando necessário.

A integração com o e-ComprasDF é isolada por EComprasAdapter.

## 5. Stack registrada

A stack registrada no projeto é:

- Next.js;
- React;
- TypeScript;
- Node.js;
- PostgreSQL;
- Prisma;
- ExcelJS;
- Playwright;
- jsdom;
- Zod;
- Vitest.

As versões atualmente registradas no package.json são a referência para o estado do código.

## 6. Modelo de dados atual

O schema Prisma atualmente documentado possui:

```text
Pca
 ├── PcaItem
 │      └── CatalogItem (opcional)
 │
 └── Execution
        └── ExecutionItem
```

O schema atual não possui uma entidade `Batch` separada. O termo pode aparecer em documentação histórica/conceitual, mas o modelo persistido vigente usa `Execution` e `ExecutionItem`.

Os estados registrados são preliminares. Não assumir que o modelo atual já representa o modelo definitivo do produto.

## 7. O que já existe no código

O estado atual conhecido inclui:

- importação XLSX;
- normalização;
- persistência da importação;
- validação básica;
- endpoint interno `POST /api/pca/import`;
- protótipo de frontend.

Esses componentes devem ser confrontados com o processo real quando a validação do produto exigir.

## 8. Entrada de dados

O Excel é a entrada inicial documentada.

Princípio:

```text
Código fornecido pela origem
          ↓
preservado pelo PCA Auto
          ↓
validação / processamento
```

O sistema não deve substituir silenciosamente o código fornecido por outro código encontrado por descrição.

O contrato do Excel ainda precisa ser validado com um arquivo real da Candangolândia. Consulte [excel-format.md](./excel-format.md).

## 9. Validação e revisão

A validação foi definida como uma etapa separada da importação.

A implementação atual já possui regras básicas. Consulte [validation.md](./validation.md) para distinguir as regras implementadas das regras ainda dependentes do processo real.

A revisão humana continua parcialmente definida e depende de validação com usuário operacional.

## 10. Integração com o e-ComprasDF

Esta é uma das partes que exige mais cuidado.

O código do catálogo vem da entrada. O ItemId é tratado como um identificador técnico separado.

A investigação já documentou observações sobre o portal, mas ainda existem lacunas sobre:

- sessão;
- request final;
- payload;
- resposta;
- redirects;
- confirmação;
- fluxo completo de lançamento;
- comportamento em erro.

A integração real permanece condicionada à comprovação desses pontos.

Consulte [ecompras-integration-status.md](./ecompras-integration-status.md), [ecompras-investigation.md](./ecompras-investigation.md), [execution-flow.md](./execution-flow.md) e [network-capture-runbook.md](./network-capture-runbook.md).

**Não implemente comportamento do portal por suposição.**

## 11. Regra fundamental de conclusão

Um dos princípios centrais é:

```text
tentativa de operação ≠ operação concluída
```

O estado COMPLETED só deve representar uma conclusão comprovada.

## 12. O que ainda está em aberto

[08 — Lacunas e Evidências](./08-lacunas-evidencias.md) é a fonte central das pendências.

Entre as lacunas registradas estão:

- Excel real da Candangolândia;
- processo operacional real;
- schema definitivo da entrada;
- regras locais;
- consolidação;
- permissões;
- formato definitivo da saída;
- métricas do processo;
- integração autenticada completa;
- resolução de ItemId;
- confirmação da operação;
- segurança de produção;
- infraestrutura;
- retenção;
- desempenho.

Esses pontos **não devem ser preenchidos pelo desenvolvedor com suposições**.

## 13. Onde alterar cada tipo de informação

### Produto
Visão e Escopo, ERS, User Stories e Roadmap.

### Regra de negócio
ERS, Domain, Validation e ADRs.

### Arquitetura
DAS, Architecture e ADRs.

### Banco
DER, Dicionário de Dados e prisma/schema.prisma.

### e-ComprasDF
Status da integração, Investigação, Runbook de captura e Fluxo de execução.

### Testes
Plano de Testes, Testing e requisito/User Story correspondente.

## 14. Dívida técnica conhecida

Existe atualmente um arquivo `src/application/execution/single-item-executor.ts` que não faz parte do caminho de execução atualmente utilizado. Ele deve ser tratado como código não confirmado para uso, e não como implementação oficial.

Além disso, esse executor retorna `status: "COMPLETED"` no modo `SIMULATION`; isso precisa ser revisado antes de qualquer reutilização, porque a simulação não deve ser confundida com conclusão externa.

A decisão de remover ou reaproveitar esse arquivo ainda não foi tomada.

## 15. O que não fazer

Não:

- inventar regras do PCA;
- assumir que uma regra de outro órgão é regra da Candangolândia;
- assumir que uma observação do portal é uma API estável;
- inventar payloads ou seletores do e-ComprasDF;
- substituir códigos de origem silenciosamente;
- tratar ambiguidade como sucesso;
- marcar operação externa como COMPLETED sem confirmação;
- transformar hipótese em requisito sem evidência;
- alterar o modelo de dados apenas para antecipar funcionalidades futuras.

## 16. Como atualizar a documentação

Quando uma nova informação for comprovada:

1. registrar a evidência;
2. atualizar o documento correspondente;
3. atualizar docs/status.md;
4. atualizar docs/08-lacunas-evidencias.md;
5. criar ou atualizar requisito, User Story ou teste quando necessário;
6. criar ou atualizar ADR quando houver decisão arquitetural.

A documentação deve acompanhar o código.

## 17. Primeiro ponto de partida para desenvolvimento

O roadmap e o backlog registrados são orientados por evidência.

A prioridade atual está relacionada a:

1. obter o Excel real;
2. observar o processo real;
3. fechar o schema de entrada;
4. medir o processo;
5. validar importação, normalização e regras reais;
6. entregar o Nível 1;
7. somente depois avançar na investigação definitiva da integração externa.

Consulte [roadmap.md](./roadmap.md) e [backlog.md](./backlog.md).

## 18. Regra deste documento

Este guia é um índice de orientação, não uma nova fonte de requisitos.

Se houver conflito entre este documento e uma especificação mais específica, consulte a documentação correspondente e registre a correção.

**Nenhuma informação deve ser adicionada ao projeto apenas para tornar o onboarding mais completo.**
