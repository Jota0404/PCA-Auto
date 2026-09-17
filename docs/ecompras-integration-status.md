# Status da integração com o e-ComprasDF

Este documento evita que hipóteses da investigação sejam tratadas como comportamento confirmado.

## Papel atual da integração

O **código de catálogo não é descoberto pelo PCA Auto**. No MVP atual, o código é fornecido pelo Excel e deve ser preservado como fonte de verdade.

A integração com o e-ComprasDF continua necessária para executar o lançamento e, caso o fluxo exija, resolver o identificador interno (`ItemId`) correspondente ao código já fornecido.

## Evidências e rotas observadas

### Rota histórica investigada

Foi anteriormente observada a rota:

```text
/ecompras/Consultantes/Pesquisar
```

Essa rota chegou a responder `200` durante uma investigação anterior autenticada, mas uma chamada HTTP direta atual sem o mesmo contexto de sessão retornou `404`. Portanto, ela não deve ser tratada como rota pública estável do MVP.

### Rota atualmente observada no navegador

Em 17/09/2026 foi observada, na tela **COMPRAS DF - Consulta de Itens**, a URL:

```text
/ecompras/ConsultaItens/Pesquisar
```

com parâmetros:

```text
TipoCatalogo=1
TipoConsulta=2
Pesquisa=a
TipoConsulta2=
Pesquisa2=
TipoConsulta3=
Pesquisa3=
btnConsultarAgrupamentoPesquisa=
```

Essa observação confirma a existência da rota na interface atual, mas ainda não comprova que uma requisição HTTP isolada reproduza o comportamento sem sessão autenticada.

## Confirmado pela investigação anterior

- Existe um identificador interno `ItemId` separado do código completo do catálogo.
- A tela de inclusão observada está em `/ecompras/consultaitens/IncluirItem/?ItemId=...`.
- O formulário de inclusão observado utiliza `POST` e `multipart/form-data`.

## Implementado no PCA Auto

- Cliente HTTP isolado para acesso de baixo nível ao portal.
- Sessão Playwright separada para login manual e investigação controlada.
- Cache local de itens resolvidos no PostgreSQL.
- `ItemResolver` consulta primeiro o cache e só depois o portal quando precisa resolver a identidade técnica do código fornecido.
- Parser de catálogo para runtime Node com `jsdom`.
- `EComprasHttpAdapter` conecta consulta HTML ao contrato `EComprasAdapter`.
- O importador Excel não consulta o e-ComprasDF.
- O código informado no Excel não é substituído pela integração.
- Envio real continua bloqueado por código.

## Ainda não confirmado

- Como consultar de forma estável o catálogo por um código já fornecido pelo Excel.
- Estrutura HTML estável dos resultados da consulta atual.
- Seletores reais para extrair `ItemId`, descrição e unidade de uma resposta real.
- Headers adicionais necessários para uma sessão real.
- Cookies e mecanismo de sessão necessários para reutilizar autenticação via HTTP.
- POST final completo de `/consultaitens/IncluirItem`.
- Resposta e redirects após o POST.
- Critério técnico de confirmação de sucesso.
- Fluxo específico de lançamento do PCA.

## Regra de implementação

A integração deve permanecer no modo de investigação até que esses pontos sejam capturados e verificados. Nenhum parser deve ser habilitado com seletores inventados e nenhuma chamada de produção deve ser habilitada com base apenas em hipóteses.

A mudança para um Excel com os códigos já definidos reduz a dependência da consulta de descoberta do catálogo, mas **não elimina automaticamente a necessidade de resolver `ItemId` ou confirmar os dados antes do lançamento**.
