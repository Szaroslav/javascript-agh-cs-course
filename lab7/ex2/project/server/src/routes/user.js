const express = require('express');
const router = express.Router();
const { getUsers } = require('../conn');

// Get all users
router.get('/', async (req, res) => {
    res.set(res.locals.header);
    res.status(200).json(await getUsers());
});

module.exports = router;
