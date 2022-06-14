<!--
 * @Description: 交易金额详情
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-26 14:06:59
-->
<template>
  <div class="page-trade">
    <p>
      <span class="label">交易日期</span>
      <span class="text">202/05/30</span>
    </p>
    <p>
      <span class="label">摘要</span>
      <span class="text">社保</span>
    </p>
    <div>
      <span class="label">附言</span>
      <p class="text">
        机关事业单位养老保险#2016997#239421909238
      </p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.page-trade {
  background: #ffffff;
  border-radius: 8px * @ratio;
  padding: 16px * @ratio;
  .label {
    display: inline-block;
    width: 90px * @ratio;
    font-size: 18px * @ratio;
    font-weight: 500;
    color: #787878;
    line-height: 25px * @ratio;
  }
  .text {
    display: inline-block;
    width: 185px * @ratio;
    font-size: 18px * @ratio;
    font-weight: 500;
    color: #333333;
  }
}
</style>