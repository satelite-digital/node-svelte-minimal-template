const explodeSchemaId = require("./svelte-minimal-template/.instantcode/plugins/explodeSchemaId.plugin");
const examplePlugin = require("./node-minimal-template/.instantcode/plugins/example.plugin");

const main = async ()=>{

  let config = {
    "data" : require('./instantcode.schema.json'),
    "fileTemplates" : [
      {
        "src" : "./svelte-minimal-template/.instantcode/files/page/page.svelte",
        "dest" : "./svelte-minimal-template/src/app/pages/[id]/[id].page.svelte",
        "key" : "schema"
      },
      {
        "src" : "./svelte-minimal-template/.instantcode/files/page/datatable.partial.svelte",
        "dest" : "./svelte-minimal-template/src/app/pages/[id]/datatable.partial.svelte",
        "key" : "schema"
      },
      {
        "src" : "./svelte-minimal-template/.instantcode/files/entity.service.js",
        "dest" : "./svelte-minimal-template/src/app/services/client/[id].service.js",
        "key" : "schema"
      },
      {
        "src" : "./svelte-minimal-template/.instantcode/files/client.index.js",
        "dest" : "./svelte-minimal-template/src/app/services/client/index.js"
      },
      {
        "src" : "./svelte-minimal-template/.instantcode/files/pages.index.js",
        "dest" : "./svelte-minimal-template/src/app/pages/index.js"
      },
      {
        "src" : "./svelte-minimal-template/.instantcode/files/routes.index.js",
        "dest" : "./svelte-minimal-template/src/app/routes/index.js"
      },
      {
        "src" : "./svelte-minimal-template/.instantcode/files/components/Aside.svelte",
        "dest" : "./svelte-minimal-template/src/app/components/molecules/Aside.svelte"
      },
      {
        "src" : "./node-minimal-template/.instantcode/files/service.js",
        "dest" : "./node-minimal-template/src/services/[id].js",
        "key" : "schema"
      },
      {
        "src" : "./node-minimal-template/.instantcode/files/route.js",
        "dest" : "./node-minimal-template/src/routes/[id].js",
        "key" : "schema"
      },
      {
        "src" : "./node-minimal-template/.instantcode/files/app.js",
        "dest" : "./node-minimal-template/src/app.js"
      },
      {
        "src" : "./node-minimal-template/.instantcode/files/schema.prisma",
        "dest" : "./node-minimal-template/prisma/schema.prisma"
      }
    ]
  }

  
  for(schema in config.data.schema){
    if(config.data.schema[schema].id == 'user'){
      config.data.schema[schema].fields.push({
        id : 'oAuthId',
        type : 'String',
        options : {
          optional : true
        }
      })
      config.data.schema[schema].fields.push({
        id : 'oAuthData',
        type : 'Json',
        options : {
          optional : true
        }
      })
      config.data.schema[schema].isUser = true
    }
  }
  

  config = await explodeSchemaId(config)
  
  
  config = await examplePlugin(config)



  return config


}

module.exports = main()