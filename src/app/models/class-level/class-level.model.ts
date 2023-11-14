import {Id, LocalDateTimeType} from "../base/base.types";

export interface ClassLevelModel {
  id?: Id,
  createdAt?: LocalDateTimeType,
  updatedAt?: LocalDateTimeType,
  deletedAt?: LocalDateTimeType,
  name: string,
  order: number,
  parentId: number,
  sectionId: number,
  defaultSubjects: ClassLevelDefaultSubject[],
}

export interface ClassLevelDefaultSubject {
  subjectId: Id,
  subjectName: string,
  coefficient?: number,
  inherited?: boolean,
}
