let usuario = document.querySelector('#usuario')
let password = document.querySelector('#password')
let email = document.querySelector('#email')
let title = document.querySelector('#title')
let price = document.querySelector('#price')
let thumbnail = document.querySelector('#thumbnail')
let btnRegistrarse = document.querySelector('#registrarse')
let btnSalir = document.querySelector('#salir')
let btnEnviar = document.querySelector('#enviar')

// if(btnRegistrarse) {
//   btnRegistrarse.addEventListener('click', (event) => {
//     event.preventDefault()
//     console.log('registrarse')
//     fetch('http://localhost:3232/api/register', {
//       method: 'POST',
//       body: JSON.stringify({ usuario: usuario.value, password: password.value, email: email.value}),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }).then( result => result.json())
//       .then( () => window.location.replace('http://localhost:3232/datos'))
//       .catch( err => console.log(err))
      
//   })

// }

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});



function salir ()  {
  console.log('salir')
  fetch('http://localhost:3232/sesion/salir', {
    method: 'GET',
  }).then( result => result.json())
    .then( () => window.location.replace('http://localhost:3232/'))
    .catch( err => console.log(err))
    
}



function deshabilitarBotonRegistro () {
  if(usuario.value != '' && password.value != '' && email.value != '') {
    btnRegistrarse.removeAttribute('disabled')
  } else {
    btnRegistrarse.setAttribute('disabled', true)
  }
}

function deshabilitarBotonEnviar () {
  if(title.value != '' && price.value != '' && thumbnail.value != '') {
    btnEnviar.removeAttribute('disabled')
  } else {
    btnEnviar.setAttribute('disabled', true)
  }
}