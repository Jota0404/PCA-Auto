# Formato de entrada Excel — MVP

**Status:** PRECISA DE VALIDAÇÃO  
**Última atualização:** 2026-09-22

> Este documento descreve o contrato atualmente implementado no importador, mas ainda não deve ser considerado o schema definitivo até que um Excel real da Candangolândia seja processado e suas variações sejam observadas.

## Objetivo

Este documento define o contrato de entrada usado pelo importador do PCA Auto.

No MVP atual, o **Excel é a fonte de verdade dos códigos de catálogo**. O PCA Auto não deve descobrir ou substituir o código informado na planilha por uma descrição pesquisada no e-ComprasDF.

O importador continua responsável somente por converter os valores da planilha para o modelo interno. A validação de negócio acontece depois da importação.

## Aba utilizada

O importador lê a **primeira aba** do arquivo XLSX.

A primeira linha é tratada como cabeçalho.

## Colunas reconhecidas

| Coluna | Nome normalizado | Tratamento |
|---|---|---|
| Código | `codigo` | Obrigatória pelo importador e fonte do código do item |
| Descrição | `descricao` | Opcional na importação |
| Quantidade | `quantidade` | Número, quando informada |
| Valor | `valor` | Número, quando informado |
| Data desejada | `data desejada` | Data Excel, quando informada |
| Prioridade | `prioridade` | Texto, quando informado |
| Modalidade | `modalidade` | Texto, quando informado |

A comparação dos cabeçalhos ignora maiúsculas/minúsculas e acentuação.

## Fonte dos códigos

O código informado no Excel deve ser preservado durante todo o fluxo.

```text
Excel
  ↓
codigoCatalogo
  ↓
validação
  ↓
execução
```

O PCA Auto **não deve pesquisar por descrição para descobrir outro código**.

Caso a integração com o e-ComprasDF precise de um identificador interno (`ItemId`) para executar o lançamento, essa etapa é tratada separadamente da origem do código. O código continua sendo o valor fornecido pela planilha.

## Regras de segurança do importador

- linhas completamente vazias são ignoradas;
- uma linha que possua código é considerada um item;
- valores numéricos não reconhecidos geram erro de importação;
- datas em formatos de texto não são interpretadas por aproximação;
- o importador não consulta o e-ComprasDF;
- o importador não decide se um item está apto para execução;
- o importador não altera o código fornecido na planilha.

## Exemplo

```text
Código | Descrição | Quantidade | Valor | Data desejada | Prioridade | Modalidade
...    | ...       | 300        | 8500  | 03/2027       | Alta       | ...
...    | ...       | 100        | 4000  | 02/2027       | Média      | ...
```

O exemplo acima é uma representação da documentação do projeto. Como o significado exato de `data desejada` no fluxo do e-ComprasDF ainda não foi confirmado, o importador não converte automaticamente um texto como `03/2027` em uma data específica.

## Futuro: PDF

PDF pode ser adicionado posteriormente como outro formato de entrada. Ele deverá produzir o mesmo modelo interno usado pelo Excel, sem alterar as regras de validação ou execução.

```text
Excel ──┐
        ├──> modelo interno ──> validação ──> execução
PDF ────┘
```

A importação por PDF não faz parte do MVP atual.

## Próxima evidência

O próximo passo é processar um Excel real da Candangolândia, registrar as colunas/variações efetivamente encontradas e promover este documento para um schema versionado apenas quando houver evidência suficiente.
