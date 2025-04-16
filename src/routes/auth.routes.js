const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { userSchema, loginSchema } = require('../validations/user.validation');

router.post('/login', validate(loginSchema), controller.login);
router.post('/register', validate(userSchema), controller.register);

module.exports = router;
