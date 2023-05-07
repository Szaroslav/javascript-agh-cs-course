const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const DATABASE_NAME = 'js-course';
const COLLECTION_NAME = 'Vehicles';
const URI = 'mongodb+srv://szary1:zfQNk1o0h2rMOfU7@wdai-travel-app.m5kjkoq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

router.use(async (req, res, next) => {
    res.locals.header = {
        'Access-Control-Allow-Origin': '*'
    };

    try {
        await client.connect();
        const database = await client.db(DATABASE_NAME);
        res.locals.collection = await database.collection(COLLECTION_NAME);
        console.log("Successfully connected to MongoDB!");

        next();
    }
    finally {
        await client.close();
    }
});


router.get('/', async (req, res) => {
    res.set(res.locals.header);
    console.log(await res.locals.collection.find({}));
    res.status(200).json(vehicles);
});

router.post('/', (req, res) => {
    asynchrous = true;
    let reqBody;

    console.log(req.body);

    // req.on('data', data => {
    //     reqBody = JSON.parse(data.toString('utf8'));
    //     vehicles.push(reqBody);
    // });

    // req.on('end', () => {
    //     header['Content-Type'] = 'application/json; charset=utf-8';
        
    //     fs.writeFileSync('./vehicles.json', JSON.stringify(vehicles, null, 4));

    //     res.writeHead(200, header);
    //     res.write(JSON.stringify(vehicles[vehicles.length - 1]));
    //     res.end();
    // });
    // req.on('error', err => {
    //     console.log(err);
    //     res.writeHead(400, header);
    //     res.end();
    // });
});

router.get('/rent', (req, res) => {

});

router.get('/return', (req, res) => {

});

router.get('/sell', (req, res) => {

});

// else if (url.pathname === '/vehicle' && req.method === 'POST') {
//     asynchrous = true;
//     let reqBody;

//     req.on('data', data => {
//         reqBody = JSON.parse(data.toString('utf8'));
//         vehicles.push(reqBody);
//     });

//     req.on('end', () => {
//         header['Content-Type'] = 'application/json; charset=utf-8';
        
//         fs.writeFileSync('./vehicles.json', JSON.stringify(vehicles, null, 4));

//         res.writeHead(200, header);
//         res.write(JSON.stringify(vehicles[vehicles.length - 1]));
//         res.end();
//     });
//     req.on('error', err => {
//         console.log(err);
//         res.writeHead(400, header);
//         res.end();
//     });
// }
// else if ((url.pathname === '/vehicle/rent' || url.pathname === '/vehicle/return') && req.method === 'GET') {
//     const logical_function = (url.pathname === '/vehicle/rent' ? bool => !bool : bool => bool);
//     const availableVehicles = vehicles.filter(vehicle => logical_function(vehicle.rented));

//     if (availableVehicles.length > 0) {
//         header['Content-Type'] = 'application/json; charset=utf-8';
//         res.writeHead(200, header);
//         availableVehicles[0].rented = logical_function(false);
//         res.write(JSON.stringify(availableVehicles[0]));
//     }
//     else {
//         res.writeHead(404, header);
//     }
// }
// else if (url.pathname === '/vehicle/sell' && req.method === 'GET') {
//     const availableVehicles = vehicles.filter(vehicle => !vehicle.sold && !vehicle.rented);

//     if (availableVehicles.length > 0) {
//         header['Content-Type'] = 'application/json; charset=utf-8';
//         res.writeHead(200, header);
//         availableVehicles[0].sold = true;
//         res.write(JSON.stringify(availableVehicles[0]));
//     }
//     else {
//         res.writeHead(404, header);
//     }
// }
// else {
//     res.writeHead(404, header);
// }

module.exports = router;