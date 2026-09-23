# PCA-Auto — Motor de validação

**Status:** HIPÓTESE / PRECISA DE VALIDAÇÃO  
**Última atualização:** 2026-09-22

## 1. Objetivo

A validação deve transformar dados importados em um conjunto explícito de:

- itens válidos;
- pendências;
- inconsistências;
- bloqueios;
- informações que exigem revisão humana.

## 2. O que já está definido

- A validação acontece depois da importação e normalização.
- O sistema não deve substituir silenciosamente códigos.
- Ambiguidades devem gerar bloqueio/revisão.
- A integração externa não deve ser usada como mecanismo implícito de "correção" de dados.
- A validação deve ser auditável quando uma regra produzir uma decisão relevante.

## 3. Camadas de validação pretendidas

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

## 4. Regras que ainda não estão fechadas

Ainda dependem do processo real:

- quais campos são obrigatórios em cada etapa;
- quais valores são aceitáveis;
- regras de dependência entre itens;
- tratamento de duplicidades;
- regras de prioridade;
- regras de data;
- regras de modalidade;
- regras específicas do fluxo do órgão;
- quais pendências bloqueiam e quais apenas alertam.

## 5. Resultado de uma regra

Uma regra deve produzir resultado explícito, por exemplo:

```
PASS
WARNING
BLOCK
```

A taxonomia final ainda precisa ser definida.

## 6. Falsos positivos e falsos negativos

O piloto deve medir:

- quantas pendências detectadas estavam corretas;
- quantos problemas passaram despercebidos;
- quantos bloqueios eram desnecessários.

Uma validação excessivamente rígida também pode gerar trabalho e perder valor.

## 7. Rastreabilidade

Cada regra relevante deve possuir:

- identificador;
- descrição;
- fonte;
- condição;
- severidade;
- mensagem ao usuário;
- efeito no fluxo;
- teste correspondente.

## 8. Próximo passo

Não fechar a taxonomia definitiva antes de analisar um Excel real e observar como o usuário efetivamente prepara e revisa um PCA.
