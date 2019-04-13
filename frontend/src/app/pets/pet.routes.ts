import { Routes } from '@angular/router';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { PetDetailResolver } from './pet-detail/pet-detail.resolver';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetListResolver } from './pet-list/pet-list.resolver';
import { CreatePetComponent } from './create-pet/create-pet.component';

export const petRoutes: Routes = [
    { path: ':id', component: PetDetailComponent, resolve: { pet: PetDetailResolver } },
    { path: 'add/found', component: CreatePetComponent, data: { isLost: false } },
    { path: 'add/lost', component: CreatePetComponent, data: { isLost: true } },
    { path: '', component: PetListComponent, resolve: { petList: PetListResolver } },
];
