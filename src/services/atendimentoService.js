const atendimentoRepository = require('../repositories/atendimentoRepository');
const ticketRepository = require('../repositories/ticketRepository');

class AtendimentoService {
  constructor() {
    this.ultimoTipoChamado = null;
    this.ultimasChamadas = [];
  }

  async chamarProximo(guicheId) {
    const prioridade = ['SP','SE','SG'];
    const tiposDisponiveis = prioridade.filter(t => t !== this.ultimoTipoChamado);

    const ticket = await ticketRepository.findNext(tiposDisponiveis);
    if (!ticket) return null;

    let tempoPrevisto;
    switch(ticket.tipo) {
      case 'SP': tempoPrevisto = 10 + Math.floor(Math.random()*11); break; 
      case 'SG': tempoPrevisto = 2 + Math.floor(Math.random()*7); break;  
      case 'SE': tempoPrevisto = Math.random() < 0.95 ? 1 : 5; break;
    }

    const now = new Date();

    const atendimento = await atendimentoRepository.create({
      ticketId: ticket.id,
      guicheId,
      dataInicio: now,
      tempoPrevisto
    });

    await ticketRepository.update(ticket.id, { status: 'ATENDIDO', dataChamada: now });

    this.ultimoTipoChamado = ticket.tipo;

    this.ultimasChamadas.unshift({ codigo: ticket.codigo, guicheId });
    if (this.ultimasChamadas.length > 5) this.ultimasChamadas.pop();

    return atendimento;
  }

  listarUltimasChamadas() {
    return this.ultimasChamadas;
  }

  async listarAtendimentos() {
    return atendimentoRepository.findAll();
  }
}

module.exports = new AtendimentoService();
