import {LSLanguage} from "../../services/http/local-storage.service";

export interface Money {
  amount: number
  currency: string
}

export const formatMoney = (money: Money) => `${money.currency.toUpperCase()} ${money.amount.toLocaleString(LSLanguage())}`
export const createMoney = (v: number, currency: Currency = Currency.XAF) => <Money>{ amount: v, currency:currency }

export enum Currency {
  XAF = 'xaf',
  XOF = 'xof',
  EUR = 'eur',
  USD = 'usd',
}

