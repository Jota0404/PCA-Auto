# PCA Auto — Documento de Visão e Escopo

**Versão:** 0.9  
**Status:** baseline para registro técnico, ainda em validação de processo  
**Data:** 2026-09-22  
**Produto:** PCA Auto  
**Repositório:** Jota0404/PCA-Auto  
**Contexto inicial:** Administração Regional da Candangolândia — DF

> Este documento consolida a visão e o escopo atuais do produto. Pontos dependentes do processo real da Candangolândia, do Excel real e da integração autenticada com o e-ComprasDF permanecem explicitamente marcados como validação pendente.

## 1. Objetivo

O PCA Auto é um software destinado a apoiar a preparação, validação, consolidação, revisão e, em evolução controlada, execução do Plano de Contratações Anual (PCA) no contexto do e-ComprasDF.

O produto nasceu como uma ferramenta interna para reduzir trabalho repetitivo e aumentar a rastreabilidade do processo. A evolução prevista é transformar o núcleo em uma plataforma de planejamento e preparação do PCA, mantendo a automação externa como uma capacidade isolável.

## 2. Problema

O problema operacional a ser validado no ambiente real é a existência de esforço manual relevante na coleta, padronização, consolidação, validação e lançamento das necessidades do PCA.

Hipóteses atuais do problema:

- dados podem chegar de diferentes setores e formatos;
- planilhas e documentos intermediários podem exigir tratamento manual;
- demandas semelhantes podem exigir consolidação;
- erros ou informações incompletas podem gerar devoluções e retrabalho;
- a conferência de itens no catálogo pode consumir esforço;
- operações automatizadas precisam de confirmação verificável;
- a ausência de rastreabilidade pode dificultar auditoria e diagnóstico.

A magnitude dessas dores ainda deve ser medida no piloto.

## 3. Público-alvo

### Usuário operacional

Servidor responsável por levantar, conferir, preparar ou registrar as demandas do PCA.

### Gestor do PCA

Responsável por consolidar, revisar, agrupar e encaminhar as demandas conforme as regras aplicáveis ao processo.

### Ordenador de Despesas

Autoridade responsável pela aprovação/finalização no fluxo institucional do e-ComprasDF.

### Administrador técnico

Usuário responsável por configuração, manutenção, diagnóstico e suporte do PCA Auto.

> Os papéis acima refletem o fluxo institucional conhecido do e-ComprasDF. As permissões definitivas dentro do PCA Auto ainda precisam ser definidas.

## 4. Visão do produto

Fluxo do produto inicial:

```
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
[ evolução ]
Execução controlada no e-ComprasDF
```

O primeiro nível do produto deve entregar valor mesmo sem depender da escrita automática no sistema governamental.

## 5. Escopo positivo

### Incluído no produto atual

- importação de planilha XLSX;
- preservação dos códigos de catálogo fornecidos pela origem;
- normalização dos dados;
- validação estrutural e semântica;
- identificação explícita de pendências;
- revisão humana;
- consolidação de demandas;
- preparação de um resultado utilizável para conclusão do PCA;
- persistência dos estados de processamento;
- histórico e auditoria das ações relevantes;
- execução em lote com possibilidade de retomada;
- isolamento da integração com o e-ComprasDF por adapter;
- modo de simulação antes da produção;
- resolução técnica de item quando necessária à integração.

### Evolução prevista

- execução integrada com o e-ComprasDF;
- confirmação verificável das operações externas;
- gestão de usuários e permissões;
- multi-órgão;
- auditoria ampliada;
- observabilidade;
- relatórios;
- novas fontes de entrada e integrações.

A evolução só deve ocorrer mediante evidência de necessidade e valor.

## 6. Escopo negativo

Não fazem parte do escopo imediato:

- substituir o e-ComprasDF como sistema oficial;
- substituir o SEI;
- funcionar como ERP;
- módulo financeiro completo;
- marketplace;
- gestão completa de contratos;
- aplicativo mobile;
- IA generativa sem caso de uso comprovado;
- dezenas de integrações sem demanda validada;
- arquitetura enterprise completa antes da validação do produto;
- armazenamento de senha do e-ComprasDF pela aplicação;
- tomada autônoma de decisões ambíguas.

## 7. Princípios do produto

1. O sistema deve reduzir esforço sem retirar do usuário decisões que exigem julgamento.
2. Ambiguidade deve gerar revisão ou bloqueio, nunca escolha silenciosa.
3. O código de origem deve ser preservado.
4. O sistema oficial continua sendo a referência institucional.
5. Resultado concluído deve ser verificável.
6. A integração externa deve permanecer isolada.
7. Cada nova capacidade deve justificar a complexidade adicionada.

## 8. Critérios de sucesso do produto

Para o Nível 1, o produto deverá demonstrar:

- processamento de um arquivo real;
- validação correta das principais regras;
- identificação compreensível das pendências;
- revisão sem intervenção do desenvolvedor;
- geração de resultado utilizável para o PCA;
- rastreabilidade das alterações relevantes.

Para a evolução integrada, deverão existir adicionalmente:

- execução reproduzível;
- confirmação verificável;
- retomada segura;
- tratamento explícito de falhas;
- evidência de ganho operacional.

## 9. Restrições e premissas

- o Excel é a fonte inicial dos códigos de catálogo;
- o schema definitivo do Excel depende do arquivo real;
- PostgreSQL é o banco atual;
- o e-ComprasDF é um sistema externo e seu comportamento técnico deve ser comprovado antes da automação em produção;
- o provedor definitivo de hospedagem ainda não foi decidido;
- requisitos enterprise ainda não estão fechados.

## 10. Referências normativas

A visão do produto considera, entre outras referências já pesquisadas:

- Decreto DF nº 44.330/2023;
- Portaria SEEC nº 421/2026;
- manuais oficiais do e-ComprasDF;
- procedimentos publicados por órgãos do DF e outros entes usados como referência comparativa.

As referências e evidências detalhadas permanecem em `docs/current-process.md`.

## 11. Estado documental

Este documento é a referência de visão e escopo do produto. O escopo pode evoluir, mas alterações devem ser refletidas nos requisitos, backlog, arquitetura e plano de testes.
