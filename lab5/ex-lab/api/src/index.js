const express = require('express');
const path = require('path');
const fs = require('fs');
const vehicle = require('./routes/vehicle');
const { init, getItems } = require('./conn');

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
    res.render('home', { vehicles: vehicles });
});

app.get('/dealer', (req, res) => {
    res.render('dealer', {
        addVehicleTextInputs: [ 'Manufacturer', 'Model', 'Year', 'Description' ]
    });
});

app.listen(8000, () => {
    console.log('The server was started on port 8000');
    console.log('The server URL: http://localhost:8000/');
    console.log('To stop the server, press "CTRL + C"');

    init();
});

