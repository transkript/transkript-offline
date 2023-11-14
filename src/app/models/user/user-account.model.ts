import {Id, LocalDateTimeType} from "../base/base.types";
import {SchoolModel} from "../school/school.model";

export interface UserAccountModel{
  id?: Id,
  createdAt?: LocalDateTimeType,
  updatedAt?: LocalDateTimeType,
  deletedAt?: LocalDateTimeType,
  accountId: string,
  firstname: string,
  lastname: string,
  gender: string,
  role: string,
  phone?: string,
  address?: string,
  userId?: number,
  schoolId?: number,
  organisationId?: number,
  name?: string,
  imageFileId?: string,
  schools: SchoolModel[]
}
