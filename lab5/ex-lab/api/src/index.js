const express = require('express');
const vehicles = require('./vehicles').data;
const fs = require('fs');
const vehicle = require('./route/vehicle');

const app = express();
app.use('/vehicle', vehicle);

app.listen(8000, () => {
    console.log('The server was started on port 8000');
    console.log('The server URL: http://localhost:8000/');
    console.log('To stop the server, press "CTRL + C"');
});

