<!--
 * @Description: 亲情账号-无手机号码绑定
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-08-08 18:03:10
-->
<template>
  <div>
    <div class="header">
      <div class="pic">
        <img src="@/assets/imgs/family-account/header.png" class="img-block" />
      </div>
    </div>
    <div class="container">
      <div class="pic">
        <img src="@/assets/imgs/family-account/sended.png" class="img-block" />
      </div>
      <p class="text">恭喜您绑定亲友成功</p>
      <p v-if="isReceive === '0'" class="tips">
        对方还未领取电子老年人证，请为对方领取
      </p>
      <p v-if="isReceive === '1'" class="tips">
        您现在可以享受亲友账号专属权益哦
      </p>
    </div>
    <div v-if="isReceive === '1'" @click="jumpPage('/user-center')" class="btn">
      知道了
    </div>
    <div v-if="isReceive === '0'" @click="jumpPage('management')" class="btn">为他领取电子老年人证</div>
    <!-- 积分弹出层 -->
    <van-overlay :show="show" @click="show = false">
      <div class="integral">
        <img src="@/assets/imgs/common/integral-300.png" class="img-block" />
      </div>
      <div @click="show = false" class="close">
        <van-icon name="close" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Overlay } from "@ylz/vant"
export default {
  components: {
    [Overlay.name]: Overlay
  },
  data() {
    return {
      show: false,
      nameMap: "",
      isReceive: "",
      isItgl: ""
    }
  },
  created() {
    this.isReceive = this.$route.query && this.$route.query.isReceive
    this.isItgl = this.$route.query && this.$route.query.isItgl
    this.show = this.isItgl === "0" ? false : true
    this.tiemr = setTimeout(() => {
      this.show = false
    }, 2000)
  },
  destroyed() {
    clearTimeout(this.tiemr)
  },
  methods: {
    jumpPage(path) {
      this.$router.push({ path })
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
  .text {
    font-size: 22px * @ratio;
    font-weight: 400;
    color: #333333;
    line-height: 25px * @ratio;
    text-align: center;
  }
  .tips {
    width: 85%;
    margin: 0 auto;
    font-size: 18px * @ratio;
    font-weight: 400;
    color: #999999;
    line-height: 25px * @ratio;
    text-align: center;
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
.integral {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.close {
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%);
  color: #fff;
  font-size: 36px * @ratio;
}
</style>