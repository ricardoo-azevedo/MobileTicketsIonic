const ticketService = require("../services/ticketService");

class TicketController {

  async criar(req, res) {
    try {
      const { tipo } = req.body;

      if (!tipo || !["SP", "SG", "SE"].includes(tipo)) {
        return res.status(400).json({ error: "Tipo inválido (SP, SG, SE)" });
      }

      const ticket = await ticketService.criarTicket(tipo);

      return res.status(201).json(ticket);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async listar(req, res) {
    try {
      const tickets = await ticketService.listarTickets();
      return res.json(tickets);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new TicketController();
