import {lowercase, titlecase, uppercase} from "../../config/util/string.util";

export interface EnumOptions {
  id: number,
  value: string,
  name: string
}

export const enumValues = (o: Object) => Object.values(o)
  .filter(v => isNaN(Number(v)))
  .map(v => v.toString())

export const enumOptions = (
  o: Object,
  p?: {
    value?: 'key' | 'value',
    transform?: 'title' | 'upper' | 'lower' | 'default' | ((s: string) => string),
    filter?: (v: any) => boolean
  },
  name?: {
    by?: 'key' | 'value',
    ob: { [p: string]: string }
  }
): EnumOptions[] => {
  const value = p?.value ?? 'key';
  const transform = p?.transform ?? 'title';
  const filter = p?.filter ?? (() => true)
  return Object.entries(o)
    .filter(([_, v]) => {
      return filter(v) && isNaN(parseInt(_))
    })
    .map((entry, index) => {
      const k = entry[0];
      const v = value == 'value' ? entry[1] : entry[0];

      let callback = (s?: string) => s ?? '';
      switch (transform) {
        case "title":
          callback = titlecase;
          break;
        case "upper":
          callback = uppercase;
          break;
        case "lower":
          callback = lowercase;
          break;
      }

      if (name) {
        const nameKey = (name.by ?? 'key') == 'key' ? entry[0] : entry[1];
        return {
          id: index,
          value: (typeof v == 'string') ? v.toUpperCase() : v,
          name: name.ob[nameKey]
        }
      }

      return {
        id: index,
        value: v.toUpperCase(),
        name: callback(
          k.toString()
            .replace('-', ' ')
            .replace('_', ' ')
        )
      }
    });
};

export const getEnumFromValue = (value: string | number, enumeration: { [p: string]: any }) => {
  const enumEntry = Object.entries(enumeration).find(([k, v]) => {
    const valueStr = value.toString().toLowerCase()
    return k.toLowerCase() == valueStr || v == valueStr;
  }) ?? ['', ''];
  return enumEntry[0];
};
