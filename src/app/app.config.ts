import {ApplicationConfig, importProvidersFrom, Renderer2, RendererFactory2, Type} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {AppServiceInjectables} from "./config/provider/app.injectables";
import {HttpClientModule} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    AppServiceInjectables
  ],
};
