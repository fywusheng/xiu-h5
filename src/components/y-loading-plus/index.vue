<!--
 * @Description: loading插件
 * @Autor: guoruliang
 * @Date: 2020-04-27 13:32:17
 * @LastEditors: Chenyt
 * @LastEditTime: 2020-07-31 10:13:41
 -->
<template>
  <div>
    <!-- 加载gif -->
    <div class="project-loading" v-show="isShow">
      <div class="loading-block">
        <!-- <img src="@/assets/imgs/loading.gif" width="101px" /> -->
        <div class="loadingio-spinner-spinner-4jo03t3p4rc">
          <div class="ldio-n4zwe0gmf4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "y-loading-plus",
  props: {},
  data() {
    return {
      isShow: false
    }
  },
  created() {},
  methods: {
    /**
     * @description: 展示
     * @param {Number} duration 延迟关闭时间
     * @return: \
     * @author: guoruliang
     */
    show(duration = 0) {
      this.isShow = true
      if (!duration) {
        return
      }
      setTimeout(() => {
        this.isShow = false
      }, duration)
    },
    /**
     * @description: 隐藏
     * @param \
     * @return: \
     * @author: guoruliang
     */
    hide() {
      this.isShow = false
    }
  }
}
</script>
<style lang='less' scoped>
// 加载框样式定义
.project-loading {
  background: #fff;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100000;
}

.loading-block {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
// css动画
@keyframes ldio-n4zwe0gmf4 {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.ldio-n4zwe0gmf4 div {
  left: 97px;
  top: 48px;
  position: absolute;
  animation: ldio-n4zwe0gmf4 linear 1s infinite;
  background: @main_color;
  width: 6px;
  height: 24px;
  border-radius: 50%;
  transform-origin: 3px 52px;
}
.ldio-n4zwe0gmf4 div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -0.9166666666666666s;
  background: @main_color;
}
.ldio-n4zwe0gmf4 div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -0.8333333333333334s;
  background: @main_color;
}
.ldio-n4zwe0gmf4 div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.75s;
  background: @main_color;
}
.ldio-n4zwe0gmf4 div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.6666666666666666s;
  background: @main_color;
}
.ldio-n4zwe0gmf4 div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.5833333333333334s;
  background: @main_color;
}
.ldio-n4zwe0gmf4 div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.5s;
  background: @main_color;
}
.ldio-n4zwe0gmf4 div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.4166666666666667s;
  background: @main_color;
}
.ldio-n4zwe0gmf4 div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.3333333333333333s;
  background: @main_color;
}
.ldio-n4zwe0gmf4 div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.25s;
  background: @main_color;
}
.ldio-n4zwe0gmf4 div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.16666666666666666s;
  background: @main_color;
}
.ldio-n4zwe0gmf4 div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.08333333333333333s;
  background: @main_color;
}
.ldio-n4zwe0gmf4 div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
  background: @main_color;
}
.loadingio-spinner-spinner-4jo03t3p4rc {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
}
.ldio-n4zwe0gmf4 {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-n4zwe0gmf4 div {
  box-sizing: content-box;
}
</style>
