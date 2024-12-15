const nodemailer = require("nodemailer");
console.log("Nodemailer instalado correctamente");


// Configuración del servidor SMTP (no seguro)
const transporter = nodemailer.createTransport({
    host: "smtp.upv.es", // Cambia por tu servidor SMTP
    port: 25, // Puerto no seguro
    secure: false, // false para conexiones no cifradas
});

// Configuración del mensaje
const mailOptions = {
    from: "no-reply@upv.es", // Dirección del remitente
    to: "anavalm@teleco.upv.es", // Dirección del destinatario
    subject: "Reply: Duda de la matricula", // Asunto del correo
    text: "Prueba de correo", // Contenido del mensaje
};

// Envío del correo
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("Error al enviar correo:", error);
    } else {
        console.log("Correo enviado con éxito:", info.response);
    }
});
