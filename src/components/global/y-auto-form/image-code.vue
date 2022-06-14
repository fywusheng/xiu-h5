<!--
 * @Description: 图形验证码
 * @Version: 0.1
 * @Autor: yjm
 * @LastEditors: yjm
-->
<template>
  <div>
    <img
      v-show="!loading"
      class="image-code"
      :src="src"
      alt="图形验证码"
      @click="handleClick"
    />
    <van-loading size="24" v-show="loading" />
  </div>
</template>
<script>
export default {
  props: {
    getCode: {
      type: Function,
      required: true
    }
  },
  name: "image-code",
  data() {
    return {
      src: "",
      loading: false
    }
  },
  created() {
    this.handleClick()
  },
  methods: {
    async handleClick() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.src = await this.getCode()
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
.image-code {
  width: 70px * @ratio;
  height: 16px * @ratio;
  display: block;
}
</style>
