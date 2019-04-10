import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { PetService } from './pets/pet.service';
import { PetListComponent } from './pets/pet-list/pet-list.component';
import { PetListResolver } from './pets/pet-list/pet-list.resolver';
import { PetDetailComponent } from './pets/pet-detail/pet-detail.component';
import { PetDetailResolver } from './pets/pet-detail/pet-detail.resolver';
import { CreatePetComponent } from './pets/create-pet/create-pet.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AuthService } from './users/auth.service';
import { AuthInterceptor } from './users/auth.interceptor';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        PetListComponent,
        PetDetailComponent,
        NotFoundComponent,
        CreatePetComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        FontAwesomeModule,
        FormsModule,
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyARnNaxSRWybHbWZ63VEx8q6zRE91Ph58o', libraries: ['places'] })
    ],
    providers: [
        AuthService,
        PetService,
        PetListResolver,
        PetDetailResolver,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
