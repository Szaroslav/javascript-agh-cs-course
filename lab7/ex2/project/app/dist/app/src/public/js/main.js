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
Object.defineProperty(exports, "__esModule", { value: true });
var MainScript;
(function (MainScript) {
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
        f(`%c[${header}]`, `color: ${color}; font-weight: bold`, message);
    };
    // Get an item ObjectId (id of the MongoDB)
    const getItemId = (el) => {
        if (!el || !el.classList)
            return null;
        if (el.classList.contains('vehicle-content'))
            return el.getAttribute('data-id');
        return getItemId(el.parentElement);
    };
    // Setup fetch API options to send data (excluding 'GET' method)
    const setupRequest = (body) => {
        return {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        };
    };
    // ====================================================================
    const rentVehicle = (event) => __awaiter(this, void 0, void 0, function* () {
        const id = getItemId(event.target);
        try {
            const res = yield fetch(`${API_URL}/vehicles`, Object.assign({ method: 'POST' }, setupRequest(Object.assign({ vehicleId: id }, userMockup))));
            if (!res.ok)
                throw new Error('Not found');
            return yield res.json();
        }
        catch (error) {
            prettyLog(error, false);
            return null;
        }
    });
    const returnVehicle = (event) => __awaiter(this, void 0, void 0, function* () {
        const id = getItemId(event.target);
        try {
            const res = yield fetch(`${API_URL}/vehicles`, Object.assign({ method: 'PUT' }, setupRequest(Object.assign({ vehicleId: id }, userMockup))));
            if (!res.ok)
                throw new Error('Not found');
            return yield res.json();
        }
        catch (error) {
            prettyLog(error, false);
            return null;
        }
    });
    const sellVehicle = (event) => __awaiter(this, void 0, void 0, function* () {
        const id = getItemId(event.target);
        try {
            const res = yield fetch(`${API_URL}/vehicles`, Object.assign({ method: 'DELETE' }, setupRequest(Object.assign({ vehicleId: id }, userMockup))));
            if (!res.ok)
                throw new Error('Not found');
            return yield res.json();
        }
        catch (error) {
            prettyLog(error, false);
            return null;
        }
    });
    document.querySelectorAll('.rent-button').forEach((btn) => {
        btn.addEventListener('click', rentVehicle);
    });
    document.querySelectorAll('.return-button').forEach((btn) => {
        btn.addEventListener('click', returnVehicle);
    });
    document.querySelectorAll('.sell-button').forEach((btn) => {
        btn.addEventListener('click', sellVehicle);
    });
})(MainScript || (MainScript = {}));
