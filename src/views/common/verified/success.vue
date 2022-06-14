<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-08-06 11:27:20
-->
<template>
  <div>
    <div class="result">
      <p>
        <van-icon
          class="icon"
          :name="require('@/assets/svg/home/icon-success.svg')"
        />
      </p>
      <p class="title">恭喜你实名认证成功</p>
      <p @click="jumpPage" class="gradient-btn">
        返回我的
      </p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    jumpPage() {
      this.$router.push({ path: "/user-center" })
    }
  }
}
</script>

<style lang="less" scoped>
.result {
  margin-top: 40px * @ratio;
  .icon {
    font-size: 120px * @ratio;
  }
  p {
    text-align: center;
  }
  .title {
    font-size: 25px * @ratio;
    font-weight: 500;
    color: #ff5500;
    line-height: 1.5;
  }
  .text {
    font-size: 20px * @ratio;
    font-weight: 400;
    color: #666666;
    line-height: 1.4;
    margin-top: 16px * @ratio;
  }
  .gradient-btn {
    width: 343px * @ratio;
    margin: 0 auto;
    margin-top: 124px * @ratio;
    margin-bottom: 16px * @ratio;
    font-size: 20px * @ratio;
    font-weight: 400;
    color: #ffffff;
  }
  .tips {
    font-size: 18px * @ratio;
    font-weight: 400;
    color: #ff5500;
    line-height: 25px * @ratio;
  }
}
</style>