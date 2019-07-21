import {Document} from 'mongoose';

export interface Pet extends Document {
    id: string;
    name: string;
    type: string;
    breed: string;
    description: string;
    photos: string[];
    isLost: boolean;
    isDeleted: boolean;
}
