import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    currentUser;

    constructor (private httpClient: HttpClient, private jwtHelper: JwtHelperService) {
        // Validate if a the user is loggedIn
        const token = AuthService.getToken();
        if (token) {
            const { user } = this.jwtHelper.decodeToken(token);

            console.log('decoded user', user);
            this.currentUser = user;

        } else {
            this.currentUser = {};
        }

    }

    static getToken () {
        return localStorage.getItem('jwt_token');
    }

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
        return this.httpClient.post(`/api/auth`, { email, password });
    }

    logout () {
        this.currentUser = null;
        localStorage.removeItem('jwt_token');

    }

    setSession ({data}) {
        const { token} = data;
        console.log(token);
        const { user } = this.jwtHelper.decodeToken(token);
        this.currentUser = user;
        localStorage.setItem('jwt_token', token);
    }
}
