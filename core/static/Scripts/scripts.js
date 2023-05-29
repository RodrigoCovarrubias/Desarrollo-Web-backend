  function validateForm() {
    const email = document.getElementById("exampleInputEmail1").value;
    const password = document.getElementById("exampleInputPassword1").value;

    if (!email || !password) {
      alert("Por favor ingrese correo y contraseña");
      return false;
    }

    return true;
  }

  // Add this JavaScript code after including jQuery and your other scripts
$(document).ready(function() {
  // Handle form submission
  $("#login-button").click(function(e) {
    e.preventDefault();

    var email = $("#exampleInputEmail1").val();
    var password = $("#exampleInputPassword1").val();
    $.ajax({
      url: "/login",
      method: "POST",
      data: {
        email: email,
        password: password
      },
      success: function(response) {
        console.log(response);
       
        window.location.href = "/dashboard";
      },
      error: function(xhr, status, error) {
        console.log(error);

        $("#error-message").text("Login failed. Please try again.");
        $("#error-message").show();
      }
    });
  });
});

