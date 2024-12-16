document.addEventListener("DOMContentLoaded", () => { 
    document.getElementById("button-reservation").addEventListener("click", function () {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = 'Prueba de correo';
      sendMail(email,subject,message);
    });
    const { hotel, precio } = getQueryParams();
    const reservationDetails = document.getElementById("message");
  
    if (hotel && precio) {
        // Mostrar los detalles del hotel si están en la URL
        reservationDetails.innerHTML = `Has seleccionado:          
Hotel: ${hotel}
${precio}
                  
Por favor, completa el formulario y contacta con nosotros para reservar.`;
}       
});
