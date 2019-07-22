import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AgmCoreModule} from '@agm/core';
import {CreatePetComponent} from './create-pet/create-pet.component';
import {PetListComponent} from './pet-list/pet-list.component';
import {PetDetailComponent} from './pet-detail/pet-detail.component';
import {PetService} from './pet.service';
import {PetListResolver} from './pet-list/pet-list.resolver';
import {PetDetailResolver} from './pet-detail/pet-detail.resolver';
import {petRoutes} from './pet.routes';
import {environment} from '../../environments/environment';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        RouterModule.forChild(petRoutes),
        AgmCoreModule.forRoot({apiKey: environment.google_maps_key, libraries: ['places']}),
    ],
    declarations: [
        CreatePetComponent,
        PetListComponent,
        PetDetailComponent
    ],
    providers: [
        PetService,
        PetListResolver,
        PetDetailResolver,
    ]
})
export class PetModule {
}
