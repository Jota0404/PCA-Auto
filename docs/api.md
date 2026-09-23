# PCA-Auto — API e contratos

**Status:** HIPÓTESE  
**Última atualização:** 2026-09-22

## Estado atual

Nenhum contrato de API pública do produto está fechado.

A aplicação utiliza Next.js e possui separação entre UI, aplicação, domínio e infraestrutura, mas a superfície de API ainda depende da definição do fluxo persistente do MVP.

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

- importar arquivo;
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
