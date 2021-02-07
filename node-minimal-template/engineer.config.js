const examplePlugin = require("./.engineer/plugins/example.plugin");

const main = async ()=>{

  let config = {
    "data" : require('./../instantcode.schema.json'),
    "fileTemplates" : [
      {
        "src" : "./.engineer/files/service.js",
        "dest" : "./src/services/[id].js",
        "key" : "schema"
      },
      {
        "src" : "./.engineer/files/route.js",
        "dest" : "./src/routes/[id].js",
        "key" : "schema"
      },
      {
        "src" : "./.engineer/files/app.js",
        "dest" : "./src/app.js"
      },
      {
        "src" : "./.engineer/files/schema.prisma",
        "dest" : "./prisma/schema.prisma"
      }
    ]
  }


  
  config = await examplePlugin(config)

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
    }
  }
  
  return config

}

module.exports = main()