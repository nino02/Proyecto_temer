const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const API_KEY = '675d95db5abc14d98a448961'; // API Key de Makcorps

// Ruta principal
app.post('/api/data', async (req, res) => {
    const { cityName, checkin, checkout, adults } = req.body;
    console.log(req.body);
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
        console.log(cityMappingResponse.data);
        // Obtener el primer ID de la ciudad
        const cityId = cityMappingResponse.data[0].document_id;
        console.log(cityId);
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
        const filteredHotels = hotels
            .filter(hotel => hotel.name)
            .map(hotel => ({
                telephone: hotel.telephone,
                rating: hotel.reviews?.rating,
                name: hotel.name,
                price: hotel.price1
            }));

        res.json(filteredHotels);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Error al realizar las consultas', details: error.message });
    }
});

app.use(express.static('public'));
// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
