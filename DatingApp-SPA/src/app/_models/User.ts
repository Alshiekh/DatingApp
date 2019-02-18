import { Photo } from './Photo';

export interface User {
    id: number;
    username: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    // means optionaly
    intrests?: string;
    Introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}
