const express = require('express');
const vehicles = require('./vehicles').data;
const fs = require('fs');
const vehicle = require('./route/vehicle');
const { init } = require('./conn');

const mongoMiddleware = async (req, res, next) => {
    res.locals.header = {
        'Access-Control-Allow-Origin': '*'
    };
    
    next();
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/vehicle', mongoMiddleware, vehicle);

app.listen(8000, () => {
    console.log('The server was started on port 8000');
    console.log('The server URL: http://localhost:8000/');
    console.log('To stop the server, press "CTRL + C"');

    init();
});

