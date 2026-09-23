# PCA-Auto — Motor de validação

**Status:** PARCIALMENTE DEFINIDO  
**Última atualização:** 2026-09-23

## 1. Objetivo

A validação transforma dados importados em um conjunto explícito de:

- itens válidos;
- pendências;
- inconsistências;
- bloqueios;
- informações que exigem revisão humana.

A implementação atual já possui regras básicas no `src/application/pca/pca-validator.ts`. As regras de processo específicas da Candangolândia continuam pendentes.

## 2. Regras atualmente implementadas

O código atual implementa, entre outras verificações observadas:

- código obrigatório;
- detecção de duplicidade;
- quantidade maior que zero;
- valor maior ou igual a zero;
- validação da data proveniente do Excel.

Essas regras são fatos sobre a implementação atual. Sua suficiência como conjunto definitivo de regras de negócio do PCA ainda não foi validada com o processo real.

## 3. O que está definido

- A validação acontece depois da importação e normalização.
- O sistema não deve substituir silenciosamente códigos.
- Ambiguidades devem gerar bloqueio/revisão.
- A integração externa não deve ser usada como mecanismo implícito de correção de dados.
- A validação deve ser auditável quando uma regra produzir uma decisão relevante.

## 4. Camadas de validação

### Estrutural

Verifica a estrutura do arquivo de entrada:

- aba esperada;
- cabeçalhos;
- tipos;
- campos reconhecidos.

### Sintática

Verifica formato dos valores:

- números;
- datas;
- textos;
- códigos.

### Semântica

Verifica regras de negócio:

- campos necessários;
- coerência entre valores;
- dependências;
- regras do PCA.

### Integração

Quando o fluxo externo for ativado, verifica se a identidade técnica encontrada corresponde ao código de origem e aos dados esperados.

A existência dessas camadas como organização conceitual não significa que todas as regras de cada camada já estejam implementadas.

## 5. Regras que ainda não estão fechadas

Ainda dependem do processo real:

- quais campos são obrigatórios em cada etapa;
- quais valores são aceitáveis;
- regras de dependência entre itens;
- tratamento de duplicidades além da regra já implementada;
- regras de prioridade;
- regras de data específicas do processo;
- regras de modalidade;
- regras específicas do fluxo do órgão;
- quais pendências bloqueiam e quais apenas alertam.

## 6. Resultado de uma regra

A ERS prevê resultados explícitos, como:

```
PASS
WARNING
BLOCK
```

A taxonomia final e seu mapeamento completo para a implementação ainda precisam ser definidos/validados.

## 7. Falsos positivos e falsos negativos

O piloto deve medir:

- quantas pendências detectadas estavam corretas;
- quantos problemas passaram despercebidos;
- quantos bloqueios eram desnecessários.

Uma validação excessivamente rígida também pode gerar trabalho e perder valor.

## 8. Rastreabilidade

Cada regra relevante deve possuir:

- identificador;
- descrição;
- fonte;
- condição;
- severidade;
- mensagem ao usuário;
- efeito no fluxo;
- teste correspondente.

Esse catálogo ainda não está fechado para todas as regras.

## 9. Próximo passo

Não fechar a taxonomia definitiva nem adicionar regras específicas do órgão antes de analisar um Excel real e observar como o usuário efetivamente prepara e revisa um PCA.
