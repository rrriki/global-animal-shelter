import { Component } from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    title = 'Global Animal Shelter';
    faUser = faUser;

    constructor () { }

}
