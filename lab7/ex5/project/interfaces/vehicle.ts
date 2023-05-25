import { ObjectId } from '../server/node_modules/mongodb';

interface Vehicle {
    _id: ObjectId,
    manufacturer: string,
    model: string,
    year: number,
    description: string,
    imageURL: string,
    vehicleType: string,
    quantity: number,
    borrowers: string[],
    sellers: string[]
}

export { Vehicle };
