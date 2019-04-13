import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../typing/user.interface';

@Component({
    selector: 'app-locked',
    templateUrl: './locked.component.html',
    styleUrls: ['./locked.component.css']
})
export class LockedComponent implements OnInit {
    message = 'Auth is not working';
    user: User = Object.create(null);

    constructor (private httpClient: HttpClient) { }

    ngOnInit () {
        this.httpClient.get(`/api/users/locked`)
            .subscribe(
                (res: any) => {
                    console.log(res);
                    const { user, message } = res;
                    this.user = user;
                    this.message = message;
                },
                (err) => {console.log(err); },
                () => {console.log('final'); }
            );
    }

}
