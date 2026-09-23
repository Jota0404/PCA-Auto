# PCA-Auto — API e contratos

**Status:** PARCIALMENTE DEFINIDO  
**Última atualização:** 2026-09-23

## Estado atual

Não existe ainda um contrato de API pública externa fechado.

Porém, o código atual já possui um endpoint interno da aplicação para importação:

`app/api/pca/import/route.ts`

Esse endpoint integra o caso de uso de importação e persiste o PCA no banco. Portanto, a operação de importação deixou de ser apenas um contrato futuro: existe uma implementação atual que deve ser considerada no estado do sistema.

O contrato público/externo e as demais operações ainda não estão fechados.

## Endpoint atualmente implementado

### Importação de PCA

**Rota:** `POST /api/pca/import`

O endpoint recebe os dados necessários para a criação da importação, incluindo:

- ano;
- unidade;
- nome;
- arquivo XLSX.

O comportamento observado no código deve ser tratado como contrato interno vigente, enquanto não houver uma especificação de API mais formal.

Os códigos de resposta atualmente implementados incluem:

- `201` para criação bem-sucedida;
- `400` para entrada inválida;
- `422` para falha de processamento/validação da importação;
- `500` para erro interno.

A implementação deve permanecer a fonte de verdade do comportamento efetivamente existente até que um contrato formal seja definido.

## Regra

Não criar API externa apenas por antecipação.

Primeiro definir:

1. caso de uso;
2. modelo de domínio;
3. contrato de entrada/saída;
4. necessidade real de exposição;
5. requisitos de autenticação/autorização.

## Contratos esperados no futuro

Possíveis operações:

- consultar importação;
- listar itens;
- consultar pendências;
- revisar item;
- aprovar lote;
- executar lote;
- consultar execução;
- consultar auditoria.

Essas operações são somente um mapa inicial, não contratos definitivos.

## Integrações externas

O e-ComprasDF deve ser acessado por adapter de infraestrutura, não diretamente pelo domínio.

Detalhes específicos do portal não devem vazar para contratos de negócio.

## Regra documental

A existência do endpoint de importação não significa que a API pública do produto esteja definida. Qualquer evolução do endpoint deve ser acompanhada por documentação e testes correspondentes.
