
document.addEventListener("DOMContentLoaded", () => { 
    document.getElementById("button-reservation").addEventListener("click", function () {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value + "\n Se ha realizado la reserva";
      sendMail(email,subject,message);
    });
    function getQueryParams() {
      const params = new URLSearchParams(window.location.search);
      return {
          hotel: params.get("hotel"),
          precio: params.get("precio"),
      };
  }
    const { hotel, precio } = getQueryParams();
    const reservationDetails = document.getElementById("message");
  
    if (hotel && precio) {
        // Mostrar los detalles del hotel si están en la URL
        reservationDetails.innerHTML = `Has seleccionado:          
Hotel: ${hotel}
${precio}
                  
`;
}       
});
