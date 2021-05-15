const express = require('express')
const bcrypt = require('bcrypt')
const UsuarioServicio = require('./../services/usuario.service')

const router = express.Router()
const usuarioServicio = new UsuarioServicio()

// router.post('/register', async (req, res) => {
//   let usuario = await usuarioServicio.getUserByName(req.body.usuario.toLowerCase())
//   let ue = true
//   if(usuario.length == 0) {
//     ue = false
//     let hashPassword = function ( password ) {
//       return bcrypt.hashSync( password , bcrypt.genSaltSync(10), null)
//     }
  
//     let nuevoUsuario = { 
//       usuario: req.body.usuario.toLowerCase(), 
//       password: hashPassword(req.body.password), 
//       email: req.body.email.toLowerCase()
//     }
  
//     await usuarioServicio.add(nuevoUsuario)
//   }
//   return res.redirect(`/login?ue=${ue}`)  
// })

// router.post('/ingresar', passport.authenticate('login', { failureRedirect: '/login?pi=true'}), async (req, res) => {
//   try {
//     let usuario = await usuarioServicio.getUserByName(req.body.usuario.toLowerCase())
//     if(usuario.length > 0) {
//       if(bcrypt.compareSync(req.body.password, usuario[0].password)) {
//         req.session.usuario = req.body.usuario
//         res.redirect('/producto')
//       } else {
//         return res.redirect(`/login?pi=true`)
//       }
//     }
//   } catch ( err ) { console.log(err) }
// })

// router.get('/salir', (req, res) => {
//   req.session.destroy( () => {
//     res.redirect('/')
//   })
// })

module.exports = router