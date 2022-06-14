/*
 * @Description:  惠老服务
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-28 21:35:37
 */
import { post } from "../axios"
/**
 * @description 查找热门服务
 * @param {*} size 长度
 */
export const findHotService = function(params) {
  return post("eac/orgOffice/findHotService", { data: params })
}
// 惠老服务一级分类
export const getFirstClass = function(params) {
  return post("eac/olderService/getFirstClass", { data: params })
}
/**
 * @description 惠老服务二级分类
 * @param {*} serviceId 父节点的serviceId 
 */
export const getSecondClass = function(params) {
  return post("/eac/olderService/getSecondClass", { data: params })
}
/**
 * @description 惠老服务子级服务列表
 * @param {String} orgOfficeTypeFirstClass 服务一级分类serviceId
 * @param {String} orgOfficeTypeSecondClass 服务二级分类serviceId
 * @param {String} size 返回的条数
 * @param {String} distance 返回多少距离以内的
 * @param {String} currentPage 当前页
 * @param {String} pageSize 每页条数
 */
export const getOfficeByTypeWithPage = function(params) {
  return post("/eac/orgOffice/getOfficeByTypeWithPage", { data: params })
}
/**
 * @description 获取服务机构详情信息
 * @param {String} orgOfficeId 机构服务场所Id 
 * @param {String} orgOfficeLat 经度
 * @param {String} orgOfficeLon 纬度
 */
export const getOfficeInfoById = function(params) {
  return post("/eac/orgOffice/getOfficeInfoById", { data: params })
}

