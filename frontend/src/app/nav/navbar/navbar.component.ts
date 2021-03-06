import {Component} from '@angular/core';
import {faUser, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    title = 'Global Animal Shelter';
    faUser = faUser;
    faSignOut = faSignOutAlt;

    constructor(private auth: AuthService) { }

    logOut() {
        console.log('Logging user out');
        this.auth.logout();
    }

}
