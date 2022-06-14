<!--
 * @Description: app webView
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-12 09:59:05
-->
<template>
  <div>
    <p v-html="state.htmlData" class="content"></p>
  </div>
</template>

<script>
import { discoveryApi } from "@/api"
export default {
  data() {
    return {
      query: {
        articleId: ""
      },
      state: {
        data: {},
        htmlData:''
      }
    }
  },
  created() {
    this.query.articleId = this.$route.params && this.$route.params.articleId
    this.getDeatail()
  },
  watch: {
    $route(newValue) { }
  },
  methods: {
    async getDeatail() {
      const { data } = await discoveryApi.getContById({
        contId: decodeURIComponent(this.query.articleId)
      })
      this.$nextTick(() => {
         let handlerStr =  data.cont || '';
         const datas  = handlerStr.replace(/<img/g,'<img class="self" style="width:100%"');
         const res = datas.replace(/<p/g,'<p style="font-size:20px;color:#333;"');
         this.state.htmlData = res;
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 0 16px * @ratio;
}
</style>