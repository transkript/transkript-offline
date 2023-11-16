import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-angular',
  standalone: true,
    imports: [CommonModule, RouterOutlet],
  templateUrl: './angular.component.html',
  styleUrl: './angular.component.scss'
})
export class AngularComponent {

}
