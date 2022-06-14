/*
 * @Description: 优惠买单
 * @Version: 0.1
 * @Autor: shn
 * @Date: 2021-08-27 19:58:25
 * @LastEditors: shn
 * @LastEditTime: 2021-08-30 10:50:41
 */

import { post } from "../axios"

// 惠买单商超品牌门店信息新增
export const querySupermarket = function(params) {
  return post(`/pay/payment/supermarket/querySupermarket`, { data: params })
}

// 支付banner页banner获取
export const qryBannerForPay = function() {
  return post(`/appmag/api/open/app/qryBannerForPay`)
}