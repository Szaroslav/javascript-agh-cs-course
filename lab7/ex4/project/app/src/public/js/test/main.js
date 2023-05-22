'use strict';

const expect = chai.expect;

const intervalId = setInterval(() => {
    if (!db)
        return;

    clearInterval(intervalId);
    getItem(5).then(res => console.log(res));
    mocha.run();

}, 1000);

describe('Integration test', () => {
    describe('function rentVehicle(name: { string, string }, id: int)', () => {
        it('rentVehicle({ "Janusz", "Kowalski" }, 5), should work perfect', () => {
            rentVehicle({ firstName: 'Janusz', lastName: 'Kowalski' }, 5).then(() => {
                getItem(5).then(res => expect(res.owner).to.eql({ firstName: 'Janusz', lastName: 'Kowalski' }));
            });
        });
    });
    
    describe('function returnVehicle(id: int)', () => {
        it('returnVehicle(5), should work perfect', () => {
            returnVehicle(5).then(() => {
                getItem(5).then(res => expect(res.owner).to.eql({ firstName: null, lastName: null }));
            });
        });
    });
    
    describe('function sellVehicle(name: { string, string }, id: int)', () => {
        it('sellVehicle({ "Janusz", "Kowalski" }, 5), should work perfect', () => {
            sellVehicle({ firstName: 'Janusz', lastName: 'Kowalski' }, 5).then(() => {
                getItem(5).then(res => expect(res.owner).to.eql({ firstName: null, lastName: null }));
            });
        });
    });
});

