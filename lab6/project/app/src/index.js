const express = require('express');
const path = require('path');
const asyncHandler = require('express-async-handler');

const PORT = 2137;
const APPLICATION_URL = `http://localhost:${PORT}`;
const SERVER_URL = 'http://localhost:8000';

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', asyncHandler(async (req, res) => {
    const vehicles = await fetch(`${SERVER_URL}/vehicles`)
        .then(res => {
            if (!res.ok)
                throw Error('[Error] Couldn\'t get the vehicles');
            return res.json();
        });
    const users = await fetch(`${SERVER_URL}/users`)
        .then(res => {
            if (!res.ok)
                throw Error('[Error] Couldn\'t get the users');
            return res.json();
        });
    
    res.render('home', { APPLICATION_URL: APPLICATION_URL, vehicles: vehicles, users: users });
}));

app.get('/dealer', (req, res) => {
    res.render('dealer', {
        APPLICATION_URL: APPLICATION_URL,
        addVehicleTextInputs: [ 'Manufacturer', 'Model', 'Year', 'Description' ]
    });
});

app.get('/client', (req, res) => {
    res.render('client', { APPLICATION_URL: APPLICATION_URL });
});

app.listen(PORT, () => {
    console.log(`The application was started on port ${PORT}`);
    console.log(`The application URL: ${APPLICATION_URL}/`);
    console.log('To stop the application, press "CTRL + C"');
});

