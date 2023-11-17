import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly prefix = '_transkript';

  set = (key: LocalStorageKey, value: any, stringify: boolean = false) => {
    if (stringify) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(this.resolveKey(key), value);
  }

  get = (key: LocalStorageKey): LocalStorageValueType => {
    const value = localStorage.getItem(this.resolveKey(key))
    if (value == null || value == 'null') {
      return undefined;
    }
    if (!isNaN(Number(value))) {
      return Number(value)
    } else if (value) {
      return value;
    } else {
      return undefined;
    }
  }

  getAndParse = <T>(key: LocalStorageKey, force: boolean = false): T | LocalStorageValueType => {
    const value = this.get(key);
    if (typeof value == "string") {
      try {
        return JSON.parse(value)
      } catch (e) {
        if (force) {
          this.remove(key);
          this.set(key, '{}');
          return {}
        }
        return value
      }
    } else if (typeof value == "number" || typeof value == "boolean") {
      return value
    } else {
      return value;
    }
  }

  remove = (key: LocalStorageKey) => localStorage.removeItem(this.resolveKey(key))

  clear = () => localStorage.clear()

  resolveKey = (key: LocalStorageKey) => `${this.prefix}_${key}`
}

const LS = new LocalStorageService();

export type LocalStorageValueType =
  string |
  number |
  boolean |
  object |
  undefined

export type LocalStorageKey =
  'access_token' |
  'organisation_id' |
  'school_id' |
  'account_id' |
  'redirect_to' |
  'language' |
  'current_dashboard' |
  'bulk_students' |
  'onboard_student_admission_payload';

export const AccessToken = () => <string>LS.get("access_token") ?? '';
export const SchoolId = () => {
  const schoolId = LS.get("school_id");
  return typeof schoolId == "number" ? schoolId : undefined;
}
export const OrganisationId = () => <number>LS.get("organisation_id") ?? -1;
export const AccountId = () => <number | undefined>LS.get('account_id') ?? -1;
export const CurrentDashboard = () => <string /*DashboardOption*/ | undefined>LS.get("current_dashboard");
export const LSRedirectTo = () => <string | undefined>LS.get("redirect_to");
export const LSLanguage = () => <string | undefined>LS.get("language") ?? "en";
