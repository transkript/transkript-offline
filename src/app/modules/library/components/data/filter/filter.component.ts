import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormModel} from "../../../models/data/form.model";
import {FormControlAttributes} from "../../../models/data/form-control.model";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {formatDateTime, today} from "../../../../../config/util/date.util";

@Component({
  selector: 'app-filter',
  styleUrl: './filter.component.scss',
  template: `
    <div class="mb-2">
      <p-toggleButton
        [(ngModel)]="filterHidden"
        styleClass="p-button-sm p-button-raised"
        onLabel="Filter"
        offLabel="Filter"
        iconPos="right"
        onIcon="fas fa-light fa-chevron-up"
        offIcon="fas fa-light fa-chevron-down" i18n-onLabel i18n-offLabel>
      </p-toggleButton>
      <div *ngIf="filterHidden" class="py-4">
        <form class="formgrid grid" [formGroup]="form">
          <div *ngFor="let control of formControlModels" class="col-12 md:col-3 field">
            <input
              *ngIf="(control.type == 'text' || control.type == undefined) && !(control.disabled ?? false)"
              pInputText
              [placeholder]="control.label"
              formControlName="{{control.name.toString()}}"
              id="{{control.name}}"
              class="w-full p-inputtext-sm">
            <p-dropdown
              *ngIf="(control.type == 'select')"
              formControlName="{{control.name.toString()}}"
              id="{{control.name}}"
              styleClass="w-full p-inputtext-sm"
              [placeholder]="control.label"
              [options]="controlOptions(control)"
              [lazy]="true"
              [filter]="true" filterBy="name"
              [optionValue]="'id'"
              [optionLabel]="'name'">
            </p-dropdown>
            <p-calendar
              *ngIf="(control.type == 'date')"
              formControlName="{{control.name.toString()}}"
              id="{{control.name}}"
              appendTo="body"
              styleClass="w-full p-inputtext-sm"
              [placeholder]="control.label"
              [dateFormat]="dateFormatCalender"
              [maxDate]="today()"></p-calendar>
          </div>
          <div class="text-center gap-2 col-12">
            <button pButton pRipple type="submit" class="p-button-sm" (click)="submit()" i18n>Filter</button>&nbsp;
            <button pButton pRipple class="p-button-sm" (click)="reset()" i18n>Reset</button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class FilterComponent  implements OnInit, OnChanges {
  @Input()
  formModel?: FormModel;
  @Output()
  submitEvent: EventEmitter<any> = new EventEmitter<any>();
  formControlModels: FormControlAttributes[] = [];
  form: FormGroup = this._fb.group({});
  @Input()
  filterHidden: boolean = false;
  protected readonly dateFormatCalender = "dd/mm/yy";
  protected readonly today = today;
  private isFirstChange = true;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.isFirstChange && this.formModel) {
      this.formControlModels = Object.entries(this.formModel.controls).map(([_, control]) => {
        return control.attribs
      });

      const group: { [p: string]: AbstractControl } = {};
      Object.entries(this.formModel.controls).forEach(([name, control]) => {
        group[name] = new FormControl(null);
        if (control.attribs.disabled) group[name].disable();
      });

      this.form = new FormGroup<any>(group)
      this.form.valueChanges.subscribe(() => this.submit());
      this.isFirstChange = false;
    }
  }

  submit() {
    const value = this.form.value;
    for (const key in value) {
      if (value[key] instanceof Date) {
        value[key] = formatDateTime(value[key])
      }
    }
    this.submitEvent.emit(value);
  }

  controlOptions = (control: FormControlAttributes) => control.values?.map(v => {
    return {id: v.id, name: v.name}
  });

  reset() {
    this.form.reset();
    this.submit();
  }
}


