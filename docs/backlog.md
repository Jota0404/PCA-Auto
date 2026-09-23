# PCA-Auto — Backlog estratégico e técnico

**Status:** PARCIALMENTE DEFINIDO  
**Última atualização:** 2026-09-23

## P0 — Bloqueia a validação

### P0-01 — Obter Excel real
**Objetivo:** trabalhar com dados reais da Candangolândia.  
**Dependência:** acesso ao arquivo real.

### P0-02 — Medir processo manual
**Objetivo:** criar baseline de tempo, esforço, erros e retrabalho.

### P0-03 — Fechar schema de entrada
**Objetivo:** transformar o Excel real em contrato versionado.

### P0-04 — Validar parser e normalização com dados reais
**Objetivo:** confrontar a implementação atual de importação/normalização com o Excel real, identificando lacunas e variações.

### P0-05 — Validar regras iniciais e fechar regras reais
**Objetivo:** confrontar as regras já implementadas com casos reais e adicionar somente regras sustentadas por evidência.

### P0-06 — Validar saída "PCA pronto"
**Objetivo:** entregar valor do Nível 1 sem depender da execução automática no e-ComprasDF.

## P1 — Necessário para o piloto ter evidência

### P1-01 — Revisão de pendências
### P1-02 — Validar persistência real no fluxo completo
### P1-03 — Medição formal antes/depois
### P1-04 — Auditoria mínima
### P1-05 — Investigação definitiva do e-ComprasDF
### P1-06 — Teste de aceitação com usuário real

## P2 — Primeiro ambiente externo

### P2-01 — Autenticação mínima
### P2-02 — Onboarding de outro usuário sem apoio do desenvolvedor
### P2-03 — Material de demonstração
### P2-04 — Documentação de implantação
### P2-05 — Definição de requisitos de segurança para pré-venda
### P2-06 — Estudo de contratação e modelo comercial

## P3 — Escala

Somente com evidência de demanda:

- multi-tenant;
- RBAC completo;
- integrações múltiplas;
- observabilidade avançada;
- SLA;
- suporte estruturado;
- enterprise.

## Fora do backlog imediato

- IA generativa sem caso de uso;
- mobile;
- marketplace;
- ERP;
- módulo financeiro completo;
- múltiplas entradas além de Excel;
- dezenas de integrações.

## Regra de priorização

Priorizar nesta ordem:

1. reduzir incerteza;
2. provar valor;
3. reduzir risco;
4. aumentar confiabilidade;
5. só depois escalar funcionalidade.
