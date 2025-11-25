<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>

<h1>Iniciar Sesión</h1>

<form id="loginForm">
    <input type="email" placeholder="Email" id="email" required><br><br>
    <input type="password" placeholder="Contraseña" id="password" required><br><br>
    <button type="submit">Entrar</button>
</form>

<p id="error" style="color: red;"></p>

<script>
document.getElementById("loginForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        // Guardar token
        localStorage.setItem("token", data.token);

        // Redirección automática
        window.location.href = "/dashboard";
    } else {
        document.getElementById("error").textContent = data.message || "Credenciales incorrectas";
    }
});
</script>

</body>
</html>
