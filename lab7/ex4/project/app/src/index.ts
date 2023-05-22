import express, { Express, Request, Response } from 'express';
import path from 'path';
import asyncHandler from 'express-async-handler';
import { Vehicle } from '../../interfaces/vehicle';
import { SecureUser } from '../../interfaces/user';

class Application {
    readonly PORT: number               = 2137;
    readonly APPLICATION_URL: string    = `http://localhost:${this.PORT}`;
    readonly SERVER_URL: string         = 'http://localhost:8000';
    readonly app: Express;

    constructor() {
        this.app = express();
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
        this.app.use('/public', express.static(path.join(__dirname, 'public')));

        this.app.get('/', asyncHandler(async (req: Request, res: Response) => {
            const vehicles: Vehicle[] = await fetch(`${this.SERVER_URL}/vehicles`)
                .then(res => {
                    if (!res.ok)
                        throw Error('[Error] Couldn\'t get the vehicles');
                    return res.json();
                });
            const users: SecureUser[] = await fetch(`${this.SERVER_URL}/users`)
                .then(res => {
                    if (!res.ok)
                        throw Error('[Error] Couldn\'t get the users');
                    return res.json();
                });
            
            res.render('home', {
                APPLICATION_URL: this.APPLICATION_URL,
                vehicles: vehicles,
                rentedVehicles: vehicles.filter(vehicle => vehicle.borrowers.length > 0),
                soldVehicles: vehicles.filter(vehicle => vehicle.sellers.length > 0),
                users: users
            });
        }));
    }

    run() {
        this.app.listen(this.PORT, () => {
            console.log(`The application was started on port ${this.PORT}`);
            console.log(`The application URL: ${this.APPLICATION_URL}/`);
            console.log('To stop the application, press "CTRL + C"');
        });
    }
}

const app = new Application();
app.run();

// app.get('/dealer', (req, res) => {
//     res.render('dealer', {
//         APPLICATION_URL: APPLICATION_URL,
//         addVehicleTextInputs: [ 'Manufacturer', 'Model', 'Year', 'Description' ]
//     });
// });

// app.get('/client', (req, res) => {
//     res.render('client', { APPLICATION_URL: APPLICATION_URL });
// });
