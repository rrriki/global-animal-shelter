import { Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

export const userRoutes: Routes = [
    { path: 'register', component: UserRegisterComponent },
    { path: 'login', component: UserLoginComponent },
];
