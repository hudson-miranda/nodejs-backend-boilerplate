const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const passport = require('passport');
const role = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { userSchema, loginSchema } = require('../validations/user.validation');

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.getAll
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.getById
);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       403:
 *         description: Acesso negado
 */
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    role(['admin']),
    validate(userSchema),
    controller.create
  );

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validate(userSchema),
    controller.update
  );

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Deleta (soft delete) um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       403:
 *         description: Acesso negado
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  role(['admin']),
  controller.remove
);

module.exports = router;
