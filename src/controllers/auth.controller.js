const authService = require('../services/auth.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);

  if (!result) return res.status(401).json({ error: 'Credenciais inválidas' });
  res.json(result);
};

const register = async (req, res) => {
  const user = await authService.register(req.body);
  res.status(201).json(user);
};

module.exports = { login, register };
