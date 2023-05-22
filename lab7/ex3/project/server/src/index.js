const express = require('express');
const cors = require('cors');
const vehicle = require('./routes/vehicle');
const user = require('./routes/user');
const { init } = require('./conn');

const PORT = 8000;
const SERVER_URL = `http://localhost:${PORT}`;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/vehicles', vehicle);
app.use('/users', user);

app.listen(PORT, () => {
    console.log('');
    console.log(`The server was started on port ${PORT}`);
    console.log(`The server URL: ${SERVER_URL}/`);
    console.log('To stop the server, press "CTRL + C"');

    init();
});
