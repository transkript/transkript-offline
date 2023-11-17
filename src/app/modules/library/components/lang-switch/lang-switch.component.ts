import {Component, OnInit} from '@angular/core';
import {EnumOptions} from "../../../../models/base/base.enum";
import {LocalStorageService} from "../../../../services/http/local-storage.service";
import {LocaleProviderService} from "../../../../services/util/locale-provider.service";
import {languageValueOptions} from "../../../../models/base/language.enum";
import {DropdownChangeEvent} from "primeng/dropdown";

@Component({
  selector: 'app-lang-switch',
  template: `
    <p-dropdown styleClass="p-inputtext-sm" [options]="languageOptions" optionLabel="name" [(ngModel)]="language"
                (onChange)="languageSwitchEventAction($event)"></p-dropdown>
  `,
  styles: []
})
export class LangSwitchComponent implements OnInit {
  language?: EnumOptions;
  protected readonly languageOptions = languageValueOptions;

  constructor(
    private _localStorage: LocalStorageService,
    private _localeProvider: LocaleProviderService
  ) {
    const language = _localeProvider.toString();
    this.language = this.getLanguageOptionByValue(language);
  }

  ngOnInit() {
  }

  getLanguageOptionByValue(value: string) {
    const options = this.languageOptions.filter(op => {
      return op.value.toUpperCase() == value.toUpperCase()
    });
    return options.length > 0 ? options[0] : undefined;
  }

  languageSwitchEventAction($event: DropdownChangeEvent) {
    const langOpt = $event.value as EnumOptions | undefined;
    if (langOpt) {
      this._localStorage.set("language", (langOpt.value).toLowerCase());
      location.reload();
    }
  }
}
