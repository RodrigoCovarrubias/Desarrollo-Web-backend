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

  var actualizarButton = document.getElementById('actualizarButton');
  var editarCuidadorModal = document.getElementById('editarCuidadorModal');
  var editarCuidadorForm = document.getElementById('editarCuidadorForm');

  actualizarButton.addEventListener('click', function() {
    var selectedCuidadores = document.querySelectorAll('input[name="selected_cuidadores"]:checked');

    if (selectedCuidadores.length === 1) {
      var cuidador = selectedCuidadores[0].closest('.card-body');
      var cuidadorNombre = cuidador.dataset.nombre || '';
      var cuidadorDescripcion = cuidador.dataset.descripcion || '';
      var cuidadorId = cuidador.dataset.id;

      document.getElementById('nombre').value = cuidadorNombre;
      document.getElementById('descripcion').value = cuidadorDescripcion;
      document.getElementById('cuidadorId').value = cuidadorId;

      $(editarCuidadorModal).modal('show');
    } else if (selectedCuidadores.length > 1) {
      alert('Por favor, seleccione solo un cuidador para editar.');
    } else {
      alert('Por favor, seleccione un cuidador para editar.');
    }
  });

  editarCuidadorForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var cuidadorId = document.getElementById('cuidadorId').value;

    // Fetch the cuidador form data and handle the submission
    var formData = new FormData(editarCuidadorForm);
    formData.append('cuidadorId', cuidadorId);

    fetch('/editar_cuidador/' + cuidadorId + '/', {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRFToken': '{{ csrf_token }}'
      }
    })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Error updating cuidador: ' + response.status);
        }
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        $(editarCuidadorModal).modal('hide');
        location.reload();
      })
      .catch(function(error) {
        console.error(error);
      });
  });
});
