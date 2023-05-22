import { ObjectId } from '../server/node_modules/mongodb';

interface User {
    _id: ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

interface SecureUser {
    firstName: string,
    lastName: string
}

export { User, SecureUser };
