<template>
  <div class="down">
    <img class="_bg" :src="require('@/assets/imgs/pay/downbg.png')" />
    <van-button class="_btn" @click="downUrl" :icon="phoneType == 'ios'? imgs.ios:imgs.android" block>点击下载</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgs: {
        ios: require("@/assets/imgs/pay/Apple.png"),
        android: require("@/assets/imgs/pay/android.png")
      },
      downloadUrl: {
        ios: "https://www.pgyer.com/nepsp-ios-alpha",
        android: "https://www.pgyer.com/5b58216a7165c64d12300aeafbf8f7a8"
      },
      phoneType: ""
    }
  },
  created() {
    this.appSource()
  },
  methods: {
    /**
     * @description: 判断ios android
     * @param {*}
     * @return {*}
     * @author: shn
     */
    appSource() {
      const u = navigator.userAgent
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        this.phoneType = "ios"
      } else {
        this.phoneType = "android"
      }
    },
    /**
     * @description: 跳转下载地址
     * @param {*}
     * @return {*}
     * @author: shn
     */
    downUrl() {
      if (this.phoneType == "ios") {
        window.location.href = this.downloadUrl.ios
      } else if (this.phoneType == "android") {
        window.location.href = this.downloadUrl.android
      }
    }
  }
}
</script>
<style lang="less" scoped>
.down {
  ._bg {
    width: 100%;
    height: auto;
  }
  ._btn {
    width: 260px * @ratio;
    height: 50px * @ratio;
    background: linear-gradient(117deg, #ff8800 0%, #ff5000 100%);
    border-radius: 25px * @ratio;
    margin: 0 auto;
    margin-top: 98px * @ratio;
    color: #fff;
  }
}
</style>

