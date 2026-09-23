# PCA Auto — Plano de Testes e Critérios de Aceitação

**Versão:** 0.9  
**Status:** plano base; casos específicos do Excel e e-ComprasDF dependem de evidência real  
**Data:** 2026-09-22

## 1. Objetivo

Definir como validar as funcionalidades do PCA Auto e os critérios mínimos para considerar cada etapa aceitável.

## 2. Estratégia

A pirâmide de testes adotada é:

```
Unitários
   ↓
Integração
   ↓
E2E
   ↓
Contract tests da integração externa
   ↓
Teste de aceitação com usuário real
```

Nenhuma camada substitui a validação da camada anterior.

## 3. Tipos de teste

### 3.1 Unitários

Aplicar a:

- normalização;
- validação;
- regras de domínio;
- transições de estado;
- tratamento de ambiguidades;
- cálculo de resultados;
- proteção contra substituição de códigos.

### 3.2 Integração

Aplicar a:

- PostgreSQL;
- Prisma;
- importação de XLSX;
- casos de uso;
- persistência de estados;
- execução e retomada.

### 3.3 E2E

Aplicar aos fluxos:

- importar;
- revisar;
- corrigir;
- revalidar;
- preparar PCA;
- acompanhar execução.

### 3.4 Contract tests

Quando a integração externa estiver comprovada:

- request;
- payload;
- resposta;
- redirects;
- sessão;
- confirmação de sucesso;
- comportamento de erro.

Os testes devem usar fixtures/observações controladas e não depender de comportamento inventado do portal.

### 3.5 Aceitação

Executar com usuário operacional e dados reais, preferencialmente anonimizados quando necessário.

## 4. Critérios gerais de aceite

Uma funcionalidade pode ser considerada concluída quando:

1. atende aos requisitos correspondentes;
2. possui teste automatizado adequado ao risco;
3. não quebra os testes existentes;
4. possui documentação atualizada quando houver mudança de contrato;
5. apresenta comportamento observável e reproduzível;
6. não toma decisões críticas de forma silenciosa.

## 5. Casos de teste principais

### CT-001 — Importação válida

**Entrada:** XLSX compatível.

**Esperado:** importação concluída; itens identificados; código de origem preservado.

### CT-002 — Arquivo incompatível

**Entrada:** arquivo sem estrutura esperada.

**Esperado:** importação rejeitada com diagnóstico; nenhum item inválido tratado como válido.

### CT-003 — Tipo inválido

**Entrada:** quantidade/valor/data em formato não reconhecido.

**Esperado:** erro explícito no item/campo correspondente.

### CT-004 — Código preservado

**Entrada:** código conhecido na origem.

**Esperado:** mesmo código persistido no modelo interno; nenhum substituto silencioso.

### CT-005 — Pendência de validação

**Entrada:** item com campo inválido ou ausente.

**Esperado:** pendência identificada com regra e mensagem.

### CT-006 — Correção e revalidação

**Entrada:** item com pendência corrigida.

**Esperado:** nova validação atualiza o resultado sem apagar o histórico relevante.

### CT-007 — Possível duplicidade

**Entrada:** duas demandas potencialmente equivalentes.

**Esperado:** sistema sinaliza revisão; não consolida silenciosamente.

### CT-008 — Consolidação

**Entrada:** múltiplas demandas relacionadas.

**Esperado:** resultado mantém origem das demandas e fica disponível para revisão.

### CT-009 — Simulação

**Entrada:** lote em SIMULATION.

**Esperado:** nenhum efeito real no e-ComprasDF.

### CT-010 — Execução externa confirmada

**Entrada:** item apto em modo de produção controlado.

**Esperado:** operação enviada e estado externo verificado; somente então marcar COMPLETED.

### CT-011 — HTTP 200 sem confirmação

**Entrada:** resposta positiva sem evidência do estado final.

**Esperado:** item não é marcado COMPLETED automaticamente.

### CT-012 — Falha durante execução

**Entrada:** erro de rede/portal.

**Esperado:** erro persistido com etapa; item não é falsamente concluído.

### CT-013 — Retomada

**Entrada:** execução interrompida após alguns itens concluídos.

**Esperado:** retomada processa somente o que não possui conclusão confirmada.

### CT-014 — Histórico

**Entrada:** item com correção e execução.

**Esperado:** histórico permite identificar ações, etapas, horários e resultados.

## 6. Critérios de aceite por épico

### EP-01 — Entrada

Aceito quando um Excel real compatível puder ser importado de forma reproduzível e os erros de estrutura forem apresentados.

### EP-02 — Validação

Aceito quando as principais regras confirmadas detectarem corretamente os casos positivos e negativos.

### EP-03 — Consolidação

Aceito quando múltiplas demandas puderem ser organizadas preservando origem e sem decisões ambíguas automáticas.

### EP-04 — Revisão

Aceito quando um usuário operacional puder resolver pendências sem intervenção do desenvolvedor.

### EP-05 — Execução

Aceito somente quando houver evidência técnica completa do e-ComprasDF e a conclusão puder ser confirmada.

### EP-06 — Auditoria

Aceito quando uma execução puder ser reconstruída a partir dos registros persistidos.

## 7. Critérios de qualidade

Antes de considerar uma versão candidata a piloto:

- typecheck passa;
- testes automatizados passam;
- build passa;
- migrações/testes de banco passam quando aplicável;
- nenhum segredo está versionado;
- documentação dos contratos alterados está atualizada;
- fluxos críticos possuem testes de regressão.

## 8. Evidências de teste

Para cada teste crítico, registrar:

- data;
- versão/commit;
- ambiente;
- entrada/fixture;
- resultado esperado;
- resultado observado;
- evidência;
- defeito, se houver;
- conclusão.

## 9. Baseline conhecido

O projeto registrou anteriormente um estado em que:

- typecheck passou;
- 11 suítes e 30 testes passaram;
- Prisma Client foi gerado com sucesso.

Esse registro é histórico. Após mudanças documentais ou de código, a suíte deve ser executada novamente antes de afirmar conformidade atual.

