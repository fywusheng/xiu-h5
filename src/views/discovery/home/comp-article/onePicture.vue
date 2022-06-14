<!--
 * @Description: 文章类型-一图
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-30 17:11:13
-->
<template>
  <div class="onePicture">
    <div class="top">
      <p @click="skipDetail(state.item)" :class="$store.getters.curAudio.contId === state.item.contId ? 'active' : ''" class="left">
        <span v-html="replaceStr(state.item.ttl)"></span>
      </p>
      <p class="right">
        <img :src="state.item.imgs[0]" />
      </p>
    </div>
    <bar :data="state.item" />
  </div>
</template>

<script>
import bar from "./bottomBar"
export default {
  components: {
    bar
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    keyword: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      state: {
        item: {}
      }
    }
  },
  watch: {
    item: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.state.item = newValue
      }
    }
  },
  methods: {
    skipDetail(item) {
      this.$router.push({ path: `detail/${encodeURIComponent(item.contId)}` })
    },
    replaceStr(str) {
      if (this.keyword) {
        const regstr = new RegExp(this.keyword, "g")
        return str.replace(
          regstr,
          `<span style="color:#0059ff">${this.keyword}</span>`
        )
      } else {
        return str
      }
    }
  }
}
</script>

<style lang="less" scoped>
.onePicture {
  padding-bottom: 18px * @ratio;
  border-bottom: 1px * @ratio solid #f5f5f5;
  .top {
    display: flex;
    justify-content: space-between;
    .left {
      font-size: 20px * @ratio;
      color: #333;
      line-height: 27px * @ratio;
      span {
        width: 203px * @ratio;
        max-height: 81px * @ratio; 
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &.active {
        color: #ff711a;
      }
    }
    .right {
      width: 130px * @ratio;
      height: 88px * @ratio;
      overflow: hidden;
      img {
        width: 100%;
        display: block;
      }
    }
  }
}
</style>