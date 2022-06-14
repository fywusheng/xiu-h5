<!--
 * @Description: 音频组件
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-09 16:05:32
-->
<template>
  <div>
    <audio ref="audio" preload="metadata" @play="play" @pause="pause" @loadedmetadata="onLoadedmetadata" @ended="onEnded" @timeupdate="updataTime" class="dn">
      <source type="audio/mpeg" />
    </audio>
    <div v-show="state.isShow">
      <div v-show="!state.miniModel" class="container-audio">
        <div class="content-audio">
          <div class="left album">
            <img class="lisence" src="@/assets/imgs/discovery/lisence.gif" alt="">
            <img :src="$store.getters.curAudio.pic" class="album-img" />
            <van-circle stroke-linecap="round" :color="gradientColor" v-model="audioState.currentRate" :rate="circleRate" :speed="100" class="circle" stroke-width="60" layer-color="#ffffff" />
          </div>
          <div class="right">
            <p class="tit">{{ state.curName }}</p>
            <div class="content-btn">
              <dl @click="playPrev">
                <dt>
                  <svg-icon icon-class="prev" />
                </dt>
                <dd>上一条</dd>
              </dl>
              <dl v-if="!audioState.playing" @click="play">
                <dt>
                  <svg-icon icon-class="play" />
                </dt>
                <dd>播放</dd>
              </dl>
              <dl v-else @click="pause">
                <dt>
                  <svg-icon icon-class="pause" />
                </dt>
                <dd>暂停</dd>
              </dl>
              <dl @click="playNext">
                <dt>
                  <svg-icon icon-class="next" />
                </dt>
                <dd>下一条</dd>
              </dl>
              <dl @click="close">
                <dt>
                  <svg-icon icon-class="close" />
                </dt>
                <dd>关闭</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div v-show="state.miniModel" class="mini-audio">
        <div @click="state.miniModel = false" class="album">
          <img :src="$store.getters.curAudio.pic" class="album-img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Circle } from "@ylz/vant"
export default {
  components: {
    [Circle.name]: Circle
  },
  data() {
    return {
      state: {
        curId: "1",
        curIndex: 0,
        curName: "",
        miniModel: false,
        isShow: false
      },
      audioState: {
        playing: false, // 是否暂停
        currentRate: 0,
        maxTime: ""
      },
      gradientColor: "#0059FF",
      list: [],
      currentTime: null,
      circleRate: null
    }
  },
  computed: {
    audioList() {
      return this.$store.getters.audioList
    }
  },
  watch: {
    audioList() {
      this.list = this.audioList
    }
  },
  methods: {
    playCur(val) {
      this.pause()
      this.list.forEach((item, index) => {
        if (item.contId === val.contId) {
          this.state.curIndex = index
        }
      })
      this.$nextTick(() => {
        this.state.isShow = true
        this.state.curId = val.contId
        this.state.curName = val.ttl
        this.$refs.audio.src = val.mediaUrl
        this.play()
      })
    },
    // 上一个
    playPrev() {
      this.state.curIndex -= 1
      if (this.state.curIndex < 0) {
        this.state.curIndex = this.list.length - 1
      }
      this.$nextTick(() => {
        const curItem = this.list[this.state.curIndex]
        this.state.curId = curItem.contId
        this.state.curName = curItem.ttl
        this.$refs.audio.src = curItem.mediaUrl
        this.$store.dispatch("discovery/getCurAudio", curItem)
        this.play()
      })
    },
    // 下一个
    playNext() {
      this.state.curIndex += 1
      if (this.state.curIndex > this.list.length - 1) {
        this.state.curIndex = 0
      }
      this.$nextTick(() => {
        const curItem = this.list[this.state.curIndex]
        this.state.curId = curItem.contId
        this.state.curName = curItem.ttl
        this.$refs.audio.src = curItem.mediaUrl
        this.$store.dispatch("discovery/getCurAudio", curItem)
        this.play()
      })
    },
    // 播放
    async play() {
      this.$refs.audio.addEventListener("canplaythrough", () => {
        this.$refs.audio.play()
        console.log(this.audioState.playing)
      })
      this.audioState.playing = true
    },
    // 暂停
    pause() {
      setTimeout(() => {
        this.circleRate = (this.currentTime / this.duration) * 100
        // console.log(this.circleRate)
      }, 1000)
      this.$refs.audio.pause()
      this.audioState.playing = false
      // console.log(this.audioState.playing)
    },
    // 结束
    onEnded() {
      window.setTimeout(() => {
        this.pause()
        this.playNext()
      }, 1000)
    },
    // 获取完音频元数据
    onLoadedmetadata(res) {
      this.currentTime = res.target.currentTime
      this.duration = res.target.duration
      this.audioState.maxTime = res.target.duration
    },
    close() {
      this.state.miniModel = true
    },
    clearTimer() {
      window.clearInterval(this.timer)
      this.timer = null
    },
    updataTime(e) {
      // console.log(e)
      this.currentTime = e.target.currentTime
      setTimeout(() => {
        this.circleRate = (this.currentTime / this.duration) * 100
      }, 1000)
      // console.log("123", this.circleRate)
      // console.log("123", e.target.duration)
    }
  }
}
</script>

<style lang="less" scoped>
.container-audio {
  position: fixed;
  bottom: 70px * @ratio;
  left: 50%;
  transform: translateX(-50%);
  .content-audio {
    width: 342px * @ratio;
    height: 85px * @ratio;
    background: #ffffff;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.24);
    border-radius: 43px * @ratio;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .left {
      width: 80px * @ratio;
      height: 80px * @ratio;
    }
    .right {
      .tit {
        width: 216px * @ratio;
        line-height: 20px * @ratio;
        color: #323233;
        font-weight: 400;
        font-size: 18px * @ratio;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .content-btn {
        margin-top: 10px * @ratio;
        display: flex;
        justify-content: space-around;
        align-items: center;
        dl {
          text-align: center;
        }
      }
    }
  }
}
.mini-audio {
  position: fixed;
  left: 0;
  bottom: 70px * @ratio;
  .album {
    width: 80px * @ratio;
    height: 80px * @ratio;
  }
}
.album {
  position: relative;
  background: rgba(1, 1, 1, 0.12);
  border: 4px * @ratio solid #ffffff;
  border-radius: 50%;
  overflow: hidden;
  .lisence {
    position: absolute;
    top: 50%;
    left: 35%;
    transform: translateY(-50%);
    width: 35%;
    height: 35%;
  }
  .album-img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .circle {
    position: absolute;
    top: 0;
    height: 100%;
    left: 0;
    width: 100%;
  }
}
</style>