
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from './user.service';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { userRoutes } from './user.routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(userRoutes),
        FontAwesomeModule,
    ],
    declarations: [
        UserRegisterComponent,
        UserLoginComponent,
    ],
    providers: [UserService]
})
export class UserModule {
}
