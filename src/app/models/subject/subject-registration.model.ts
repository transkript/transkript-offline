import {Id, LocalDateTimeType} from "../base/base.types";

export interface SubjectRegistrationModel {
  id?: Id,
  createdAt?: LocalDateTimeType,
  updatedAt?: LocalDateTimeType,
  deletedAt?: LocalDateTimeType,
  satId: Id,
  subjectId: number,
}
