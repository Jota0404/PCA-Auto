# Formato de entrada Excel — MVP

## Objetivo

Este documento define o contrato de entrada usado pelo importador do PCA Auto. Ele descreve apenas o que o MVP atualmente conhece e não deve ser interpretado como definição dos campos obrigatórios do e-ComprasDF.

## Aba utilizada

O importador lê a **primeira aba** do arquivo XLSX.

A primeira linha é tratada como cabeçalho.

## Colunas reconhecidas

| Coluna | Nome normalizado | Tratamento |
|---|---|---|
| Código | `codigo` | Obrigatória pelo importador |
| Descrição | `descricao` | Opcional na importação |
| Quantidade | `quantidade` | Número, quando informada |
| Valor | `valor` | Número, quando informado |
| Data desejada | `data desejada` | Data Excel, quando informada |
| Prioridade | `prioridade` | Texto, quando informado |
| Modalidade | `modalidade` | Texto, quando informada |

A comparação dos cabeçalhos ignora maiúsculas/minúsculas e acentuação.

## Regras de segurança do importador

- linhas completamente vazias são ignoradas;
- uma linha que possua código é considerada um item;
- valores numéricos não reconhecidos geram erro de importação;
- datas em formatos de texto não são interpretadas por aproximação;
- o importador não consulta o e-ComprasDF;
- o importador não decide se um item está apto para execução.

## Exemplo

```text
Código | Descrição | Quantidade | Valor | Data desejada | Prioridade | Modalidade
...    | ...       | 300        | 8500  | 03/2027       | Alta       | ...
...    | ...       | 100        | 4000  | 02/2027       | Média      | ...
```

O exemplo acima é uma representação da documentação do projeto. Como o significado exato de `data desejada` no fluxo do e-ComprasDF ainda não foi confirmado, o importador não converte automaticamente um texto como `03/2027` em uma data específica.
