import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ApplicationHomeComponent} from "./components/main/application-home/application-home.component";
import {ApplicationShellComponent} from "./components/nav/application-shell/application-shell.component";
import {ApplicationFeesComponent} from "./components/main/application-fees/application-fees.component";

const routes: Routes = [
  {
    path: '',
    component: ApplicationShellComponent,
    children: [
      {
        path: '',
        component: ApplicationHomeComponent,
      },
      {
        path: 'home',
        component: ApplicationHomeComponent,
      },
      {
        path: 'fees',
        component: ApplicationFeesComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
