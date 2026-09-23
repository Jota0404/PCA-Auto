# ADR-001 — Excel como fonte de verdade dos códigos

**Status:** Aceita  
**Data:** 2026-09-22

## Contexto

O PCA-Auto precisa processar códigos de catálogo informados pela organização.

Foi observado que o e-ComprasDF utiliza identificadores internos próprios, incluindo `ItemId`, e que a descoberta de itens no portal depende de comportamento de interface que ainda não foi comprovado como API estável.

## Decisão

O código de catálogo fornecido pelo Excel é a fonte de verdade do item.

O sistema pode resolver identificadores técnicos adicionais necessários à integração, mas não pode substituir silenciosamente o código de origem.

## Consequências

### Positivas

- preserva rastreabilidade da origem;
- evita decisões silenciosas;
- reduz dependência da descoberta de catálogo no portal;
- torna o Nível 1 independente da integração.

### Negativas

- entradas erradas permanecem erradas até a validação/revisão;
- a integração ainda pode precisar resolver `ItemId`;
- o contrato de entrada precisa ser bem definido.

## Reversão

Só reconsiderar esta decisão se houver uma mudança comprovada na origem oficial dos dados e uma nova decisão arquitetural justificar outra fonte de verdade.
