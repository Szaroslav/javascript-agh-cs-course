const express = require('express');
const path = require('path');
const fs = require('fs');
const vehicle = require('./routes/vehicle');
const { init, getItems } = require('./conn');

const PORT = 8000;
const SERVER_URL = `http://localhost:${PORT}`;

const corsMiddleware = async (req, res, next) => {
    res.locals.header = {
        'Access-Control-Allow-Origin': '*'
    };

    next();
};

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/vehicle', corsMiddleware, vehicle);

app.get('/', async (req, res) => {
    const vehicles = await getItems();
    res.render('home', { SERVER_URL: SERVER_URL, vehicles: vehicles });
});

app.get('/dealer', (req, res) => {
    res.render('dealer', {
        SERVER_URL: SERVER_URL,
        addVehicleTextInputs: [ 'Manufacturer', 'Model', 'Year', 'Description' ]
    });
});

app.get('/client', (req, res) => {
    res.render('client', { SERVER_URL: SERVER_URL });
});

app.listen(8000, () => {
    console.log(`The server was started on port ${PORT}`);
    console.log(`The server URL: ${SERVER_URL}/`);
    console.log('To stop the server, press "CTRL + C"');

    init();
});

