# 🚀 Node.js Boilerplate Backend

This project is a modern and scalable backend boilerplate using Node.js, Express, PostgreSQL, Redis, and JWT, ready for production and Docker deployment.


## 🧰 Technologies Used

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=flat&logo=sequelize&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)
![Joi](https://img.shields.io/badge/Joi-2D9CDB?style=flat)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Passport](https://img.shields.io/badge/Passport.js-34E27A?style=flat)
![Winston](https://img.shields.io/badge/Winston-4C4C4C?style=flat)
![Morgan](https://img.shields.io/badge/Morgan-00758F?style=flat)


## ✅ Features

- 🧑‍💼 Full CRUD for users
- 🔐 Authentication with JWT
- 👮‍♂️ Role-based access control (RBAC: admin/user)
- 🐘 PostgreSQL database (via Sequelize)
- ⚡ Redis caching
- 🧪 Testing with Jest + Supertest
- 📑 Swagger 3.0 (OpenAPI) documentation
- 📦 Docker and Docker Compose
- 🧰 Logging with Winston and Morgan
- 🔎 Validation with Joi
- 📁 Modular structure ready to scale
- 🔄 Versioned API: `/api/v1`

## 🚀 Getting Started

### Prerequisites

- [Node.js v18+](https://nodejs.org/)
- [Docker + Docker Compose](https://docs.docker.com/get-docker/)

### Initialize the project

1. Clone this repository and rename the folder:
```bash
git clone https://github.com/hudson-miranda/nodejs-backend-boilerplate.git your-project-name
```
2. Navigate to the folder:
```bash
cd your-project-name
```

3. Set up your `.env` and/or `docker-compose.yml` file as shown below.

### ⚙️ .env

Copy `.env.example` to `.env` or create a new file with the following config:

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

### 🐋 docker-compose.yml

Create a new `docker-compose.yml` file:

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

### Running with Docker

```bash
docker-compose up --build
```

Access:
API: http://localhost:3000  
Swagger Docs: http://localhost:3000/api-docs

### Running locally (without Docker)

1. Install dependencies:
```bash
npm install
```
2. Set up PostgreSQL and Redis (via Docker or locally)
3. Fill the `.env` file (already provided)
4. Run the initial seed:
```bash
node seed.js
```
5. Start the server:
```bash
npm run dev
```

Access:
API: http://localhost:3000  
Swagger Docs: http://localhost:3000/api-docs

### 🧪 Tests

```bash
npm test
```

## 📑 API Documentation

Available at: http://localhost:3000/api-docs

## 📌 Available Endpoints

> All routes are versioned under the `/api/v1/` prefix  
> Protected routes require a JWT token in the header:  
> `Authorization: Bearer <your_token_here>`

#### 🔐 Auth

| Method | Route               | Description                       | Protected |
|--------|---------------------|-----------------------------------|-----------|
| POST   | `/auth/login`       | Authenticate and get JWT token    | ❌        |
| POST   | `/auth/register`    | Register a new user               | ❌        |

#### 👤 Users

| Method | Route               | Description                             | Protected | Role Required |
|--------|---------------------|-----------------------------------------|-----------|----------------|
| GET    | `/users`            | Get all users                           | ✅        | any            |
| GET    | `/users/:id`        | Get user by ID                          | ✅        | any            |
| POST   | `/users`            | Create a new user                       | ✅        | `admin`        |
| PUT    | `/users/:id`        | Update a user                           | ✅        | any            |
| DELETE | `/users/:id`        | Soft delete a user                      | ✅        | `admin`        |

📢 *All protected routes must include token in header:*  
```http
Authorization: Bearer <token>
```

### 📌 Request Examples

🔑 *Login*  
`POST /api/v1/auth/login`
```json
{
  "email": "admin@email.com",
  "password": "123456"
}
```

📝 *Register*  
`POST /api/v1/auth/register`
```json
{
  "name": "admin",
  "email": "admin@email.com",
  "password": "123456",
  "role": "admin"
}
```

## 📬 Postman Collection

A **Postman collection** is included with all ready-to-use endpoints, organized by group:

📁 File: [`Node.js Boilerplate API.postman_collection.json`](./Node.js%20Boilerplate%20API.postman_collection.json)

### ✅ How to use

1. Open [Postman](https://www.postman.com/)
2. Click on **Import**
3. Select the `Node.js Boilerplate API.postman_collection.json` file in the project root
4. Create a new **Environment** with the following variables:

| Variable  | Value                              |
|-----------|------------------------------------|
| `baseUrl` | `http://localhost:3000/api/v1`     |
| `token`   | *(paste your JWT token here)*      |

5. After logging in, copy the returned JWT token and update the `token` variable.

### 📌 Collection Structure

- **Auth**
  - `POST /auth/register` – User registration
  - `POST /auth/login` – Login (returns JWT)

- **Users** (Requires JWT)
  - `GET /users` – Get all users
  - `GET /users/:id` – Get user by ID
  - `POST /users` – Create new user (admin only)
  - `PUT /users/:id` – Update user
  - `DELETE /users/:id` – Soft delete (admin only)

## 📁 Folder Structure

```bash
src/
├── auth/                 # Auth and Passport JWT
├── config/               # Config files (DB, JWT, Redis, Swagger)
├── controllers/          # Endpoint logic
├── middlewares/          # Middleware (auth, RBAC, validation)
├── models/               # Sequelize models
├── routes/               # Organized routes
├── services/             # Business logic
├── utils/                # Utility helpers
├── validations/          # Joi Schemas
├── app.js                # Express initialization
server.js                 # Entry point
```

## 👥 Author

Developed with ❤️ by Hudson Miranda