const { MongoClient, ServerApiVersion } = require('mongodb');

const DATABASE_NAME = 'js-course';
const VEHICLE_COLLECTION_NAME = 'Vehicles';
const USER_COLLECTION_NAME = 'Users';
const URI = 'mongodb+srv://szary1:zfQNk1o0h2rMOfU7@wdai-travel-app.m5kjkoq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

let connection;
let db;
let vehicleCollection;
let userCollection;

const init = async () => {
    try {
        connection = await client.connect();
        db = await connection.db(DATABASE_NAME);
        vehicleCollection = await db.collection(VEHICLE_COLLECTION_NAME);
        userCollection = await db.collection(USER_COLLECTION_NAME);
        console.log("Successfully connected to MongoDB!");
    }
    catch(err) {
        console.error(err);
    }
};

const getItems = async () => {
    const vehicles = [];
    const cursor = await vehicleCollection.find({});
    await cursor.forEach(vehicle => {
        vehicles.push(vehicle);
    });

    return vehicles;
};

const getItem = async query => {
    return await vehicleCollection.findOne(query);
};

const addItem = async item => {
    try {
        await vehicleCollection.insertOne(item);
    }
    catch(err) {
        console.error(err);
    }
};

const updateItem = async (query, updateData) => {
    try {
        await vehicleCollection.findOneAndUpdate(query, updateData);
    }
    catch(err) {
        console.error(err);
    }
};

const getUsers = async () => {
    const users = [];
    const cursor = await userCollection.find({});
    await cursor.forEach(user => {
        users.push({ firstName: user.firstName, lastName: user.lastName });
    });

    return users;
};

module.exports = { init, getItems, getItem, addItem, updateItem, getUsers };
