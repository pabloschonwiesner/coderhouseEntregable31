const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  facebookId: String,
  usuario: String,
  password: String,
  email: String,
  picture: String
})


usuarioSchema.plugin(AutoIncrement, {inc_field: 'id_usuario'});
module.exports = mongoose.model('Usuario', usuarioSchema)