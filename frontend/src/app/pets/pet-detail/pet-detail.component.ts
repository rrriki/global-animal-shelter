import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from '../../typing/pet.interface';


@Component({
    selector: 'app-pet-detail',
    templateUrl: './pet-detail.component.html',
    styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {

    pet: Pet;

    constructor (private activatedRoute: ActivatedRoute) {
        this.pet = this.activatedRoute.snapshot.data.pet;
    }

    ngOnInit () {
        console.log(this.pet);
    }

}
