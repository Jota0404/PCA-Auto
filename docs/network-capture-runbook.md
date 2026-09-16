# Runbook de captura de rede do catálogo

Esta etapa é exclusivamente investigativa. O objetivo é registrar o request real produzido pelo portal durante uma busca manual por um código conhecido.

## Procedimento

1. Execute `npm run probe:ecompras:network`.
2. No navegador visível, faça login manualmente, se necessário.
3. Acesse a consulta do catálogo já conhecida pelo projeto.
4. Realize uma única busca usando um código de catálogo conhecido.
5. Pressione ENTER no terminal.
6. O script salvará uma evidência em `artifacts/ecompras/network-*.json`.
7. Execute `npm run analyze:ecompras:network artifacts/ecompras/network-*.json`.

## O que considerar evidência

O analisador identifica como candidata somente uma requisição `GET` para `/ecompras/Consultantes/Pesquisar`.

Os parâmetros exibidos são exclusivamente os que estavam presentes na URL observada. O PCA Auto não deve transformar um nome de parâmetro em regra definitiva sem reprodução da busca e verificação da resposta.

## Próxima validação

Depois da primeira captura, deve-se comparar a URL e os parâmetros com uma segunda busca usando outro código conhecido. O objetivo é separar:

- parâmetros fixos da tela;
- parâmetro cujo valor acompanha o código pesquisado;
- parâmetros auxiliares gerados pela tela.

Somente após essa comparação o código pode receber uma configuração específica para consulta por código.

## Segurança

A captura atual não persiste credenciais nem cookies. Os artefatos de rede devem permanecer fora de commits enquanto contiverem informações de sessão ou dados potencialmente sensíveis.
