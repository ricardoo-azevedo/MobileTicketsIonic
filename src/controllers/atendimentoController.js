const atendimentoService = require('../services/atendimentoService');

class AtendimentoController {

  async chamarProximo(req, res) {
    try {
      const { guicheId } = req.body;

      if (!guicheId) {
        return res.status(400).json({ error: "guicheId é obrigatório" });
      }

      const atendimento = await atendimentoService.chamarProximo(guicheId);

      if (!atendimento) {
        return res.json({ message: "Nenhum ticket disponível" });
      }

      return res.json(atendimento);

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async listarAtendimentos(req, res) {
    try {
      const atendimentos = await atendimentoService.listarAtendimentos();
      return res.json(atendimentos);

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async ultimasChamadas(req, res) {
    try {
      const ultimas = atendimentoService.listarUltimasChamadas();
      return res.json(ultimas);

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

}

module.exports = new AtendimentoController();
