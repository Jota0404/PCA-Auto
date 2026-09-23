# PCA Auto — Roteiro de Histórias de Usuário

**Versão:** 0.9  
**Status:** backlog funcional inicial; priorização sujeita à validação do piloto  
**Data:** 2026-09-22

## 1. Objetivo

Transformar os requisitos do PCA Auto em histórias pequenas e rastreáveis para alimentar o backlog de desenvolvimento.

## 2. Épico EP-01 — Entrada

### US-001 — Importar Excel

**Como** servidor responsável pelo PCA  
**Quero** importar uma planilha XLSX  
**Para** iniciar o processamento das demandas.

**Aceitação:** arquivo compatível é importado e recebe identificação; arquivo incompatível apresenta erro compreensível.

### US-002 — Visualizar resultado da importação

**Como** servidor  
**Quero** saber quantos itens foram importados e quais falharam  
**Para** revisar a entrada.

### US-003 — Preservar código de origem

**Como** servidor  
**Quero** que o código do Excel seja mantido  
**Para** garantir rastreabilidade da origem.

## 3. Épico EP-02 — Normalização e validação

### US-004 — Normalizar valores

**Como** sistema  
**Quero** converter tipos e formatos de entrada  
**Para** trabalhar com dados consistentes.

### US-005 — Validar estrutura

**Como** servidor  
**Quero** ser informado sobre colunas e tipos inválidos  
**Para** corrigir o arquivo antes do processamento.

### US-006 — Validar campos do PCA

**Como** servidor  
**Quero** saber quando quantidade, valor, data, prioridade, modalidade ou item estiverem inconsistentes  
**Para** corrigir a demanda.

### US-007 — Visualizar pendências

**Como** servidor  
**Quero** uma lista de pendências por item  
**Para** resolver problemas de forma organizada.

### US-008 — Bloquear ambiguidade

**Como** sistema  
**Quero** bloquear decisões ambíguas  
**Para** evitar lançamentos incorretos.

## 4. Épico EP-03 — Consolidação

### US-009 — Reunir demandas de fontes diferentes

**Como** gestor  
**Quero** consolidar demandas recebidas de diferentes unidades  
**Para** preparar um PCA único.

### US-010 — Identificar possível duplicidade

**Como** gestor  
**Quero** visualizar possíveis duplicidades  
**Para** decidir manualmente se as demandas podem ser consolidadas.

### US-011 — Preservar origem na consolidação

**Como** gestor  
**Quero** saber quais demandas originaram uma consolidação  
**Para** manter rastreabilidade.

### US-012 — Revisar demanda consolidada

**Como** gestor  
**Quero** revisar o resultado da consolidação  
**Para** aprová-lo antes da preparação final.

## 5. Épico EP-04 — Revisão e preparação

### US-013 — Corrigir item

**Como** servidor  
**Quero** corrigir um dado permitido  
**Para** eliminar uma pendência.

### US-014 — Revalidar item corrigido

**Como** servidor  
**Quero** executar novamente as validações  
**Para** verificar se a correção resolveu a pendência.

### US-015 — Visualizar PCA pronto

**Como** responsável  
**Quero** identificar os itens prontos  
**Para** concluir o processo no sistema oficial.

### US-016 — Gerar saída do Nível 1

**Como** servidor  
**Quero** obter uma saída organizada do PCA  
**Para** utilizá-la na conclusão manual enquanto a integração automática não estiver habilitada.

## 6. Épico EP-05 — Execução controlada

### US-017 — Criar execução

**Como** operador  
**Quero** criar um lote de execução  
**Para** processar itens de maneira rastreável.

### US-018 — Executar em simulação

**Como** operador  
**Quero** simular a execução  
**Para** testar o fluxo sem modificar o e-ComprasDF.

### US-019 — Resolver identidade técnica

**Como** sistema  
**Quero** localizar o identificador técnico necessário  
**Para** enviar o item corretamente.

### US-020 — Executar operação externa

**Como** operador autorizado  
**Quero** enviar a operação ao e-ComprasDF  
**Para** concluir a etapa automatizada.

**Status:** dependente de comprovação técnica.

### US-021 — Confirmar conclusão

**Como** operador  
**Quero** que o sistema verifique o estado após o envio  
**Para** evitar que uma tentativa seja tratada como sucesso.

### US-022 — Retomar execução

**Como** operador  
**Quero** retomar uma execução interrompida  
**Para** concluir os itens restantes sem repetir os que já foram confirmados.

## 7. Épico EP-06 — Auditoria

### US-023 — Consultar histórico

**Como** operador  
**Quero** visualizar o histórico de processamento  
**Para** entender o que aconteceu com um item.

### US-024 — Identificar alterações

**Como** gestor  
**Quero** saber o valor anterior e o novo valor de uma alteração relevante  
**Para** manter rastreabilidade.

### US-025 — Diagnosticar erro

**Como** operador  
**Quero** saber em qual etapa ocorreu um erro  
**Para** corrigi-lo ou retomá-lo.

## 8. Épico EP-07 — Administração futura

### US-026 — Acessar por perfil

**Como** usuário  
**Quero** ter acesso compatível com minha função  
**Para** evitar ações indevidas.

**Status:** futuro; permissões ainda não fechadas.

### US-027 — Gerenciar configuração

**Como** administrador  
**Quero** controlar configurações sem editar código  
**Para** operar o sistema com segurança.

**Status:** futuro; escopo ainda não fechado.

## 9. Priorização inicial

### P0 — provar valor

US-001 a US-016.

### P1 — execução controlada

US-017 a US-022.

### P1/P2 — auditoria ampliada

US-023 a US-025.

### Futuro

US-026 e US-027.

## 10. Rastreabilidade

| User Story | Requisito principal |
|---|---|
| US-001 | RF-001 |
| US-003 | RF-004 |
| US-004 | RF-003 |
| US-005 | RF-005 |
| US-006 | RF-006 |
| US-007 | RF-008 |
| US-008 | RF-012 |
| US-009 | RF-011 |
| US-010 | RF-012 |
| US-013 | RF-009 |
| US-014 | RF-006 |
| US-015 | RF-013 |
| US-016 | RF-025 |
| US-017 | RF-015 |
| US-018 | RF-019 |
| US-019 | RF-018 |
| US-020 | RF-020 |
| US-021 | RF-021 |
| US-022 | RF-016 |
| US-023 | RF-023/RF-024 |
| US-024 | RF-010/RF-024 |
| US-025 | RF-022 |
| US-026 | RF-026 |
