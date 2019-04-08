import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-locked',
    templateUrl: './locked.component.html',
    styleUrls: ['./locked.component.css']
})
export class LockedComponent implements OnInit {

    response;

    constructor (private httpClient: HttpClient) { }

    ngOnInit () {
        this.httpClient.get(`/api/users/locked`)
            .subscribe(
                (res: any) => { this.response = res.message; },
                (err) => {console.log(err); },
                () => {console.log('final'); }
            );
    }

}
