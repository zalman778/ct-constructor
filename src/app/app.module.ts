import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';

import {FormsModule} from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import {ApiService} from './service/api.service';
import { ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './component/login/login.component';
import {AuthenticationService} from './service/auth.service';
import {AlertService} from './service/alert.service';
import {AuthGuard} from './guard/auth.guard';
import {ListFullEntityComponent} from './component/list-full-entity/list-full-entity.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [],
  providers: [ApiService, AuthenticationService, AlertService, AuthGuard, ListFullEntityComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
