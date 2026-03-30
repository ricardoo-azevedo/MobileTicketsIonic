const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;

class AtendimentoService {
  async chamarProximo(guicheId) {
    const atendimento = await prisma.atendimento.findFirst({
      where: { guicheId, ticket: { status: 'PENDENTE' } },
      orderBy: { ticket: { dataEmissao: 'asc' } },
      include: { ticket: true, guiche: true },
    });

    if (!atendimento) return null;

    await prisma.ticket.update({
      where: { id: atendimento.ticketId },
      data: { status: 'EM_ATENDIMENTO', dataChamada: new Date() },
    });

    atendimento.tempoPrevisto = atendimento.ticket.tipo === 'SP' ? 15 : 10;

    return atendimento;
  }

  async listarAtendimentos() {
    return await prisma.atendimento.findMany({
      include: { ticket: true, guiche: true },
      orderBy: { dataInicio: 'asc' },
    });
  }

  async listarUltimasChamadas() {
    return await prisma.atendimento.findMany({
      include: { ticket: true, guiche: true },
      orderBy: { dataInicio: 'desc' },
      take: 5,
    });
  }

  async limparAtendimentosPendentes() {
    await prisma.ticket.updateMany({
      where: { status: 'PENDENTE' },
      data: { status: 'CANCELADO' },
    });
  }
}

module.exports = new AtendimentoService();
