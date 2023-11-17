import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {FileUploadModule} from "primeng/fileupload";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {MultiSelectModule} from "primeng/multiselect";
import {ToggleButtonModule} from "primeng/togglebutton";
import {InputNumberModule} from "primeng/inputnumber";
import {TooltipModule} from "primeng/tooltip";
import {DialogModule} from "primeng/dialog";


@NgModule({
  declarations: [],
  providers: [HttpClient],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RippleModule,
    TableModule,
    FileUploadModule,
    DropdownModule,
    CalendarModule,
    MultiSelectModule,
    ToggleButtonModule,
    InputNumberModule,
    TooltipModule,
    DialogModule,
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RippleModule,
    TableModule,
    FileUploadModule,
    DropdownModule,
    CalendarModule,
    MultiSelectModule,
    ToggleButtonModule,
    InputNumberModule,
    TooltipModule,
    DialogModule,
  ]
})
export class SharedModule {
}
