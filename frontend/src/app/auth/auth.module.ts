import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthInterceptor} from './auth.interceptor';
import {AuthService} from './auth.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [],
})

export class AuthModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
                AuthService,
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
            ],
        };
    }
}
