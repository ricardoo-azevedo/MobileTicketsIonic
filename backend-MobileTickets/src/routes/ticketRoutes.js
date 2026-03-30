const express = require('express');

const router = express.Router();

const ticketController = require('../controllers/ticketController');

router.post('/', ticketController.criar.bind(ticketController));
router.get('/', ticketController.listar.bind(ticketController));


module.exports = router;
