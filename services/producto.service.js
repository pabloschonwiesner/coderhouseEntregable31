const Producto = require('./../models/producto.model')


class ProductoServicio {

  async getAll () {
    let prod = await Producto.find({}).lean()

    if(prod.length == 0) {      
      return []
    }
    
    return prod;
  }

  async getOne ( id ) {
    return await Producto.findOne({ id })    
  }

  async add ( producto ) {
    console.log(producto)
    let nuevoProducto = new Producto( { title: producto.title, price: producto.price, thumbnail: producto.thumbnail })
    return await nuevoProducto.save() 
  }

  async update ( producto) {
    return await Producto.updateOne( { id: producto.id }, { title: producto.title, price: producto.price, thumbnail: producto.thumbnail })    
  }

  async delete ( id) {
    return await Producto.deleteOne( {id })
  }
}


module.exports = ProductoServicio