import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { User } from '../typing/user.interface';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    jwtHelper: JwtHelperService = new JwtHelperService();
    currentUser: User;

    constructor (private httpClient: HttpClient, private router: Router) {
        // Validate if a the user is loggedIn when refresh
        if (this.isAuthenticated()) {
            const token = AuthService.getToken();
            const { user } = this.jwtHelper.decodeToken(token);
            console.log('decoded user', user);
            this.currentUser = user;
        } else {
            this.currentUser = Object.create(null);
        }

    }

    /** Helper method to retrieve token from localStorage **/
    static getToken () {
        return localStorage.getItem('jwt_token');
    }

    /** Helper method to validate token status and expiration **/
    isAuthenticated (): boolean {
        const token = AuthService.getToken();
        if (!token) {
            return false;
        }
        const decoded = this.jwtHelper.decodeToken(token);
        const expiresIn = moment.unix(decoded.exp);
        return moment().isBefore(expiresIn);
    }

    login (email: string, password: string) {
        return this.httpClient.post(`/api/auth`, { email, password })
            .pipe(tap(
                authResults => {
                    this.setSession(authResults);
                    this.router.navigate(['/pets']);
                },
                (err) => {
                    console.log(err);
                })
            );
    }

    logout () {
        this.currentUser = null;
        localStorage.removeItem('jwt_token');
        this.router.navigate(['/users/login']);
    }

    /**
     * Helper function to extract and set the user & token from an auth request
     * @param authResults - The result from an auth request signIn/register
     */
    private setSession (authResults) {
        console.log('Setting session');
        const { data } = authResults;
        const { token } = data;
        const { user } = this.jwtHelper.decodeToken(token);
        this.currentUser = user;
        localStorage.setItem('jwt_token', token);
    }
}
