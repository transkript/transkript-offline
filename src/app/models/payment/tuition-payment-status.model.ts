import {Money} from "../base/money.model";
import {PaymentTuitionModel} from "./payment-tuition.model";

export interface TuitionPaymentStatusModel {
  status: TuitionPaymentStatus
  owed: Money
  feeAmount: Money
  payments: PaymentTuitionModel[]
}

export enum TuitionPaymentStatus {
  COMPLETE,
  INCOMPLETE,
  UNPAID,
  UNAVAILABLE
}

export const tuitionPaymentStatusName = (paymentStatus: TuitionPaymentStatus) => TuitionPaymentStatus[paymentStatus].toUpperCase();
