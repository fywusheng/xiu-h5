/*
 * @Description: 支付接口
 * @Version: 0.1
 */

import { post } from "../axios"

// 收银台详情展示服务 收银台根据id获取订单详情和用户token
export const showCheckStand = function(params) {
  return post(`/offlineshopping/upCard/showCheckStand`, { data: params })
}
//兼容收银台订单
export const showCheckStandOrder = function(params) {
  return post(`/offlineshopping/order/showCheckStand`, { data: params })
}
 // 创建支付码页面
export const getPayCodePage = function(params) {
  return post(`/offlineshopping/upCard/createAuthCode`, { data: params })
}

// 惠老钱包是否有卡标记
export const getCardStatus = function(params) {
  return post(`/offlineshopping/bankCardUseRecord/selectCardFlag`, { data: params })
}

// 根据银行卡号返回银行及账号信息
export const getBankInfoByNo = function(params) {
  return post(`/offlineshopping/bindingBankCard/getBankByCard`, { data: params })
}

// 绑卡四要素认证，请求验证码
export const sendVarifyCode = function(params) {
  return post(`/offlineshopping/bindingBankCard/fourElementAuth`, { data: params })
}

// 开通在现在付-提交验证码
export const sendVarifyCodeOpenPay = function(params) {
  return post(`/offlineshopping/bindingBankCard/signAgreement`, { data: params })
}

// 新增绑定银行卡
export const addBindCard = function(params) {
  return post(`/offlineshopping/bankCardUseRecord/addBankCard`, { data: params })
}

// 银行卡排序维护
export const updateBank = function(params) {
  return post(`/offlineshopping/bankCardUseRecord/updateBankCard`, { data: params })
}

// 银行卡更新
export const updateBankCardRecord = function(params) {
  return post(`/offlineshopping/bankCardUseRecord/updateBankCardRecord`, { data: params })
}

// 银行卡解绑
export const deleteBankCard = function(params) {
  return post(`/offlineshopping/bankCardUseRecord/deleteBankCard`, { data: params })
}

// 惠老钱包银行卡列表
export const selectCardList = function(params) {
  return post(`/offlineshopping/bankCardUseRecord/selectCardList`, { data: params })
}

// 银行卡详情接口
export const selectBankCardInfo = function(params) {
  return post(`/offlineshopping/bankCardUseRecord/selectBankCardInfo`, { data: params })
}

// 支付页面请求验证码
export const sendSmsOnPay = function(params) {
  return post(`/offlineshopping/kltQuickPayment/sendSms`, { data: params })
}
//支付宝预下单接口
export const toPayment = function(params) {
  return post(`/offlineshopping/payment/toPayment`, { data: params })
}
