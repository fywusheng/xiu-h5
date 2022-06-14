<!--
 * @Description: 录音控件
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-13 15:21:55
-->
<template>
  <div>
    <div class="recorder">
      <p v-show="!isVoice" @click="onStartVoice" class="btn"></p>
      <p v-show="isVoice" @click="onEndVoice" class="btn"></p>
      <p>请说出您想搜索的内容</p>
    </div>
    <div class="record-play">
      <audio id="audioVoice" controls autoplay></audio>
    </div>
  </div>
</template>

<script>
import { mapApi } from "@/api"
import Record from "@/utils/recorder/record-sdk"
const recorder = new Record()
export default {
  data() {
    return {
      show:true,//是否显示底部pop框
      isVoice: false,
      isFinished: false,
      audio: ""
    }
  },
  methods: {
    // 开始录音
    onStartVoice() {
      this.onStopAudio()
      this.isFinished = false
      recorder.startRecord({
        success: res => {
          this.$toast("开始录音")
          this.isVoice = true
        },
        error: e => {
          this.isVoice = false
          this.$toast(e)
        }
      })
    },
    // 结束录音
    onEndVoice() {
      this.$toast("结束录音")
      this.isFinished = false
      recorder.stopRecord({
        success: async(res) => {
          this.isVoice = false
          //此处可以获取音频源文件(res)，用于上传等操作
          const base64 = await this.getBase64(res)
          const { code, data } = await mapApi.analysis({
            audioBase64: base64
          })
          if (code === 0) {
            this.$emit("analysis", data.text)
          } else {
            this.$toast("识别失败")
          }
        },
        error: e => {
          this.isVoice = false
        }
      })
    },

    // 播放录音
    onPlayAudio() {
      this.isVoice = false
      this.isFinished = true
      this.audio = document.getElementById("audioVoice")
      recorder.play(this.audio)
    },
    // 停止播放录音
    onStopAudio() {
      recorder.clear(this.audio)
    },
    getBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        // reader.readAsDataURL(blob)
        reader.readAsDataURL(blob)
        reader.onload = () => {
          const base64 = reader.result.split(",")[1]
          resolve(base64)
        }
        reader.onerror = error => reject(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.recorder {
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  background: url("~@/assets/imgs/map/recorder.png") no-repeat center center;
  background-size: 100% 100%;
  padding-top: 61px * @ratio;
  padding-bottom: 13px * @ratio;
  font-weight: 400;
  color: #303133;
  line-height: 25px * @ratio;
  .btn {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 60px * @ratio;
    height: 60px * @ratio;
  }
}
.record-play {
  display: none;
}
</style>