import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { environment } from 'src/environments/environment.development';
import { JwtModule } from '@auth0/angular-jwt';
import { ServerErrorsInterceptor } from './interceptor/server-errors-interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


export function tokenGetter(){
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    /*Angular Material */
    MaterialModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains:["localhost:8080"],
        disallowedRoutes:["http://localhost:8080/forget"]
      }
    })
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ServerErrorsInterceptor,
      multi:true
    },
    {
      provide:LocationStrategy, useClass:HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
