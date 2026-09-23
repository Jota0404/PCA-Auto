# PCA-Auto — Roadmap

**Status:** PARCIALMENTE DEFINIDO  
**Última atualização:** 2026-09-22

## Princípio

O roadmap é orientado por evidência.

Uma fase não deve avançar apenas porque a fase anterior foi codificada.

## Fase 0 — Fundação

**Estado:** em grande parte concluída.

- arquitetura inicial;
- banco e Prisma;
- frontend inicial;
- testes;
- documentação base;
- adapters;
- estados preliminares.

## Fase 1 — Entrada real e baseline

**Prioridade atual.**

- obter Excel real da Candangolândia;
- observar processo atual;
- medir tempo e esforço;
- mapear fluxo real;
- fechar schema de entrada;
- registrar variações de dados.

**Gate:** existe uma entrada real reproduzível e um baseline mensurável.

## Fase 2 — Importação, normalização e validação

- parser real;
- normalização;
- validação estrutural;
- validação semântica;
- pendências;
- mensagens explicativas;
- persistência real.

**Gate:** o sistema processa um caso real e identifica corretamente as principais pendências.

## Fase 3 — Revisão humana e saída

- interface de pendências;
- correções controladas;
- aprovação;
- histórico;
- relatório/saída para conclusão manual do PCA.

**Gate:** usuário consegue concluir o fluxo do Nível 1 sem depender do desenvolvedor.

## Fase 4 — Evidência de valor

- medir processo tradicional;
- executar o mesmo fluxo com PCA-Auto;
- comparar tempo;
- comparar erros/retrabalho;
- medir aceitação das validações.

**Gate:** existe evidência de melhoria suficiente para justificar o próximo investimento.

## Fase 5 — Investigação definitiva do e-ComprasDF

Somente após o Nível 1 demonstrar valor.

- capturar request real;
- mapear sessão;
- confirmar payload;
- confirmar resposta;
- confirmar redirects;
- confirmar critério de sucesso;
- verificar termos/limitações relevantes;
- validar estabilidade.

**Gate:** integração reproduzível em ambiente controlado.

## Fase 6 — Execução controlada

- simulação;
- poucos itens;
- acompanhamento manual;
- confirmação verificável;
- retomada;
- tratamento de falhas.

**Gate:** execução segura e repetível.

## Fase 7 — Auditoria e segurança mínima

- auditoria de negócio;
- autenticação;
- secrets;
- logs;
- tratamento de incidentes;
- backup adequado ao ambiente.

## Fase 8 — Segundo ambiente

- testar outro órgão/estrutura;
- comparar diferenças;
- validar generalização;
- medir esforço de onboarding.

**Gate:** Nível 1 funciona sem customização excessiva.

## Fase 9 — Escala

Somente com demanda:

- RBAC completo;
- multi-tenant;
- observabilidade ampliada;
- suporte;
- SLA;
- múltiplas integrações;
- enterprise.

## Fora do horizonte imediato

- IA generativa sem caso de uso validado;
- mobile;
- marketplace;
- ERP;
- módulo financeiro completo;
- dezenas de integrações;
- white-label;
- on-premise.

## Estratégia temporal

### 2026
Provar.

### 2027
Generalizar e testar contratação.

### 2028
Avaliar escala comercial.

Essas datas permanecem como orientação estratégica, não como compromissos técnicos irrevogáveis.
