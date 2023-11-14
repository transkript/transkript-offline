import {FormControlModel} from "./form-control.model";

type FormModelControls<T> = {
  [p in keyof T]: FormControlModel
}

export class FormModel<T = any> {
  constructor(
    public controls: FormModelControls<T>,
  ) {
  }

  static empty() {
    return new FormModel({});
  }
}
