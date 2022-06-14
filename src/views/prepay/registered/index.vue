<!--
 * @Description: 通过手机号注册
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-19 16:11:41
-->
<template>
  <div>
    <p class="tips">注册新用户</p>
    <van-field
      v-model="state.phone"
      required
      label="手机号"
      placeholder="请输入您的手机号"
      error-message="手机号格式错误"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: {
        phone: ""
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tips {
  width: 160px * @ratio;
  font-size: 32px * @ratio;
  font-weight: 500;
  color: #222121;
  line-height: 45px * @ratio;
}
</style>