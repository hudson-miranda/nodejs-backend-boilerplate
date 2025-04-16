const userService = require('../services/user.service');
const redisClient = require('../config/redis');

const getAll = async (req, res) => {
    const cacheKey = 'users:all';
  
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));
  
    const users = await userService.getAllUsers();
  
    await redisClient.setEx(cacheKey, 60, JSON.stringify(users)); // expira em 60s
  
    res.json(users);
  };

const getById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
};

const create = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

const update = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
};

const remove = async (req, res) => {
  const user = await userService.deleteUser(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
