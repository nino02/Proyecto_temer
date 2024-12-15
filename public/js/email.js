function sendMail() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    let statusMessage = document.getElementById("status-message");
    statusMessage.classList.remove("success", "error", "hidden");

    if (!name || !email || !subject || !message) {
        statusMessage.textContent = "Por favor, completa todos los campos.";
        statusMessage.classList.add("error");
        return;
    }

    let parms = { name, email, subject, message };

    emailjs.send("service_8j773kk", "template_5gkjxwn", parms)
        .then(function(response) {
            statusMessage.textContent = "Correo enviado exitosamente. ¡Gracias por contactarnos!";
            statusMessage.classList.add("success");
        })
        .catch(function(error) {
            statusMessage.textContent = "Hubo un error al enviar el correo. Intenta nuevamente.";
            statusMessage.classList.add("error");
            console.error("Error al enviar:", error);
        });
}
