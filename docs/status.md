# PCA-Auto — Status da documentação e do projeto

> Documento vivo de governança técnica. Ele registra o que já está definido, o que ainda é hipótese e quais evidências precisam ser obtidas antes de fechar a documentação definitiva.

**Status geral:** em validação de produto e consolidação técnica  
**Última atualização:** 2026-09-22  
**Branch de documentação:** `docs/technical-foundation-2026-09`

## Como usar

Uma decisão ou requisito só deve ser promovido para **DEFINIDO** quando houver evidência suficiente para sustentá-lo:

- evidência do piloto;
- comportamento reproduzível do sistema;
- pesquisa/documentação externa concluída;
- ou decisão arquitetural registrada.

Não preencher lacunas com suposições apenas para deixar a documentação aparentemente completa.

## Legenda

| Status | Significado |
|---|---|
| DEFINIDO | Decisão ou comportamento suficientemente estabelecido para orientar implementação |
| PARCIALMENTE DEFINIDO | Existe uma base clara, mas ainda faltam detalhes |
| HIPÓTESE | Proposta ainda não comprovada |
| PRECISA DE VALIDAÇÃO | Depende de teste/observação no produto ou no órgão piloto |
| PRECISA DE PESQUISA | Depende de investigação externa |
| PRECISA DE DECISÃO | Há alternativas relevantes ainda não escolhidas |

## Mapa atual

| Documento | Status | Próxima evidência / ação |
|---|---|---|
| `product.md` | PARCIALMENTE DEFINIDO | Validar problema, proposta de valor e escopo do Nível 1 |
| `requirements.md` | PARCIALMENTE DEFINIDO | Obter processo e Excel reais |
| `domain.md` | PARCIALMENTE DEFINIDO | Validar entidades e estados com dados reais |
| `architecture.md` | DEFINIDO (base) | Refinar conforme o MVP real evoluir |
| `excel-format.md` | PRECISA DE VALIDAÇÃO | Obter Excel real e fechar schema versionado |
| `validation.md` | HIPÓTESE | Mapear regras reais e medir falsos positivos |
| `review.md` | PARCIALMENTE DEFINIDO | Validar fluxo com usuário operacional |
| `execution-flow.md` | PARCIALMENTE DEFINIDO | Fechar após evidência de integração real |
| `ecompras-integration-status.md` | PRECISA DE PESQUISA + VALIDAÇÃO | Capturar payload, sessão, resposta e confirmação |
| `security.md` | HIPÓTESE / PRECISA DE DECISÃO | Fechar segurança mínima do piloto |
| `domain.md` / estados | PARCIALMENTE DEFINIDO | Confirmar ciclo real do PCA |
| `database.md` | A CRIAR / PARCIALMENTE DEFINIDO | Fechar após domínio e persistência real |
| `api.md` | A CRIAR / HIPÓTESE | Definir apenas quando contratos reais forem necessários |
| `testing.md` | A CRIAR / PARCIALMENTE DEFINIDO | Evoluir da suíte atual para integração/E2E conforme fluxos reais |
| `deployment.md` | A CRIAR / HIPÓTESE | Decidir antes do primeiro ambiente persistente de produção |
| `roadmap.md` | PARCIALMENTE DEFINIDO | Atualizar pelos gates de evidência |
| `backlog.md` | PARCIALMENTE DEFINIDO | Priorizar pelo risco e valor, não por interesse técnico |
| `risks.md` | DEFINIDO (nível conceitual) | Recalibrar probabilidade/impacto com evidências |
| `decisions/` | EM CONSOLIDAÇÃO | Registrar apenas decisões que realmente mudam o rumo |

## Gates de maturidade

1. **Gate 1 — Entrada real:** Excel real importável e processo atual observado.
2. **Gate 2 — Validação:** regras aplicadas corretamente e pendências identificadas.
3. **Gate 3 — Revisão:** usuário consegue revisar e corrigir de forma controlada.
4. **Gate 4 — Resultado:** comparação antes/depois demonstra valor mensurável.
5. **Gate 5 — Generalização:** outro ambiente consegue utilizar o Nível 1.
6. **Gate 6 — Contratação:** existe caminho real para uma primeira venda externa.
7. **Gate 7 — Operação:** suporte, segurança e implantação são economicamente sustentáveis.
8. **Gate 8 — Escala:** existe evidência para multi-órgão e evolução enterprise.

## Próximos bloqueadores

- Obter o Excel real da Candangolândia.
- Observar e medir o processo manual atual.
- Definir o schema real e versionado da entrada.
- Implementar persistência e fluxo real do Nível 1.
- Testar o resultado com usuário real.
- Só depois decidir quanto investir na automação de produção do e-ComprasDF.

## Regra de manutenção

Quando uma hipótese for resolvida, atualizar:

1. este arquivo;
2. o documento técnico afetado;
3. os requisitos/decisões relacionados;
4. o backlog;
5. o ADR, quando a decisão for arquitetural;
6. os testes que comprovam a mudança.
