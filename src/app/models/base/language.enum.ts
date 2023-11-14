import {enumOptions} from "./base.enum";

export enum Language {
  ENGLISH = "en",
  FRENCH = "fr",
}

export const LanguageName = {
  'en': $localize`English`,
  'fr': $localize`French`,
}

export const languageOptions = enumOptions(Language, {
  value: "key",
  transform: "title"
}, {
  by: 'value',
  ob: LanguageName
});

export const languageValueOptions = enumOptions(Language, {
  value: "value",
  transform: "title"
}, {
  by: 'value',
  ob: LanguageName
});


export const LanguageValues = [
  Language.ENGLISH,
  Language.FRENCH,
]
