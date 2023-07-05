
    function login() {
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;

      if (username === "admin" && password === "1234") {
        window.location.href = "empleados.html";
      } else {
        alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
      }
    }
  