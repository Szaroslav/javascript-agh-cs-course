'use strict';

const vehicleData = [
    { 
        manufacturer: 'Audi',
        model: 'A4',
        year: '2023',
        imageURL: '',
        vehicleType: 'car',
        dates: { rent: null, return: null, sold: null },
        owner: { firstName: null, lastName: null }
    },
    { 
        manufacturer: 'Audi',
        model: 'A6',
        year: '2023',
        imageURL: '',
        vehicleType: 'car',
        dates: { rent: new Date('2023-01-01'), return: new Date('2023-01-10'), sold: new Date('2023-03-03') },
        owner: { firstName: null, lastName: null }
    },
    { 
        manufacturer: 'Audi',
        model: 'A7',
        year: '2023',
        imageURL: '',
        vehicleType: 'car',
        dates: { rent: new Date('2023-03-27'), return: null, sold: null },
        owner: { firstName: null, lastName: null }
    },
    { 
        manufacturer: 'Audi',
        model: 'A8',
        year: '2023',
        imageURL: '',
        vehicleType: 'carTrailer',
        dates: { rent: null, return: null, sold: null },
        owner: { firstName: null, lastName: null }
    },
    { 
        manufacturer: 'Opel',
        model: 'Astra',
        year: '2020',
        imageURL: '',
        vehicleType: 'carTrailer',
        dates: { rent: null, return: null, sold: null },
        owner: { firstName: 'Janusz', lastName: 'Kowalski' }
    }
];

const OBJECT_STORE_NAME = 'vehicles';
let db;

const prettyLog = (message, isSuccess) => {
    const header = isSuccess ? 'SUCCESS' : 'ERROR';
    const color = isSuccess ? '#2ae66b' : '#eb1c2f';
    const f = isSuccess ? console.log : console.error;

    f(
        `%c[${header}] %c${message}`,
        `color: ${color}; font-weight: bold`,
        `color: inherit; font-weight: normal`
    );
};

const initDatabase = () => {
    const dbRequest = indexedDB.open('carshDB', 6);

    dbRequest.onerror = e => {
        prettyLog('Cannot open the database', false);
    };
    
    dbRequest.onsuccess = e => {
        prettyLog('The database has been open successfully', true);
        
        db = e.target.result;
    };

    dbRequest.onupgradeneeded = e => {
        db = e.target.result;

        db.deleteObjectStore(OBJECT_STORE_NAME);

        const objectStore = db.createObjectStore(OBJECT_STORE_NAME, { autoIncrement: true });
        objectStore.createIndex('model', 'model', { unique: false });

        objectStore.transaction.oncomplete = () => {
            const vehicleObjectStore = db.transaction(OBJECT_STORE_NAME, 'readwrite').objectStore(OBJECT_STORE_NAME);
            vehicleData.forEach(vehicle => vehicleObjectStore.add(vehicle));
        };
    };
};

const getItem = id => {
    if (db) {
        const vehicleObjectStore = db.transaction(OBJECT_STORE_NAME).objectStore(OBJECT_STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = vehicleObjectStore.get(id)
            request.onsuccess = e => resolve(e.target.result)
            request.onerror = e => reject(e);
        });
    }
};

const rentVehicle = (owner, id) => {
    if (!db) {
        prettyLog('The database has not been initialized', false);
        return;
    }

    const vehicleObjectStore = db.transaction(OBJECT_STORE_NAME, 'readwrite').objectStore(OBJECT_STORE_NAME);

    return new Promise((resolve, reject) => {
        const request = vehicleObjectStore.get(id);
        request.onsuccess = e => {
            const item = e.target.result;

            if (item.owner.firstName || item.owner.lastName) {
                prettyLog(`The vehicle with ID ${id} is currently sold`, false);
                reject();
            }
            if (item.dates.rent) {
                prettyLog(`The vehicle with ID ${id} is currently rented`, false);
                reject();
            }

            item.dates.rent = new Date();
            item.dates.return = null;

            const request = vehicleObjectStore.put(item, id);
            request.onsuccess = () => {
                prettyLog('The vehicle has been rented', true);
                resolve();
            };
            request.onerror = e => reject(e);
        };
        request.onerror = e => reject(e);
    });
};

const returnVehicle = id => {
    if (!db) {
        prettyLog('The database has not been initialized', false);
        return;
    }

    const vehicleObjectStore = db.transaction(OBJECT_STORE_NAME, 'readwrite').objectStore(OBJECT_STORE_NAME);

    return new Promise((resolve, reject) => {
        const request = vehicleObjectStore.get(id);
        request.onsuccess = e => {
            const item = e.target.result;

            if (item.owner.firstName || item.owner.lastName) {
                prettyLog(`The vehicle with ID ${id} is currently sold, cannot return it back`, false);
                reject();
            }
            
            item.dates.rent = null;
            item.dates.return = new Date();

            const request = vehicleObjectStore.put(item, id);
            request.onsuccess = () => {
                prettyLog('The vehicle has been returned', true);
                resolve();
            };
            request.onerror = e => reject(e);
        };
        request.onerror = e => reject(e);
    });
};

const sellVehicle = (owner, id) => {
    if (!db) {
        prettyLog('The database has not been initialized', false);
        return;
    }

    const vehicleObjectStore = db.transaction(OBJECT_STORE_NAME, 'readwrite').objectStore(OBJECT_STORE_NAME);

    return new Promise((resolve, reject) => {
        const request = vehicleObjectStore.get(id);
        request.onsuccess = e => {
            const item = e.target.result;

            if (item.owner.firstName != owner.firstName || item.owner.lastName != owner.lastName) {
                prettyLog(`The vehicle with ID ${id} cannot be sold by ${owner.firstName} ${owner.lastName}`, false);
                reject();
            }
            else if (item.dates.rent) {
                prettyLog(`The vehicle with ID ${id} cannot be sold, because it is already rented`, false);
                reject();
            }

            item.owner = { firstName: null, lastName: null };
            item.dates.return = new Date();

            const request = vehicleObjectStore.put(item, id);
            request.onsuccess = () => {
                prettyLog('The vehicle has been sold', true);
                resolve();
            };
            request.onerror = e => reject(e);
        };
        request.onerror = e => reject(e);
    });
};

const listVehicles = vehicleType => {
    if (!db) {
        prettyLog('The database has not been initialized', false);
        return;
    }

    const vehicleObjectStore = db.transaction(OBJECT_STORE_NAME).objectStore(OBJECT_STORE_NAME);

    const request = vehicleObjectStore.getAll()
    request.onsuccess = e => e.target.result
        .filter(vehicle => vehicle.vehicleType === vehicleType)
        .forEach(vehicle => console.log(vehicle));
    request.onerror = () => prettyLog('Cannot list vehicles', false);
};

const handleClick = e => {
    // sellVehicle(document.querySelector('#xd-form .form-select').value);
}

initDatabase();

let result;
while ((result = prompt('Enter command [1 | 2 | 4] [id | vehicleType], e.g. 2 5')) != null) {
    result = result.split(' ');
    const command = parseInt(result[0]);
    const id = parseInt(result[1]);
    const arg = result[1];
    
    if (isNaN(command)) {
        prettyLog('Entered command is not a number', false);
        continue;
    }

    switch (command) {
        case 1:
            rentVehicle(null, id);
            break;
        case 2:
            returnVehicle(id);
            break;
        case 4:
            listVehicles(arg);
            break;
        default:
            prettyLog('Entered command is not a [1 | 2 | 4]', false);
    }
}