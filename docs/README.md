# PCA-Auto — Documentação

Esta pasta contém a documentação técnica e de produto do PCA-Auto.

## Pacote principal para registro do produto

Os oito documentos abaixo formam a documentação central de registro do produto nesta versão:

1. [Documento de Visão e Escopo](./01-visao-e-escopo.md)
2. [Especificação de Requisitos de Software — ERS](./02-ers.md)
3. [Documento de Arquitetura de Software — DAS](./03-das.md)
4. [Diagrama de Entidade-Relacionamento — DER](./04-der.md)
5. [Dicionário de Dados](./05-dicionario-de-dados.md)
6. [Roteiro de Histórias de Usuário](./06-user-stories.md)
7. [Plano de Testes e Critérios de Aceitação](./07-plano-de-testes.md)
8. [README.md](../README.md)

**Versão do pacote:** 0.9  
**Data:** 2026-09-22

> O pacote é completo como baseline documental, mas não pretende ocultar lacunas que ainda dependem do processo real da Candangolândia, do Excel real e da comprovação da integração autenticada com o e-ComprasDF.

## Entrada recomendada para desenvolvedores

Comece por [09 — Onboarding de Desenvolvedor](./09-onboarding-desenvolvedor.md). Ele apresenta o objetivo do produto, o fluxo, a arquitetura, o modelo de dados, as fronteiras da integração e a ordem recomendada de leitura dos demais documentos.

## Controle de lacunas

- [Lacunas e Evidências](./08-lacunas-evidencias.md) — registro central das pendências, impacto, evidência necessária e ordem recomendada de fechamento.

## Documento de controle

- [Status da documentação](./status.md)

## Produto e requisitos de apoio

- [Product](./product.md)
- [Requirements — apoio/legado](./requirements.md)
- [Domain](./domain.md)
- [Validation](./validation.md)
- [Human Review](./review.md)
- [Excel Format](./excel-format.md)
- [Current Process](./current-process.md)

## Arquitetura e integração

- [Architecture — apoio detalhado](./architecture.md)
- [e-ComprasDF — Status](./ecompras-integration-status.md)
- [e-ComprasDF — Investigation](./ecompras-investigation.md)
- [e-ComprasDF — Network Capture Runbook](./network-capture-runbook.md)
- [Execution Flow](./execution-flow.md)

## Operação e evolução

- [Security](./security.md)
- [Roadmap](./roadmap.md)
- [Backlog](./backlog.md)
- [Risks](./risks.md)
- [Database](./database.md)
- [API](./api.md)
- [Testing](./testing.md)
- [Deployment](./deployment.md)
- [Audit](./audit.md)

## Decisões

Os principais ADRs estão em [decisions/](./decisions/).

## Regra documental

A documentação acompanha o projeto.

Uma seção só deve ser tratada como definitiva quando houver evidência suficiente. Hipóteses e lacunas permanecem explicitamente marcadas até serem resolvidas por observação do piloto, teste reproduzível, pesquisa/documentação externa ou decisão arquitetural registrada.
