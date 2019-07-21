import {Routes} from '@angular/router';
import {PetDetailComponent} from './pet-detail/pet-detail.component';
import {PetDetailResolver} from './pet-detail/pet-detail.resolver';
import {PetListComponent} from './pet-list/pet-list.component';
import {PetListResolver} from './pet-list/pet-list.resolver';
import {CreatePetComponent} from './create-pet/create-pet.component';
import {AuthGuard} from '../auth/auth.guard';

export const petRoutes: Routes = [
    {path: ':id', component: PetDetailComponent, resolve: {pet: PetDetailResolver}},
    {path: 'add/found', component: CreatePetComponent, data: {isLost: false}, canActivate: [AuthGuard]},
    {path: 'add/lost', component: CreatePetComponent, data: {isLost: true}, canActivate: [AuthGuard]},
    {path: '', component: PetListComponent, resolve: {petList: PetListResolver}},
];
