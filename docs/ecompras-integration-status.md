# Status da integração com o e-ComprasDF

Este documento evita que hipóteses da investigação sejam tratadas como comportamento confirmado.

## Confirmado pela investigação anterior

- Consulta do catálogo na rota `/ecompras/Consultantes/Pesquisar`.
- A consulta observada utiliza `GET`.
- A resposta observada é HTML (`text/html`).
- Foram observados parâmetros como `TipoCatalogo`, `TipoConsulta`, `Pesquisa`, `TipoConsulta2`, `Pesquisa2`, `TipoConsulta3`, `Pesquisa3` e `btnConsultarAgrupamentoPesquisa`.
- Existe um identificador interno `ItemId` separado do código completo do catálogo.
- A tela de inclusão observada está em `/ecompras/consultaitens/IncluirItem/?ItemId=...`.
- O formulário de inclusão observado utiliza `POST` e `multipart/form-data`.

## Implementado no PCA Auto

- Cliente HTTP isolado para acesso de baixo nível ao portal.
- Sessão Playwright separada para login manual e investigação controlada.
- Cache local de itens resolvidos no PostgreSQL.
- `ItemResolver` consulta primeiro o cache e só depois o portal.
- Parser de catálogo para runtime Node com `jsdom`.
- `EComprasHttpAdapter` conecta consulta HTML ao contrato `EComprasAdapter`.
- Envio real continua bloqueado por código.

## Ainda não confirmado

- Qual parâmetro representa definitivamente uma busca por código de catálogo.
- Estrutura HTML estável dos resultados do catálogo.
- Seletores reais para extrair `ItemId`, descrição e unidade de uma resposta real.
- Headers adicionais necessários para uma sessão real.
- Cookies e mecanismo de sessão necessários para reutilizar autenticação via HTTP.
- POST final completo de `/consultaitens/IncluirItem`.
- Resposta e redirects após o POST.
- Critério técnico de confirmação de sucesso.
- Fluxo específico de lançamento do PCA.

## Regra de implementação

O código deve permanecer no modo de investigação até que esses pontos sejam capturados e verificados. Nenhum parser deve ser habilitado com seletores inventados e nenhuma chamada de produção deve ser habilitada com base apenas em hipóteses.
