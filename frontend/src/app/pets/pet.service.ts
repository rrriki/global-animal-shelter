import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pet} from '../typing/pet.interface';


@Injectable()
export class PetService {

    constructor(private httpClient: HttpClient) { }


    findPetById(id: string): Observable<Pet> {
        return this.httpClient.get<Pet>(`/api/pets/${id}`);
    }

    findAllPets(): Observable<Pet[]> {
        return this.httpClient.get<Pet[]>(`/api/pets`);
    }

    createPet(petData): Observable<Pet> {
        return this.httpClient.post<Pet>(`/api/pets`, petData);
    }

    async findLostPets() {}

    async findFoundPets() {}

    async findPetByQuery() {}

}
