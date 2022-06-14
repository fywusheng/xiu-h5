/*
 * @Description: 电子证
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-15 10:39:29
 */
import { post } from "../axios"
/**
 * 身份证正面识别
 * @param {*} image64 图片base64字符串 
 * @returns 
 */
export const getOCR = function(params) {
  return post("auc/auc/imgbase64", { data: params }, {
    headers: {
      "tsf-metadata": ""
    }
  })
}
/**
 * (实名认证)账户与虚拟账户绑定
 * @param {*} userName 建立方账户Id 
 * @param {*} idCard 建立方姓名 
 * @param {*} faceImg 人脸图片(base64) 
 * @param {*} gend 性别 1:男 2:女
 * @param {*} naty 民族 
 * @param {*} brdy 出生日期 
 * @param {*} hsregAddr 户籍地址 
 * @param {*} neckCardType 领证类型（为自己领，为他人领） 
 * @returns 
 */
export const bindBankAcct = function(params) {
  return post("nun/api/userAccount/bindBankAcct", { data: params })
}
/**
 * 单纯实名认证接口
 * @param {*} psnName 姓名 
 * @param {*} certNo 身份证号 
 */
export const cardByNoId = function(params) {
  return post("ngabn/auc/cardByNoId", { data: params })
}
/**
 * 姓名和身份证进行实名认证，获取授权码
 * @param {*} userName 建立方姓名
 * @param {*} idCard 建立方姓名
 * @param {*} gends 性别
 * @param {*} naty 民族
 * @param {*} brdys 出生日期
 * @param {*} hsregAddr 户籍地址
 * @param {*} neckCardType 领证类型（为自己领，为他人领）
 */
export const authAcct = function(params) {
  return post("nun/api/userAccount/authAcct", { data: params })
}
/**
 * 老龄卡申领接口
 * @param {string} appId 应用渠道
 * @param {string} idType 证件类型
 * @param {string} idNo 证件号码
 * @param {string} name 姓名
 * @param {string} dataOr 数据来源
 * @param {string} nwaFlag 全名参保标志
 * @param {string} ecCertExtendDTO 见参数示例，全必填
 * @param {string} ecCertCaregiverInfoDTOList 见参数示例，全必填
 * @param {string} ecCertAttachDTOS 见参数示例，全必填
 */
export const ec_cert_save = async function(params) {
  return post("/eac/senior/ec_cert_save", { data: params })
}
/**
 * 获取申请老年证状态
 * @param {string} appId 证件类型
 * @param {string} idNo 证件号码
 * @param {string} userName 姓名
 * @param {string} idType 身份证
 * @returns authState 1：已授权已激活 2：未授权已激活 3：未激活
 */
export const ec_cert_state = function(params) {
  return post("/eac/senior/ec_cert_state", { data: params })
}
/**
 * 获取用户授权码
 * @param {*} uactId 用户Id 
 * @param {*} psnName 姓名 
 * @param {*} certNo 证件号 
 * @param {*} appId 渠道Id 
 */
export const selcetAutuCode = function(params) {
  return post("nun/api/userAuth/selcetAutuCode", { data: params })
}
/**
 * 电子老年证
 * @param {string} chnlId 渠道id 
 * @param {string} appUserId 渠道用户id 
 * @param {string} authCode 授权码 
 */
export const show_senior_cert = function(params) {
  return post("/eac/senior/show_senior_cert", { data: params })
}
/**
 * 老龄卡二维码获取
 * @param {*} params 
 * @returns 
 */
export const hsecfc_QRCode_Get = function(params) {
  return post("/eac/ec/hsecfc_QRCode_Get", { data: params })
}
/**
 * 老龄卡二维码
 * @param {string} appId 渠道id 
 * @param {string} appUserId 渠道用户id 
 * @param {string} authCode 授权码 
 * @param {string} busTraceNo 业务流水号 
 * @param {string} psnId 用户id 
 */
export const get_gen_code = function(params) {
  return post("/eac/gcode/get_gen_code", { data: params })
}
/**
 * 老龄卡检测接口(卡是否存在)
 * @param {string} idType 证件类型
 * @param {string} idNo 证件号码
 * @param {string} name 姓名
 * @param {string} psnId 人员基础库编号
 * @param {string} dataOr 数据来源
 * @param {string} nwaFlag 全名参保标志
 */
export const ec_cert_check = function(params) {
  return post("/eac/ec/ec_cert_check", { data: params })
}
/**
 * 老龄卡解码接口
 * @param {string} ecQrCode 二维码码值 
 * @param {string} businessType 业务类型 
 * @param {string} operatorId 操作人id 
 * @param {string} operatorName 操作人姓名 
 * @param {string} termId 扫码终端id 
 * @param {string} orgId 机构id 
 * @param {string} businessInfo 业务信息 
 * @param {string} psnId 渠道用户id 
 */
export const decrypt_gen_code = function(params) {
  return post("/eac/gcode/decrypt_gen_code", { data: params })
}
/**
 * 老龄卡二次解码
 * @param {string} ecQrCode 二维码码值 
 * @param {string} businessType 业务类型 
 * @param {string} operatorId 操作人id 
 * @param {string} operatorName 操作人姓名 
 * @param {string} termId 扫码终端id 
 * @param {string} orgId 机构id 
 * @param {string} businessInfo 业务信息 
 * @param {string} psnId 渠道用户id 
 * @param {string} ecToken 解码token 
 */
export const check_gen_code = function(params) {
  return post("/eac/gcode/check_gen_code", { data: params })
}
/**
 * 校验身份证
 * @param {string} idCard 身份证 
 * @param {string} userName 名字
 * @param {string} gend 性别 
 * @param {Date} brdy 出生日期 
 */
export const checkIdCard = function(params) {
  return post("nun/api/userAccount/checkIdCard", { data: params })
}
/**
 * 发送验证码
 * @param {string} mobile 手机号 
 * @param {string} tsf-metadata 请求头固定值
 */
export const sentCode = function(params) {
  return post("ngcmn/sms/sendCode", { data: params }, {
    headers: {
      "tsf-metadata": ""
    }
  })
}
/**
 * 手机号验证码登录
 * @param {string} mobile 手机号 
 * @param {string} vcode 验证码
 */
export const goLogin = function(params) {
  return post("nun/api/login/loginbymobile", { data: params })
}
/**
 * 非老龄委渠道激活授权
 * @param {string} idNo 身份证 
 * @param {string} userName 用户姓名
 */
export const other_cert_active = function(params) {
  return post("eac/senior/other_cert_active", { data: params })
}
