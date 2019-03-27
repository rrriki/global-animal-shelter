import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Pet } from '../../typing/pet.interface';
import { Observable, of } from 'rxjs';
import { PetService } from '../pet.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class PetDetailResolver implements Resolve<Pet> {

    constructor (private petService: PetService, private router: Router) {}

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pet> {
        const id = route.paramMap.get('id');
        return this.petService.findPetById(id)
            .pipe(catchError(this.handleError<Pet>('findPetById')));
    }

    private handleError<T> (operation = 'Operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(`ERROR executing ${ operation }`, error);
            // TODO: check error.status for routing 404/500
            this.router.navigate(['/404']);
            return of(result as T);
        };
    }


}
