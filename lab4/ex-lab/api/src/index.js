const http = require('node:http');
const { URL } = require('node:url');
const vehicles = require('./vehicles');

const requestListener = (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const header = {
        'Access-Control-Allow-Origin': '*'
    };

    if (url.pathname === '/vehicle' && req.method === 'GET') {
        header['Content-Type'] = 'application/json; charset=utf-8';
        res.writeHead(200, header);
        res.write(JSON.stringify(vehicles.data));
        res.end();
    }
    else if ((url.pathname === '/vehicle/rent/' || url.pathname === '/vehicle/return/') && req.method === 'GET') {
        const logical_function = (url.pathname === '/vehicle/rent' ? bool => !bool : bool => bool);
        const availableVehicles = vehicles.filter(vehicle => logical_function(vehicle.rented));

        if (availableVehicles.length > 0) {
            header['Content-Type'] = 'application/json; charset=utf-8';
            res.writeHead(200, header);
            availableVehicles[0].rented = logical_function(false);
            res.write(JSON.stringify(availableVehicles[0]));
        }
        else {
            res.writeHead(404, header);
        }

        res.end();
    }
    else if (url.pathname === '/vehicle/sell/' && req.method === 'GET') {
        const availableVehicles = vehicles.filter(vehicle => !vehicle.sold);

        if (availableVehicles.length > 0) {
            header['Content-Type'] = 'application/json; charset=utf-8';
            res.writeHead(200, header);
            availableVehicles[0].sold = true;
            res.write(JSON.stringify(availableVehicles[0]));
        }
        else {
            res.writeHead(404, header);
        }
        
        res.end();
    }
};

const server = http.createServer(requestListener);
server.listen(8000);
console.log('The server was started on port 8000');
console.log('To stop the server, press "CTRL + C"');