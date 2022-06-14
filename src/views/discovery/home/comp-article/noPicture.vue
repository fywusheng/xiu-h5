<!--
 * @Description: 文章类型-无图
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-30 17:10:05
-->
<template>
  <div class="noPicture">
    <p
      @click="skipDetail(state.item)"
      :class="$store.getters.curAudio.contId === state.item.contId ? 'active' : ''"
      class="tit"
    >
    <span v-html="replaceStr(state.item.ttl)"></span>
    </p>
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
.noPicture {
  padding-bottom: 18px * @ratio;
  border-bottom: 1px * @ratio solid #f5f5f5;
  .tit {
    font-size: 20px * @ratio;
    color: #333333;
    line-height: 27px * @ratio;
    &.active {
      color: #ff711a;
    }
  }
}
</style>