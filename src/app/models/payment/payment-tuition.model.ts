import {createMoney, formatMoney, Money} from "../base/money.model";
import {Id, LocalDateTimeType} from "../base/base.types";

export interface PaymentTuitionModel {
  money: Money
  paymentDate: LocalDateTimeType
  tuitionPaymentId: Id
  paymentId: Id
}

export const tuitionPaymentsSumAsMoney = (payments: PaymentTuitionModel[]) =>
  formatMoney(createMoney(tuitionPaymentsSum(payments)));

export const tuitionPaymentsSum = (payments: PaymentTuitionModel[]) =>
  payments.reduce((acc, curr) => acc + parseFloat(curr.money.amount.toString()), 0)
