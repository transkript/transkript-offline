import {Component} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {SharedModule} from "./modules/shared.module";
import en from '@angular/common/locales/en';
import fr from '@angular/common/locales/fr';

registerLocaleData(en, 'en');
registerLocaleData(fr, 'fr');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'transkript-ol';
}
