const axios = require('axios');

const url = 'https://api.makcorps.com/city';
const params = {
    cityid: '60763',
    pagination: '0',
    cur: 'USD',
    rooms: '1',
    adults: '2',
    checkin: '2024-12-25',
    checkout: '2024-12-26',
    api_key: '675aa5e2a771d7d95a4a46af'
};

axios.get(url, { params })
    .then(response => {
        // Log or process the response data
        console.log(response.data);
    })
    .catch(error => {
        // Log or handle the error
        console.error(`Error: ${error.message}`);
    });
