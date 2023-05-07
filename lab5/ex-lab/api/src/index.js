const http = require('node:http');
const { URL } = require('node:url');
const vehicles = require('./vehicles').data;
const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');

const DATABASE_NAME = 'js-course'
const URI = 'mongodb+srv://szary1:zfQNk1o0h2rMOfU7@wdai-travel-app.m5kjkoq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

const requestListener = async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const header = {
        'Access-Control-Allow-Origin': '*'
    };
    let asynchrous = false;

    console.log(url.pathname, req.method);

    try {
        await client.connect();
        await client.db(DATABASE_NAME);
        console.log("Successfully connected to MongoDB!");

        if (url.pathname === '/vehicle' && req.method === 'GET') {
            header['Content-Type'] = 'application/json; charset=utf-8';
            res.writeHead(200, header);
            res.write(JSON.stringify(vehicles));
        }
        else if (url.pathname === '/vehicle' && req.method === 'POST') {
            asynchrous = true;
            let reqBody;
    
            req.on('data', data => {
                reqBody = JSON.parse(data.toString('utf8'));
                vehicles.push(reqBody);
            });
    
            req.on('end', () => {
                header['Content-Type'] = 'application/json; charset=utf-8';
                
                fs.writeFileSync('./vehicles.json', JSON.stringify(vehicles, null, 4));
    
                res.writeHead(200, header);
                res.write(JSON.stringify(vehicles[vehicles.length - 1]));
                res.end();
            });
            req.on('error', err => {
                console.log(err);
                res.writeHead(400, header);
                res.end();
            });
        }
        else if ((url.pathname === '/vehicle/rent' || url.pathname === '/vehicle/return') && req.method === 'GET') {
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
        }
        else if (url.pathname === '/vehicle/sell' && req.method === 'GET') {
            const availableVehicles = vehicles.filter(vehicle => !vehicle.sold && !vehicle.rented);
    
            if (availableVehicles.length > 0) {
                header['Content-Type'] = 'application/json; charset=utf-8';
                res.writeHead(200, header);
                availableVehicles[0].sold = true;
                res.write(JSON.stringify(availableVehicles[0]));
            }
            else {
                res.writeHead(404, header);
            }
        }
        else {
            res.writeHead(404, header);
        }
    }
    finally {
        await client.close();

        if (!asynchrous)
            res.end();
    }

    

    
};

const start = async () => {
    try {
        await client.connect();
        await client.db(DATABASE_NAME);
        console.log("Successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
};

const server = http.createServer(requestListener);
server.listen(8000);
console.log('The server was started on port 8000');
console.log('To stop the server, press "CTRL + C"');
