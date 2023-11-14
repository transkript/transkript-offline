import {Id} from "../base/base.types";

export interface SchoolModel {
  name: string,
  motto: string,
  organisationId: number,
  domain?: string,
  code?: string,
  applicationOpen?: boolean,
  regNumPrefix?: string,
  deletedAt?: Date,
  id: Id,
}
