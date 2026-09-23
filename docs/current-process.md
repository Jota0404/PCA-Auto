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


## 13. Evidências adicionais: outros órgãos do DF e outros entes

A pesquisa ampliada permite detalhar melhor como o trabalho acontece **antes, durante e depois** do registro do PCA.

### 13.1 Outros órgãos do DF: o fluxo é distribuído

A Portaria nº 267/2025 da Secretaria de Estado de Justiça e Cidadania do DF mostra uma estrutura em camadas:

- cada subsecretaria elabora e registra suas próprias demandas;
- cada demandante indica um servidor titular e um substituto para cadastrar e gerenciar as demandas;
- a área técnica de aquisições atua como Gestora do PCA;
- a Unidade de Administração consolida as demandas das subsecretarias em um Documento Consolidador de Demanda;
- a análise da demanda inclui pertinência, conveniência, necessidade e consolidação de demandas comuns.

Isso indica que, em uma organização maior, a informação pode passar por **múltiplas mãos antes de chegar ao registro final do PCA**.

Fonte: [Portaria nº 267/2025 — SINJ/DF](https://www.sinj.df.gov.br/sinj/Norma/e065c4cd1e0a4c21a4a8ce3b6ff6ec47/Portaria_267_24_03_2025.html).

### 13.2 SEDET/DF: vários gestores e responsáveis pelo preenchimento

A Portaria SEDET nº 77/2025 designou gestores do PCA por subsecretaria e informou que os indicados dessas unidades seriam os responsáveis pelo preenchimento. Também determinou o levantamento e registro das necessidades e recomendou analisar o agrupamento de demandas em **Grupos de Acompanhamento de Demandas (GADs)**.

A evidência é relevante porque mostra que o modelo operacional não precisa ser "uma pessoa fazendo tudo": pode existir uma estrutura distribuída de responsáveis pelo levantamento, inserção e consolidação.

Fonte: [Portaria SEDET nº 77/2025 — SINJ/DF](https://www.sinj.df.gov.br/sinj/TextoArquivoDiario.aspx?id_file=797edd0d-e9f3-32a2-9895-61b46062ae63).

### 13.3 Administrações Regionais do DF: o sistema admite múltiplos operadores

A regulamentação operacional de 2026 do e-ComprasDF permite que cada órgão/entidade cadastre mais de um servidor com perfil de Gestor do PCA e múltiplos servidores com perfil de preenchimento, conforme a conveniência e a complexidade da estrutura. Isso é especialmente relevante para estruturas descentralizadas, como Administrações Regionais.

Em publicação do DODF de junho de 2026, a própria Administração Regional de Samambaia aparece no contexto do cadastramento dos usuários do PCA, incluindo o processo SEI específico necessário para os perfis do sistema.

Fonte: [Portaria SEEC nº 421/2026 — SINJ/DF](https://www.sinj.df.gov.br/sinj/Norma/2835d0c90f214ce2b758a39a1dc78e70/seec_prt_421_2026.html) e [DODF nº 107/2026](https://www.sinj.df.gov.br/sinj/Diario/24f91937-0c3d-36a0-af00-4a18bff5ef82/visualizar-pdf%2012.pdf).

### 13.4 Candangolândia: há evidência pública de uso efetivo do PCA

Não foi encontrada, na web aberta, uma portaria específica da Administração Regional da Candangolândia descrevendo **passo a passo do processo interno de elaboração do PCA**.

Entretanto, há evidência documental de que a RA-CAND efetivamente utiliza o PCA em suas contratações. Um Termo de Referência publicado pela própria Administração Regional em 2025 registra o ID do PCA no PNCP, a data de publicação, o ID do item no PCA, a classe/grupo e o identificador da futura contratação.

Isso confirma a existência de um fluxo interno que consegue levar uma necessidade da RA-CAND até um item rastreável no PCA, mas **não revela como o item foi coletado, revisado ou inserido internamente**.

Fonte: [Termo de Referência da Administração Regional da Candangolândia](https://candangolandia.df.gov.br/documents/d/administra%C3%A7%C3%A3o-regional-da-candangol%C3%A2ndia/sei_169809767_termo_de_referencia_2).

### 13.5 Outros estados: o DFD e a consolidação continuam aparecendo

O padrão não é exclusivo do DF.

No Ministério da Agricultura e Pecuária, a orientação pública informa que o DFD é preenchido pela área requisitante e enviado ao setor de contratações, que analisa, consolida e encaminha as demandas para aprovação da autoridade competente.

Fonte: [MAPA — PCA / DFD](https://www.gov.br/agricultura/pt-br/acesso-a-informacao/licitacoes-e-contratos/plano-de-contratacoes-anual/mapa-sede-uasg-130005).

No Espírito Santo, o PCA consolidado da Secretaria de Estado de Desenvolvimento publica explicitamente a **área responsável pela consolidação** e mantém, por item, o setor demandante, objeto, unidade de medida, quantidade, valor preliminar, tipo de contratação, prazo, prioridade, classificação orçamentária, fonte e responsável pela contratação/fiscalização. Isso evidencia uma cadeia de informação entre o setor que origina a necessidade e a unidade que consolida o PCA.

Fonte: [SEDES/ES — PCA 2026](https://sedes.es.gov.br/Media/Sedes/aa/PCA%203%C2%BA%20Vers%C3%A3o.pdf).

Em Roraima, a Secretaria de Estado de Licitação e Contratação mantém página específica com PCA consolidado, fluxograma estadual e materiais do ciclo anual, reforçando a existência de um processo formal de coleta/consolidação/acompanhamento além do mero registro de itens.

Fonte: [SELC/RR — PCA](https://selc.rr.gov.br/plano-de-contratacao-anual-pca/).

### 13.6 São Paulo: unidades descentralizadas elaboram seus próprios PCAs

Uma portaria da Secretaria Municipal de Educação de São Paulo para o PCA 2027 determina que cada unidade descentralizada elabore o seu PCA separadamente, com compilação posterior pelo órgão central. O mesmo ato estrutura um Comitê PCA e um Grupo de Trabalho para apoiar as unidades requisitantes e define um conjunto de campos que o DFD deve conter.

Na mesma linha, a Prefeitura de São Paulo oferece oficinas específicas para ensinar os setores a organizar o PCA e os procedimentos de cada unidade.

Fontes: [Portaria SME nº 6.428/2026](https://legislacao.prefeitura.sp.gov.br/portaria-secretaria-municipal-de-educacao-sme-6428-de-28-de-maio-de-2026) e [Portal de Compras de São Paulo — Oficinas PCA](https://compras.prefeitura.sp.gov.br/oficinas-virtuais-2025/).

### 13.7 Minas Gerais: planilhas e orientação presencial continuam fazendo parte do processo

O Tribunal de Contas de Minas Gerais divulgou, para o PCA 2026, encontros específicos com as unidades de pedido para explicar o fluxo e as informações exigidas. A instituição informou que seriam realizadas **oficinas presenciais** para facilitar o preenchimento do DFD-P e de outras planilhas.

Essa evidência é importante porque mostra que, mesmo em ambientes com sistemas próprios, o trabalho de preparação dos dados pode continuar dependendo de orientação, formulários e planilhas auxiliares.

Fonte: [Escola de Contas do TCE-MG — fluxo do PCA 2026](https://escoladecontas.tce.mg.gov.br/coordenadoria-esclarece-fluxo-do-plano-de-contratacoes-anual-2026/).

## 14. O que já podemos inferir com mais confiança

As evidências acima sustentam algumas **inferências de produto**, não fatos específicos da Candangolândia:

### 14.1 O PCA é frequentemente um processo de coleta e consolidação, não apenas de cadastro

Diversos órgãos distribuem a responsabilidade entre unidades requisitantes/demandantes, áreas técnicas, gestores e uma autoridade final. Isso aparece no DF, no Governo Federal, em São Paulo e em outros entes.

### 14.2 Planilhas e documentos intermediários são comuns

Há evidências explícitas de planilhas auxiliares, DFDs, documentos consolidadores e propostas internas. Isso reforça a necessidade de o PCA-Auto ter uma camada de **entrada e normalização**, e não assumir que o primeiro dado já chega no formato do e-ComprasDF.

### 14.3 Consolidação e agrupamento podem ser uma parte importante do problema

O DF atribui explicitamente a gestores a consolidação/agrupamento; outras normas também falam em agregação de demandas de mesma natureza. Isso cria uma oportunidade para validar funcionalidades de deduplicação, agrupamento e consolidação.

### 14.4 O número de pessoas envolvidas pode ser maior que um

A legislação do e-ComprasDF permite vários gestores e vários responsáveis pelo preenchimento, e organizações maiores distribuem o trabalho em equipes. Entretanto, **não encontrei dados públicos confiáveis que indiquem quantas pessoas participam, em média, de um PCA em uma Administração Regional**.

### 14.5 Não encontrei métricas públicas confiáveis de tempo e retrabalho

A pesquisa encontrou descrições de procedimentos, papéis, documentos, campos, cronogramas e materiais de apoio, mas não encontrou uma base pública robusta informando, por exemplo:

- horas médias por PCA;
- minutos por item;
- taxa de retrabalho;
- número médio de devoluções;
- quantidade média de correções por item.

Portanto, essas métricas continuam sendo **dados que precisamos obter no piloto ou por entrevista/observação**.

## 15. Hipótese operacional revisada

Com a pesquisa ampliada, a hipótese de processo do PCA-Auto pode ser melhor representada como:

```text
Unidades / setores demandantes
          ↓
   coleta da necessidade
          ↓
  documentos / planilhas / SEI
          ↓
     padronização
          ↓
      consolidação
          ↓
  agrupamento / conflitos
          ↓
  validação / prioridade
          ↓
       aprovação
          ↓
      e-ComprasDF
          ↓
   publicação / execução
```

A parte crítica para o produto é que o **bloco anterior ao e-ComprasDF parece ser suficientemente rico para constituir um produto próprio**, mas isso ainda precisa ser comprovado no ambiente da Candangolândia.

## 16. Perguntas prioritárias para entrevistas na Candangolândia

A pesquisa externa permite reduzir bastante a quantidade de perguntas locais. O roteiro recomendado passa a ser:

1. Quantas unidades/setores da RA-CAND enviam demandas para o PCA?
2. Cada setor envia uma planilha/DFD próprio ou existe um formulário único?
3. O que chega primeiro: Excel, SEI, e-mail ou outro documento?
4. Quem recebe e consolida essas demandas?
5. Há uma planilha-mãe ou documento consolidador?
6. Quantas pessoas efetivamente inserem itens no e-ComprasDF?
7. Existe mais de um Gestor do PCA?
8. Quem faz a conferência dos códigos do catálogo?
9. Quantos itens normalmente são devolvidos para correção?
10. Quantos itens precisam de nova catalogação?
11. Como as demandas semelhantes são agrupadas?
12. Como prioridade e data desejada são definidas?
13. Há conferência orçamentária antes do cadastro?
14. Quem aprova e quem devolve para ajustes?
15. Como um ajuste volta ao servidor que originou a demanda?
16. Quanto tempo leva o processo completo?
17. Quanto desse tempo é gasto em planilhas/documentos e quanto no e-ComprasDF?
18. Quais são os três erros mais comuns?
19. Qual etapa mais gera retrabalho?
20. O que o servidor gostaria que fosse automático sem perder o controle humano?

Essas perguntas devem alimentar diretamente `docs/current-process.md`, `docs/requirements.md`, `docs/excel-format.md` e `docs/validation.md` quando houver evidência local.
