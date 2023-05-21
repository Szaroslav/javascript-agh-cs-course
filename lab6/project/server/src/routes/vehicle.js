const express = require('express');
const { getItems, getItem, addItem, updateItem } = require('../conn');
const { ObjectId } = require('mongodb');

const router = express.Router();

// Rent or return helper function
const rentOrReturn = async (rent, ids) => {
    const query = {
        _id: ids.vehicleId
    };
    const vehicle = await getItem(query);

    if (vehicle && vehicle.quantity - (vehicle.sellers.length + vehicle.borrowers.length) > 0) {
        const pushData = {};
        pushData[rent ? 'borrowers' : 'sellers'] = ids.userId;

        await updateItem(query, {
            $push: pushData
        });
        return { status: 200 };
    }
    else {
        return { status: 404 };
    }
};

// Get all items
router.get('/', async (req, res) => {
    res.set(res.locals.header);
    res.status(200).json(await getItems());
});

// Insert a new item
// router.post('/', async (req, res) => {
//     res.set(res.locals.header);
//     console.log(req.body);

//     if (!req.body || Object.keys(req.body).length === 0) {
//         console.error('Invalid request body');
//         res.status(400).send();
//     }
//     else {
//         await addItem(req.body);
//         res.status(200).json(req.body);
//     }
// });

// Rent a vehicle
router.post('/', async (req, res) => {
    const { status } = await rentOrReturn(true, {
        userId: req.body.userId,
        vehicleId: req.body.vehicleId
    });
    console.log('wtf', res.locals.header);
    res.set(res.locals.header);
    res.status(status).send();
});

// Return a vehicle
router.put('/', async (req, res) => {
    const { status } = await rentOrReturn(false, res);
    res.set(res.locals.header);
    res.status(status).send();
});

// Sell a vehicle
router.delete('/', async (req, res) => {
    const query = {
        rented: false,
        sold: false
    };
    const availableVehicle = await getItem(query);

    if (availableVehicle) {
        await updateItem(query, {
            $set: { sold: true }
        });
        res.status(200).send();
    }
    else {
        res.status(404).send();
    }
});

module.exports = router;
