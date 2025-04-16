require('dotenv').config();
const { sequelize } = require('../config/database');
const User = require('../models/user.model'); 

const runSeed = async () => {
  await sequelize.sync({ alter: true });

  const existingAdmin = await User.findOne({ where: { email: 'admin@email.com' } });
  if (existingAdmin) {
    console.log('✅ Admin já existe');
    return process.exit(0);
  }

  await User.create({
    name: 'Administrador',
    email: 'admin@email.com',
    password: '123456',
    role: 'admin'
  });

  console.log('✅ Usuário admin criado com sucesso!');
  process.exit(0);
};

runSeed();
