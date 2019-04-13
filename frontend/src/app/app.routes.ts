import { Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';

export const appRoutes: Routes = [
    { path: 'users', loadChildren: './users/user.module#UserModule' },
    { path: 'pets', loadChildren: './pets/pet.module#PetModule' },
    { path: '404', component: NotFoundComponent },
    { path: '', redirectTo: '/pets', pathMatch: 'full' },
    { path: '**', redirectTo: '404' }
];
