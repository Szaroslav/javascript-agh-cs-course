const express = require('express');
const { getItems, getItem, addItem, updateItem } = require('../conn');

const router = express.Router();
// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

const rentOrReturn = async (rent, res) => {
    const logical_function = (rent ? v => !v : v => v);
    const query = {
        rented: logical_function(true),
        sold: false
    };
    const availableVehicle = await getItem(query);

    if (availableVehicle) {
        await updateItem(query, {
            $set: { rented: logical_function(false) }
        });
        return { status: 200 };
    }
    else {
        return { status: 404 };
    }
};

router.get('/', async (req, res) => {
    res.set(res.locals.header);
    res.status(200).json(await getItems());
});

router.post('/', async (req, res) => {
    res.set(res.locals.header);
    console.log(req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
        console.error('Invalid request body');
        res.status(400).send();
    }
    else {
        await addItem(req.body);
        res.status(200).json(req.body);
    }
});

router.get('/rent', async (req, res) => {
    const { status } = await rentOrReturn(true, res);
    res.set(res.locals.header);
    res.status(status).send();
});

router.get('/return', async (req, res) => {
    const { status } = await rentOrReturn(false, res);
    res.set(res.locals.header);
    res.status(status).send();
});

router.get('/sell', async (req, res) => {
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
