const guicheRepository = require('../repositories/guicheRepository');

class GuicheService {
  async criarGuiche(nome) {
    return guicheRepository.create({ nome, ativo: true });
  }

  async listarGuiches() {
    return guicheRepository.findAll();
  }

  async atualizarGuiche(id, data) {
    return guicheRepository.update(id, data);
  }

  async buscarPorId(id) {
    return guicheRepository.findById(id);
  }
}

module.exports = new GuicheService();
