<!--
 * @Description: webView 辟谣详情
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-16 20:30:27
-->
<template>
  <div class="page-refute-rumors-detail">
    <div v-html="state.cont" class="cont"></div>
  </div>
</template>

<script>
import { commonApi } from "@/api"
export default {
  data() {
    return {
      state: {
        contId: "",
        userId: "",
        cont: ""
      }
    }
  },
  created() {
    this.state.contId = this.$route.params && this.$route.params.contId
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { data } = await commonApi.getContById({
        contId: this.state.contId
      })
      this.state.cont = data.cont
    }
  }
}
</script>

<style lang="less" scoped>
.page-refute-rumors-detail {
  .cont {
    font-size: 20px * @ratio;
    font-weight: 400;
    color: #333333;
    line-height: 30px * @ratio;
    margin: 16px * @ratio 16px * @ratio 0;
    overflow: hidden;
    p img {
      width: 100%;
      display: block;
    }
  }
}
</style>