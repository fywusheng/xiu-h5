<!--
 * @Description: 文章底部
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-30 17:57:29
-->
<template>
  <div>
    <div class="bottom">
      <p v-if="isShow">
        <span class="text">{{ data.releasedTime }}</span>
        <span class="text clickNum">{{ data.clikCnt }}人在看</span>
      </p>
      <p
        :class="$store.getters.curAudio.contId === data.contId ? 'active' : ''"
        class="listen"
      >
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
import { isWiFi } from "@/utils/index.js"
import { Dialog } from "@ylz/vant"
export default {
  props: {
    data: {
      type: Object,
      default: () => { }
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      status: false
    }
  },
  methods: {
    play() {
      if (!isWiFi()){
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px * @ratio;
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
.custom-class{
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.3em
}
</style>