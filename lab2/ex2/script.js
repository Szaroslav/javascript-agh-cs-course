'use strict';

var expect = chai.expect;
let totalSum = 0;

function sum(x, y) {
    return x + y;
}

function digits(str) {
    const result = [0, 0];
    for (let i = 0; i < str.length; i++) {
        const d = parseInt(str[i]);
        if (!isNaN(d)) result[(d + 1) % 2] += d;
    }

    return result;
}

function letters(str) {
    const result = [0, 0];
    for (let i = 0; i < str.length; i++) {
        const c = str[i];
        if (!isNaN(parseInt(c))) continue;
        if (c === c.toLowerCase()) result[0]++;
        else if (c === c.toUpperCase()) result[1]++;
    }

    return result;
}

function _sum(str) {
    const n = parseInt(str);
    if (!isNaN(n)) totalSum += n;

    return totalSum;
}

let promptResult;
while ((promptResult = prompt('Type something for god sake!')) !== null) {
    console.log(`\t${digits(promptResult)}\t${letters(promptResult)}\t${_sum(promptResult)}`);
}

/*** Tests ***/
describe('digits(string) function', function () {
    it('Returns [11, 2] for "2137"', function () {
        expect(digits('2137')).to.eql([11, 2]);
    });
    it('Returns [0, 0] for "aBc"', function () {
        expect(digits('aBc')).to.eql([0, 0]);
    });
    it('Returns [11, 2] for "aBc2137"', function () {
        expect(digits('aBc2137')).to.eql([11, 2]);
    });
    it('Returns [11, 2] for "2137aBc"', function () {
        expect(digits('2137aBc')).to.eql([11, 2]);
    });
    it('Returns [0, 0] for ""', function () {
        expect(digits('')).to.eql([0, 0]);
    });
});

describe('The sum() function', function () {
    it('Returns 4 for 2+2', function () {
        expect(sum(2, 2)).to.equal(4);
    });
    it('Returns 0 for -2+2', function () {
        expect(sum(-2, 2)).to.equal(0);
    });
});
