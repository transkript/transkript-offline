import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {getTranslations} from "@soluling/angular";
import {loadTranslations} from "@angular/localize";
import {LocaleProviderService} from "./app/services/util/locale-provider.service";
import "@angular/compiler";
import {environment} from "./environments/environment";
import {enableProdMode} from "@angular/core";

if (environment.profile == "prod") {
  enableProdMode();
}
getTranslations(
  "assets/i18n",
  true,
  true,
  true,
  'en',
  new LocaleProviderService().toString()
).then(translations => {

  if (translations) loadTranslations(translations)
  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
});
