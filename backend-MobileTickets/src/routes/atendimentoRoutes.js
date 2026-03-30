const express = require('express');
const router = express.Router();

const atendimentoController = require('../controllers/atendimentoController');

router.post('/chamar-proximo', atendimentoController.chamarProximo.bind(atendimentoController));
router.get('/', atendimentoController.listarAtendimentos.bind(atendimentoController));
router.get('/ultimas-chamadas', atendimentoController.ultimasChamadas.bind(atendimentoController));

module.exports = router;