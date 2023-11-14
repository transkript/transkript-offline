import {Money} from "../base/money.model";
import {Id} from "../base/base.types";

export interface PaymentRecordModel {
  name: string,
  identifier: string,
  classLevel: string,
  section: string,
  money: Money,
  trialId?: Id
}
