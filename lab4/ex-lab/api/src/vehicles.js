const vehicleData = [
    { 
        manufacturer: 'Audi',
        model: 'A4',
        year: '2023',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi quibusdam dignissimos harum dicta debitis excepturi molestias distinctio, minima iure? Eius, quae. Laudantium dolor eveniet iusto deleniti quasi cum, incidunt odio?',
        imageURL: '',
        vehicleType: 'car',
        // dates: { rent: null, return: null, sold: null },
        // owner: { firstName: null, lastName: null }
    },
    { 
        manufacturer: 'Audi',
        model: 'A6',
        year: '2023',
        description: '',
        imageURL: '',
        vehicleType: 'car',
        // dates: { rent: new Date('2023-01-01'), return: new Date('2023-01-10'), sold: new Date('2023-03-03') },
        // owner: { firstName: null, lastName: null }
    },
    { 
        manufacturer: 'Audi',
        model: 'A7',
        year: '2023',
        description: '',
        imageURL: '',
        vehicleType: 'car',
        // dates: { rent: new Date('2023-03-27'), return: null, sold: null },
        // owner: { firstName: null, lastName: null }
    },
    { 
        manufacturer: 'Audi',
        model: 'A8',
        year: '2023',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi quibusdam dignissimos harum dicta debitis excepturi molestias distinctio, minima iure? Eius, quae. Laudantium dolor eveniet iusto deleniti quasi cum, incidunt odio?',
        imageURL: '',
        vehicleType: 'carTrailer',
        // dates: { rent: null, return: null, sold: null },
        // owner: { firstName: null, lastName: null }
    },
    { 
        manufacturer: 'Opel',
        model: 'Astra',
        year: '2020',
        description: '',
        imageURL: '',
        vehicleType: 'carTrailer',
        // dates: { rent: null, return: null, sold: null },
        // owner: { firstName: 'Janusz', lastName: 'Kowalski' }
    },
    { 
        manufacturer: 'Volkswagen',
        model: 'Passat',
        year: '2000',
        description: 'Lorem ipsum. 2000 for the win!',
        imageURL: '',
        vehicleType: 'car',
        // dates: { rent: null, return: null, sold: null },
        // owner: { firstName: 'Janusz', lastName: 'Kowalski' }
    }
];

module.exports = {
    data: vehicleData
};