const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TicketRepository {
  async create(data) {
    return prisma.ticket.create({ data });
  }

  async update(id, data) {
    return prisma.ticket.update({ where: { id }, data });
  }

  async findAll() {
    return prisma.ticket.findMany();
  }

  async findNext(tipos) {
    return prisma.ticket.findFirst({
      where: { tipo: { in: tipos }, status: "EMITIDO" },
      orderBy: { dataEmissao: 'asc' }
    });
  }

  async findByDate(date) {
    const start = new Date(date);
    start.setHours(0,0,0,0);
    const end = new Date(date);
    end.setHours(23,59,59,999);
    return prisma.ticket.findMany({
      where: { dataEmissao: { gte: start, lte: end } }
    });
  }
}

module.exports = new TicketRepository();
