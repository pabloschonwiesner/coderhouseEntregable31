const Usuario = require('./../models/usuario.model')


class UsuarioServicio {

  async getById ( id ) {
    return await Usuario.findById(ObjectID(id))    
  }

  async getOne ( id ) {
    return await Usuario.findOne({ id })    
  }
  
  async getUserByName ( usuario ) {
    return await Usuario.find({ usuario })    
  }

  async getUserByIdFacebook ( facebookId ) {
    return await Usuario.findOne({ facebookId }).lean()
  }

  async add ( usuario ) {
    console.log(usuario)

    let nuevoUsuario = new Usuario( { 
      facebookId: usuario.id || '',  
      usuario: usuario.displayName || '', 
      password: usuario.password || '', 
      email: usuario.emails.length > 0 ? usuario.emails[0].value : '',
      picture: usuario.picture || ''
    })
    return await nuevoUsuario.save() 
  }

}


module.exports = UsuarioServicio