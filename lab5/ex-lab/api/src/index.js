const express = require('express');
const path = require('path');
const fs = require('fs');
const vehicle = require('./routes/vehicle');
const { init } = require('./conn');

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

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(8000, () => {
    console.log('The server was started on port 8000');
    console.log('The server URL: http://localhost:8000/');
    console.log('To stop the server, press "CTRL + C"');

    init();
});

