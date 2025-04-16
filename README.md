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

## 📑 Documentação da API

Disponível em: http://localhost:3000/api-docs

## 📌 Endpoints Disponíveis

> Todas as rotas estão versionadas sob o prefixo `/api/v1/`  
> Rotas protegidas exigem um token JWT no header:  
> `Authorization: Bearer <seu_token_aqui>`

#### 🔐 Auth

| Método | Rota                  | Descrição                          | Protegida |
|--------|------------------------|------------------------------------|-----------|
| POST   | `/auth/login`         | Autentica usuário e retorna JWT    | ❌        |
| POST   | `/auth/register`      | Registra novo usuário              | ❌        |

#### 👤 Usuários

| Método | Rota                    | Descrição                                | Protegida | Role Requerida |
|--------|-------------------------|------------------------------------------|-----------|----------------|
| GET    | `/users`               | Lista todos os usuários                   | ✅        | qualquer       |
| GET    | `/users/:id`           | Retorna um usuário pelo ID                | ✅        | qualquer       |
| POST   | `/users`               | Cria um novo usuário                      | ✅        | `admin`        |
| PUT    | `/users/:id`           | Atualiza um usuário                       | ✅        | qualquer       |
| DELETE | `/users/:id`           | Realiza soft delete do usuário            | ✅        | `admin`        |

📢 *Todas as rotas protegidas devem conter o token no header:*  
```http
Authorization: Bearer <token>
```

### 📌 Exemplos de requisição

🔑 *Login*
`POST /api/v1/auth/login`
```json
{
  "email": "admin@email.com",
  "password": "123456"
}
```

📝 *Registro*
`POST /api/v1/auth/register`
```json
{
  "name": "admin",
  "email": "admin@email.com",
  "password": "123456",
  "role": "admin"
}
```

## 📬 Coleção Postman

Para facilitar os testes da API, incluí uma **coleção do Postman** com todos os endpoints prontos para uso, organizados por grupos:

📁 Arquivo: [`Node.js Boilerplate API.postman_collection.json`](./Node.js%20Boilerplate%20API.postman_collection.json)

### ✅ Como usar

1. Abra o [Postman](https://www.postman.com/)
2. Clique em **Import**
3. Selecione o arquivo `Node.js Boilerplate API.postman_collection.json` presente na raiz do projeto
4. Crie um novo **Environment** com as seguintes variáveis:

| Variável | Valor                              |
|----------|------------------------------------|
| `baseUrl` | `http://localhost:3000/api/v1`     |
| `token`   | *(cole aqui o token JWT do login)* |

5. Após fazer login, copie o token JWT retornado e atualize o valor da variável `token` no ambiente.

### 📌 Estrutura da coleção

- **Auth**
  - `POST /auth/register` – Registro de usuário
  - `POST /auth/login` – Login com retorno de JWT

- **Users** (Requer JWT)
  - `GET /users` – Lista todos os usuários
  - `GET /users/:id` – Busca usuário por ID
  - `POST /users` – Cria novo usuário (admin)
  - `PUT /users/:id` – Atualiza usuário
  - `DELETE /users/:id` – Soft delete (admin)

## 📁 Estrutura de Pastas

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

## ⚙️ .env

```bash
PORT=3000

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=boilerplate_db
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
```

## 🐋 docker-compose.yml

```bash
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - DB_HOST=localhost
      - DB_USER=postgres
      - DB_PASSWORD=postgres
      - DB_NAME=boilerplate_db
      - DB_PORT=5432
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - JWT_SECRET=your_jwt_secret
      - JWT_EXPIRES_IN=1d
    depends_on:
      - db
      - redis
    volumes:
      - .:/app
    command: npm run dev

  db:
    image: postgres:14
    environment:
      POSTGRES_DB: boilerplate_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:6
    ports:
      - '6379:6379'

volumes:
  postgres_data:
```

## 👥 Autor

Desenvolvido com ❤️ por Hudson Miranda