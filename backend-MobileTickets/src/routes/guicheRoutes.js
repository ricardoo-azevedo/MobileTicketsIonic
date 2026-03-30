const express = require('express');

const router = express.Router();

const guicheController = require('../controllers/guicheController');

router.post('/', guicheController.criar.bind(guicheController));
router.get('/', guicheController.listar.bind(guicheController));
router.get('/:id', guicheController.buscarPorId.bind(guicheController));

router.put('/:id', guicheController.atualizar.bind(guicheController));

router.patch('/:id/ativar', guicheController.ativar.bind(guicheController));
router.patch('/:id/desativar', guicheController.desativar.bind(guicheController));

module.exports = router;
