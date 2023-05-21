'use strict';

const API_URL = 'http://localhost:8000';
const list = document.querySelector('.vehicle-list');

const userMockup = {
    userId: '645815402881dccff34b88a8',
    firstName: 'Jakub',
    lastName: 'Szewczyk'
};

// Helper functions ===================================================

// Format console logs
const prettyLog = (message, isSuccess) => {
    const header = isSuccess ? 'SUCCESS' : 'ERROR';
    const color = isSuccess ? '#2ae66b' : '#eb1c2f';
    const f = isSuccess ? console.log : console.error;

    f(
        `%c[${header}]`,
        `color: ${color}; font-weight: bold`,
        message
    );
};

// Get an item ObjectId (id of the MongoDB)
const getItemId = el => {
    if (!el || !el.classList)
        return null;
    if (el.classList.contains('vehicle-content'))
        return el.getAttribute('data-id');

    return getItemId(el.parentNode);
};

// Setup fetch API options to send data (excluding 'GET' method)
const setupRequest = body => {
    return {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    };
};

// ====================================================================

const rentVehicle = async event => {
    const id = getItemId(event.target);
    console.log({
        method: 'POST',
        ...setupRequest({ vehicleId: id, ...userMockup })
    });
    try {
        const res = await fetch(`${API_URL}/vehicles`, {
            method: 'POST',
            ...setupRequest({ vehicleId: id, ...userMockup })
        });
        if (!res.ok)
            throw new Error('Not found');

        return await res.json();
    }
    catch (error) {
        prettyLog(error, false);
        return null;
    }
};


// const rentVehicle = async () => {
//     const rentedVehicle = await fetch(`${API_URL}/vehicle/rent`)
//         .then(res => res.json())
//         .catch(err => prettyLog(err, false));

//     if (rentedVehicle)
//         prettyLog('', true);

//     return rentedVehicle;
// };

// const returnVehicle = async () => {
//     const returnedVehicle = await fetch(`${API_URL}/vehicle/return`)
//         .then(res => res.json())
//         .catch(err => prettyLog(err, false));

//     if (returnedVehicle)
//         prettyLog('', true);

//     return returnedVehicle;
// };

// const sellVehicle = async () => {
//     const soldVehicle = await fetch(`${API_URL}/vehicle/sold`)
//         .then(res => res.json())
//         .catch(err => prettyLog(err, false));

//     if (soldVehicle)
//         prettyLog('', true);

//     return soldVehicle;
// };

// const handleFormClick = e => {
//     const elements = e.target.form.elements;

//     for (let i = 0; i < elements.length; i++) {
//         const el = elements.item(i);
//         if (el.value !== undefined && el.value === '') {
//             alert('Input is empty');
//             return;
//         }
//     }

//     const item = {
//         manufacturer: elements['manufacturer-input'].value,
//         model:  elements['model-input'].value,
//         year:  elements['year-input'].value,
//         description:  elements['description-input'].value,
//         imageURL:  elements['image-url-input'].value,
//         vehicleType:  elements['vehicle-type-select'].value,
//         sold: false,
//         rented: false
//     };

//     addItem(item).then(res => renderVehicle(res));

//     return false;
// };

// const handleSearch = e => {
//     e.preventDefault();

//     modelFilter = e.target.elements[0].value;
//     renderVehicles();
// };

// if (document.getElementById('form-button'))
//     document.getElementById('form-button').addEventListener('click', handleFormClick);
// if (document.getElementById('request-button'))
//     document.getElementById('request-button').addEventListener('click', e => {
//         const requestType = e.target.form.elements['request-mode'].value;
//         console.log(requestType);

//         switch (requestType) {
//             case 'rent':
//                 rentVehicle();
//                 break;
//             case 'return':
//                 returnVehicle();
//                 break;
//             case 'sell':
//                 sellVehicle();
//                 break;
//             case 'display':
//                 renderVehicles();
//                 break;
//         }
//     });

document.querySelectorAll('.rent-button').forEach(btn => {
    btn.addEventListener('click', rentVehicle);
});
