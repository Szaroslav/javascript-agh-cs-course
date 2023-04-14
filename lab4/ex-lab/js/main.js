'use strict';

const API_URL = 'http://localhost:8000/';
let modelFilter = '';

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

const renderVehicles = async () => {
    const vehicles = await fetch(`${API_URL}vehicles`).then(res => res.json());
    const list = document.querySelector('.vehicle-list');
    list.innerHTML = '';

    vehicles.forEach(vehicle => { 
        if (!modelFilter || (new RegExp(modelFilter)).test(vehicle.model)) {
            list.innerHTML += `
                <li class="col-lg-4 col-md-6 p-2">
                    <div class="card">
                        <img src="./images/supra.png" class="card-img-top" alt="${vehicle.model}" />
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${vehicle.model}</h5>
                            <p class="card-text">${vehicle.description}</p>
                            <a href="#" class="btn btn-primary">Read more</a>
                        </div>
                    </div>
                </li>
            `;
        }
    });
};

const getItem = id => {
    
};

const addItem = item => {
    
};

const rentVehicle = (owner, id) => {
};

const returnVehicle = id => {
    
};

const sellVehicle = (owner, id) => {
    
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

    addItem(item).then(() => renderVehicles());
};

const handleSearch = e => {
    e.preventDefault();

    modelFilter = e.target.elements[0].value;
    renderVehicles();
};

document.getElementById('form-button').addEventListener('click', handleFormClick);
// document.getElementById('vehicle-form').addEventListener('submit', handleSearch);

renderVehicles();