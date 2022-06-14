/*
 * @Description: 赡养扶养关系、亲情账号
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-21 13:59:24
 */
import { post } from "../axios"

/**
 * 赡养抚养列表
 * @param {*} relationType 关系类型 (不传则全部 — 0- 赡养人 1-抚养人)
 */
export const findUserSupport = function(params) {
  return post("/nun/api/support/findUserSupport", { data: params })
}
/**
 * 新增/编辑赡养抚养关系
 * @param {*} params supportId 列表Id(不传是为新增)
 * @param {*} params supportName 姓名
 * @param {*} params idCard	身份证号
 * @param {*} params phone 手机号
 * @param {*} params relationId 关系Id
 * @param {*} params supRelName 赡养关系名称
 * @param {*} params supType 类型(01-我赡养的 02-赡养我的 11-我抚养的 12-抚养我的)
 * @param {*} params dataStas 删除时传(“1”)
 */
export const addUserSupport = function(params) {
  return post("nun/api/support/addOrEditUserSupport", { data: params })
}
/**
 * 赡养抚养详情
 * @param {*} supportId 
 */
export const findUserSupportById = function(params) {
  return post("/nun/api/support/findUserSupportById", { data: params })
}
/**
 * 根据条件获取所有亲情关系
 * @param {*} relationType 关系类型 (01-我赡养的 02-赡养我的 11-我抚养的 12-抚养我的),无手机添加亲情关系可不用传 
 */
export const relationListByParam = function(params) {
  return post("/nun/api/family/relationListByParam", { data: params })
}

/**
 * 查询绑定亲情账户的赡养抚养人列表
 * @param {*} pageNum 页码
 * @param {*} pageSize 每页显示条数
 * @param {*} uactId 账户id
 */
export const findFamilyUser = function() {
  return post("nun/api/support/findFamilyUser")
}
/**
 * 获取亲情账号列表
 * @param {*} pageNum 
 * @param {*} pageSize 
 * @param {*} uactId 
 */
export const findFamilyMemberList = function(params) {
  return post("nun/api/family/findFamilyMemberList", { data: params })
}
/**
 * (新无手机号)根据身份证姓名添加亲情账户)
 * @param {*} faceImg 人脸图片(base64)
 * @param {*} fromUactId 建立方账户Id
 * @param {*} fromName 建立方姓名
 * @param {*} toName 接受方姓名
 * @param {*} idCard 身份证号码
 * @param {*} regChnl 渠道
 * @param {*} relationId 关系类型ID
 * @param {*} relationCertWay 认证方式
 * @param {*} supType 01-我赡养的 02-赡养我的 11-我抚养的 12-抚养我的
 * @returns isReceive:是否已领卡(0-未领 1-已领) 
 * @returns isItgl:本次操作是否领取到积分 (0-没领到积分 1-已领到)
 */
export const addIdCardFamily = function(params) {
  return post("nun/api/family/addIdCardFamily", { data: params })
}
/**
 * 解除绑定关系
 * @param {*} familyId 关系id
 * @param {*} userName 姓名
 * @param {*} idCard 身份证号码
 * @param {*} faceImg 图片人脸
 */
export const removeFamily = function(params) {
  return post("nun/api/family/removeFamily", { data: params })
}
/**
 * 短信操作添加亲情账号
 * @param {*} familyId 亲情关系Id
 * @param {*} optType 0 拒绝 , 1 同意
 */
export const familyAddByMessage = function(params) {
  return post("nun/api/family/familyAddByMessage", { data: params })
}
/**
 * 获取邀请人姓名
 * @param {*} familyId 亲情关系Id
 */
export const getFromAccoutByfamilyId = function(params) {
  return post("nun/api/family/getFromAccoutByfamilyId", { data: params })
}
/**
 * 通过有手机添加亲情关系
 * @param {*} supportName 姓名
 * @param {*} idCard 身份证号
 * @param {*} phone 手机号
 * @param {*} relationId 关系Id
 * @param {*} supRelName 赡养关系名称
 * @param {*} supType 类型(01-我赡养的 02-赡养我的 11-我抚养的 12-抚养我的)
 */
export const addFamilyInfoByTel = function(params) {
  return post("nun/api/family/addFamilyInfoByTel", { data: params })
}
/**
 * 亲情账号绑定重新发送
 * @param {*} regChnl 渠道
 * @param {*} familyId 亲情关系Id
 * @param {*} toUactId 对方用户Id
 */
export const retryFamilyInfo = function(params) {
  return post("nun/api/family/retryFamilyInfo", { data: params })
}
/**
 * 查询是否添加过赡养抚养关系，是否已成功绑定亲情关系
 * @param {*} selectType 0-赡养抚养 1-亲情账户 
 */
export const findUserIsAddSup = function(params) {
  return post("nun/api/support/findUserIsAddSup", { data: params })
}
/**
 * 是否已完成领卡操作流程,是否已完成亲情账号绑定流程
 * @param {string} userId 
 */
export const findPopoverList = function(params) {
  return post("/ngcmn/wbst/send/findPopoverList", { data: params })
}
/**
 * 将用户的某个消息标记为已读
 * @param {string} msgId 消息Id
 * @param {string} channel 渠道
 */
export const editstas = function(params) {
  return post("/ngabn/msg/wbst/editstas", { data: params })
}
