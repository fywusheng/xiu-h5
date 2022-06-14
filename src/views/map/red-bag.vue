<!--
 * @Description: 惠老福利页
 * @Version: 0.1
 * @Autor: wjn
 * @Date: 2021-04-07 14:58:44
 * @LastEditors: wjn
 * @LastEditTime: 2021-04-07 15:10:29
-->
<template>
  <div class="no-content">
    <img src="@/assets/svg/map/no-content.png" alt="">
    <div>
      暂无内容
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.no-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
  img {
    width: 220px * @ratio;
    margin-top: 150px * @ratio;
  }
  div {
    font-size: 18px * @ratio;
    margin-top: 12px * @ratio;
    color: #666666;
  }
}
</style>