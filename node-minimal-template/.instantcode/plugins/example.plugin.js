module.exports = async (config)=>{
  const schema = config.data.schema.map((obj)=>{
    obj.capitalized = `${obj.id[0].toUpperCase()}${obj.id.substring(1)}`
    obj.slug = obj.id.split(" ").join("-")
    // Fields 
    obj.fields = obj.fields.map((field)=>{
      field.displayName = `${field.id[0].toUpperCase()}${field.id.substring(1)}`
      // if SQLite
      if(config.data.useSQLite && field.type === 'Json'){
        field.type = 'String';
        if(!field.options){
          field.options = {}
        }
        field.options.handleJSON = true;
      }
      return field
    })
    // Parents
    if(Array.isArray(obj.parents)){
      obj.parents = obj.parents.map((parent)=>{
        if(parent.id === 'user'){
          obj.createdByUser = true
        }
        parent.capitalized = `${parent.id[0].toUpperCase()}${parent.id.substring(1)}`
        return parent
      })
    }
    // Children
    if(Array.isArray(obj.children)){
      obj.children = obj.children.map((children)=>{
        children.capitalized = `${children.id[0].toUpperCase()}${children.id.substring(1)}`
        return children
      })
    }
    return obj
  })
  config.data.schema = schema
  return config
}