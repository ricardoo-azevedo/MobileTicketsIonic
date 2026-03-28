const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class GuicheRepository {
  async create(data) {
    return prisma.guiche.create({ data });
  }

  async update(id, data) {
    return prisma.guiche.update({ where: { id }, data });
  }

  async findAll() {
    return prisma.guiche.findMany({ include: { atendimentos: true } });
  }

  async findById(id) {
    return prisma.guiche.findUnique({ where: { id } });
  }
}

module.exports = new GuicheRepository();
