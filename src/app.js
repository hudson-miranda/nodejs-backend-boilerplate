require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./auth/passport')(passport);
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const morgan = require('morgan');
const logger = require('./config/logger');

const app = express();

//Logging
app.use(morgan('combined', {
    stream: {
      write: message => logger.info(message.trim())
    }
  }));

//Auth
app.use('/api/v1/auth', authRoutes);

// Middlewares
app.use(bodyParser.json());
app.use(passport.initialize());

// Rotas
app.use('/api/v1/users', userRoutes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota raiz
app.get('/', (req, res) => res.send('🚀 Boilerplate Node.js API rodando!'));

// Exporta app para uso externo
module.exports = app;
