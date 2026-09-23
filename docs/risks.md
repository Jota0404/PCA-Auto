# PCA-Auto — Riscos

**Status:** DEFINIDO em nível conceitual  
**Última atualização:** 2026-09-22

## Matriz inicial

| Risco | Probabilidade atual | Impacto | Mitigação |
|---|---:|---:|---|
| Dor do processo é pequena | Média/Alta | Alto | Medir processo real antes de expandir produto |
| PCA-Auto não reduz esforço | Desconhecida | Alto | Comparar antes/depois com métricas |
| Integração do e-ComprasDF é instável | Alta | Alto | Adapter isolado, simulação, modo degradado |
| Integração não pode ser automatizada de forma aceitável | Desconhecida | Alto | Validar termos, sessão, proteções e request real |
| Concorrência já madura | Alta | Alto | Diferenciar por problema concreto e nicho validado |
| Produto vira consultoria por órgão | Média | Alto | Medir esforço de onboarding/customização |
| Dependência do fundador | Alta | Alto | Documentação, testes e automação de deploy/operação |
| Falta de caminho de contratação | Alta | Alto | Pesquisa e conversas com compradores/áreas responsáveis |
| Complexidade cresce antes da validação | Média | Alto | Gates e backlog orientados por evidência |
| Segurança insuficiente para cliente público | Média | Alto | Definir baseline antes de pré-venda |
| Dados de entrada variam demais | Alta | Alto | Schema versionado + normalização + mapeamento controlado |

## Riscos técnicos

### e-ComprasDF

A integração via UI pode quebrar com:

- mudança de DOM;
- mudança de rota;
- mudança de sessão;
- proteção anti-automação;
- manutenção;
- comportamento inesperado.

O adapter deve limitar o impacto ao módulo de integração.

### Dados

Cada novo órgão pode ter uma planilha diferente. O produto deve evitar criar um fluxo exclusivo para cada cliente sem justificativa.

## Riscos de produto

O maior risco atual é descobrir que o problema é pequeno demais ou que o usuário não percebe ganho suficiente.

## Riscos comerciais

O piloto interno não equivale a venda.

A primeira evidência comercial relevante é um ambiente externo disposto a utilizar e, depois, contratar.

## Riscos de escala

Multi-tenant e RBAC não devem ser tratados como problemas atuais. Só se tornam prioridade quando houver evidência de múltiplos ambientes e necessidade de separação operacional.

## Indicadores de alerta

- usuário não consegue explicar o ganho obtido;
- processo manual consome pouco tempo;
- muitas validações são rejeitadas pelo usuário;
- cada órgão exige código específico;
- integração precisa de manutenção manual constante;
- suporte por cliente cresce proporcionalmente ao volume de clientes;
- compradores demonstram interesse técnico mas não conseguem ou não querem contratar.

## Revisão

Revisar este arquivo nos Gates 1, 4, 5 e 7.
