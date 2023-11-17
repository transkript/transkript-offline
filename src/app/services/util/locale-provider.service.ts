import {Injectable, LOCALE_ID, Provider} from '@angular/core';
import {LSLanguage} from "../http/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class LocaleProviderService extends String {
  private readonly langCode: string = this.navlang;

  constructor() {
    super();
    const browserLocale = this.navlang;
    const supportedLocales = ['en', 'fr'];
    let language = '';

    for (const locale of supportedLocales) {
      if (browserLocale.toLowerCase().startsWith(locale)) {
        language = locale;
        break;
      }
    }

    try {
      if (language === '') {
        language = LSLanguage();
      } else {
        if (LSLanguage() != 'en') {
          language = LSLanguage()
        }
      }
    } catch (e) {

    }
    this.langCode = language;
  }

  get navlang() {
    try {
      return navigator.language
    } catch (e) {
      return 'en';
    }
  }

  override toString(): string {
    console.log(this.langCode)
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
