<!--
 * @Description: 推荐菜
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-29 09:52:17
-->
<template>
  <div class="page">
    <van-cell title="推荐菜" is-link value="全部" />
    <div class="gallery-list">
      <!-- <dl>
        <dt><img :src="require('@/assets/imgs/map/view@2x.jpg')" /></dt>
        <dd>巧克力提拉米苏</dd>
      </dl> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "recommendedDishes"
}
</script>

<style lang="less" scoped>
.page {
  padding: 14px * @ratio 15px * @ratio 12px * @ratio;
  border-bottom: solid #f2f2f2 8px * @ratio;
}
.gallery-list {
  display: flex;
  justify-content: space-between;
  margin-top: 8px * @ratio;
  dl {
    dt {
      width: 110px * @ratio;
      height: 122px * @ratio;
      img {
        width: 100%;
        display: block;
      }
    }
    dd {
      width: 110px * @ratio;
      font-size: 18px * @ratio;
      line-height: 25px * @ratio;
      color: #333;
      text-align: center;
    }
  }
}
</style>