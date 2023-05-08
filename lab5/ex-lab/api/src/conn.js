const { MongoClient, ServerApiVersion } = require('mongodb');

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

let connection;
let db;
let collection;

const init = async () => {
    try {
        connection = await client.connect();
        db = await connection.db(DATABASE_NAME);
        collection = await db.collection(COLLECTION_NAME);
        console.log("Successfully connected to MongoDB!");
    }
    catch(err) {
        console.error(err);
    }
};

const getItems = async () => {
    const vehicles = [];
    const cursor = await collection.find({});
    await cursor.forEach(vehicle => {
        vehicles.push(vehicle);
    });

    return vehicles;
};

const getItem = async query => {
    return await collection.findOne(query);
};

const addItem = async item => {
    try {
        await collection.insertOne(item);
    }
    catch(err) {
        console.error(err);
    }
};

const updateItem = async (query, updateData) => {
    try {
        await collection.findOneAndUpdate(query, updateData);
    }
    catch(err) {
        console.error(err);
    }
};

module.exports = { init, getItems, getItem, addItem, updateItem };
