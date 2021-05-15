const passport = require('passport')
const bcrypt = require('bcrypt')
const { LocalStretegy: Strategy } = require('passport-local')
const UsuarioServicio = require('./../services/usuario.service')

const usuarioServicio = new UsuarioServicio()

function validarPassword ( passwordReq, passwordBD )  {
  return bcrypt.compareSync(passwordReq, passwordBD )
}

passport.use('login', new LocalStretegy({
    passReqToCallback: true
  },
  (req, usuario, password, cb) => { 
    let usuarioDB = await usuarioServicio.getUserByName( usuario )
    if(err) return err
    if(usuario.length > 0) {
      console.log('Usuario encontrado! ')
      if(!validarPassword(password, usuarioDB[0].password)) {
        console.log('Password incorrecto')
      }
      return cb(null, usuario[0])
    } else {
      console.log('Usuario no encontrado! ')
    }
  })
)


module.exports = PassportMiddleware