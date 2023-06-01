function validateForm() {
  const email = document.getElementById("exampleInputEmail1").value;
  const password = document.getElementById("exampleInputPassword1").value;

  if (!email || !password) {
    alert("Por favor ingrese correo y contraseña");
    return false;
  }

  return true;
}

document.addEventListener('DOMContentLoaded', function() {
  var eliminarButton = document.getElementById('eliminarButton');
  eliminarButton.addEventListener('click', handleEliminarButtonClick);

  function handleEliminarButtonClick() {
    var csrfToken = eliminarButton.getAttribute('data-csrf-token');
    var checkboxes = document.querySelectorAll('input[name="selected_cuidadores"]:checked');
    
    if (checkboxes.length === 0) {
      alert("Seleccione al menos un cuidador a eliminar.");
      return;
    }
    
    var selectedCuidadores = Array.from(checkboxes).map(function(checkbox) {
      return checkbox.value;
    });

    fetch('/eliminar_cuidadores/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify({ selected_cuidadores: selectedCuidadores })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error updating cuidadores: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  }
});

const actualizarButton = document.getElementById('actualizarButton');
const editarCuidadorModal = document.getElementById('editarCuidadorModal');
const editarCuidadorForm = document.getElementById('editarCuidadorForm');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const passwordInput = document.getElementById('password');
const edadInput = document.getElementById('edad');
const correoInput = document.getElementById('correo');
const telefonoInput = document.getElementById('telefono');
const descripcionInput = document.getElementById('descripcion');

actualizarButton.addEventListener('click', function () {
  const selectedCuidadores = document.querySelectorAll('input[name="selected_cuidadores"]:checked');

  if (selectedCuidadores.length === 1) {
    const cuidador = selectedCuidadores[0].closest('.card-body');
    const cuidadorNombre = cuidador.dataset.nombre || '';
    const cuidadorApellido = cuidador.dataset.apellido || '';
    const cuidadorPassword = cuidador.dataset.password || '';
    const cuidadorEdad = cuidador.dataset.edad || '';
    const cuidadorCorreo = cuidador.dataset.correo || '';
    const cuidadorTelefono = cuidador.dataset.telefono || '';
    const cuidadorDescripcion = cuidador.dataset.descripcion || '';
    const cuidadorId = cuidador.dataset.id;

    nombreInput.value = cuidadorNombre;
    apellidoInput.value = cuidadorApellido;
    passwordInput.value = cuidadorPassword;
    edadInput.value = cuidadorEdad;
    correoInput.value = cuidadorCorreo;
    telefonoInput.value = cuidadorTelefono;
    descripcionInput.value = cuidadorDescripcion;
    document.getElementById('cuidadorId').value = cuidadorId;  // Set the cuidadorId value in the hidden input field

    $(editarCuidadorModal).modal('show');
  } else if (selectedCuidadores.length > 1) {
    alert('Por favor, seleccione solo un cuidador para editar.');
  } else {
    alert('Por favor, seleccione un cuidador para editar.');
  }
});



// ...

editarCuidadorForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = nombreInput.value;
  const apellido = apellidoInput.value;
  const password = passwordInput.value;
  const edad = edadInput.value;
  const correo = correoInput.value;
  const telefono = telefonoInput.value;
  const descripcion = descripcionInput.value;

  const cuidadorId = document.getElementById('cuidadorId').value;
 
  var csrfToken = document.querySelector('#editarCuidadorForm input[name="csrfmiddlewaretoken"]').value;
  const formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('apellido', apellido);
  formData.append('password', password);
  formData.append('edad', edad);
  formData.append('correo', correo);
  formData.append('telefono', telefono);
  formData.append('descripcion', descripcion);

  fetch(`/editar_cuidador/${cuidadorId}/`, {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrfToken
    },
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error updating cuidador: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });

  $(editarCuidadorModal).modal('hide');
});


