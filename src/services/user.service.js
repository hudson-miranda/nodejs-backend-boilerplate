const User = require('../models/user.model');

const getAllUsers = async () => {
  return User.findAll({ where: { isDeleted: false } });
};

const getUserById = async (id) => {
  return User.findOne({ where: { id, isDeleted: false } });
};

const createUser = async (userData) => {
  return User.create(userData);
};

const updateUser = async (id, updates) => {
  const user = await getUserById(id);
  if (!user) return null;
  return user.update(updates);
};

const deleteUser = async (id) => {
  const user = await getUserById(id);
  if (!user) return null;
  return user.update({ isDeleted: true });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
