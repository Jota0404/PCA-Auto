# PCA-Auto — Produto

**Status:** PARCIALMENTE DEFINIDO  
**Última atualização:** 2026-09-22

## 1. Visão

O PCA-Auto surgiu como uma ferramenta interna para agilizar a elaboração do PCA na Administração Regional da Candangolândia, utilizando o e-ComprasDF.

A visão de longo prazo é evoluir para uma plataforma de planejamento, validação, preparação, execução, acompanhamento e auditoria do PCA.

Essa visão é deliberadamente incremental. O produto de 2026 não deve ser obrigado a implementar todas as capacidades da visão futura.

## 2. Problema central

O problema ainda precisa ser medido no processo real.

As hipóteses atuais são:

- o processo do PCA consome tempo e esforço relevantes;
- existem atividades repetitivas e sujeitas a erro;
- a preparação e validação dos dados podem ser melhoradas;
- o usuário se beneficia de pendências explícitas e revisão estruturada;
- um processo rastreável reduz risco operacional.

**Ainda não comprovado:** magnitude da dor, economia de tempo, redução de erro e disposição de pagamento.

## 3. Produto inicial — Nível 1: PCA-Auto Assistido

Fluxo-alvo:

```
Excel
  ↓
Importação
  ↓
Normalização
  ↓
Validação
  ↓
Pendências
  ↓
Revisão humana
  ↓
PCA pronto
```

O Nível 1 deve entregar valor mesmo sem escrever automaticamente no e-ComprasDF.

O sistema deve conseguir gerar um resultado utilizável pelo servidor para conclusão manual do processo, sem que a integração externa seja condição para provar o valor do produto.

## 4. Nível 2 — PCA-Auto Integrado

Fluxo conceitual:

```
Dados
  ↓
PCA-Auto
  ↓
Validação
  ↓
Aprovação
  ↓
Integração com sistema governamental
```

A execução automatizada permanece dependente da comprovação técnica e operacional do e-ComprasDF.

## 5. Nível 3 — PCA-Auto Enterprise

Visão futura:

- multiusuário;
- multi-órgão;
- permissões;
- RBAC;
- auditoria;
- segurança;
- observabilidade;
- relatórios;
- integrações;
- histórico e rastreabilidade;
- escala.

Esse nível não deve direcionar a construção do MVP atual.

## 6. Fonte de entrada atual

O Excel é a entrada inicial e a fonte de verdade dos códigos dos itens.

Outros formatos (PDF, CSV, API, ERP) são possibilidades futuras e não são dependências do MVP.

## 7. Fronteira do produto

O PCA-Auto não deve ser tratado, neste estágio, como:

- ERP completo;
- sistema financeiro;
- marketplace;
- aplicativo mobile;
- gestor completo de contratos;
- conjunto de dezenas de integrações;
- produto de IA generativa sem caso de uso comprovado.

## 8. Princípios de produto

1. O sistema deve reduzir esforço sem retirar do usuário decisões que exigem julgamento.
2. Ambiguidade deve gerar revisão, não escolha silenciosa.
3. Resultado concluído precisa ser verificável.
4. A integração externa deve ser uma capacidade isolável, não a única razão de existir do produto.
5. Cada nova capacidade deve justificar o custo adicional de complexidade.

## 9. Critério de evolução

A evolução do produto deve seguir evidências, não apenas o roadmap.

Antes de ampliar para execução, multi-órgão ou enterprise, o Nível 1 precisa demonstrar:

- dor real;
- ganho mensurável;
- uso real;
- aceitação pelo usuário;
- possibilidade de repetição em outro ambiente.
