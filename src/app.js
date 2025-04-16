require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const morgan = require('morgan');
const logger = require('./config/logger');

const app = express();

// Body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging HTTP requests
app.use(morgan('combined', {
  stream: {
    write: message => logger.info(message.trim())
  }
}));

// Auth e Passport
app.use(passport.initialize());
require('./auth/passport')(passport);

// Rotas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota raiz
app.get('/', (req, res) => res.send('🚀 Boilerplate Node.js API rodando!'));

module.exports = app;
