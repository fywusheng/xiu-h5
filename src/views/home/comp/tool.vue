<!--
 * @Description: 辟谣、养老地图
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-16 11:22:23
-->
<template>
  <div class="tool-page">
    <div class="conten">
      <div class="left">
        <div @click="nextRoute('refute-rumors')" class="text">辟谣警示</div>
        <div class="icon">
          <svg-icon icon-class="home-alarm" class-name="custom-class" />
        </div>
      </div>
      <div class="right">
        <div @click="nextRoute('map')">
          <div class="text">养老地图</div>
          <div class="bottom">助餐点 养老院 公园…</div>
        </div>
        <div class="icon">
          <svg-icon icon-class="home-scenic" class-name="custom-class" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: {

      }
    }
  },
  methods: {
    nextRoute(path) {
      this.$router.push({ path: `/${path}` })
    }
  }
}
</script>

<style lang="less" scoped>
.tool-page {
  margin: 12px * @ratio 0;
  .conten {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 118px * @ratio;
      height: 80px * @ratio;
      background: #ffffff;
      border-radius: 8px * @ratio;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .text {
        width: 40px * @ratio;
      }
    }
    .right {
      width: 216px * @ratio;
      height: 80px * @ratio;
      background: #ffffff;
      border-radius: 8px * @ratio;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .text {
        width: 80px * @ratio;
      }
      .bottom {
        font-size: 16px * @ratio;
        color: #999999;
        line-height: 22px * @ratio;
      }
    }
    .text {
      font-size: 20px * @ratio;
      font-weight: 500;
      color: #333333;
      line-height: 24px * @ratio;
    }
    .icon {
      font-size: 35px * @ratio;
      height: auto;
    }
  }
}
</style>