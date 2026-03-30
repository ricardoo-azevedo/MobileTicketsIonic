const guicheService = require('../services/guicheService');

class GuicheController {

  async criar(req, res) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ error: "Nome é obrigatório" });
      }

      const guiche = await guicheService.criarGuiche(nome);

      return res.status(201).json(guiche);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async listar(req, res) {
    try {
      const guiches = await guicheService.listarGuiches();
      return res.json(guiches);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const guiche = await guicheService.buscarPorId(Number(id));

      if (!guiche) {
        return res.status(404).json({ error: "Guichê não encontrado" });
      }

      return res.json(guiche);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const dados = req.body;

      const guiche = await guicheService.atualizarGuiche(Number(id), dados);

      return res.json(guiche);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async ativar(req, res) {
    try {
      const { id } = req.params;

      const guiche = await guicheService.atualizarGuiche(Number(id), { ativo: true });

      return res.json(guiche);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async desativar(req, res) {
    try {
      const { id } = req.params;

      const guiche = await guicheService.atualizarGuiche(Number(id), { ativo: false });

      return res.json(guiche);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new GuicheController();
