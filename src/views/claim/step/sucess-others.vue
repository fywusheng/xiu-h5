<!--
 * @Description: 为他人申领提交成功
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-21 18:42:07
-->
<template>
  <div class="graduateRegister">
    <div class="result">
      <p>
        <van-icon
          class="icon"
          :name="require('@/assets/svg/home/icon-success.svg')"
        />
      </p>
      <p class="title1">
        恭喜您 <br />
        您的申领已提交成功
      </p>
      <p class="title2">
        预计将在2个工作日内完成审核 <br />
        审核通过后您将获得积分 <br />
      </p>
    </div>
    <div class="notes-btn">
      <van-button round size="large" type="info" plain to="/">
        返回首页
      </van-button>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    sessionStorage.removeItem("otherUserInfo")
  }
}
</script>
<style lang="less" scoped>
//结果页面
.result {
  margin-top: 40px * @ratio;
  .icon {
    font-size: 120px * @ratio;
  }
  p {
    text-align: center;
  }
  .title1 {
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
    .tips {
      color: #ff5500;
    }
  }
  .title2 {
    font-size: 20px * @ratio;
    line-height: (50px / 2) * @ratio;
    color: @second_text_color;
    padding: (20px / 2) * @ratio;
  }

  .success_color {
    color: @success_color;
  }
}
</style>
