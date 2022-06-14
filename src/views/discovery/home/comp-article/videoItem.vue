<!--
 * @Description: 文章类型-视频
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-04 20:55:40
-->
<template>
  <div class="videoItem">
    <p @click="gotoVideoList(state)" class="tit">
      <span v-html="replaceStr(state.ttl)"></span></p>
    <div class="container-video">
      <p @click="gotoVideoList(state)" class="btn"></p>
      <img :src="state.imgs[0]" />
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
    keyword: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      state: {}
    }
  },
  watch: {
    item: {
      handler(newValue) {
        this.state = newValue
      },
      immediate: true
    }
  },
  methods: {
    gotoVideoList(item) {
      this.$router.push({ path: `video-list/${item.contId}` })
    },
    replaceStr(str){
      if (this.keyword){
        const regstr = new RegExp(this.keyword, "g")
        return str.replace(regstr, `<span style="color:#0059ff">${this.keyword}</span>`)
      } else {return str}
    }
  }
}
</script>

<style lang="less" scoped>
.videoItem {
  padding-bottom: 18px * @ratio;
  border-bottom: 1px * @ratio solid #f5f5f5;
  .tit {
    font-size: 20px * @ratio;
    color: #333333;
    line-height: 25px * @ratio;
    margin-bottom: 16px *@ratio;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .container-video {
    width: 100%;
    position: relative;
    .btn {
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
      display: block;
    }
  }
}
</style>