import {Id} from "../../models/base/base.types";

export const isValidId = (id?: Id | null) => {
  if (typeof id == "undefined") {
    return false;
  }
  if (typeof id == null) {
    return false;
  }
  if (typeof id == "number" || typeof id == "string") {
    if (typeof id == "number") return !isNaN(id) && id > 0;
    return true
  }
  return false;
}

export const picon = (name: string) => `pi pi-${name}`;
