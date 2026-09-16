# Fluxo de execução de um item

## Objetivo

O MVP executa inicialmente um único `PcaItem`. O fluxo é persistível e deve permitir inspeção e retomada sem repetir itens concluídos.

## Estados

```text
PENDING
   |
   v
VALIDATED
   |
   v
IN_PROGRESS
   |
   +----> COMPLETED
   |
   +----> ERROR
```

`COMPLETED` só deve ser atribuído quando a integração fornecer uma confirmação verificável. Em `SIMULATION`, o fluxo termina antes do envio final e não marca o item como concluído.

## Etapas registradas

- `ITEM_STARTED`
- `ITEM_RESOLVED`
- `FORM_PREPARED`
- `SIMULATION`
- `ITEM_COMPLETED`
- `EXECUTION_ERROR`

Os logs são parte do histórico da execução. Não devem ser usados como substituto do estado persistido do item.

## Regra de segurança

O modo `PRODUCTION` permanece bloqueado até que o POST real do e-ComprasDF, sua resposta, redirects, sessão e critério de confirmação sejam capturados e testados. Nenhum sucesso deve ser inferido apenas pelo término de uma requisição.
