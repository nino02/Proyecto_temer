let hotelsData = [];

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector(".search-button");
    const destinationInput = document.getElementById("destination");
    const checkinInput = document.getElementById("checkin");
    const checkoutInput = document.getElementById("checkout");
    const adultsInput = document.getElementById("adults");
    const hotelList = document.getElementById("hotel-list");
    document.getElementById("filter-price").addEventListener("click", sortByPrice);
    document.getElementById("filter-alphabetical").addEventListener("click", sortByName);
    document.getElementById("filter-rating").addEventListener("click", sortByRating);
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
        else if (validateDates()) return;
        // Validar fechas
        

        

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
                hotelsData = data;
                renderHotelCards(data);
            })
            .catch(error => {
                console.error("Error al realizar el fetch:", error);
                alert("Hubo un problema al obtener los datos. Inténtalo de nuevo.");
            });
    });

    const suggestionsList = document.getElementById("suggestions");
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

    // Delegar el evento al contenedor
    hotelList.addEventListener("click", (event) => {
        // Verificar si el clic viene de un botón "Reservar"
        if (event.target.classList.contains("reserve-button")) {
            const hotelName = event.target.parentElement.querySelector(".hotel-name").textContent;
            alert(`Has reservado el hotel: ${hotelName}`);
        }
    });

    function validateDates() {
        const checkinDate = new Date(checkinInput.value);
        const checkoutDate = new Date(checkoutInput.value);
        const today = new Date();

        // Eliminar horas, minutos y segundos de la fecha actual
        today.setHours(0, 0, 0, 0);

        if (checkinDate < today) {
            alert("La fecha de Check-in debe ser igual o posterior a la fecha actual.");
            return true;
        }

        if (checkoutDate <= checkinDate) {
            alert("La fecha de Check-out debe ser posterior a la fecha de Check-in.");
            return true;
        }

        return false; // True si ha detectado un error o False si no ha detectado una incoherencia
    }

    // Filtrar por precio (ascendente)
    function sortByPrice() {
        const sorted = [...hotelsData].sort((a, b) => a.price - b.price);
        renderHotelCards(sorted);
    }

    // Filtrar por orden alfabético (ascendente)
    function sortByName() {
        const sorted = [...hotelsData].sort((a, b) => a.name.localeCompare(b.name));
        renderHotelCards(sorted);
    }

    // Filtrar por rating (descendente)
    function sortByRating() {
        const sorted = [...hotelsData].sort((a, b) => b.rating - a.rating);
        renderHotelCards(sorted);
    }

    // Función para crear tarjetas de hoteles
    function renderHotelCards(hotels) {
        hotelList.innerHTML = ""; // Limpiar contenido previo

        if (hotels.length === 0) {
            hotelList.innerHTML = "<p>No se encontraron hoteles para los criterios seleccionados.</p>";
            return;
        }

        hotels.forEach(hotel => {
            const card = document.createElement("div");
            card.classList.add("hotel-card");
            srcImage = "../img/hoteles/hotel"+Math.floor(hotel.rating)+".jpg";
            card.innerHTML = `
                <img src="${srcImage}" alt="Imagen de ${hotel.name}" class="hotel-image width="150" height="100"">
                <div class="hotel-info">
                    <h2 class="hotel-name">${hotel.name}</h2>
                    <p class="hotel-price">Precio: ${hotel.price || "No disponible"}</p>
                    <p class="hotel-rating">Valoración: ${hotel.rating || "No disponible"} ★</p>
                    <p class="hotel-telephone">Teléfono: ${hotel.telephone || "No disponible"}</p>
                </div>
                <button class="reserve-button">Reservar</button>
            `;

            hotelList.appendChild(card);

        });
    }
});



