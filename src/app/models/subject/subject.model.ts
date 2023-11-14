import {Id, LocalDateTimeType} from "../base/base.types";

export interface SubjectModel {
  id?: Id,
  createdAt?: LocalDateTimeType,
  updatedAt?: LocalDateTimeType,
  deletedAt?: LocalDateTimeType,
  name: string
  code: string
  coefficient: number
  departmentId: number
}
