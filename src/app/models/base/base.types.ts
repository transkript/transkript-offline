

export type Id = number | string
export type Pair = {
  key: string,
  value: any
}
export type LocalDateTimeType = `${string & { length: 19 }}`
export type LocalDateType = `${string & { length: 10 }}`
export type LocalTimeType = `${string & { length: 8 }}`
