import {Document} from 'mongoose';

export interface User extends Document {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    profilePhoto: string;
}
