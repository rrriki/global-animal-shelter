import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {NavbarComponent} from './nav/navbar/navbar.component';
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {AuthModule} from './auth/auth.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule, // Required for Toastr
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        FontAwesomeModule,
        AuthModule.forRoot(),
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-right',
            closeButton: true,
            preventDuplicates: true,
        })
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        NotFoundComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
