import dayjs from "dayjs"

const DEFAULT_FORMATS = {
  date: "YYYY-MM-DD",
  month: "YYYY-MM",
  datetime: "YYYY-MM-DD HH:mm:ss",
  time: "HH:mm:ss",
  year: "YYYY"
}

export function dayFormat(day, format) {
  format = DEFAULT_FORMATS[format] || format
  return dayjs(day).format(format)
}
