import {Injectable} from '@angular/core';
import {StudentApplicationTrialPayload} from "../../models/student/student-application-trial.payload";
import {UserPayload} from "../../models/user/user.payload";
import {LocalStoragePreset} from "lowdb/browser";
import {YearModel} from "../../models/cycle/year.model";
import {LaunchClassLevelModel, LaunchResponse} from "../../models/auth/launch.model";
import {SchoolModel} from "../../models/school/school.model";
import {Subject} from "rxjs";
import {LocalStorageService} from "../http/local-storage.service";
import {PaymentRecordModel} from "../../models/payment/payment-record.model";

@Injectable({
  providedIn: 'root'
})
export class JsonRepoService {
  accessSubject: Subject<"r" | "w"> = new Subject<"r" | "w">();
  private defaultData: JsonRepo = {
    trials: [],
    classLevels: [],
    academicYears: [],
  }

  constructor(private localStorage: LocalStorageService) {
  }

  data = async () => {
    const db = await this.database();
    db.read();
    this.accessSubject.next("w");
    return db.data;
  }

  retrieve = async <T extends JsonRepoValueTypes>(k: keyof JsonRepo): Promise<T | undefined> => {
    const data = await this.data();
    this.accessSubject.next("r");
    return data[k] as T;
  }

  update = async <T extends JsonRepoValueTypes>(k: keyof JsonRepo, data: T) => {
    const db = await this.database();
    db.data[k] = <any>data;
    db.write();
    this.postUpdate(k, data);
    db.read();
    return db.data;
  }

  updateAll = async (values: { key: keyof JsonRepo, data: JsonRepoValueTypes }[]) => {
    let res;
    for (let i = 0; i < values.length; i++) {
      const v = values[i];
      res = await this.update(v.key, v.data)
    }
    return res;
  }

  private database = async () => {
    return LocalStoragePreset<JsonRepo>('_transkript_db', this.defaultData);
  }

  private postUpdate<T extends JsonRepoValueTypes>(k: keyof JsonRepo, data: T) {
    if (k == "currentSchool") {
      this.localStorage.set("school_id", (data as SchoolModel).id);
    }
  }
}

export type JsonRepo = {
  trials: StudentApplicationTrialPayload[],
  trialLoadedAt?: Date,
  academicYears: YearModel[]
  classLevels: LaunchClassLevelModel[]
  paymentRecords?: PaymentRecordModel[],
  launchData?: LaunchResponse,
  currentUser?: UserPayload,
  currentSchool?: SchoolModel,
}

type JsonRepoValueTypes =
  string[] |
  Date |
  UserPayload |
  SchoolModel |
  LaunchResponse |
  YearModel[] |
  PaymentRecordModel[] |
  LaunchClassLevelModel[] |
  StudentApplicationTrialPayload[]
