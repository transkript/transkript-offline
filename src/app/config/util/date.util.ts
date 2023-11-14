import * as luxon from "luxon";
import {LocalDateTimeType, LocalDateType, LocalTimeType} from "../../models/base/base.types";
import {LSLanguage} from "../../services/http/local-storage.service";
import {DateTimeFormatOptions} from "luxon";
import {titlecase} from "./string.util";

export const DateTime = luxon.DateTime

const config = {
  format: {
    code: {
      time: 'HH:mm:ss',
      date: 'yyyy-MM-dd',
      dateTime: "yyyy-MM-dd'T'HH:mm:ss",
    },
    display: {
      time: 'HH:mm',
      date: 'MMM d, yyyy',
      dateTime: "dd/MM/yyyy 'at' HH:mm:ss",
    }
  }
}
export const timeFormat = config.format.code.time;
export const dateFormat = config.format.code.date;
export const dateTimeFormat = config.format.code.dateTime;
export const dateFormatCalender = "dd/mm/yy";

export const today = () => DateTime.now().toJSDate();
export const todayYear = () => today().getFullYear();

export const formatDateTime = (date: Date | undefined, format: string = dateTimeFormat) => {
  if (date instanceof Date) {
    const dateTime = DateTime.fromJSDate(date).toFormat(format).replace(' ', 'T');
    if (dateTime && dateTime != "Invalid DateTime") return dateTime;
    else return undefined
  } else return undefined;
}
export const formatDate = (date: Date | undefined) => formatDateTime(date, dateFormat)
export const formatTime = (date: Date | undefined) => formatDateTime(date, timeFormat)

export const getDateTime = (date: LocalDateTimeType | LocalDateType | LocalTimeType | undefined, format: string = dateTimeFormat) => {
  if (date) {
    const dateTime = DateTime.fromFormat(date, format);
    if (dateTime.invalidReason != null) {
      return DateTime.fromISO(date);
    }
    return dateTime
  } else return undefined;
}

export const getDate = (date: LocalDateType | undefined) => getDateTime(date, dateFormat);
export const getTime = (time: LocalTimeType | undefined) => getDateTime(time, timeFormat)

export const getDateTimeJS = (date: LocalDateTimeType | LocalDateType | LocalTimeType | undefined, format: string = dateTimeFormat) => {
  return getDateTime(date, format)?.toJSDate()
}

export const displayDateTime = (date: LocalDateTimeType | undefined) => displayTime(date, {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
});

export const displayDate = (date: LocalDateType | undefined) => displayTime(date, {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});

export const displayTime = (date: string | undefined, options: DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}) => {
  let displayDateTime = getDate(<any>date);
  if (displayDateTime) displayDateTime = displayDateTime.setLocale(LSLanguage());
  const displayDateTimeStr = displayDateTime?.toLocaleString(options) ?? '';
  return titlecase(displayDateTimeStr);
}

