const ticketRepository = require('../repositories/ticketRepository');

class TicketService {
  constructor() {
    this.contadoresDiarios = { SP: 0, SG: 0, SE: 0 };
  }

  async criarTicket(tipo) {
    const agora = new Date();
    
    if (Math.random() < 0.05) {
      return ticketRepository.create({
        codigo: 'DESCARTADO',
        tipo,
        dataEmissao: agora,
        status: 'DESCARTADO'
      });
    }

    const codigo = await this.gerarCodigo(tipo, agora);
    this.contadoresDiarios[tipo]++;

    return ticketRepository.create({
      codigo,
      tipo,
      dataEmissao: agora,
      status: 'EMITIDO'
    });
  }

  async gerarCodigo(tipo, date) {
    const yy = String(date.getFullYear()).slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const seq = this.contadoresDiarios[tipo] + 1;
    return `${yy}${mm}${dd}-${tipo}${seq}`;
  }

  async listarTickets() {
    return ticketRepository.findAll();
  }
}

module.exports = new TicketService();
