import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pet} from '../typing/pet.interface';
import {environment} from '../../environments/environment';

const {api_url} = environment;

@Injectable()
export class PetService {

    constructor(private httpClient: HttpClient) { }


    findPetById(id: string): Observable<Pet> {
        return this.httpClient.get<Pet>(`${api_url}/pets/${id}`);
    }

    findAllPets(): Observable<Pet[]> {
        return this.httpClient.get<Pet[]>(`${api_url}/pets`);
    }

    createPet(petData): Observable<Pet> {
        return this.httpClient.post<Pet>(`${api_url}/pets`, petData);
    }

    async findLostPets() {}

    async findFoundPets() {}

    async findPetByQuery() {}

}
