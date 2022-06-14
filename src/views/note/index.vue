<!--
 * @Description: 优惠说明首页
 * @Autor: shn
 * @Date: 2021-08-30 13:42:12
 * @LastEditors: shn
 * @LastEditTime: 2021-09-13 16:12:30
-->
<template>
  <div class="page">
    <div class="note-page">
      <div class="text">本栏目是由上海银商电子商务有限公司联合各大商超及品牌商共同推出的，为国家老龄服务平台app用户提供的优惠平台</div>
      <div class="title">1.我实际支付多少钱？</div>
      <div class="text">在交易限额内，您实际扣除的金额等于您购物金额乘以对应的折扣。如在某商户购买100元的商品，折扣98折，那您实际扣除的金额为98元。</div>
      <div class="title">2.如何开具发票?发票开具的品类?</div>
      <div class="text">返回商家列表，点击右下角“订单”，找到需要开票的订单详情；在订单详情页，点击页面下方的“申请开票”功申请电子发票；</div>
      <div class="text">发票开具内容固定为“预付卡销售与充值”，不支持开具其他品类的发票，开票金额为用户支付时的实际扣款金额；</div>
      <div class="title">3.如何查询我的交易记录?</div>
      <div class="text">返回商家列表，点击右下角“订单”或进入我的，点击“我的订单”查看交易记录，点击每一条的交易记录即可查看交易详情；</div>
      <div class="title">4.购物发生的退货，退款怎么处理??</div>
      <div class="text">顾客使用买单优惠购买商品后如需退货，需要持消费交易纸质凭证及退货码去商家柜台办理退货交易；退货码可在消费记录的订单详情页面中查看，对应的支付金额将退至原卡、或退新的购物卡、或直接退现金，具体以商户门店指引为准，折扣部分不予退回。</div>
      <div class="title">5.为什么之前**商户折扣为97折，今天变为98折了???</div>
      <div class="text2">商户折扣以当前页面为准。</div>
      <div class="instructions">该服务由上海银商电子商务有限公司提供，中国银联仅提供使用渠道，用户在使用的过程中，如有任何疑问请联系上海银商电子商务有限公司。</div>
      <div class="instructions">客服电话4000-610-600，工作日:(9:00-17:00)</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.page {
  background: #f2f2f2;
  padding: 16px * @ratio 16px * @ratio 32px * @ratio 16px * @ratio;
  .note-page {
    display: flex;
    flex-direction: column;
    padding: 15px * @ratio 12px * @ratio;
    background: #fff;
    border-radius: 8px * @ratio;
    .text,
    .text2 {
      font-size: 18px * @ratio;
      font-weight: 400;
      color: #333333;
      line-height: 30px * @ratio;
      text-indent: 2em;
    }
    .text2 {
      text-indent: 0;
    }
    .title {
      font-size: 18px * @ratio;
      font-weight: 600;
      color: #333333;
      line-height: 30px * @ratio;
    }
    .instructions {
      font-size: 16px * @ratio;
      font-weight: 400;
      color: #666666;
      line-height: 30px * @ratio;
    }
  }
}
</style>

