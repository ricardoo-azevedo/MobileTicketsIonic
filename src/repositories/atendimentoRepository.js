const {PrismaClient } = require ('@prisma/client');

const prisma = new PrismaClient();

class AtendimentoRepository {
  async create (data) {
    return prisma.atendimento.create({data});
  }

  async upddate (id, data) {
    return prisma.atendimento.update({where: {id}, data});
  }
 
  async findAll () {
    return prisma.atendimento.findMany({
      include: {ticket: true, guiche: true}
    });
  }

}

module.exports = new AtendimentoRepository();
