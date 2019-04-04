import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

    faUser = faUser;
    faLock = faLock;
    faFacebook = faFacebook;

    email: string;
    password: string;
    isMouseOverLogin: boolean;

    constructor (private router: Router, private auth: AuthService) { }

    login (formValues) {
        this.auth.login(formValues.email, formValues.password)
            .subscribe(
                (authResults) => {
                    this.auth.setSession(authResults);
                },
                (error) => {
                    console.log('An error occurred logging in:', error);
                },
                () => {
                    console.log('User is logged in:', this.auth.currentUser);
                    this.router.navigate(['/users/locked']);
                }
            );
    }

    cancel () {}
}
