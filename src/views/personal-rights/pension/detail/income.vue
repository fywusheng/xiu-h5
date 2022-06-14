<!--
 * @Description: 收入金额详情
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-26 10:21:37
-->
<template>
  <div class="page-income">
    <div class="label">收入金额（人民币元）</div>
    <div class="amount">5,798.16</div>
    <div class="content">
      <p class="label account-label">对方账户名称/账户</p>
      <p class="account">
        牡丹江市社会保障事业中心机关事业养老基金支出户1702 ******0134
      </p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.page-income {
  background: #ffffff;
  border-radius: 8px * @ratio;
  padding: 16px * @ratio;
  margin-bottom: 16px * @ratio;
  .content {
    display: flex;
    justify-content: space-between;
  }
  .label {
    font-size: 18px * @ratio;
    font-weight: 500;
    color: #787878;
    line-height: 25px * @ratio;
  }
  .amount {
    font-size: 32px * @ratio;
    color: #333333;
    line-height: 1.8;
  }
  .account-label {
    width: 100px * @ratio;
  }
  .account {
    width: 185px * @ratio;
    font-size: 18px * @ratio;
    font-weight: 500;
    color: #333333;
    line-height: 25px * @ratio;
  }
}
</style>