import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { PetService } from './pets/pet.service';
import { PetListComponent } from './pets/pet-list/pet-list.component';
import { PetListResolver } from './pets/pet-list/pet-list.resolver';
import { PetDetailComponent } from './pets/pet-detail/pet-detail.component';
import { PetDetailResolver } from './pets/pet-detail/pet-detail.resolver';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AuthService } from './users/auth.service';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        PetListComponent,
        PetDetailComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        FontAwesomeModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: AuthService.getToken,
                whitelistedDomains: ['http://localhost:8080']
            }
        })
    ],
    providers: [
        AuthService,
        PetService,
        PetListResolver,
        PetDetailResolver,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
