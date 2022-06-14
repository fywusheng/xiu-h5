/*
 * @Description: 字典函数工具
 * @Version: 0.1
 * @Autor: Chenyt
 */
import store from "@/store"
import isEmpty from "lodash/isEmpty"
import isObject from "lodash/isObject"

function normalizType(val) {
  if (isObject(val)) {
    return val
  }
  return { type: val }
}
/**
 * 通过编码值获取中文值
 * @param {String} type 字典表类型
 * @param {String} val 编码值
 * @param {Array} formatter 格式化数据回调函数，(data:any,params:any):any
 * @param {Array} getCodeApi 字典数据api函数 (types:string):promise
 */
export function getLabelByCode(val, type, formatter, getCodeApi) {
  return translateDictionary(
    normalizType(type),
    val,
    true,
    formatter,
    getCodeApi
  )
}

/**
 * 通过中文值获取编码值
 * @param {String} type 字典表类型
 * @param {String} val 中文值
 * @param {Array} formatter 格式化数据回调函数，(data:any,params:any):any
 * @param {Array} getCodeApi 字典数据api函数 (types:string):promise
 */
export function getCodeByLabel(val, type, formatter, getCodeApi) {
  return translateDictionary(
    normalizType(type),
    val,
    false,
    formatter,
    getCodeApi
  )
}

/**
 * 通过编码值获取中文值
 * @param {String} type 字典表类型
 * @param {String} val 编码值
 * @param {Array} formatter 格式化数据回调函数，(data:any,params:any):any
 * @param {Array} getCodeApi 字典数据api函数 (types:string):promise
 */
export async function asyncGetLabelByCode(val, type, formatter, getCodeApi) {
  return asyncTranslateDictionary(
    normalizType(type),
    val,
    true,
    formatter,
    getCodeApi
  )
}

/**
 * 通过中文值获取编码值
 * @param {String} type 字典表类型
 * @param {String} val 中文值
 * @param {Array} formatter 格式化数据回调函数，(data:any,params:any):any
 * @param {Array} getCodeApi 字典数据api函数 (types:string):promise
 */
export async function asyncGetCodeByLabel(val, type, formatter, getCodeApi) {
  return asyncTranslateDictionary(
    normalizType(type),
    val,
    false,
    formatter,
    getCodeApi
  )
}

/**
 * 通过编码值获取中文值
 * @param {String} type 字典表类型
 * @param {Array|String} vals 编码值以逗号分割的字符串数据
 * @param {String} delimiter 返回数据拼接分割符
 * @param {Array} formatter 格式化数据回调函数，(data:any,params:any):any
 * @param {Array} getCodeApi 字典数据api函数 (types:string):promise
 */
export function getLabelByCodes(vals, type, delimiter, formatter, getCodeApi) {
  let values = []
  if (Array.isArray(vals)) {
    values = vals
  } else if (typeof vals == "string") {
    values = vals.split(",")
  }

  const data = values
    .map(item =>
      getLabelByCode(item, normalizType(type), formatter, getCodeApi)
    )
    .filter(Boolean)
  return delimiter !== undefined ? data.join(delimiter) : data
}

/**
 * 异步通过编码值获取中文值
 * @param {String} type 字典表类型
 * @param {Array|String} vals 编码值以逗号分割的字符串数据
 * @param {String} delimiter 返回数据拼接分割符
 * @param {Array} formatter 格式化数据回调函数，(data:any,params:any):any
 * @param {Array} getCodeApi 字典数据api函数 (types:string):promise
 */
export function asyncGetLabelByCodes(
  vals,
  type,
  delimiter,
  formatter,
  getCodeApi
) {
  let values = []
  const data = []

  if (Array.isArray(vals)) {
    values = vals
  } else if (typeof vals == "string") {
    values = vals.split(",")
  }

  values
    .map(async item =>
      data.push(
        await asyncGetLabelByCode(
          item,
          normalizType(type),
          formatter,
          getCodeApi
        )
      )
    )
    .filter(Boolean)

  return Promise.resolve(delimiter !== undefined ? data.join(delimiter) : data)
}

/**
 * 通过中文值获取编码值
 * @param {String} type 字典表类型
 * @param {Array|String} vals 中文值以逗号分割的字符串数据
 * @param {String} delimiter 返回数据拼接分割符
 * @param {Array} formatter 格式化数据回调函数，(data:any,params:any):any
 * @param {Array} getCodeApi 字典数据api函数 (types:string):promise
 */
export function getCodeByLabels(vals, type, delimiter, formatter, getCodeApi) {
  let values = []
  if (Array.isArray(vals)) {
    values = vals
  } else if (typeof vals == "string") {
    values = vals.split(",")
  }

  const data = values
    .map(item =>
      getCodeByLabel(item, normalizType(type), formatter, getCodeApi)
    )
    .filter(Boolean)
  return delimiter !== undefined ? data.join(delimiter) : data
}

/**
 * 异步通过中文值获取编码值
 * @param {String} type 字典表类型
 * @param {Array|String} vals 中文值以逗号分割的字符串数据
 * @param {String} delimiter 返回数据拼接分割符
 * @param {Array} formatter 格式化数据回调函数，(data:any,params:any):any
 * @param {Array} getCodeApi 字典数据api函数 (types:string):promise
 */
export function asyncGetCodeByLabels(
  vals,
  type,
  delimiter,
  formatter,
  getCodeApi
) {
  let values = []
  const data = []

  if (Array.isArray(vals)) {
    values = vals
  } else if (typeof vals == "string") {
    values = vals.split(",")
  }

  values
    .map(async item =>
      data.push(
        await asyncGetCodeByLabel(
          item,
          normalizType(type),
          formatter,
          getCodeApi
        )
      )
    )
    .filter(Boolean)

  return Promise.resolve(delimiter !== undefined ? data.join(delimiter) : data)
}

/**
 * 数据过滤转换
 * @param {String} val 编码值/中文值
 * @param {Array} data 过滤数据源
 * @param {String} value 数据取值格式 byCode:value | byLabel:label
 * @param {String} label 数据取值格式 byCode:label | byLabel:value
 */
function filter(val, data, value, label) {
  let response = val
  data.some(item => {
    if (item[value] == val) {
      response = item[label]
      return true
    }
  })
  return response
}

/**
 * 转换字典数据
 * @param {String} type 字典类型
 * @param {String} val 被转换的值
 * @param {Boolean} byCode 是否通过编码值 true：byCode | false：byLabel
 * @param {Array} formatter 格式化数据回调函数，(data:any,params:any):any
 * @param {Array} getCodeApi 字典数据api函数 (types:string):promise
 */
function translateDictionary(
  params,
  val,
  byCode = true,
  formatter,
  getCodeApi
) {
  const { type, ...other } = params
  const dictionary = store.state.dictionary
  const label = byCode ? dictionary.format.name : dictionary.format.value
  const value = byCode ? dictionary.format.value : dictionary.format.name
  const data = store.getters.dictionaryCodeList[type]

  let response = val

  if (!isEmpty(data)) {
    response = filter(val, data, value, label)
  } else {
    if (!dictionary.dictionaryRequestLock.includes(type)) {
      store.dispatch("dictionary/getCodeList", {
        payload: { types: type, ...other },
        formatter,
        getCodeApi
      })
    }
  }

  return response
}

/**
 * 异步转换字典数据
 * @param {String} type 字典类型
 * @param {String} val 被转换的值
 * @param {Boolean} byCode 是否通过编码值 true：byCode | false：byLabel
 * @param {Array} formatter 格式化数据回调函数，(data:any,params:any):any
 * @param {Array} getCodeApi 字典数据api函数 (types:string):promise
 */
async function asyncTranslateDictionary(
  params,
  val,
  byCode = true,
  formatter,
  getCodeApi
) {
  const { type, ...other } = params
  const dictionary = store.state.dictionary
  const label = byCode ? dictionary.format.name : dictionary.format.value
  const value = byCode ? dictionary.format.value : dictionary.format.name
  let data = store.getters.dictionaryCodeList[type]

  let response = val

  if (!isEmpty(data)) {
    response = filter(val, data, value, label)
  } else {
    if (!dictionary.dictionaryRequestLock.includes(type)) {
      data = await store.dispatch("dictionary/getCodeList", {
        payload: { types: type, ...other },
        formatter,
        getCodeApi
      })
      data = data[type] // 根据接口数据格式做适配
      if (!isEmpty(data)) {
        response = filter(val, data, value, label)
      }
    }
  }

  return response
}
