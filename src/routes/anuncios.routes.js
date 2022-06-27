const express = require('express');
const anuncioController = require('../controllers/anuncios.controllers');
const router = express.Router();
const authGuard = require('../middlewares/authjwt');

router.get('/properties', authGuard.Authorize, anuncioController.obtenerAnuncios);
router.post('/properties', authGuard.Authorize, anuncioController.fileUpload, anuncioController.crearAnuncio);
router.put('/properties/:id', authGuard.Authorize, anuncioController.fileUpload, anuncioController.actualizarAnuncios);
router.delete('/properties/:id', authGuard.Authorize, anuncioController.eliminarAnuncios);

module.exports = router;