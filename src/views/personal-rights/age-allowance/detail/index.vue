<!--
 * @Description: 养老金明细
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-26 09:41:26
-->
<template>
  <div class="page-detail">
    <div class="list">
      <income />
      <trade />
    </div>
  </div>
</template>

<script>
import income from "./detail/detail-item-income"
import trade from "./detail/detail-trade-item"
export default {
  components: {
    income,
    trade
  }
}
</script>

<style lang="less" scoped>
.page-detail {
  padding: 12px * @ratio 16px * @ratio 0;
  background: #f5f5f5;
  height: 100vh;
}
</style>