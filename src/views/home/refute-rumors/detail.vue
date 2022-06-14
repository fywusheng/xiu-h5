<!--
 * @Description: 辟谣详情
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-16 20:30:27
-->
<template>
  <div class="page-refute-rumors-detail">
    <p class="tit">{{ state.ttl }}</p>
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
      this.state.ttl = data.ttl
      this.state.cont = data.cont
    }
  }
}
</script>

<style lang="less" scoped>
.page-refute-rumors-detail {
  .tit {
    width: 343px * @ratio;
    margin: 0 auto;
    font-weight: 500;
    color: #333333;
    font-size: 24px * @ratio;
    line-height: 25px * @ratio;
    margin-top: 25px * @ratio;
  }
  .cont {
    width: 343px * @ratio;
    font-size: 20px * @ratio;
    font-weight: 400;
    color: #333333;
    line-height: 30px * @ratio;
    margin: 0 auto;
    margin-top: 16px * @ratio;
    overflow: hidden;
    p {
      display: block;
      width: 100%;
    }
    p img{
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>