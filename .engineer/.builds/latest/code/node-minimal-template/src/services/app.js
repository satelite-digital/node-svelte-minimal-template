const prisma = require('../prisma')

module.exports = {
  findMany: async (id) => {
    return prisma.app.findMany();
  },
  findById: async (id) => {
    return prisma.app.findUnique({ where : { id: id } });
  },
  create : async (data, user)=>{
    return prisma.app.create({ data })
  },
  update : async (id, data)=>{
    return prisma.app.update({ data , where : {
      id : id || prisma.app.id
    } })
  },
  delete : async (id)=>{
    return prisma.app.delete({
      where : {
        id : id 
      }
    })
  }
};
