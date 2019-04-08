import { Location } from './location.interface';

export interface Pet {
    id: string;
    name: string;
    type: string;
    breed: string;
    description: string;
    location: Location;
    photos: string[];
    isLost: boolean;
}
