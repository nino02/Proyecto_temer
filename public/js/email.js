function sendMail(mail, subject, text) {
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: mail, // Dirección del destinatario
            subject: subject, // Asunto del correo
            text: text, // Contenido del mensaje
        }),
    })
        .then((response) => {
            
            if (!response.ok) {
                throw new Error("Error al enviar el correo");
            }
            return response.text();
        })
        .then((data) => {
            alert("Correo enviado con éxito.");
            console.log("Respuesta del servidor:", data);
        })
        .catch((error) => {
            alert("Hubo un problema al enviar el correo.");
            console.error("Error:", error);
        })
        .finally(() => {
            // Ocultar el mensaje de carga
        });
}
