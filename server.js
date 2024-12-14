const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const API_KEY = '675d95db5abc14d98a448961'; // API Key de Makcorps

// Función para filtrar datos relevantes
const filterHotels = (hotels) => {
    return hotels
        .filter(hotel => typeof hotel === "object" && hotel.name) // Ignorar entradas no válidas
        .map(hotel => ({
            telephone: hotel.telephone,
            rating: hotel.reviews?.rating,
            name: hotel.name,
            price: hotel.price1
        }));
};

// Ruta principal
app.post('/api/data', async (req, res) => {
    const { cityName, checkin, checkout, adults } = req.body;
    try {
        // Primera consulta: Obtener el ID de la ciudad
        const cityMappingUrl = 'https://api.makcorps.com/mapping';
        const cityMappingResponse = await axios.get(cityMappingUrl, {
            params: {
                api_key: API_KEY,
                name: cityName 
            }
        });

        if (!cityMappingResponse.data || cityMappingResponse.data.length === 0) {
            return res.status(404).json({ error: `No se encontró el ID para la ciudad: ${cityName}` });
        }
        // Obtener el primer ID de la ciudad
        const cityId = cityMappingResponse.data[0].document_id;
        // Segunda consulta: Buscar hoteles utilizando el ID de la ciudad
        const hotelSearchUrl = 'https://api.makcorps.com/city';
        const hotelSearchResponse = await axios.get(hotelSearchUrl, {
            params: {
                api_key: API_KEY,
                cityid: cityId,
                pagination: '0',
                cur: 'EUR',
                rooms: '1',
                adults: adults || '2',
                checkin: checkin || '2024-12-25',
                checkout: checkout || '2024-12-26'
            }
        });

        // Filtrar los datos relevantes de los hoteles
        const hotels = hotelSearchResponse.data;
        const filteredHotels = filterHotels(hotels);

        res.json(filteredHotels);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Si el error es un 429 (demasiadas solicitudes), filtrar y enviar los datos de prueba
        if (error.response && error.response.status === 429) {
            console.log('Error 429: enviando datos de prueba filtrados.');
            res.status(200).json(filterHotels(mockData));
        } else {
            res.status(500).json({ error: 'Error al consultar la API externa' });
        }
    }
});

app.use(express.static('public'));
// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

const mockData = [
    {
      "geocode": {
        "latitude": 40.762447,
        "longitude": -73.97927
      },
      "telephone": "+1 646-459-6565",
      "name": "Hilton Club The Residences New York",
      "hotelId": 14013137,
      "reviews": {
        "rating": 4.5,
        "count": 193
      },
      "vendor1": "Hilton",
      "price1": "$1,443"
    },
    {
      "geocode": {
        "latitude": 40.755814,
        "longitude": -73.96907
      },
      "telephone": "+1 844-763-7666",
      "name": "Pod 51 Hotel",
      "hotelId": 93358,
      "reviews": {
        "rating": 4,
        "count": 6176
      },
      "vendor1": "Expedia.com",
      "price1": "$215",
      "vendor2": "Booking.com",
      "price2": "$215",
      "vendor3": "Hotels.com",
      "price3": "$215",
      "vendor4": "Priceline",
      "price4": "$161"
    },
    {
      "geocode": {
        "latitude": 40.754547,
        "longitude": -73.98559
      },
      "telephone": "+1 212-730-0099",
      "name": "Luma Hotel Time Square",
      "hotelId": 10679074,
      "reviews": {
        "rating": 5,
        "count": 2583
      },
      "vendor1": "Expedia.com",
      "price1": "$375",
      "vendor2": "Booking.com",
      "price2": "$395",
      "vendor3": "Hotels.com",
      "price3": "$375",
      "vendor4": "Vio.com",
      "price4": "$359"
    },
    {
      "geocode": {
        "latitude": 40.75743,
        "longitude": -73.96978
      },
      "telephone": "+1 212-644-1300",
      "name": "Courtyard by Marriott New York Manhattan / Midtown East",
      "hotelId": 99371,
      "reviews": {
        "rating": 4.5,
        "count": 3041
      },
      "vendor1": "Expedia.com",
      "price1": "$467",
      "vendor2": "Hotels.com",
      "price2": "$467",
      "vendor3": "ZenHotels.com",
      "price3": "$478",
      "vendor4": "Algotels",
      "price4": "$419"
    },
    {
      "geocode": {
        "latitude": 40.71263,
        "longitude": -74.00919
      },
      "telephone": "+1 646-880-1999",
      "name": "Four Seasons Hotel New York Downtown",
      "hotelId": 10330604,
      "reviews": {
        "rating": 4.5,
        "count": 768
      },
      "vendor1": "Expedia.com",
      "price1": "$970",
      "vendor2": "Hotels.com",
      "price2": "$970",
      "vendor3": "FourSeasons.com",
      "price3": "$970",
      "vendor4": "Skyscanner.com",
      "price4": "$911"
    },
    {
      "geocode": {
        "latitude": 40.722992,
        "longitude": -73.997345
      },
      "telephone": "+1 212-226-6400",
      "name": "Crosby Street Hotel",
      "hotelId": 1572980,
      "reviews": {
        "rating": 5,
        "count": 916
      },
      "vendor1": "Design Hotels",
      "price1": "$965",
      "vendor2": "Booking.com",
      "price2": "$965",
      "vendor3": "Priceline",
      "price3": "$965",
      "vendor4": "Skyscanner.com",
      "price4": "$965"
    },
    {
      "geocode": {
        "latitude": 40.76444,
        "longitude": -73.978035
      },
      "telephone": "+1 212-379-0103",
      "name": "Hilton Club West 57th Street New York",
      "hotelId": 1308397,
      "reviews": {
        "rating": 4.5,
        "count": 1930
      },
      "vendor1": "Hilton",
      "price1": "$637"
    },
    {
      "geocode": {
        "latitude": 40.75642,
        "longitude": -73.98555
      },
      "telephone": "+1 212-869-1212",
      "name": "Casablanca Hotel by Library Hotel Collection",
      "hotelId": 113317,
      "reviews": {
        "rating": 5,
        "count": 7421
      },
      "vendor1": "Expedia.com",
      "price1": "$332",
      "vendor2": "Hotels.com",
      "price2": "$332",
      "vendor3": "Orbitz.com",
      "price3": "$332",
      "vendor4": "ZenHotels.com",
      "price4": "$324"
    }];
