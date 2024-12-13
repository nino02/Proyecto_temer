document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector(".search-button");
    const destinationInput = document.getElementById("destination");
    const checkinInput = document.getElementById("checkin");
    const checkoutInput = document.getElementById("checkout");
    const adultsInput = document.getElementById("adults");

    searchButton.addEventListener("click", (event) => {
        event.preventDefault();

        const cityid = destinationInput.value.trim(); // ID o nombre de la ciudad
        const checkin = checkinInput.value;
        const checkout = checkoutInput.value;
        const adults = adultsInput.value;

        // Validar los campos antes de enviar
        if (!cityid || !checkin || !checkout || !adults) {
            alert("Por favor, rellena todos los campos.");
            return;
        }

        // Realizar solicitud POST al servidor
        fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cityid, checkin, checkout, adults }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos obtenidos:", data);
                alert(`Datos obtenidos: ${JSON.stringify(data)}`);
            })
            .catch(error => {
                console.error("Error al realizar el fetch:", error);
                alert("Hubo un problema al obtener los datos. Inténtalo de nuevo.");
            });
    });
});
