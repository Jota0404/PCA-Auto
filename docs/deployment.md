# PCA-Auto — Deploy e infraestrutura

**Status:** HIPÓTESE  
**Última atualização:** 2026-09-22

## Estado atual

A infraestrutura de produção ainda não está definida.

O projeto deve permanecer simples durante o piloto.

## Ambientes esperados

### Desenvolvimento
Ambiente local usado para implementação.

### Teste/Staging
Quando houver necessidade de persistência compartilhada ou validação E2E.

### Produção
Somente quando o fluxo estiver comprovado e houver necessidade operacional.

## Princípios

- infraestrutura gerenciada quando reduzir operação desnecessária;
- secrets fora do código;
- backups antes de dados reais importantes;
- logs acessíveis sem expor credenciais;
- deploy reproduzível;
- separação de configuração por ambiente.

## Não decidido

- provedor final;
- estratégia de containers;
- pipeline CI/CD;
- banco gerenciado específico;
- monitoramento;
- política de backup;
- RTO/RPO.

Essas decisões devem ser tomadas quando houver um ambiente que realmente precise dessas garantias.

## Kubernetes

Não é considerado requisito atual.

Só deve ser introduzido se existir uma necessidade operacional comprovada.
