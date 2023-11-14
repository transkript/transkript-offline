export interface FormControlAttributes<T = any> {
  label: string
  name: keyof T
  disabled?: boolean,
  classes?: string
  type?: FormControlType
  values?: FormControlValue[]
}

export class FormControlModel<T = any> {
  constructor(public attribs: FormControlAttributes<T>) {
  }

  public get isSelect() {
    return this.attribs.type == "select";
  }
}

export class FormControlValue {
  public id: any
  public name: any

  constructor(v: any, id?: any, name?: any) {
    if (Object.hasOwn(v, 'id')) {
      this.id = v['id'];
    } else if (id) {
      this.id = id;
    } else {
      this.id = v;
    }
    if (Object.hasOwn(v, 'name')) {
      this.name = v['name'];
    } else if (name) {
      this.name = name;
    } else {
      this.name = v;
    }
  }

  public static of(v: any) {
    return new FormControlValue(v);
  }

  public static ofArray(v: any[], transform?: (v: any) => any) {
    if (transform) {
      return v.map(transform).map(FormControlValue.of);
    }
    return v.map(FormControlValue.of);
  }
}

type FormControlType = "text" | "number" | "select" | "date"
