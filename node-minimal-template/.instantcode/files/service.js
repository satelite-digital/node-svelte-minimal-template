const prisma = require('../prisma')

module.exports = {
  {{#if options.isUser}}
  findOrCreate: async (oAuthData) => {
    
    try {
      const {{id}} = await prisma.{{id}}.findFirst( { where : { oAuthId: oAuthData.id } });

      if (!{{id}}) {
        const new{{capitalized}} =  await prisma.{{id}}.create({ data : {oAuthId: oAuthData.id, oAuthData: oAuthData} })
        return new{{capitalized}}
      }
      return {{id}};
    } catch (e) {
      return Error('User not found');
    }
  },
  {{/if}}
  findMany: async (id) => {
    return prisma.{{id}}.findMany();
  },
  findById: async (id) => {
    return prisma.{{id}}.findUnique({ where : { id: id } });
  },
  create : async (data, user)=>{
    return prisma.{{id}}.create({ data })
  },
  update : async (id, data)=>{
    return prisma.{{id}}.update({ data , where : {
      id : id || prisma.{{id}}.id
    } })
  },
  delete : async (id)=>{
    return prisma.{{id}}.delete({
      where : {
        id : id 
      }
    })
  }
};
