import { Routes } from '@angular/router';
import { PetListComponent } from './pets/pet-list/pet-list.component';
import { PetListResolver } from './pets/pet-list/pet-list.resolver';
import { PetDetailComponent } from './pets/pet-detail/pet-detail.component';
import { PetDetailResolver } from './pets/pet-detail/pet-detail.resolver';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { CreatePetComponent } from './pets/create-pet/create-pet.component';

export const appRoutes: Routes = [
    { path: 'users', loadChildren: './users/user.module#UserModule' },
    { path: 'pets/:id', component: PetDetailComponent, resolve: { pet: PetDetailResolver} },
    { path: 'pets', component: PetListComponent, resolve: {petList: PetListResolver} },
    { path: 'pets/add/found', component: CreatePetComponent, data: { isLost: false}},
    { path: 'pets/add/lost', component: CreatePetComponent, data: { isLost: true}},
    { path: '404', component: NotFoundComponent},
    { path: '', redirectTo: '/pets', pathMatch: 'full' },
    { path: '**', redirectTo: '404' }
];
