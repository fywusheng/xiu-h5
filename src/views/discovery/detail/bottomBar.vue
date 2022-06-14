<!--
 * @Description: 详情页播放按钮
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-30 17:57:29
-->
<template>
  <div>
    <div class="bottom">
      <div class="progress-box">
        <img src="@/assets/imgs/discovery/square.png" alt="">
        <van-progress class="progress" pivot-text="" color="#333333" :percentage="25" />
      </div>
      <div class="time">
        <span>03:50</span>
        <span>21:40</span>
      </div>
      <p :class="$store.getters.curAudio.contId === data.contId ? 'active' : ''" class="listen">
        <span v-show="$store.getters.curAudio.contId !== data.contId" @click="play">
          <svg-icon icon-class="listen" class-name="custom-class" /> 听文章
        </span>
        <span v-show="$store.getters.curAudio.contId === data.contId" @click="pause">
          <svg-icon icon-class="pause-color" /> 暂停
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import { isWiFi } from "@/utils/index.js"
import { Dialog, Progress } from "@ylz/vant"

Vue.use(Progress)
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      status: false
    }
  },
  methods: {
    play() {
      if (!isWiFi()) {
        Dialog.confirm({
          message: "当前为非微信环境,是否使用流量播放",
          confirmButtonText: "继续播放",
          cancelButtonText: "暂停播放",
          confirmButtonColor: "#333",
          cancelButtonColor: "#333"
        }).then(() => {
          this.status = true
          this.$store.dispatch("discovery/getCurAudio", this.data)
        })
      }
    },
    pause() {
      this.status = false
      this.$store.dispatch("discovery/cancelCurAudio")
    }
  }
}
</script>

<style lang="less" scoped>
.bottom {
  position: relative;
  display: flex;
  width: 343px * @ratio;
  height: 80px * @ratio;
  background: #f2f2f2;
  border-radius: 8px * @ratio;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px * @ratio;
  padding: 0px * @ratio 8px * @ratio;
  .progress-box {
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 40px * @ratio;
      transform: translateY(-50%);
      width: 18px * @ratio;
      z-index: 99;
    }
    .progress {
      width: 210px * @ratio;
      height: 2px * @ratio;
      background: #d2d2d2;
    }
  }
  .time {
    position: absolute;
    top: 45px * @ratio;
    left: 8px * @ratio;
    display: flex;
    justify-content: space-between;
    width: 210px * @ratio;
    span {
      font-size: 18px * @ratio;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }
  }
  .text {
    color: #999;
    line-height: 25px * @ratio;
  }
  .clickNum {
    margin-left: 12px * @ratio;
  }
  .listen {
    width: 106px * @ratio;
    height: 36px * @ratio;
    line-height: 36px * @ratio;
    border-radius: 18px * @ratio;
    color: #333333;
    background: #ffffff;
    border: 1px * @ratio solid #999999;
    text-align: center;
    &.active {
      width: 81px * @ratio;
      height: 36px * @ratio;
      line-height: 36px * @ratio;
      color: #ff711a;
      background: #ffffff;
      border: 1px * @ratio solid #ff711a;
    }
  }
}
.custom-class {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.3em;
}
</style>