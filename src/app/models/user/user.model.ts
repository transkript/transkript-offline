import {Id, LocalDateTimeType} from "../base/base.types";

export interface UserModel {
  id?: Id,
  createdAt?: LocalDateTimeType,
  updatedAt?: LocalDateTimeType,
  deletedAt?: LocalDateTimeType,
  username: string,
  email: string,
  role?: string,
  passwordType?: string,
  language?: string,
  accountId?: number,
  approved?: boolean,
  phone?: string,
  address?: string,
  password?: string
}
