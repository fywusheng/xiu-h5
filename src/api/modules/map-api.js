/*
 * @Description: 地图相关接口
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-24 16:34:47
 */
import { post } from "../axios"

const baesPath = "eac"
/**
 * @description 查找热词
 * @param {int} size 长度
 * @param {String} areaCode 行政区划
 */
export const findKeyWord = function(params, options) {
  return post("eac/orgOffice/findKeyWord", { data: params }, {
    headers: {
      "Authorization": options.authorization
    }
  })
}
/**
 * @description 根据服务场所类型获取附近的服务场所
 * @param {String} orgOfficeType  机构服务场所的类型
 * @param {String} orgOfficeLon 经度
 * @param {String} orgOfficeLat 纬度
 * @param {int} size 显示多少服务场所
 * @returns 
 */
export const getOfficeByType = function(params) {
  return post(`${baesPath}/eac/orgOffice/getOfficeByType`, { data: params }, {
    headers: {
      "Content-Type": "text/plain"
    }
  })
}

// 获取地图搜索结果
export const searchResult = function(params) {
  return post(`${baesPath}/eac/orgOffice/getOfficeByLike`, { data: params }, {
    headers: {
      "Content-Type": "text/plain"
    }
  })
}

// 模糊查询附近可用的机构服务场所
export const getOfficeByLike = function(params, options) {
  return post(`${baesPath}/eac/orgOffice/getOfficeByLike`, { data: params }, {
    headers: {
      "Authorization": options.authorization
    }
  })
}
/**
 * 根据当前位置获取附近的服务场所地图
 * @param {String} userId 用户id
 * @param {String} orgOfficeLon 经度
 * @param {String} orgOfficeLat 纬度
 * @param {String} orgOfficeType 机构类型
 * @param {int} distance 附近多少距离
 * @param {String} orgOfficeName 机构名称
 * @param {String} orgOfficeAddrArea 行政区
 * @param {String} areaCode 地区由移动端上传，行政区划
 * @param {int} size 显示多少个服务场所
 * @returns 
 */
export const getEcOrgOfficeInfoByPoint = function(params, options) {
  return post(`nun/api/userCollect/getEcOrgOfficeInfoByPoint`, { data: params })
}
export const getOfficeByPointPage = function(params, options) {
  return post(`/eac/orgOffice/getOfficeByPointPage`, { data: params })
}

/**
 * @description 根据服务机构id获取服务机构详情信息
 * @param {String} orgOfficeId 机构服务场所Id 
 * @param {String} userId 	用户id
 * @returns 
 */
export const getEcOrgOfficeInfoById = function(params, options) {
  return post(`nun/api/userCollect/getEcOrgOfficeInfoById`, { data: params }, {
    headers: {
      "Authorization": options.authorization
    }
  })
}

// 地图上获取关联服务和内容
export const getRelServCont = function(params, options) {
  return post(`${baesPath}/ngabn/cms/site/getRelServCont`, { data: params })
}
/**
 * 语音识别接口
 * @param {String} audioBase64 
 * @returns 
 */
export const analysis = function(params, options) {
  return post("eac/audio/analysis", { data: params })
}

/**
 * 获取天气接口
 * @param {string} cityName 城市名
 * @param {string} areaName 区县名
 * @returns 
 */
export const getWeather = function(params) {
  return post(`${baesPath}/eac/weather/status`, { data: params })
}

export const getWechatJSSDK = function(params) {
  return post("/cms/iep/web/cms/cmscont/getWechatJSSDK", { data: params })
}
/**
 * 获取所有机构服务场所类型
 * @param {*} params  
 * @param {*} options 
 */
export const getOfficeTypes = function(params, options) {
  return post(`/eac/orgOffice/getOfficeTypes`, { data: params }, {
    headers: {
      "Authorization": options.authorization
    }
  }) 
}
