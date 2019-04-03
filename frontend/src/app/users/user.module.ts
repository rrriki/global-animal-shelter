import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { userRoutes } from './user.routes';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LockedComponent } from './locked/locked.component';

@NgModule({
    declarations: [UserRegisterComponent, UserLoginComponent, LockedComponent],
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        RouterModule.forChild(userRoutes)
    ],
    providers: [UserService]
})
export class UserModule {
}
