# PCA Auto — Arquitetura de Implementação

## Objetivo

Este documento registra as decisões estruturais do MVP para facilitar manutenção, revisão técnica e evolução futura.

## Camadas

```text
app/                         UI e endpoints Next.js
  ↓
src/application/             Casos de uso e orquestração
  ↓
src/domain/                  Tipos e regras centrais
  ↓
src/infrastructure/         PostgreSQL, Excel e e-ComprasDF
```

A camada de aplicação não deve acessar diretamente DOM, Playwright ou detalhes HTTP do portal.

## Limite do e-ComprasDF

`EComprasAdapter` é a fronteira da aplicação com o sistema oficial. O contrato expõe apenas operações que já fazem sentido para o fluxo documentado.

A implementação real de HTTP/Playwright ainda deve ser feita somente após confirmação do request, sessão, resposta e mecanismo de confirmação do portal.

## Estados

Os estados são persistidos porque uma execução pode ser interrompida.

```text
PENDING → VALIDATED → IN_PROGRESS → COMPLETED
                         │
                         └────────→ ERROR
```

Um item `COMPLETED` não deve ser reprocessado automaticamente por uma nova execução.

## Logs

Cada etapa relevante deve ser registrada. O objetivo não é produzir logs genéricos de infraestrutura, e sim manter uma trilha de auditoria do processamento de cada item.

## Simulação

`SIMULATION` é o modo padrão da integração inicial. Ele permite testar resolução, preparação e fluxo de execução sem alterar o e-ComprasDF.

`PRODUCTION` permanece bloqueado até que o comportamento real do portal seja comprovado.

## Regra de segurança principal

Quando houver ambiguidade, resposta inesperada ou inconsistência entre dados locais e portal, o sistema deve falhar de forma explícita e registrar a etapa do erro.

Não existe fallback automático para escolher um resultado ambíguo.
