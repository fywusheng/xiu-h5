/*
 * @Description: 公共接口
 * @Version: 0.1
 * @Autor: yjm
 */
import { post, get } from "../axios"
/**
 * 根据token获取用户信息
 * @param {string} accessToken 登录成功token
 * @returns {string} crtfStas 认证状态 0:未认证 1:实名、实人认证 2：实名认证
 * @returns {string} eleCradStas 领卡状态 0:未领卡 1:已领卡
 */
export const getUserAccount = function(params) {
  return post("/nun/api/token/getUserAccount", { data: params }, {
    headers: {
      "tsf-metadata": ""
    }
  })
}
/**
 * @description 查询是否领卡-亲情账号是否绑定、是否添加过赡养抚养关系
 * @param {String} popoverType 0:是否已领卡 1:亲情绑定提醒 2:赡养抚养提醒
 */
export const getHomePop = function(params) {
  return post("cin/itgl/task/getHomePop", { data: params })
}
/**
 * 获取获取用户授权码
 * @param {string} uactId 用户ID
 * @param {string} certNo 证件号码
 * @param {string} psnName 姓名
 * @param {string} appId 渠道ID
 * @returns 
 */
export const selcetAutuCode = function(params) {
  return post("/nun/api/userAuth/selcetAutuCode", { data: params }, {
    headers: {
      key: "channel",
      value: "app",
      "Content-Type": "text/plain"
    }
  })
}
/**
 * 获取各个分类的未读信息列表
 * @param {string} msgType 消息分类 （1、服务消息（站内信）2、系统提醒 3、通知公告）
 * @param {string} channel 渠道 （直接传app）
 * @param {string} pageNo 当前页面
 * @param {string} pageSize 每页展示记录数
 * @returns 
 */
export const getMessage = function(params) {
  return post("/ngabn/msg/msgtype/list", { data: params })
}
/**
 * 用户新增意见
 * @param {string} prbDscr 问题描述(长度不超过200) 
 * @param {string} img 图片(多值用逗号分隔)
 * @param {string} crterId 创建人ID
 * @param {string} crterName 创建人姓名 
 * @param {string} crterMob 创建人电话 
 * @returns 
 */
export const saveOpinion = function(params) {
  return post("/ngabn/app/prb/add", { data: params }, {
    headers: {
      "Content-Type": "text/plain"
    }
  })
}
// 城市列表树形结构接口  /ngabn/mag/usersearch/getRegnAreaTree
export const getRegnAreaTree = function(params) {
  return post("/common/cusc/api/usersearch/getRegnAreaTree", { data: params })
}
// 根据城市级别获取城市
export const getRegnNamebyLV = function(params) {
  return get("/common/cusc/api/usersearch/getRegnNamebyLV", { params: params })
}
/**
 * 用户端批量上传图片
 * @param {array} base64Strings 图片base64字符串,单个文件大小超过10MB报错 
 * @param {string} fileExt 支持jpg,jpeg,png,tif,tiff,ico,cur,bmp,gif,svg,svgz,文件后缀 
 * @returns 
 */
export const batchUpload = function(params) {
  return post("/ngabn/app/imgRpc/batchUpload", { data: params }, {
    headers: {
      "Content-Type": "text/plain"
    }
  })
}
/**
 * 用户端批量上传图片
 * @param {string} base64String 图片base64字符串,单个文件大小超过10MB报错 
 * @param {string} fileExt 支持jpg,jpeg,png,tif,tiff,ico,cur,bmp,gif,svg,svgz,文件后缀 
 * @returns 
 */
export const uploadBase64 = function(params) {
  return post("/ngabn/app/imgRpc/uploadBase64", { data: params }, {
    headers: {
      "Content-Type": "text/plain"
    }
  })
}
// (新实名认证)账户与虚拟账户绑定
export const bindBankAcct = function(params) {
  return post("/nun/api/userAccount/bindBankAcct", { data: params }, {
    headers: {
      "Content-Type": "text/plain",
      "key": "channel",
      "value": "app"
    }
  })
}
// 获取亲情账号邀请人信息
export const getFromAccoutByfamilyId = function(params) {
  return post("/nun/api/family/getFromAccoutByfamilyId", { data: params })
}
// 地图上获取关联服务和内容
export const getRelServCont = function(params, options) {
  return post("/ngabn/cms/site/getRelServCont", { data: params })
}
// 绑定亲情账号
export const familyAddByMessage = function(params, options) {
  return post("/nun/api/family/familyAddByMessage", { data: params })
}
/**
 * 辟谣列表
 * @param {*} pageNum 
 * @param {*} pageSize 
 */
export const selectRumorByDTO = function(params) {
  return post("/cms/iep/web/cms/cmscont/selectRumorByDTO", { data: params })
}
/**
 * 辟谣详情
 * @param {*} contId 
 * @param {*} userId
 */
export const getContById = function(params, options) {
  return post("/cms/iep/web/cms/cmscont/getContById", { data: params })
}
/**
 * 去掉背景接口
 * @param {*} photoBase64 
 * 
 */  
export const clearBg = function(params){
  return post("/eac/ec/photo/extract", { data: params })
} 
 /**
 * 人脸比对每天只能调用5次）
 * @param {*} "psnName": "姓名",
 * @param {*} "image64": "base64",
 * @param {*} "certNo": "身份证号", 
 * @param {*} "userId": 用户Id
 */ 
export const authComparions = function(params){
  return post("/auc/auc/userPenCount", { data: params })
} 