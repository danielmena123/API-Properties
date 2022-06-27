const express = require('express');
const usuarioController = require('../controllers/usuarios.controllers');

const router = express.Router();

router.post('/register', usuarioController.crearUsuario);
router.post('/login', usuarioController.loginUsuario);

module.exports = router;