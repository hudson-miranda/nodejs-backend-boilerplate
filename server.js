const app = require('./src/app');
const { sequelize } = require('./src/config/database');
const redisClient = require('./src/config/redis');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao PostgreSQL');

    await sequelize.sync({ alter: true }); // em produção, use migrations

    await redisClient.connect();
    console.log('✅ Conectado ao Redis');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
  }
})();
