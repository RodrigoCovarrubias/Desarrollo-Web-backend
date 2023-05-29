  function validateForm() {
    const email = document.getElementById("exampleInputEmail1").value;
    const password = document.getElementById("exampleInputPassword1").value;

    if (!email || !password) {
      alert("Por favor ingrese correo y contraseña");
      return false;
    }

    return true;
  }
