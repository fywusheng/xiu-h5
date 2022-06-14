<!--
 * @Description: 电子证
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-16 17:52:54
-->
<template>
  <div>
    <div class="tool-bar-content">
      <dl class="item">
        <dt @click="routeNext('elderly-card')">
          <img :src="require('@/assets/imgs/common/hoem-certificate.png')" />
        </dt>
        <dd>亮证</dd>
      </dl>
      <dl class="item">
        <dt @click="routeNext('qr-code-scan')">
          <img :src="require('@/assets/imgs/common/home-scan.png')" />
        </dt>
        <dd>扫一扫</dd>
      </dl>
      <dl @click="routeNext('elderly-code')" class="item">
        <dt><img :src="require('@/assets/imgs/common/home-code.png')" /></dt>
        <dd>老年码</dd>
      </dl>
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
    routeNext(path) {
      this.$router.push({ path: `/${path}` })
    }
  }
}
</script>

<style lang="less" scoped>
.tool-bar-content {
  padding-top: 19px * @ratio;
  padding-bottom: 35px * @ratio;
  margin-top: 50px * @ratio;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(180deg, #ff692d 0%, #ff5121 100%);
  .item {
    text-align: center;
    dt {
      width: 48px * @ratio;
      height: 48px * @ratio;
      margin: 0 auto;
      img {
        width: 100%;
        display: block;
      }
    }
    dd {
      font-size: 18px * @ratio;
      font-weight: 500;
      color: #ffffff;
      line-height: 25px * @ratio;
    }
  }
}
</style>