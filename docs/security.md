# PCA-Auto — Segurança

**Status:** HIPÓTESE / PRECISA DE DECISÃO  
**Última atualização:** 2026-09-22

## 1. Objetivo

Definir o conjunto mínimo de práticas de segurança necessário para o estágio atual, sem antecipar toda a complexidade de um ambiente enterprise.

## 2. Princípios

- menor privilégio;
- segredos fora do código;
- rastreabilidade de ações;
- separação entre log técnico e auditoria;
- proteção de credenciais do sistema governamental;
- falha explícita em situações ambíguas;
- não registrar credenciais em logs ou artefatos.

## 3. Segurança mínima para o piloto

A proposta atual é validar um modelo simples:

- autenticação básica/controlada;
- identificação de usuário quando necessário;
- log das ações relevantes;
- armazenamento seguro de segredos;
- nenhum segredo hardcoded;
- nenhum cookie/sessão persistente em artefatos de investigação;
- acesso ao banco e infraestrutura restrito.

**Status:** PRECISA DE DECISÃO.

## 4. Dados

É necessário identificar quais dados do fluxo são pessoais, inclusive possíveis dados de servidores responsáveis e usuários.

O inventário definitivo depende do processo e das informações reais utilizadas.

## 5. Credenciais do e-ComprasDF

Credenciais utilizadas pela automação, quando essa capacidade existir:

- não podem estar no código;
- não podem aparecer em logs;
- não podem ser incluídas em arquivos de captura;
- devem utilizar mecanismo apropriado de secret management.

## 6. Auditoria

Segurança e auditoria não são a mesma coisa.

A auditoria de negócio deve responder, quando aplicável:

- quem realizou a ação;
- o que mudou;
- qual dado originou a ação;
- quando;
- qual foi o resultado.

## 7. Enterprise — futuro

Ainda não deve ser implementado antes de evidência de necessidade:

- RBAC completo;
- isolamento multi-tenant;
- SSO;
- controles avançados;
- pentest formal;
- certificações específicas;
- arquitetura de isolamento físico.

Esses requisitos deverão ser definidos antes de produção comercial de maior escala.

## 8. LGPD e setor público

A solução deve considerar LGPD e requisitos contratuais/compliance aplicáveis a clientes públicos.

Não presumir requisitos jurídicos específicos sem pesquisa ou contrato aplicável.

## 9. Próximas decisões

- modelo de autenticação do piloto;
- onde armazenar secrets;
- quais dados serão persistidos;
- retenção;
- backup;
- procedimento de incidente;
- requisitos mínimos antes de produção.
