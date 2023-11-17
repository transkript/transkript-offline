import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./modules/application/application.module').then(m => m.ApplicationModule)
  },
];
