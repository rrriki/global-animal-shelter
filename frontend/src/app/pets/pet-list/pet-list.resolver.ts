import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Pet} from '../../typing/pet.interface';
import {Observable} from 'rxjs';
import {PetService} from '../pet.service';

@Injectable()
export class PetListResolver implements Resolve<Pet[]> {

    constructor(private petService: PetService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pet[]> {
        return this.petService.findAllPets();
    }


}
