import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Pet} from '../../typing/pet.interface';


@Component({
    selector: 'app-pet-list',
    templateUrl: './pet-list.component.html',
    styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {

    petList: Pet[];

    constructor(private activatedRoute: ActivatedRoute) {
        this.petList = this.activatedRoute.snapshot.data.petList;
    }

    ngOnInit() {
    }

}
