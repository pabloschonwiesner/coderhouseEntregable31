const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
require('dotenv').config()
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const Usuario = require('./models/usuario.model')
const numCPUs = require('os').cpus().length

const UsuarioServicio = require('./services/usuario.service')

const app = express()
const usuarioServicio = new UsuarioServicio()

let facebookId, facebookSecret, port, arrObj = []

console.log(process.argv)

process.argv.forEach( arg => {
  console.log(arg)
  let arrArg = arg.split('=')
  arrObj.push({ clave: arrArg[0], valor: arrArg[1]})
})

let findFacebookId = arrObj.find( item => item.clave.toLowerCase() == 'facebookid')
let findFacebookSecret = arrObj.find( item => item.clave.toLowerCase() == 'facebooksecret')
let findPort = arrObj.find( item => item.clave.toLowerCase() == 'port')
let findModo = arrObj.find( item => item.clave.toLowerCase() == 'modo')

facebookId = findFacebookId ? findFacebookId.valor : process.env.FACEBOOK_CLIENT_ID
facebookSecret = findFacebookSecret ? findFacebookSecret.valor : process.env.FACEBOOK_CLIENT_SECRET
port = findPort ? findPort.valor : process.env.PORT
modo = findModo ? findModo.valor : process.env.MODO

// console.log(process)


app.use(session({
  secret: 'clavesecreta',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/ecommerce'}),
  cookie: {
    maxAge: 600000
  }
}))

app.use(passport.initialize());
app.use(passport.session());

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main.hbs'}))
app.set('view engine', '.hbs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


checkIsAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    next()
  } else {
    res.render('login')
  }
}



passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuario.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use('facebook', new FacebookStrategy({
  clientID: facebookId, 
  clientSecret: facebookSecret, 
  callbackURL: `http://localhost:${port}/auth/facebook/callback`, 
  profileFields: ['id', 'displayName', 'email', 'picture'] },
  async ( accessToken, refreshToken, profile, cb) => { 
    try {
      let usuarioDB = await usuarioServicio.getUserByIdFacebook( profile.id )
      if(usuarioDB) {
        return cb(null, usuarioDB)
      } else {
        let newUser = await usuarioServicio.add( profile )
        return cb(null, newUser)
      }
    } catch ( err ) { console.log(err); return cb(err)}
  })
)


app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }))

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login'}), (req, res) => {
  req.session.facebookId = req.user.facebookId
  res.redirect(`/perfil`)
})

app.get('/', (req, res) => {  
  if(req.session.usuario) {
    res.redirect(`/perfil`)
  } else {
    res.redirect('/login')
  }
})

app.get('/perfil', checkIsAuthenticated, async  (req, res) => {
  let perfil = await usuarioServicio.getUserByIdFacebook(req.session.facebookId)
  console.log(perfil)
  res.render('perfil', { perfil } )     
})

app.get('/login', (req, res) => {
  let usuarioExistente = JSON.parse(req.query.ue || false)
  let passwordIncorrecto = JSON.parse(req.query.pi || false)
  res.render('login', { usuarioExistente, passwordIncorrecto, text: `${process.pid} ${port}` } )
})

app.get('/salir', (req, res) => {
  req.session.destroy( () => {
    res.redirect('/')
  })
})

app.get('/info', (req, res) => {
  let argumentosEntrada = []
  for(let i = 2; i < process.argv.length; i++) {
    argumentosEntrada.push(process.argv[i])
  }


  let infoProcess = {
    argumentosEntrada: argumentosEntrada.join(', '),
    so: process.platform,
    versionNode: process.version,
    usoMemoria: process.memoryUsage().rss,
    pathEjecucion: process.execPath,
    processId: process.pid,
    directorioActual: process.cwd(),
    procesadores: numCPUs

  }

  res.render('process', { infoProcess } )
})

app.get('/random', (req, res) => {
  let cantidad = req.query.cant
  let resultado = {}

  if(!cantidad || cantidad <= 0) {
    cantidad = 500000000
  }
  for(let i = 0; i < cantidad.cantidad; i++) {
    let valor = Math.floor(Math.random() * 1000) +1

    if(!resultado || !resultado.hasOwnProperty(valor)) {
      resultado[valor] = 0
    }
    resultado[valor]++
  }
  return res.status(200).json(resultado) 
})




app.listen(port, () => {
  console.log(`Escuchando el puerto ${port}`)
})
app.on('error', (err) => { console.log(`Error de conexion: ${err}`)})

