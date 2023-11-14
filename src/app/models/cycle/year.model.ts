import {Id, LocalDateTimeType} from "../base/base.types";

export interface YearModel {
  id: Id,
  createdAt?: LocalDateTimeType,
  updatedAt?: LocalDateTimeType,
  deletedAt?: LocalDateTimeType,
  startYear: number,
  cycleInfo: CycleInfoModel,
  endYear?: number,
  name: string,
  schoolId: Id,
}

export interface CycleInfoModel {
  openingDate: string,
  closingDate?: string,
  launchDate?: string,
  closedDate?: string
}
