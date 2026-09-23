# PCA-Auto — Processo de elaboração do PCA (referência AS-IS)

**Status:** PESQUISA CONCLUÍDA COMO REFERÊNCIA / PRECISA DE VALIDAÇÃO LOCAL  
**Última atualização:** 2026-09-22

> **Importante:** este documento não afirma que a Administração Regional da Candangolândia executa exatamente este fluxo. Ele consolida o processo que pode ser confirmado por normas do Distrito Federal e o complementa com exemplos recentes de procedimentos internos de órgãos públicos. A etapa seguinte é validar o fluxo real da Candangolândia.

## 1. Objetivo

Documentar o processo conhecido de elaboração, consolidação, aprovação, registro e acompanhamento do PCA no contexto do Distrito Federal, para servir como **AS-IS de referência** enquanto o processo específico da unidade piloto não é observado.

O documento é deliberadamente dividido entre:

- **Fluxo normativo do DF** — o que as normas determinam;
- **Fluxo operacional observado em outros órgãos** — exemplos de como uma unidade pode organizar internamente o trabalho;
- **Hipóteses para a Candangolândia** — pontos que ainda precisam ser confirmados.

## 2. Contexto normativo do Distrito Federal

A Lei nº 14.133/2021 prevê que, a partir de documentos de formalização de demandas, os órgãos responsáveis pelo planejamento podem elaborar PCA, na forma de regulamento. O objetivo é racionalizar contratações, alinhar o planejamento e subsidiar as leis orçamentárias. [Lei 14.133/2021, art. 12, VII](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm).

No DF, o Decreto nº 44.330/2023 regulamenta a matéria. O processo começa com a formalização da demanda pelo órgão ou entidade participante e a indicação, em sistema eletrônico, das necessidades de materiais e serviços para o ano seguinte. O Decreto também prevê aprovação pela autoridade competente, consolidação e publicação. [Decreto nº 44.330/2023, arts. 38–49](https://dflegis.df.gov.br/ato.php?ds_titulo=Lei%20n%C2%BA14.133&tipo=busca-exata).

Para o PCA de 2027, a Portaria SEEC nº 421/2026 estabelece o procedimento operacional atualmente aplicável ao e-ComprasDF e substituiu a Portaria nº 821/2025. Ela também informa que suas regras se aplicam, no que couber, aos meses remanescentes do PCA de 2026.

## 3. Fluxo normativo atual do DF

Com base no Decreto nº 44.330/2023 e na Portaria SEEC nº 421/2026, o fluxo pode ser representado assim:

```text
Unidades demandantes
        │
        │ identificam necessidades
        ▼
Formalização / preparação das demandas
        │
        ▼
Responsável pelo preenchimento
        │
        │ registra itens no catálogo e informa dados do PCA
        ▼
e-ComprasDF
        │
        ▼
Gestor do PCA
        │
        ├── consolida
        ├── aprova ou rejeita itens da unidade
        ├── agrupa demandas
        └── define/acompanhha calendário de compras
        │
        ▼
PCA consolidado do órgão
        │
        ▼
Ordenador de Despesas
        │
        ├── aprova
        └── pode reprovar/devolver para ajustes
        │
        ▼
PCA "em execução"
        │
        ├── publicação
        └── execução/acompanhamento das contratações
```

### 3.1 Perfis no e-ComprasDF

A Portaria nº 421/2026 define três perfis:

- **Responsável pelo preenchimento:** servidor autorizado a inserir itens no PCA;
- **Gestor do PCA:** vincula servidores às unidades demandantes, agrupa demandas, consolida e aprova itens, define/acompanhha calendário e encaminha o PCA;
- **Ordenador de Despesas:** autoridade responsável pela aprovação/finalização.

O cadastro de servidores é formalizado por processo SEI específico e as credenciais são emitidas após aprovação. [Portaria nº 421/2026, arts. 4–7](https://www.sinj.df.gov.br/sinj/Norma/2835d0c90f214ce2b758a39a1dc78e70/seec_prt_421_2026.html).

### 3.2 Informações registradas pelo responsável pelo preenchimento

Para o PCA 2027, a Portaria nº 421/2026 determina que os itens sejam registrados conforme o catálogo do e-ComprasDF, especificando:

- quantidade anual esperada;
- estimativa preliminar e simplificada do valor;
- modalidade preliminar prevista;
- data desejada para aquisição/contratação;
- grau de prioridade.

O item deve ser especificado de forma compatível com o que será posteriormente lançado no sistema de compras, evitando descrições generalistas. [Portaria nº 421/2026, arts. 9–11](https://www.sinj.df.gov.br/sinj/Norma/2835d0c90f214ce2b758a39a1dc78e70/seec_prt_421_2026.html).

### 3.3 Catálogo

Quando um item não é encontrado, o responsável pode solicitar catalogação no próprio sistema.

A solicitação pode ser:

- finalizada;
- devolvida para ajustes;
- negada.

Isso cria um fluxo importante que o PCA-Auto ainda precisa considerar caso o produto evolua para preparação/execução integrada. [Portaria nº 421/2026, arts. 10–12](https://www.sinj.df.gov.br/sinj/Norma/2835d0c90f214ce2b758a39a1dc78e70/seec_prt_421_2026.html).

### 3.4 Aprovação

O Gestor do PCA finaliza e envia o PCA ao Ordenador de Despesas. O Ordenador pode reprovar itens ou devolver o PCA para ajustes.

Para o PCA 2027, o prazo definido pela Portaria nº 421/2026 é até 30/12/2026 para aprovação/finalização pelo Ordenador. O sistema fica disponível para preenchimento de 08/06/2026 a 29/12/2026. [Portaria nº 421/2026, arts. 14–16](https://www.sinj.df.gov.br/sinj/Norma/2835d0c90f214ce2b758a39a1dc78e70/seec_prt_421_2026.html).

### 3.5 Publicação e execução

Quando o PCA é finalizado, o e-ComprasDF envia automaticamente as informações ao Portal de Compras do DF e ao PNCP, observados os critérios de envio do PNCP.

A situação "em execução" é relevante: para comprovar que uma demanda foi prevista no PCA, o relatório do PCA deve ser utilizado no processo SEI da contratação; capturas de tela não são aceitas como comprovação. [Portaria nº 421/2026, arts. 20–21](https://www.sinj.df.gov.br/sinj/Norma/2835d0c90f214ce2b758a39a1dc78e70/seec_prt_421_2026.html).

Durante a execução, o órgão acompanha as demandas. O Decreto nº 44.330/2023 prevê revisão/alteração do PCA em hipóteses específicas, incluindo adequações orçamentárias e alterações decorrentes dos estudos técnicos preliminares; demandas não previstas podem exigir inclusão/revisão justificada. [Decreto nº 44.330/2023, arts. 48–52](https://dflegis.df.gov.br/ato.php?ds_titulo=Lei%20n%C2%BA14.133&tipo=busca-exata).

## 4. Fluxo interno de referência observado em órgão do DF

Normas gerais do DF não descrevem todos os passos internos de cada órgão. Portarias específicas mostram que os órgãos podem criar uma camada interna anterior ao lançamento/validação no e-ComprasDF.

Um exemplo recente é a Portaria SEAPE/DF nº 188/2025, para o PCA 2026. Nela:

1. setores demandantes levantam continuamente suas necessidades;
2. cada setor prepara uma Proposta de Plano Anual de Contratações (PPCA);
3. a PPCA contém descrição, unidade de fornecimento, quantidade, justificativa, estimativa preliminar, prioridade, data desejada e interdependências;
4. os setores encaminham suas PPCAs em processo SEI;
5. a área responsável consolida as propostas em uma minuta única;
6. ocorre agregação de demandas de mesma natureza;
7. há análise/adequação à disponibilidade orçamentária;
8. é elaborado o calendário de contratações;
9. a autoridade competente aprova ou devolve para ajustes;
10. somente depois ocorre a etapa final de registro/inserção no e-ComprasDF e finalização do PCA no sistema. [Portaria SEAPE nº 188/2025](https://www.sinj.df.gov.br/sinj/Norma/0d3c373f559543379b070b85f77a6aeb/Portaria_188_26_08_2025.html).

Este exemplo **não deve ser copiado como processo da Candangolândia**. Ele demonstra, porém, que a parte interna do PCA pode envolver muito mais trabalho do que simplesmente digitar itens no e-ComprasDF.

## 5. Padrão comum observado em outros órgãos

A pesquisa também mostra um padrão recorrente fora do DF:

```text
Unidade requisitante
       ↓
Formalização da demanda / DFD
       ↓
Análise técnica / consolidação
       ↓
Agrupamento de demandas semelhantes
       ↓
Priorização + calendário
       ↓
Análise/aprovação da autoridade
       ↓
Registro/publicação no sistema
       ↓
Acompanhamento e revisão
```

O Ministério da Saúde publicou em 26/08/2026 um Manual de PCA voltado especificamente à elaboração e formalização de DFDs para consolidação do PCA. Em diferentes entes, normas recentes também atribuem às unidades requisitantes a elaboração/inserção das demandas e às áreas de contratação/técnicas a consolidação e análise antes da aprovação da autoridade competente. Isso reforça o padrão acima, mas não transforma procedimentos federais ou municipais em regras para o GDF.

## 6. O que isso significa para o PCA-Auto

A pesquisa muda uma premissa importante do projeto.

O processo não deve ser modelado apenas como:

```text
Excel → e-ComprasDF
```

Um modelo mais adequado para investigação é:

```text
Unidades demandantes
        ↓
Coleta das necessidades
        ↓
Preparação / formalização
        ↓
Padronização
        ↓
Consolidação
        ↓
Agrupamento de demandas
        ↓
Priorização
        ↓
Validação
        ↓
Aprovação
        ↓
Registro no e-ComprasDF
        ↓
Publicação
        ↓
Acompanhamento / revisão
```

**Mas este fluxo ainda é uma referência, não o AS-IS da Candangolândia.**

## 7. O que o PCA-Auto pode precisar atacar

A pesquisa permite separar o problema em quatro possíveis camadas:

### Camada A — Entrada

- receber demandas;
- importar planilhas;
- padronizar formatos;
- identificar campos ausentes.

### Camada B — Qualidade e consolidação

- normalizar códigos;
- validar campos;
- detectar duplicidades;
- identificar demandas semelhantes;
- identificar inconsistências;
- consolidar unidades;
- preparar agrupamentos.

### Camada C — Governança

- priorização;
- calendário;
- aprovação;
- justificativas;
- histórico;
- trilha de auditoria;
- pendências.

### Camada D — Execução externa

- resolver identidade técnica no e-ComprasDF;
- inserir/atualizar dados;
- confirmar resultado;
- acompanhar estado.

O MVP não precisa implementar todas as camadas.

## 8. Perguntas que ainda precisamos responder na Candangolândia

### Entrada

- Quem solicita a inclusão de uma demanda?
- As unidades enviam Excel?
- Enviam e-mail?
- Usam SEI?
- Existe formulário interno?
- Existe um modelo de planilha?
- Cada setor possui uma planilha diferente?

### Conteúdo

- Quem informa o código?
- Quem escolhe a descrição?
- Quem informa quantidade?
- Quem calcula a estimativa de valor?
- Quem define prioridade?
- Quem define a data desejada?
- Quem define a modalidade preliminar?
- Existem justificativas formais?

### Consolidação

- Quem recebe as demandas?
- Quem elimina duplicidades?
- Quem agrupa demandas semelhantes?
- Quem corrige erros?
- Quem decide que duas demandas são do mesmo objeto?

### Catálogo

- Os servidores pesquisam o catálogo diretamente?
- Quem trata item inexistente?
- Quem solicita catalogação?
- Quanto tempo isso consome?
- Quantos casos acontecem?

### Aprovação

- Existe uma aprovação interna antes do e-ComprasDF?
- Quem é o Gestor do PCA?
- Quem é o Ordenador de Despesas?
- Há devoluções para ajuste?
- Como os ajustes são comunicados?

### Execução

- Quem efetivamente digita no e-ComprasDF?
- Quantos itens são inseridos?
- Quanto tempo cada item leva?
- Como o servidor sabe que concluiu corretamente?
- Como corrige um item?
- Como trata duplicidade/erro?

### Pós-PCA

- Como acompanham o calendário?
- Como identificam itens que não serão contratados?
- Como adicionam uma necessidade nova?
- Como fazem revisões/reaberturas?
- Como comprovam que uma contratação estava prevista?

## 9. O que devemos medir quando observarmos a Candangolândia

Para cada etapa:

| Métrica | Objetivo |
|---|---|
| Tempo total | Baseline do processo |
| Tempo por etapa | Encontrar gargalos |
| Número de pessoas | Medir esforço organizacional |
| Número de itens | Medir escala |
| Número de planilhas/fontes | Medir fragmentação |
| Correções manuais | Medir retrabalho |
| Pendências | Medir qualidade da entrada |
| Duplicidades | Medir problema de consolidação |
| Itens sem catálogo | Medir problema de integração |
| Devoluções para ajuste | Medir custo da governança |
| Tempo de digitação | Medir ganho potencial da automação |
| Tempo de conferência | Medir custo da validação |
| Intervenções humanas | Identificar decisões que não devem ser automatizadas |

## 10. Hipóteses atualizadas

A pesquisa fortalece algumas hipóteses do PCA-Auto, mas não as prova:

### H1
O trabalho relevante pode estar **antes** do e-ComprasDF, na coleta, normalização e consolidação.

**Status:** precisa ser validada localmente.

### H2
O PCA-Auto pode gerar valor sem automatizar o e-ComprasDF, atuando como camada de preparação e qualidade.

**Status:** hipótese forte para o MVP.

### H3
A maior oportunidade de automação pode ser consolidação/validação, e não apenas preenchimento do sistema.

**Status:** precisa ser validada.

### H4
O processo varia entre órgãos e até entre unidades do mesmo órgão.

**Status:** provável, mas precisa ser observado.

### H5
A etapa de catálogo é um gargalo separado que pode exigir workflow próprio.

**Status:** sustentada pela existência formal de solicitação de catalogação no e-ComprasDF, mas o peso operacional ainda não foi medido.

## 11. Fontes principais

1. [Lei Federal nº 14.133/2021 — Planalto](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm)
2. [Decreto DF nº 44.330/2023 — DFLegis](https://dflegis.df.gov.br/ato.php?ds_titulo=Lei%20n%C2%BA14.133&tipo=busca-exata)
3. [Portaria SEEC nº 421/2026 — SINJ/DF](https://www.sinj.df.gov.br/sinj/Norma/2835d0c90f214ce2b758a39a1dc78e70/seec_prt_421_2026.html)
4. [Portaria SEAPE nº 188/2025 — SINJ/DF](https://www.sinj.df.gov.br/sinj/Norma/0d3c373f559543379b070b85f77a6aeb/Portaria_188_26_08_2025.html)
5. [Manual de PCA — Ministério da Saúde, publicado em 26/08/2026](https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/guias-e-manuais/2026/manual-de-pca.pdf/view)
6. [PCA — CGU](https://www.gov.br/cgu/pt-br/acesso-a-informacao/licitacoes-e-contratos/pca)

## 12. Próximo passo

O próximo passo não é considerar este documento como o processo definitivo da Candangolândia.

É realizar a validação local:

```text
Referência normativa
      +
Processo observado em outros órgãos
      ↓
Hipótese de processo
      ↓
Observação na Candangolândia
      ↓
AS-IS real
      ↓
Requisitos definitivos
```

O Excel real deve ser incorporado nessa etapa como evidência da entrada de dados.
