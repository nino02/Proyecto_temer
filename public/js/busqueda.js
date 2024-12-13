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
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log("Datos obtenidos:", data);
                renderHotelCards(data);
            })
            .catch(error => {
                console.error("Error al realizar el fetch:", error);
                alert("Hubo un problema al obtener los datos. Inténtalo de nuevo.");
            });
    });

    const suggestionsList = document.getElementById("suggestions");

    // Lista de destinos predefinidos
    const destinations = [
        "Álava/Araba",
        "Albacete",
        "Alicante/Alacant",
        "Almería",
        "Asturias",
        "Ávila",
        "Badajoz",
        "Baleares/Illes Balears",
        "Barcelona",
        "Burgos",
        "Cáceres",
        "Cádiz",
        "Cantabria",
        "Castellón/Castelló",
        "Ciudad Real",
        "Córdoba",
        "Cuenca",
        "Gerona/Girona",
        "Granada",
        "Guadalajara",
        "Guipúzcoa/Gipuzkoa",
        "Huelva",
        "Huesca",
        "Jaén",
        "La Coruña/A Coruña",
        "La Rioja",
        "Las Palmas",
        "León",
        "Lérida/Lleida",
        "Lugo",
        "Madrid",
        "Málaga",
        "Murcia",
        "Navarra",
        "Orense/Ourense",
        "Palencia",
        "Pontevedra",
        "Salamanca",
        "Segovia",
        "Sevilla",
        "Soria",
        "Tarragona",
        "Santa Cruz de Tenerife",
        "Teruel",
        "Toledo",
        "Valencia/València",
        "Valladolid",
        "Vizcaya/Bizkaia",
        "Zamora",
        "Zaragoza",
        "Ceuta",
        "Melilla"
    ];
    

    // Función para mostrar sugerencias
    function showSuggestions(query) {
        suggestionsList.innerHTML = ""; // Limpiar sugerencias previas
        if (!query) {
            suggestionsList.classList.remove("active");
            return; // No mostrar nada si el campo está vacío
        }
        suggestionsList.classList.add("active");
        // Filtrar destinos que coincidan con el texto ingresado
        const filtered = destinations.filter(dest =>
            dest.toLowerCase().includes(query.toLowerCase())
        );

        // Crear elementos de lista para las sugerencias
        filtered.forEach(dest => {
            const li = document.createElement("li");
            li.textContent = dest;

            // Añadir evento al hacer clic en una sugerencia
            li.addEventListener("click", () => {
                destinationInput.value = dest; // Actualizar el campo con la sugerencia seleccionada
                suggestionsList.innerHTML = ""; // Limpiar las sugerencias
                suggestionsList.classList.remove("active");
            });

            suggestionsList.appendChild(li);
        });
        //if (length(filtered) == 0 || length(filtered) == 1) suggestionsList.classList.remove("active");
    }

    // Escuchar el evento "input" en el campo de destino
    destinationInput.addEventListener("input", () => {
        const query = destinationInput.value.trim();
        showSuggestions(query);
    });

    // Ocultar sugerencias al hacer clic fuera del campo
    document.addEventListener("click", (event) => {
        if (!suggestionsList.contains(event.target) && event.target !== destinationInput) {
            suggestionsList.innerHTML = "";
        }
    });
    
});

// Función para crear tarjetas de hoteles
function renderHotelCards(hotels) {
    const hotelList = document.getElementById("hotel-list");
    hotelList.innerHTML = ""; // Limpiar contenido previo

    if (hotels.length === 0) {
        hotelList.innerHTML = "<p>No se encontraron hoteles para los criterios seleccionados.</p>";
        return;
    }

    hotels.forEach(hotel => {
        const card = document.createElement("div");
        card.classList.add("hotel-card");

        card.innerHTML = `
            <img src="https://via.placeholder.com/300x200" alt="Imagen de ${hotel.name}" class="hotel-image">
            <div class="hotel-info">
                <h2 class="hotel-name">${hotel.name}</h2>
                <p class="hotel-price">Precio: ${hotel.price || "No disponible"}</p>
                <p class="hotel-rating">Valoración: ${hotel.rating || "No disponible"} ★</p>
                <p class="hotel-telephone">Teléfono: ${hotel.telephone || "No disponible"}</p>
            </div>
        `;

        hotelList.appendChild(card);
    });
}
