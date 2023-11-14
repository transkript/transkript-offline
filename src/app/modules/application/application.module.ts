import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import {ApplicationHomeComponent} from "./components/main/application-home/application-home.component";
import {ApplicationShellComponent} from "./components/nav/application-shell/application-shell.component";
import {
  ApplicationNavSidebarComponent
} from "./components/nav/application-nav-sidebar/application-nav-sidebar.component";
import {ApplicationNavHeaderComponent} from "./components/nav/application-nav-header/application-nav-header.component";
import {SharedModule} from "../shared.module";
import {ApplicationFeesComponent} from "./components/main/application-fees/application-fees.component";
import {HttpClientModule} from "@angular/common/http";
import {LibraryModule} from "../library/library.module";


@NgModule({
  declarations: [
    ApplicationHomeComponent,
    ApplicationFeesComponent,
    ApplicationShellComponent,
    ApplicationNavSidebarComponent,
    ApplicationNavHeaderComponent,
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    SharedModule,
    LibraryModule,
  ]
})
export class ApplicationModule { }
