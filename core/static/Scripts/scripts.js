
function validateForm() {
  const email = document.getElementById("exampleInputEmail1").value;
  const password = document.getElementById("exampleInputPassword1").value;

  if (!email || !password) {
    alert("Por favor ingrese correo y contraseña");
    return false;
  }

  return true;}


function login(username, password){
  fetch('http://127.0.0.1:8000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(response => response.json()) 
  .then(data=>{
    sessionStorage.setItem('token',data)
    alert(data)
  })
  .catch(error => {
    console.error(error);
  });
}

$('.inicioSesion').click(function(e) {
  e.preventDefault();
  const username = document.querySelector('input[name="usuario"]').value;
  const password = document.querySelector('input[name="contrasena"]').value;
  login(username, password);
  setTimeout(function() {
    location.reload();
  }, 3000);
});



