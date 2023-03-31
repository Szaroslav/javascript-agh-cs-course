'use strict';

const vehicleData = [
    { 
        manufacturer: 'Audi',
        model: 'A4',
        year: '2023',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi quibusdam dignissimos harum dicta debitis excepturi molestias distinctio, minima iure? Eius, quae. Laudantium dolor eveniet iusto deleniti quasi cum, incidunt odio?',
        imageURL: '',
        vehicleType: 'car',
        dates: { rent: null, return: null, sold: null },
        owner: { firstName: null, lastName: null }
    },
    { 
        manufacturer: 'Audi',
        model: 'A6',
        year: '2023',
        description: '',
        imageURL: '',
        vehicleType: 'car',
        dates: { rent: new Date('2023-01-01'), return: new Date('2023-01-10'), sold: new Date('2023-03-03') },
        owner: { firstName: null, lastName: null }
    },
    { 
        manufacturer: 'Audi',
        model: 'A7',
        year: '2023',
        description: '',
        imageURL: '',
        vehicleType: 'car',
        dates: { rent: new Date('2023-03-27'), return: null, sold: null },
        owner: { firstName: null, lastName: null }
    },
    { 
        manufacturer: 'Audi',
        model: 'A8',
        year: '2023',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi quibusdam dignissimos harum dicta debitis excepturi molestias distinctio, minima iure? Eius, quae. Laudantium dolor eveniet iusto deleniti quasi cum, incidunt odio?',
        imageURL: '',
        vehicleType: 'carTrailer',
        dates: { rent: null, return: null, sold: null },
        owner: { firstName: null, lastName: null }
    },
    { 
        manufacturer: 'Opel',
        model: 'Astra',
        year: '2020',
        description: '',
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
    const dbRequest = indexedDB.open('carshDB', 7);

    dbRequest.onerror = () => {
        prettyLog('Cannot open the database', false);
    };
    
    dbRequest.onsuccess = e => {
        prettyLog('The database has been open successfully', true);
        
        db = e.target.result;
    };

    dbRequest.onupgradeneeded = e => {
        console.log('The database has been upgraded');

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
            const request = vehicleObjectStore.get(id);
            request.onsuccess = e => resolve(e.target.result);
            request.onerror = e => reject(e);
        });
    }
};

const addItem = item => {
    if (db) {
        const vehicleObjectStore = db.transaction(OBJECT_STORE_NAME, 'readwrite').objectStore(OBJECT_STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = vehicleObjectStore.add(item);
            request.onsuccess = e => resolve();
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

const handleFormClick = e => {
    // console.log(e.target.elements);
    const elements = e.target.form.elements;

    for (let i = 0; i < elements.length; i++) {
        const el = elements.item(i);
        if (el.value !== undefined && el.value === '') {
            alert('Input is empty');
            return;
        }
    }

    const item = {
        manufacturer: elements['manufacturer-input'].value,
        model:  elements['model-input'].value,
        year:  elements['year-input'].value,
        description:  elements['description-input'].value,
        imageURL:  elements['image-url-input'].value,
        vehicleType:  elements['vehicle-type-select'].value,
        dates: { rent: null, return: null, sold: null },
        owner: { firstName: null, lastName: null }
    };

    console.log(item);

    // addItem(item);
};

document.getElementById('form-button').addEventListener('click', handleFormClick);

initDatabase();