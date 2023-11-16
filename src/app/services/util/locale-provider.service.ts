import {Injectable, LOCALE_ID, Provider} from '@angular/core';
import {LSLanguage} from "../http/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class LocaleProviderService extends String {
  private readonly langCode: string = navigator.language;

  constructor() {
    super();
    const browserLocale = navigator.language;
    const supportedLocales = ['en', 'fr'];
    let language = '';

    for (const locale of supportedLocales) {
      if (browserLocale.toLowerCase().startsWith(locale)) {
        language = locale;
        break;
      }
    }

    if (language === '') {
      language = LSLanguage();
    } else {
      if (LSLanguage() != 'en') {
        language = LSLanguage()
      }
    }
    this.langCode = language;
  }

  override toString(): string {

    return this.langCode;
  }

  override valueOf(): string {
    return this.toString();
  }
}

export const LocaleProvider: Provider = {
  provide: LOCALE_ID,
  useClass: LocaleProviderService,
  deps: [],
};
