const express = require('express');
const axios = require('axios');
const app = express();



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
        const hotels = response.data;

        // Filtrar los datos obtenidos de la API
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

// Servir la página web estática
app.use(express.static('public'));

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

// JSON de prueba
const mockData = [
    {
      geocode: { latitude: 38.34288, longitude: -0.478634 },
      telephone: '+34 965 20 50 00',
      name: 'Melia Alicante',
      hotelId: 228599,
      reviews: { rating: 4, count: 7395 },
      vendor1: 'Melia.com',
      price1: '€288'
    },
    {
      geocode: { latitude: 38.34724, longitude: -0.485077 },
      telephone: '+34 965 27 15 88',
      name: 'Occidental Alicante',
      hotelId: 206947,
      reviews: { rating: 4.5, count: 384 },
      vendor1: 'Booking.com',
      price1: '€104'
    },
    {
      geocode: { latitude: 38.34459, longitude: -0.482457 },
      telephone: '+34 914 36 34 78',
      name: 'Hospes Amerigo',
      hotelId: 487077,
      reviews: { rating: 4.5, count: 2144 },
      vendor1: 'Hotels.com',
      price1: '€265'
    },
    {
      geocode: { latitude: 38.35923, longitude: -0.453099 },
      telephone: '+34 965 15 59 79',
      name: 'Hotel Albahia',
      hotelId: 241895,
      reviews: { rating: 3.5, count: 1001 },
      vendor1: 'Barcelo.com',
      price1: '€77'
    },
    {
      geocode: { latitude: 38.342266, longitude: -0.486607 },
      telephone: '+34 965 27 09 10',
      name: 'Casa Alberola Alicante, Curio Collection by Hilton',
      hotelId: 19012371,
      reviews: { rating: 4.5, count: 215 },
      vendor1: 'Booking.com',
      price1: '€193'
    },
    {
      geocode: { latitude: 38.34288, longitude: -0.478634 },
      telephone: '+34 965 20 50 00',
      name: 'Melia Alicante',
      hotelId: 228599,
      reviews: { rating: 4, count: 7395 },
      vendor1: 'Melia.com',
      price1: '€288'
    },
    {
      geocode: { latitude: 38.3833, longitude: -0.410858 },
      telephone: '+34 965 65 01 12',
      name: 'Hotel Almirante',
      hotelId: 289504,
      reviews: { rating: 4, count: 780 },
      vendor1: 'Trip.com',
      price1: '€116'
    },
    {
      geocode: { latitude: 38.34524, longitude: -0.480711 },
      telephone: '+34 965 14 11 18',
      name: 'Old Centre Inn Alicante',
      hotelId: 5483116,
      reviews: { rating: 4, count: 42 },
      vendor1: 'Booking.com',
      price1: '€62'
    },
    {
      geocode: { latitude: 38.36486, longitude: -0.417465 },
      telephone: '+34 965 15 61 85',
      name: 'Hotel Port Alicante City & Beach',
      hotelId: 229442,
      reviews: { rating: 4, count: 134 },
      vendor1: 'Booking.com',
      price1: '€110'
    },
    {
      geocode: { latitude: 38.343964, longitude: -0.483164 },
      telephone: '+34 965 20 30 00',
      name: 'Hotel Alicante Gran Sol, Affiliated by Meliá',
      hotelId: 228649,
      reviews: { rating: 4, count: 1284 },
      vendor1: 'Melia.com',
      price1: '€209'
    },
    {
      geocode: { latitude: 38.3385, longitude: -0.494745 },
      telephone: '+34 965 12 01 78',
      name: 'AC Hotel Alicante',
      hotelId: 601308,
      reviews: { rating: 4, count: 1070 },
      vendor1: 'Booking.com',
      price1: '€114'
    },
    {
      geocode: { latitude: 38.33628, longitude: -0.507216 },
      telephone: '+1 212-219-7607',
      name: 'NH Alicante',
      hotelId: 585481,
      reviews: { rating: 4.5, count: 1126 },
      vendor1: 'Booking.com',
      price1: '€94'
    },
    {
      geocode: { latitude: 38.314075, longitude: -0.517192 },
      telephone: '+34 966 01 10 00',
      name: 'B&B Hotel Alicante',
      hotelId: 1210723,
      reviews: { rating: 3.5, count: 597 },
      vendor1: 'Booking.com',
      price1: '€57'
    },
    {
      geocode: { latitude: 38.34421, longitude: -0.482081 },
      telephone: '+34 965 64 17 95',
      name: 'Hotel SERAWA Alicante',
      hotelId: 19738504,
      reviews: { rating: 4, count: 47 },
      vendor1: 'Booking.com',
      price1: '€106'
    },
    {
      geocode: { latitude: 38.372925, longitude: -0.412583 },
      telephone: '+34 965 16 20 33',
      name: 'Hotel Castilla Alicante',
      hotelId: 1168477,
      reviews: { rating: 4, count: 828 },
      vendor1: 'Booking.com',
      price1: '€79'
    },
    {
      geocode: { latitude: 38.34268, longitude: -0.478366 },
      telephone: '0808-239-8250',
      name: 'The Level at Meliá Alicante',
      hotelId: 16668326,
      reviews: { rating: 4, count: 122 },
      vendor1: 'Hotels.com',
      price1: '€346'
    },
    {
      geocode: { latitude: 38.343964, longitude: -0.483164 },
      telephone: '+34 965 20 30 00',
      name: 'Hotel Alicante Gran Sol, Affiliated by Meliá',
      hotelId: 228649,
      reviews: { rating: 4, count: 1284 },
      vendor1: 'Melia.com',
      price1: '€209'
    },
    {
      geocode: { latitude: 38.34749, longitude: -0.486185 },
      telephone: '+34 966 59 07 00',
      name: 'Eurostars Lucentum',
      hotelId: 605649,
      reviews: { rating: 4, count: 1421 },
      vendor1: 'Booking.com',
      price1: '€100'
    },
    {
      geocode: { latitude: 38.351894, longitude: -0.474673 },
      telephone: '+34 659 89 10 49',
      name: 'Hotel Maya Alicante',
      hotelId: 228631,
      reviews: { rating: 4, count: 2117 },
      vendor1: 'Official website',
      price1: '€92'
    },
    {
      geocode: { latitude: 38.34531, longitude: -0.479915 },
      telephone: '+34 965 59 83 45',
      name: 'Odyssey Rooms Alicante',
      hotelId: 24193309,
      reviews: { rating: 4.5, count: 56 },
      vendor1: 'Hotels.com',
      price1: '€178'
    },
    {
      geocode: { latitude: 38.375076, longitude: -0.421008 },
      telephone: '+34 965 23 50 00',
      name: 'Hotel Alicante Golf',
      hotelId: 248966,
      reviews: { rating: 3.5, count: 758 },
      vendor1: 'Booking.com',
      price1: '€98'
    },
    {
      geocode: { latitude: 38.357685, longitude: -0.430837 },
      telephone: '+34 965 15 27 00',
      name: 'Hotel Boutique Calas de Alicante',
      hotelId: 1370879,
      reviews: { rating: 4, count: 217 },
      vendor1: 'Booking.com',
      price1: '€112'
    },
    {
      geocode: { latitude: 38.34288, longitude: -0.478634 },
      telephone: '+34 965 20 50 00',
      name: 'Melia Alicante',
      hotelId: 228599,
      reviews: { rating: 4, count: 7395 },
      vendor1: 'Melia.com',
      price1: '€288'
    },
    {
      geocode: { latitude: 38.346127, longitude: -0.47977 },
      telephone: '+34 965 21 69 18',
      name: 'Hotel La Milagrosa',
      hotelId: 2095071,
      reviews: { rating: 4, count: 501 },
      vendor1: 'Booking.com',
      price1: '€90'
    },
    {
      geocode: { latitude: 38.340763, longitude: -0.491849 },
      telephone: '+34 965 98 80 08',
      name: 'Eurostars Centrum Alicante',
      hotelId: 483592,
      reviews: { rating: 4, count: 1154 },
      vendor1: 'Booking.com',
      price1: '€110'
    },
    {
      geocode: { latitude: 38.33701, longitude: -0.501824 },
      telephone: '+34 965 11 02 82',
      name: 'Travelodge Alicante Puerto',
      hotelId: 277469,
      reviews: { rating: 3.5, count: 395 },
      vendor1: 'Booking.com',
      price1: '€55'
    },
    {
      geocode: { latitude: 38.313404, longitude: -0.517844 },
      telephone: '+34 965 10 80 40',
      name: 'Ibis Budget Alicante',
      hotelId: 644799,
      reviews: { rating: 3, count: 519 },
      vendor1: 'ibis Budget',
      price1: '€47'
    },
    {
      geocode: { latitude: 38.34511, longitude: -0.480215 },
      telephone: '+34 965 21 07 00',
      name: 'DDC Dormirdcine Alicante',
      hotelId: 20379752,
      reviews: { rating: 4.5, count: 61 },
      vendor1: 'Official website',
      price1: '€119'
    },
    {
      geocode: { latitude: 38.34268, longitude: -0.478366 },
      telephone: '0808-239-8250',
      name: 'The Level at Meliá Alicante',
      hotelId: 16668326,
      reviews: { rating: 4, count: 122 },
      vendor1: 'Melia.com',
      price1: '€364'
    },
    {
      geocode: { latitude: 38.345753, longitude: -0.481563 },
      telephone: '+34 965 21 50 46',
      name: 'Hotel les Monges Palace Boutique',
      hotelId: 312213,
      reviews: { rating: 4, count: 390 },
      vendor1: 'Booking.com',
      price1: '€90'
    },
    {
      geocode: { latitude: 38.344765, longitude: -0.481388 },
      telephone: '+34 965 21 01 88',
      name: 'Hotel Eurostars Mediterranea Plaza',
      hotelId: 630331,
      reviews: { rating: 4, count: 795 },
      vendor1: 'Booking.com',
      price1: '€114'
    },
    {
      geocode: { latitude: 38.344444, longitude: -0.49044 },
      telephone: '+34 965 06 34 74',
      name: 'Estudiotel',
      hotelId: 231492,
      reviews: { rating: 3.5, count: 314 },
      vendor1: 'Booking.com',
      price1: '€77'
    },
    {
      geocode: { latitude: 38.370773, longitude: -0.457597 },
      telephone: '+34 965 15 03 09',
      name: 'Daniya Alicante',
      hotelId: 535546,
      reviews: { rating: 3, count: 502 },
      vendor1: 'Booking.com',
      price1: '€90'
    },
    {
      geocode: { latitude: 38.344852, longitude: -0.494613 },
      telephone: '+34 965 13 19 73',
      name: 'Hotel La City Estacion',
      hotelId: 1084312,
      reviews: { rating: 4, count: 259 },
      vendor1: 'Booking.com',
      price1: '€84'
    },
    {
      geocode: { latitude: 38.34318, longitude: -0.487261 },
      telephone: '+34 675 69 68 26',
      name: 'Balmis Plaza Apartments',
      hotelId: 19176310,
      reviews: { rating: 5, count: 55 },
      vendor1: 'Booking.com',
      price1: '€145'
    },
    [
      {
        totalHotelCount: 453,
        totalpageCount: 15,
        currentPageHotelsCount: 35,
        currentPageNumber: 1
      }
    ]
  ];