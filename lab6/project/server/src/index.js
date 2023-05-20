const express = require('express');
const vehicle = require('./routes/vehicle');
const user = require('./routes/user');
const { init } = require('./conn');

const PORT = 8000;
const SERVER_URL = `http://localhost:${PORT}`;

const corsMiddleware = async (req, res, next) => {
    res.locals.header = {
        'Access-Control-Allow-Origin': '*'
    };

    next();
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/vehicles', corsMiddleware, vehicle);
app.use('/users', corsMiddleware, user);

app.listen(PORT, () => {
    console.log(`The server was started on port ${PORT}`);
    console.log(`The server URL: ${SERVER_URL}/`);
    console.log('To stop the server, press "CTRL + C"');

    init();
});
