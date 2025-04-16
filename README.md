# 🚀 Node.js Boilerplate Backend

Este projeto é um boilerplate backend moderno e escalável utilizando Node.js, Express, PostgreSQL, Redis e JWT, pronto para produção e deploy em Docker.

## ✅ Features

- 🧑‍💼 CRUD completo de usuários
- 🔐 Autenticação com JWT
- 👮‍♂️ Controle de acesso com RBAC (admin/user)
- 🐘 Banco de dados PostgreSQL (via Sequelize)
- ⚡ Cache com Redis
- 🧪 Testes com Jest + Supertest
- 📑 Documentação Swagger 3.0 (OpenAPI)
- 📦 Docker e Docker Compose
- 🧰 Logging com Winston e Morgan
- 🔎 Validação com Joi
- 📁 Estrutura modular pronta para escalar
- 🔄 API versionada: `/api/v1`

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js v18+](https://nodejs.org/)
- [Docker + Docker Compose](https://docs.docker.com/get-docker/)

### Executando com Docker

```bash
docker-compose up --build
