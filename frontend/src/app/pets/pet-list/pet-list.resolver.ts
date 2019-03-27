import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Pet } from '../../typing/pet.interface';
import { Observable, of } from 'rxjs';
import { PetService } from '../pet.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class PetListResolver implements Resolve<Pet[]> {

    constructor (private petService: PetService, private router: Router) {}

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pet[]> {
        return this.petService.findAllPets()
            .pipe(catchError(this.handleError<Pet[]>('findAllPets')));
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
