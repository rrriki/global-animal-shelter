import { Routes } from '@angular/router';
import { PetListComponent } from './pets/pet-list/pet-list.component';
import { PetListResolver } from './pets/pet-list/pet-list.resolver';
import { PetDetailComponent } from './pets/pet-detail/pet-detail.component';
import { PetDetailResolver } from './pets/pet-detail/pet-detail.resolver';
import { NotFoundComponent } from './errors/not-found/not-found.component';

export const appRoutes: Routes = [
    { path: 'pets/:id', component: PetDetailComponent, resolve: { pet: PetDetailResolver} },
    { path: 'pets', component: PetListComponent, resolve: {petList: PetListResolver} },
    { path: 'users', loadChildren: './users/user.module#UserModule' },
    { path: '404', component: NotFoundComponent},
    { path: '', redirectTo: '/pets', pathMatch: 'full' },
    { path: '**', redirectTo: '404' }
];
