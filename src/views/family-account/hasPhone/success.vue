<!--
 * @Description: 手机绑定亲情账号绑定成功
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-23 14:20:15
-->
<template>
  <div>
    <div class="header">
      <div class="pic">
        <img src="@/assets/imgs/family-account/header.png" class="img-block" />
      </div>
    </div>
    <div class="container">
      <div class="sended">
        <div class="pic">
          <img
            src="@/assets/imgs/family-account/sended.png"
            class="img-block"
          />
        </div>
        <p class="tit">已发送</p>
        <p class="text">
          已给
          <span v-for="(item, index) in nameMap" :key="index" class="name">
            【{{ item }}】
          </span>
          发送添加请求，待对方短信确认后即可绑定成功
        </p>
      </div>
    </div>
    <div @click="toHome" class="btn">知道了</div>
    <div class="tips">
      <img
        src="@/assets/imgs/family-account/index-tips.png"
        class="img-block"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameMap: "",
      status: ""
    }
  },
  created() {
    this.status = this.$route.query && this.$route.query.status
    this.getName()
  },
  methods: {
    getName() {
      this.nameMap = sessionStorage.getItem("nameMap")
      this.nameMap = this.nameMap.split(";")
    },
    toHome() {
      this.$router.push({ path: "/user-center" })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  font-size: 24px * @ratio;
  color: #ffffff;
  line-height: 18px * @ratio;
  .pic {
    width: 100%;
  }
}
.container {
  width: 343px * @ratio;
  background: #ffffff;
  box-shadow: 0px 6px * @ratio 12px * @ratio 0px rgba(221, 143, 56, 0.1);
  border-radius: 12px * @ratio;
  padding: 25px * @ratio 11px * @ratio 15px * @ratio 11px * @ratio;
  margin: 0 auto;
  position: relative;
  // top: -174px * @ratio;
  margin-top: -174px * @ratio;
  .pic {
    width: 97px * @ratio;
    margin: 0 auto;
  }
  .tit {
    text-align: center;
    font-size: 22px * @ratio;
    font-weight: 400;
    color: #333333;
    line-height: 25px * @ratio;
  }
  .text {
    font-size: 18px * @ratio;
    font-weight: 400;
    color: #999999;
    line-height: 25px * @ratio;
    text-align: center;
  }
  .name {
    color: #ff5500;
  }
}
.btn {
  width: 343px * @ratio;
  height: 54px * @ratio;
  background: linear-gradient(144deg, #ff8800 0%, #ff5000 100%);
  border-radius: 27px * @ratio;
  font-weight: 500;
  color: #ffffff;
  font-size: 22px * @ratio;
  line-height: 54px * @ratio;
  text-align: center;
  margin: 0 auto;
  margin-top: 20px * @ratio;
}
.tips {
  padding: 0 16px * @ratio;
  margin-top: 20px * @ratio;
}
</style>