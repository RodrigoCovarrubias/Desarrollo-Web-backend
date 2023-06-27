const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
  nombre: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
  apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  edad: /^.{1,2}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/
}

const campos = {
  nombre: false,
  apellido: false,
  edad: false,
  correo: false,
  telefono: false
}

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, 'nombre');
      break;
    case "apellido":
      validarCampo(expresiones.apellido, e.target, 'apellido');
      break;
    case "edad":
      validarCampo(expresiones.edad, e.target, 'edad');
      break;
    case "correo":
      validarCampo(expresiones.correo, e.target, 'correo');
      break;
    case "telefono":
      validarCampo(expresiones.telefono, e.target, 'telefono');
      break;
  }
}
// formulario.js

document.addEventListener('DOMContentLoaded', function() {
	const formulario = document.getElementById('formulario');
	const campos = {
	  nombre: false,
	  edad: false,
	  correo: false,
	  telefono: false
	};
  
	formulario.addEventListener('submit', function(e) {
	  e.preventDefault();
  
	  if (campos.nombre && campos.edad && campos.correo && campos.telefono) {
		const formData = new FormData(formulario);
		fetch(formulario.action, {
		  method: 'POST',
		  body: formData
		})
		  .then(function(response) {
			if (!response.ok) {
			  throw new Error('Error submitting the form');
			}
			formulario.reset();
			document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
			setTimeout(function() {
			  document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
			}, 5000);
  
			document.querySelectorAll('.formulario__grupo-correcto').forEach(function(icono) {
			  icono.classList.remove('formulario__grupo-correcto');
			});
		  })
		  .catch(function(error) {
			console.error(error);
			// Handle error case if needed
		  });
	  } else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	  }
	});
  
	const validarCampo = function(expresion, input, campo) {
	  if (expresion.test(input.value)) {
		document.getElementById('grupo__' + campo).classList.remove('formulario__grupo-incorrecto');
		document.getElementById('grupo__' + campo).classList.add('formulario__grupo-correcto');
		document.querySelector('#grupo__' + campo + ' i').classList.add('fa-check-circle');
		document.querySelector('#grupo__' + campo + ' i').classList.remove('fa-times-circle');
		document.querySelector('#grupo__' + campo + ' .formulario__input-error').classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	  } else {
		document.getElementById('grupo__' + campo).classList.add('formulario__grupo-incorrecto');
		document.getElementById('grupo__' + campo).classList.remove('formulario__grupo-correcto');
		document.querySelector('#grupo__' + campo + ' i').classList.add('fa-times-circle');
		document.querySelector('#grupo__' + campo + ' i').classList.remove('fa-check-circle');
		document.querySelector('#grupo__' + campo + ' .formulario__input-error').classList.add('formulario__input-error-activo');
		campos[campo] = false;
	  }
	};
  
	const inputs = document.querySelectorAll('#formulario input');
	inputs.forEach(function(input) {
	  input.addEventListener('keyup', function(e) {
		validarCampo(expresiones[e.target.name], e.target, e.target.name);
	  });
	  input.addEventListener('blur', function(e) {
		validarCampo(expresiones[e.target.name], e.target, e.target.name);
	  });
	});
  });
  