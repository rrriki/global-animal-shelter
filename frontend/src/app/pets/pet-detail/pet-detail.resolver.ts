import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Pet} from '../../typing/pet.interface';
import {Observable} from 'rxjs';
import {PetService} from '../pet.service';

@Injectable()
export class PetDetailResolver implements Resolve<Pet> {

    constructor(private petService: PetService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pet> {
        const id = route.paramMap.get('id');
        return this.petService.findPetById(id);
    }
}
