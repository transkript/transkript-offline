import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthenticationRoutingModule} from './authentication-routing.module';
import {SharedModule} from "../shared.module";
import {LoginComponent} from "./components/login/login.component";

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule
  ]
})
export class AuthenticationModule {
}
