const express = require('express');
const axios = require('axios');
const app = express();

// Ruta para consultar datos desde la API externa
app.get('/api/data', async (req, res) => {
    const url = 'https://api.makcorps.com/city';
    const params = {
        cityid: '1064230',
        pagination: '0',
        cur: 'EUR',
        rooms: '1',
        adults: '2',
        checkin: '2024-12-25',
        checkout: '2024-12-26',
        api_key: '675aa5e2a771d7d95a4a46af'
    };

    try {
        const response = await axios.get(url, { params });
        res.json(response.data); // Enviar el JSON como respuesta
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Error al consultar la API externa' });
    }
});

// Servir la página web estática
app.use(express.static('public'));

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
