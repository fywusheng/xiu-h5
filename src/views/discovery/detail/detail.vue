<!--
 * @Description: 文章详情
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-04 17:40:32
-->
<template>
  <div class="page-discovery-detail">
    <p class="tit">{{state.data.ttl}}</p>
    <!-- <bar :data="states.item" /> -->
    <!-- <audio-comp ref="audio" /> -->
    <p v-html="state.data" class="content"></p>
    <div class="bar">
      <tool-bar />
    </div>
  </div>
</template>

<script>
import toolBar from "./toolBar"
import audioComp from "../audio-comp/audio-index"
import { discoveryApi } from "@/api"
import bar from "./bottomBar"
export default {
  components: {
    toolBar,
    audioComp,
    bar
  },
  data() {
    return {
      query: {
        articleId: ""
      },
      state: {
        data: {}
      },
      states: {
        item: {}
      },
      isShow: false
    }
  },
  created() {
  },
  activated() {
    this.query.articleId = this.$route.params && this.$route.params.articleId
    this.getDeatail()
  },
  computed: {
    curAudioId() {
      return this.$store.getters.curAudio.contId
    }
  },
  watch: {
    curAudioId(val) {
      this.$refs.audio.playCur(this.$store.getters.curAudio)
    },
    item: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.state.item = newValue
      }
    }
  },
  methods: {
    async getDeatail() {
      const { data } = await discoveryApi.getContById({
        contId: decodeURIComponent(this.query.articleId)
      })
      this.$nextTick(() => {
         let handlerStr =  data.cont || '';
         const datas  = handlerStr.replace(/<img/g,'<img class="self" style="width:100%;margin-left:-40px"');
         const res = datas.replace(/<p/g,'<p style="font-size:20px;color:#333;"');
         var regEx = /\s+/g;  
         const result = res.replace(regEx,' ')
         //const result = res.replace(/&nbsp/g,'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp')
         this.state.data = result;

      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-discovery-detail {
  padding: 0px * @ratio 16px * @ratio 80px * @ratio 16px * @ratio;
  .tit {
    width: 343px * @ratio;
    line-height: 25px * @ratio;
    font-size: 24px * @ratio;
    font-weight: 500;
    color: #333;
    margin: 28px * @ratio auto 0;
  }
  .text {
    font-size: 20px * @ratio;
    color: #333;
    line-height: 30px * @ratio;
  }
  .bar {
    position: fixed;
    left: 0;
    bottom: 0;
  }
  .content {
    width: 100%;
    overflow: hidden;
    font-size: 20px * @ratio;
    font-weight: 400;
    color: #333333;
    margin-top: 16px * @ratio;
    // text-indent: 41px * @ratio;
    text-indent:2em;
  }
}
</style>