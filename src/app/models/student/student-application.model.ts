import {UserAccountModel} from "../user/user-account.model";
import {StudentApplicationTrialModel} from "./student-application-trial.model";
import {ClassLevelModel} from "../class-level/class-level.model";
import {Id, LocalDateTimeType} from "../base/base.types";

export interface StudentApplicationModel {
  id: Id,
  createdAt?: LocalDateTimeType,
  updatedAt?: LocalDateTimeType,
  deletedAt?: LocalDateTimeType,
  classLevel: ClassLevelModel,
  student: UserAccountModel,
  studentApplicationTrials: StudentApplicationTrialModel[]
}
