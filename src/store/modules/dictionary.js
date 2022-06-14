/*
 * @Description: 字典表
 * @Version: 0.1
 * @Autor: Chenyt
 */

import isObject from "lodash/isObject"
import isEmpty from "lodash/isEmpty"
import isString from "lodash/isString"
import isFunction from "lodash/isFunction"
import jsonToArray from "@/utils/common"
import { getCodeListApi } from "@/api/modules/base" // 字典数据请求接口

const state = {
  codeList: {}, // 字典表数据列表
  localCodeListName: "codeList", // sessionStorage本地缓存字典表字段名
  dictionaryRequestLock: [], // 字典数据接口请求锁
  delimiter: ",", // 批量字典类型传参字符串拼接符
  query: "types", // 字典Api字典类型请求字段，可以根据接口修改
  format: {
    value: "value",
    name: "label",
    children: "children"
  },
  getCodeApi: getCodeListApi, // 获取字典数据接口
  formatter: undefined // 全局数据格式化方法函数
}
const mutations = {
  SET_CODE_LIST(state, payload) {
    state.codeList = { ...state.codeList, ...payload }
  }
}
const actions = {
  getCodeList(
    { commit },
    { payload, formatter = state.formatter, getCodeApi = state.getCodeApi }
  ) {
    const { types, ...other } = payload
    let dictionaryQueryParams = []

    if (Array.isArray(types)) {
      dictionaryQueryParams = types
    } else if (isString(types)) {
      dictionaryQueryParams = types.split(state.delimiter)
    }

    // 过滤已缓存参数
    dictionaryQueryParams = dictionaryQueryParams.filter(item => {
      return (
        isEmpty(getCodeList(item)) &&
        !state.dictionaryRequestLock.includes(item)
      )
    })

    if (isEmpty(dictionaryQueryParams)) {
      return commitCodeList(commit)
    } else {
      return getCodeListRequest(
        commit,
        { types: dictionaryQueryParams, ...other },
        formatter,
        getCodeApi
      )
    }
  }
}

// TODO:字典表请求接口 demo
/**
 * 字典表请求接口
 * @param {Array} params 请求参数
 */
// eslint-disable-next-line no-unused-vars
// export function getCodeListApi(params) {
//   // 测试请求数据：第一个参数为请求的字典类型，第二个参数isJson=true：设置返回的数据为json格式，需要设置formatter函数：全局数据格式化方法函数
//   // return mock(params[state.query], true)
//   return mock(params[state.query], false)
// }

/**
 * json data format
 * @param {Object} data 
 */
// eslint-disable-next-line no-unused-vars
function formatter(data) {
  // 数据格式转换
  Object.keys(data).map(item => {
    data[item] = jsonToArray(data[item])
  })
  return data
}
/**
 * 获取字典表数据请求方法
 * @param {Function} commit 提交数据方法
 * @param {Object} params 请求参数
 * @param {Array} formatter 格式化数据回调函数，(data:any,params:any):any
 * @param {Array} getCodeApi 字典数据api函数 (types:string):promise
 */
function getCodeListRequest(commit, params, formatter, getCodeApi) {
  const { types, ...other } = params
  // 添加请求锁
  state.dictionaryRequestLock = [...state.dictionaryRequestLock, ...types]
  return new Promise((resolve, reject) => {
    const getCodeApiFn = getCodeApi || state.getCodeApi

    if (!isFunction(getCodeApiFn)) {
      if (!isFunction(getCodeApi)) {
        throw Error(
          `Invalid value for getCodeApi,getCodeApi is promise api function.`
        )
      }
      if (!isFunction(state.getCodeApi)) {
        throw Error(`Invalid value for state.getCodeApi, state.getCodeApi is promise api function.
        example:
          const state = {
            codeList: {}, // 字典表数据列表
            localCodeListName: "codeList", // sessionStorage本地缓存字典表字段名
            dictionaryRequestLock: [], // 字典数据接口请求锁
            delimiter: ",", // 批量字典类型传参字符串拼接符
            format: {
              value: "value",
              name: "label",
              children: "children"
            },
            getCodeApi: getCodeListApi, // 获取字典数据接口
            formatter: undefined // 全局数据格式化方法函数
          }
      `)
      }
    }

    // 调用数据字典请求接口
    getCodeApiFn({ [state.query]: types, ...other })
      .then(res => {
        if (res.code == 0 && !isEmpty(res.data)) {
          let data = res.data
          // 格式化数据并缓存提交数据
          data = setCodeList({ data, params, formatter, commit })
          resolve(data) // 返回当次请求接口
        } else {
          // 删除该次请求锁
          deleteDictionaryRequestLock(types)
        }
      })
      .catch(err => {
        // 删除该次请求锁
        deleteDictionaryRequestLock(types)
        reject(err)
      })
  })
}
/**
 * 格式化数据并缓存提交数据,数据字典套件数据缓存唯一入口
 * @param {any} data 数据
 * @param {array} params 字典类型数组
 * @param {Function} formatter 格式化函数
 * @param {Function} commit actions commit
 * @param {Boolean} disabledFormatter 禁用格式化
 */
export function setCodeList({
  data,
  params,
  formatter,
  commit,
  disabledFormatter = false
}) {
  // 格式化数据,传入格式化方法会覆盖全局格式化方法
  if (!disabledFormatter && (state.formatter || formatter)) {
    data = formatter
      ? formatter(data, params)
      : state.formatter
        ? state.formatter(data, params)
        : data
  }
  // 缓存到本地
  cacheCodeListToSession(data)
  // 提交到store，触发更新
  commit && commitCodeList(commit, data)
  return data

  /**
   * 缓存数据字典
   * @param {Array|Obejct} data 字典数据
   * @param {String} type 字典类型
   */
  function cacheCodeListToSession(data, type) {
    const localCodes = getCodesBySession(type)

    if (isObject(data) || Array.isArray(data)) {
      sessionStorage.setItem(
        state.localCodeListName,
        JSON.stringify({ ...localCodes, ...data })
      )
    }
  }
}

/**
 * 删除未完成请求的字典请求锁
 * @param {Array} params 请求参数
 */
function deleteDictionaryRequestLock(params) {
  if (!Array.isArray(params)) {
    throw Error("invalid value for params, params need to be array type")
  }

  state.dictionaryRequestLock = state.dictionaryRequestLock.filter(item => {
    if (params.includes(item)) {
      return false
    }
    return true
  })
}

/**
 * 提交数据字典表
 * @param {Function} commit
 * @param {Object} data 字典数据对象
 */
function commitCodeList(commit, data) {
  const codeList = data || getCodeList()
  commit("SET_CODE_LIST", codeList) // 触发响应
  return Promise.resolve(codeList)
}

/**
 * 获取数据字典值
 * @param {String} type 字典类型
 */
export function getCodeList(type) {
  if (type) {
    if (isEmpty(getCodesByStore(type))) {
      return getCodesBySession(type)
    } else {
      return getCodesByStore(type)
    }
  } else {
    return { ...getCodesBySession(type), ...getCodesByStore(type) }
  }
}

/**
 * 获取本地缓存字典表数据
 * @param {String} type 字典类型
 */
function getCodesBySession(type) {
  // 取本地缓存
  const raw = sessionStorage.getItem(state.localCodeListName)
  const dictCodes = raw ? JSON.parse(raw) : {}
  const data = type ? dictCodes[type] : dictCodes
  return !isEmpty(data) ? data : {}
}

/**
 * 获取store缓存字典表数据
 * @param {String} type 字典类型
 */
function getCodesByStore(type) {
  const data = type ? state.codeList[type] : state.codeList
  return !isEmpty(data) ? data : {}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
