'use strict';

const API_URL = 'http://localhost:8000';
const list = document.querySelector('.vehicle-list');
let modelFilter = '';

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

const renderVehicle = data => {
    if (!list)
        return;

    if (data && (!modelFilter || (new RegExp(modelFilter)).test(data.model))) {
        list.innerHTML += `
            <li class="col-lg-4 col-md-6 p-2">
                <div class="card">
                    <img src="./images/supra.png" class="card-img-top" alt="${data.model}" />
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${data.model}</h5>
                        <p class="card-text">${data.description}</p>
                        <a href="#" class="btn btn-primary">Read more</a>
                    </div>
                </div>
            </li>
        `;
    }
};

const renderVehicles = async () => {
    const vehicles = await fetch(`${API_URL}/vehicle`).then(res => res.json());
    list.innerHTML = '';
    vehicles.forEach(vehicle => renderVehicle(vehicle));
};

const getItem = id => {
    
};

const addItem = async item => {
    const addedVehicle = await fetch(`${API_URL}/vehicle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
        .then(res => res.json())
        .catch(err => prettyLog(err, false));

    if (addedVehicle)
        prettyLog('', true);

    return addedVehicle;
};

const rentVehicle = async () => {
    const rentedVehicle = await fetch(`${API_URL}/vehicle/rent`)
        .then(res => res.json())
        .catch(err => prettyLog(err, false));

    if (rentedVehicle)
        prettyLog('', true);

    return rentedVehicle;
};

const returnVehicle = async () => {
    const returnedVehicle = await fetch(`${API_URL}/vehicle/return`)
        .then(res => res.json())
        .catch(err => prettyLog(err, false));

    if (returnedVehicle)
        prettyLog('', true);

    return returnedVehicle;
};

const sellVehicle = async () => {
    const soldVehicle = await fetch(`${API_URL}/vehicle/sold`)
        .then(res => res.json())
        .catch(err => prettyLog(err, false));

    if (soldVehicle)
        prettyLog('', true);

    return soldVehicle;
};

const handleFormClick = e => {
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
        sold: false,
        rented: false
        // dates: { rent: null, return: null, sold: null },
        // owner: { firstName: null, lastName: null }
    };

    addItem(item).then(res => renderVehicle(res));

    return false;
};

const handleSearch = e => {
    e.preventDefault();

    modelFilter = e.target.elements[0].value;
    renderVehicles();
};

if (document.getElementById('form-button'))
    document.getElementById('form-button').addEventListener('click', handleFormClick);
if (document.getElementById('request-button'))
    document.getElementById('request-button').addEventListener('click', e => {
        const requestType = e.target.form.elements['request-mode'].value;
        console.log(requestType);

        switch (requestType) {
            case 'rent':
                rentVehicle();
                break;
            case 'return':
                returnVehicle();
                break;
            case 'sell':
                sellVehicle();
                break;
            case 'display':
                renderVehicles();
                break;
        }
    });

// renderVehicles();
