import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    currentUser;

    constructor (private httpClient: HttpClient) { }

    isAuthenticated (): boolean {
        const isValidUser = !!this.currentUser;
        const isValidToken = moment().isBefore(this.getTokenExpiration());

        return isValidUser && isValidToken;
    }

    login (email: string, password: string) {
        return this.httpClient.post(`/api/auth`, { email, password });
    }

    logout () {
        this.currentUser = null;
        localStorage.removeItem('token_id');
        localStorage.removeItem('token_expiration');
    }

    setSession (authResults) {
        const { data } = authResults;

        this.currentUser = data.user;
        const token = data.token;
        const expiresAt = moment().add(data.expires, 'seconds');

        localStorage.setItem('token_id', token);
        localStorage.setItem('token_expiration', JSON.stringify(expiresAt.valueOf()));
    }

    private getTokenExpiration () {
        const expiration = localStorage.getItem('token_expiration');
        return moment(JSON.parse(expiration));
    }
}
