const express = require('express');
const { getItems, getItem, addItem, updateItem } = require('../conn');
const { ObjectId } = require('mongodb');

const router = express.Router();

// Rent or return helper function
// It doesn't work as should be, but whatever (:
const rentOrReturn = async (rent, ids) => {
    const query = {
        _id: new ObjectId(ids.vehicleId)
    };
    const vehicle = await getItem(query);

    if (vehicle && vehicle.quantity - (vehicle.sellers.length + vehicle.borrowers.length) > 0) {
        const innerUpdateData = {};
        innerUpdateData.borrowers = rent ? ids.userId : 1;
        const updateData = {};
        updateData[rent ? '$push' : '$pop'] = innerUpdateData

        await updateItem(query, updateData);
        return { status: 200, vehicle: vehicle };
    }
    else {
        return { status: 404 };
    }
};

// Get all items
router.get('/', async (req, res) => {
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
    const { status, vehicle } = await rentOrReturn(true, {
        userId: req.body.userId,
        vehicleId: req.body.vehicleId
    });
    res.status(status).json(vehicle);
});

// Return a vehicle
router.put('/', async (req, res) => {
    const { status, vehicle } = await rentOrReturn(false, {
        userId: req.body.userId,
        vehicleId: req.body.vehicleId
    });
    res.status(status).json(vehicle);
});

// Sell a vehicle
router.delete('/', async (req, res) => {
    const query = {
        _id: new ObjectId(req.body.vehicleId)
    };
    const vehicle = await getItem(query);

    if (vehicle && vehicle.quantity - (vehicle.sellers.length + vehicle.borrowers.length) > 0) {
        await updateItem(query, {
            $push: { sellers: req.body.userId }
        });
        return { status: 200, vehicle: vehicle };
    }
    else {
        return { status: 404 };
    }
});

module.exports = router;
