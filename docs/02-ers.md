# PCA Auto — Especificação de Requisitos de Software (ERS)

**Versão:** 0.9  
**Status:** baseline formal para registro e desenvolvimento; requisitos locais ainda sujeitos à validação  
**Data:** 2026-09-22

## 1. Finalidade

Esta ERS consolida os requisitos funcionais, regras de negócio, requisitos não funcionais, restrições técnicas e critérios de rastreabilidade do PCA Auto.

Quando uma regra ainda depender do processo real da Candangolândia, ela é identificada como **pendente de validação** e não deve ser tratada como fato confirmado.

## 2. Escopo funcional

### RF-001 — Importar arquivo XLSX

O sistema deve permitir a entrada de planilha XLSX compatível com o contrato de entrada vigente.

**Critério:** arquivo aceito deve gerar uma importação identificável; arquivo incompatível deve gerar erro explícito.

**Status:** parcialmente definido; schema definitivo depende do Excel real.

### RF-002 — Identificar estrutura da entrada

O sistema deve reconhecer cabeçalhos e tipos de dados do arquivo de entrada.

**Critério:** erros estruturais devem ser identificados antes da validação de negócio.

### RF-003 — Normalizar dados

O sistema deve converter os valores recebidos para o modelo interno do PCA Auto.

**Critério:** dados equivalentes devem possuir representação interna consistente.

### RF-004 — Preservar dados de origem

O código do catálogo fornecido pela fonte deve ser preservado.

**Regra:** o sistema não pode substituir silenciosamente o código por outro localizado por descrição ou similaridade.

### RF-005 — Validar dados estruturais

O sistema deve verificar formato, tipos, presença de campos reconhecidos e consistência básica.

### RF-006 — Validar regras de negócio

O sistema deve aplicar regras de negócio conhecidas do PCA.

As regras já suportadas como referência do DF incluem quantidade anual, estimativa preliminar de valor, modalidade preliminar, data desejada, prioridade e uso do catálogo do e-ComprasDF.

**Status:** regras locais ainda precisam ser fechadas.

### RF-007 — Classificar resultado da validação

Cada regra aplicada deve produzir resultado explícito, como PASS, WARNING ou BLOCK.

**Status:** taxonomia final pendente de validação.

### RF-008 — Exibir pendências

O usuário deve conseguir consultar as pendências por item, visualizar a razão e identificar o dado de origem.

### RF-009 — Permitir revisão humana

O usuário deve conseguir revisar e, quando permitido, corrigir dados antes da preparação do PCA.

### RF-010 — Registrar alterações relevantes

Alterações em dados de negócio devem registrar valor anterior, valor novo, momento, usuário/processo responsável e justificativa quando aplicável.

### RF-011 — Consolidar demandas

O sistema deve permitir combinar demandas de múltiplas fontes/unidades em uma representação consolidada, preservando sua origem.

### RF-012 — Sinalizar possíveis duplicidades

Quando houver possibilidade de que duas demandas representem uma mesma necessidade, o sistema deve sinalizar a situação.

**Regra:** a resolução de uma ambiguidade não deve ser automática.

### RF-013 — Preparar PCA

O sistema deve gerar um estado interno e uma saída utilizável que indiquem quais itens estão aptos à conclusão do processo.

### RF-014 — Persistir estado

O sistema deve persistir o estado do PCA, dos itens e das execuções para permitir rastreabilidade e retomada.

### RF-015 — Executar em lote

O sistema deve permitir processar múltiplos itens por execução quando a execução externa estiver habilitada.

### RF-016 — Retomar execução

Execuções interrompidas devem poder ser retomadas sem reprocessar automaticamente itens comprovadamente concluídos.

### RF-017 — Isolar integração externa

O domínio e a aplicação não devem depender diretamente de Playwright, DOM ou detalhes HTTP do e-ComprasDF.

A integração deve ocorrer por adapter.

### RF-018 — Resolver identidade técnica

Quando o fluxo externo exigir um identificador interno diferente do código de catálogo, o sistema deve resolver essa identidade sem alterar a origem do código.

### RF-019 — Simular execução

O sistema deve possuir modo de simulação que permita validar o fluxo sem alterar o e-ComprasDF.

### RF-020 — Executar no sistema externo

Quando liberada, a integração deve executar a operação necessária no e-ComprasDF.

**Status:** não habilitado em produção até evidência técnica completa.

### RF-021 — Confirmar operação

O sistema só deve considerar a operação concluída após verificar evidência compatível com o resultado esperado no sistema externo.

HTTP 200, término de requisição ou ausência de exceção, isoladamente, não constituem prova suficiente de conclusão.

### RF-022 — Registrar falhas

Falhas devem ser registradas com etapa, item, contexto e mensagem suficiente para diagnóstico e retomada.

### RF-023 — Manter histórico de execução

Cada lote de execução deve registrar início, fim, status, quantidades e seus itens associados.

### RF-024 — Registrar auditoria de negócio

Eventos relevantes devem ser auditáveis.

Exemplos:

- importação;
- validação;
- correção;
- aprovação interna;
- preparação;
- execução;
- confirmação;
- erro;
- retomada.

### RF-025 — Gerar resultado do Nível 1

O sistema deve entregar uma saída que permita ao servidor concluir manualmente o processo no e-ComprasDF quando a integração automática não estiver habilitada.

**Status:** formato exato ainda precisa ser validado.

### RF-026 — Suportar perfis futuros

O produto deve poder evoluir para papéis e permissões distintos.

**Status:** estrutura futura; não representa RBAC enterprise fechado.

## 3. Regras de negócio

### RN-001 — Sistema oficial

O e-ComprasDF permanece como sistema oficial do processo. O PCA Auto é sistema de apoio e automação.

### RN-002 — Fonte de verdade do código

O código de catálogo informado no arquivo de origem deve ser preservado.

### RN-003 — Ambiguidade

Nenhuma ambiguidade de identidade ou regra crítica deve ser resolvida silenciosamente.

### RN-004 — Conclusão verificável

O estado COMPLETED somente pode ser atribuído quando houver confirmação verificável.

### RN-005 — Simulação

A execução em modo SIMULATION não pode produzir alteração real no e-ComprasDF.

### RN-006 — Separação de identidade

O código de catálogo e um eventual ItemId interno do e-ComprasDF são conceitos distintos.

### RN-007 — Auditabilidade

Mudanças relevantes devem possuir histórico suficiente para reconstruir o processamento.

### RN-008 — Credenciais

Credenciais do e-ComprasDF não devem ser armazenadas diretamente pela aplicação sem mecanismo seguro aprovado.

### RN-009 — Tratamento de catálogo

Quando um item não for localizado no catálogo, o sistema deve sinalizar a pendência. Fluxo automático de solicitação de catalogação depende de validação futura.

### RN-010 — Aprovação externa

No fluxo institucional conhecido do DF, o responsável pelo preenchimento registra, o Gestor do PCA consolida/aprova/rejeita e o Ordenador de Despesas aprova/finaliza.

As permissões internas do PCA Auto ainda precisam ser definidas.

### RN-011 — Estado externo x estado interno

Os estados do PCA Auto não devem ser tratados como cópia literal dos estados do e-ComprasDF. O adapter deve mapear os estados quando necessário.

### RN-012 — Não sobrescrever origem

Uma correção interna não deve apagar a informação original da fonte quando a rastreabilidade exigir sua preservação.

## 4. Requisitos não funcionais

### RNF-001 — Tecnologia

Stack atual:

- Next.js;
- React;
- TypeScript;
- Node.js;
- PostgreSQL;
- Prisma;
- Playwright;
- ExcelJS;
- Zod;
- Vitest.

### RNF-002 — Arquitetura

A solução deve manter separação entre interface, aplicação, domínio e infraestrutura.

### RNF-003 — Persistência

O banco principal deve ser PostgreSQL e a camada de acesso deve usar Prisma no estágio atual.

### RNF-004 — Segurança

Segredos não devem ficar no código-fonte.

Credenciais do e-ComprasDF não devem aparecer em logs, capturas ou artefatos.

### RNF-005 — Rastreabilidade

O sistema deve manter informações suficientes para reconstruir o processamento de um item e de uma execução.

### RNF-006 — Manutenibilidade

Integrações externas, parser de Excel e regras de negócio devem permanecer desacoplados.

### RNF-007 — Testabilidade

Regras de domínio e casos de uso críticos devem possuir testes automatizados.

### RNF-008 — Recuperação

Execuções devem ter estado persistido suficiente para retomada segura.

### RNF-009 — Determinismo

O processamento não deve depender de decisões implícitas ou aproximações silenciosas.

### RNF-010 — Desempenho

Ainda não há metas definitivas de latência, throughput ou volume. Esses parâmetros devem ser definidos depois que o volume real da Candangolândia for conhecido.

### RNF-011 — Disponibilidade

SLA e alta disponibilidade ainda não fazem parte do escopo fechado do MVP.

### RNF-012 — Retenção

Política definitiva de retenção de dados e logs ainda precisa ser definida.

### RNF-013 — Hospedagem

O provedor de hospedagem não está fechado neste documento. A implantação deve suportar, no mínimo, uma aplicação Next.js/Node.js e um PostgreSQL acessível de forma segura.

## 5. Restrições técnicas

- o e-ComprasDF é externo;
- parte do comportamento técnico do portal ainda requer captura autenticada;
- Playwright pode ser utilizado na investigação/automação controlada, mas os detalhes do portal não devem vazar para o domínio;
- o catálogo público e os identificadores internos devem ser tratados com cuidado;
- a execução de produção permanece bloqueada até comprovação.

## 6. Dependências externas

- e-ComprasDF;
- PostgreSQL;
- ambiente de execução Node.js;
- navegador Chromium quando Playwright for utilizado;
- arquivos XLSX de entrada;
- credenciais/sessão autorizada, quando a integração externa estiver habilitada.

## 7. Itens explicitamente pendentes

- Excel real da Candangolândia;
- regras locais completas;
- permissões internas;
- critérios definitivos de consolidação;
- taxonomia final de validação;
- fluxo HTTP completo do lançamento;
- payload real;
- confirmação de operação;
- política de hospedagem;
- segurança mínima de produção;
- retenção;
- métricas operacionais.

## 8. Rastreabilidade

Cada novo requisito deve registrar:

- identificador;
- descrição;
- fonte;
- status;
- regra relacionada;
- caso de uso/história relacionada;
- teste associado quando aplicável.

