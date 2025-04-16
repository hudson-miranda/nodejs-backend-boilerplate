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
```

Acesse:
API: http://localhost:3000
Swagger Docs: http://localhost:3000/api-docs

### Executando localmente (sem Docker)

1. Instale as dependências:
```bash
npm install
```
2. Configure o banco PostgreSQL e Redis (use Docker ou instale localmente)
3. Preencha o arquivo .env (já fornecido)
4. Rode a seed inicial:
```bash
node seed.js
```
5. Inicie o servidor:
```bash
npm run dev
```

Acesse:
API: http://localhost:3000
Swagger Docs: http://localhost:3000/api-docs

### 🧪 Testes

```bash
npm test
```

### 📑 Documentação da API

Disponível em: http://localhost:3000/api-docs

### 📁 Estrutura de Pastas

```bash
src/
├── auth/                 # Auth e Passport JWT
├── config/               # Configurações (DB, JWT, Redis, Swagger)
├── controllers/          # Lógica dos endpoints
├── middlewares/          # Middlewares (auth, RBAC, validação)
├── models/               # Sequelize models
├── routes/               # Rotas organizadas
├── services/             # Regras de negócio
├── utils/                # Helpers utilitários
├── validations/          # Schemas Joi
├── app.js                # Inicialização do Express
server.js                 # Entry point
```

### 👥 Autor

Desenvolvido com ❤️ por Hudson Miranda