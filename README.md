# PCA Auto

MVP interno para preparar, validar e automatizar de forma controlada o preenchimento do PCA no e-ComprasDF da Administração Regional da Candangolândia.

## Princípios do projeto

- O e-ComprasDF continua sendo o sistema oficial.
- O PCA Auto deve ser conservador diante de qualquer resultado inesperado.
- Nenhuma ambiguidade deve ser resolvida automaticamente.
- A automação deve ser retomável e completamente rastreável.
- A integração com o e-ComprasDF fica isolada em um adapter.
- O primeiro fluxo operacional será testado com um único item.
- A senha do e-ComprasDF não será armazenada pela aplicação.

## Stack do MVP

- Next.js + React + TypeScript
- Node.js
- PostgreSQL + Prisma
- Playwright
- ExcelJS

## Estrutura

```text
app/                    Interface e rotas Next.js
src/domain/             Tipos e regras do domínio
src/application/        Casos de uso do sistema
src/infrastructure/     Banco, Excel e e-ComprasDF
src/services/           Orquestração de serviços
prisma/                 Schema e migrações Prisma
tests/                  Testes unitários e de integração
```

## Fonte de contexto

A documentação técnica do projeto registra o que já foi confirmado no e-ComprasDF e o que ainda precisa ser testado. Não tratar hipóteses da investigação como comportamento confirmado do portal.
