"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
class Application {
    constructor() {
        this.PORT = 2137;
        this.APPLICATION_URL = `http://localhost:${this.PORT}`;
        this.SERVER_URL = 'http://localhost:8000';
        this.app = (0, express_1.default)();
        this.app.set('views', path_1.default.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
        this.app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
        this.app.get('/', (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const vehicles = yield fetch(`${this.SERVER_URL}/vehicles`)
                .then(res => {
                if (!res.ok)
                    throw Error('[Error] Couldn\'t get the vehicles');
                return res.json();
            });
            const users = yield fetch(`${this.SERVER_URL}/users`)
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
        })));
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
