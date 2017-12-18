import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';
import {ApiServerService} from "./providers/apiserver.service";
import {AuthService} from "./providers/auth.service";
import {AuthGuard} from "./providers/authguard.service";
import {LoginComponent} from "./components/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ElectronService, ApiServerService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
