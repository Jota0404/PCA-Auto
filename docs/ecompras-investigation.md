# Investigação da integração com o e-ComprasDF

## Confirmado antes da implementação

A documentação do projeto confirmou os seguintes pontos:

- catálogo observado em `https://portal.compras.df.gov.br/ecompras/Consultantes/Pesquisar`;
- consulta observada por `GET` com retorno `text/html`;
- item observado com código de catálogo e `ItemId` interno;
- página de inclusão observada em `/ecompras/consultaitens/IncluirItem/?ItemId=...`;
- formulário de inclusão observado com `POST` e `multipart/form-data`;
- `fnSubmit` valida o formulário e posteriormente chama o `submit()` normal do HTML;
- a tentativa observada de inclusão retornou mensagem de duplicidade no portal.

## Ainda não confirmado

O código do MVP não deve tratar como fato aquilo que ainda depende de captura/observação:

- request POST final completo;
- headers necessários;
- cookies e outros dados de sessão necessários ao POST;
- redirecionamentos e resposta final;
- mecanismo para reutilizar a sessão Playwright em HTTP direto;
- estrutura definitiva dos resultados do catálogo;
- fluxo específico de preenchimento e confirmação do PCA.

## Probe controlado

`npm run probe:ecompras` abre um navegador visível e acessa a rota de catálogo conhecida.

O usuário pode autenticar manualmente e navegar até o estado desejado. Ao pressionar ENTER no terminal, o HTML atual é salvo localmente em `artifacts/ecompras/`.

O probe não:

- armazena credenciais;
- automatiza login;
- envia formulários;
- confirma operações;
- cria registros no e-ComprasDF.

## Próxima evidência desejada

A próxima investigação deve produzir uma captura reproduzível de uma consulta de catálogo por código e identificar os elementos do resultado que permitem extrair, sem ambiguidade, código, `ItemId`, descrição e unidade.

Somente depois dessa evidência deve ser criado o parser definitivo do catálogo.
