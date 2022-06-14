<!--
 * @Description: 单个视频
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-04 19:58:58
-->
<template>
  <div>
    <div class="video-container">
      <div v-show="!showVideo" class="pic">
        <p @click="videoPlay" class="icon-player"></p>
        <img
          :src="
            state.imgs
              ? state.imgs[0]
              : require('@/assets/imgs/discovery/default_player_bg.png')
          "
        />
      </div>
      <div v-show="showVideo" class="video">
        <video
          :ref="id"
          :src="state.mediaUrl"
          preload="auto"
          controls
          class="video-item"
        ></video>
      </div>
    </div>
    <p class="tit">{{ state.ttl }}</p>
    <div class="bar">
      <p class="collect">
        <svg-icon icon-class="start" />
        收藏
      </p>
      <p>
        <svg-icon icon-class="share" />
        分享
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => { }
    },
    id: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      state: {},
      showVideo: false
    }
  },
  watch: {
    item: {
      immediate: true,
      handler(newValue) {
        this.state = newValue
      }
    }
  },
  mounted() {
    const dom = this.$refs[this.id]
    dom.addEventListener("ended", () => {
      this.showVideo = false
    }, false)
  },
  methods: {
    videoPlay() {
      this.showVideo = true
      const dom = this.$refs[this.id]
      dom.play()
    }
  }
}
</script>

<style lang="less" scoped>
.video-container {
  width: 100%;
  height: 200px * @ratio;
  position: relative;
  .pic {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    .icon-player {
      width: 64px * @ratio;
      height: 64px * @ratio;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: url("~@/assets/imgs/discovery/icon-player.png") no-repeat
        center center;
      background-size: contain;
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .video-item {
      width: 100%;
      height: 100%;
    }
  }
}
.tit {
  padding-top: 12px * @ratio;
  padding-left: 16px * @ratio;
  padding-right: 16px * @ratio;
  font-size: 20px * @ratio;
  font-weight: 500;
  color: #333;
  line-height: 25px * @ratio;
}

.bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 16px * @ratio;
  padding-right: 16px * @ratio;
  .collect {
    margin-right: 24px * @ratio;
  }
}
</style>