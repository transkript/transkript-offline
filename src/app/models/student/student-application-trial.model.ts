import {Id, LocalDateTimeType} from "../base/base.types";

export interface StudentApplicationTrialModel {
  id?: Id,
  createdAt?: LocalDateTimeType,
  updatedAt?: LocalDateTimeType,
  deletedAt?: LocalDateTimeType,
  order: number
  repeating: boolean
  academicYearId: number
}
