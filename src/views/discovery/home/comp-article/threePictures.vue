<!--
 * @Description: 文章类型-三图
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-30 17:11:51
-->
<template>
  <div class="threePictures">
    <p
      @click="skipDetail(state.item)"
      :class="$store.getters.curAudio.contId === state.item.contId ? 'active' : ''"
      class="tit"
    >
     <span v-html="replaceStr(state.item.ttl)"></span>
    </p>
    <div class="picture">
      <span
        v-for="(item, index) in state.item.imgs"
        :key="index"
        class="pic-item"
      >
        <img :src="item" />
      </span>
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
      default: () => { }
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
    replaceStr(str){
      if (this.keyword){
        const regstr = new RegExp(this.keyword, "g")
        return str.replace(regstr, `<span style="color:#0059ff">${this.keyword}</span>`)
      } else {
        return str
      }
    }
  }
}
</script>

<style lang="less" scoped>
.threePictures {
  padding-bottom: 18px * @ratio;
  border-bottom: 1px * @ratio solid #f5f5f5;
  .tit {
    color: #333;
    font-size: 20px * @ratio;
    line-height: 25px * @ratio;
    font-weight: 400;
    &.active {
      color: #ff711a;
    }
  }
  .picture {
    margin-top: 8px * @ratio;
    display: flex;
    justify-content: flex-start;
    .pic-item {
      width: 112px * @ratio;
      height: 88px * @ratio;
      margin-right: 4px * @ratio;
      overflow: hidden;
      &:last-child {
        margin-right: 0;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>