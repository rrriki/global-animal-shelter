import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { CreatePetComponent } from './create-pet/create-pet.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { PetService } from './pet.service';
import { PetListResolver } from './pet-list/pet-list.resolver';
import { PetDetailResolver } from './pet-detail/pet-detail.resolver';
import { petRoutes } from './pet.routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(petRoutes),
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyARnNaxSRWybHbWZ63VEx8q6zRE91Ph58o', libraries: ['places'] })
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
export class PetModule {}
