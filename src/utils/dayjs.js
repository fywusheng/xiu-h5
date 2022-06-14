/*
 * @Description: 日期函数
 * @Version: 0.1
 * @Autor: Chenyt
 */

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

/**
 * 时间格式转换
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (time) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}"
    let date
    if (typeof time === "object") {
      date = time
    } else {
      if ((typeof time === "string") && (/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      }
      if ((typeof time === "number") && (time.toString().length === 10)) {
        time = time * 1000
      }
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
      const value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === "a") { return ["日", "一", "二", "三", "四", "五", "六"][value] }
      return value.toString().padStart(2, "0")
    })
    return time_str
  } else {
    return ""
  }
}

/**时间计算
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return "刚刚"
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前"
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前"
  } else if (diff < 3600 * 24 * 2) {
    return "1天前"
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    )
  }
}
