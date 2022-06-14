<!--
 * @Description: 自己申领成功
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-21 18:42:07
-->
<template>
  <div class="graduateRegister">
    <div class="self result">
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
      <div class="text">
        <p>电子证已提交申领审核</p>
        <p class="tips-color">审核通过后您将获赠500积分</p>
        <p>请您耐心等待</p>
      </div>
      <p @click="state.shwoFamilyAccount = true" class="gradient-btn">
        我知道了
      </p>
      <p class="tips">温馨提示：积分可以兑换各种惠老服务哦！</p>
    </div>
    <van-overlay :show="state.show" @click="state.show = false">
      <div class="integral">
        <img src="@/assets/imgs/common/integral-500.png" class="img-block" />
      </div>
      <div @click="state.show = false" class="close">
        <van-icon name="close" />
      </div>
    </van-overlay>
    <van-dialog
      v-model="state.showSupportRaise"
      confirmButtonText="立刻添加"
      confirmButtonColor="#FF5500"
      :showCancelButton="true"
      cancelButtonText="放弃添加"
      cancelButtonColor="#333333"
      class="container-dialog"
      @confirm="confirm"
      @cancel="cancel"
    >
      <p class="top">
        您确定不添加赡养扶养关系吗？
        <span class="tips-color">这将会影响您在本平台享有的权益和服务</span>
      </p>
    </van-dialog>
    <van-dialog
      v-model="state.shwoFamilyAccount"
      confirmButtonText="立刻添加"
      confirmButtonColor="#FF5500"
      :showCancelButton="true"
      cancelButtonText="放弃添加"
      cancelButtonColor="#333333"
      class="container-dialog"
      @confirm="confirm"
      @cancel="cancel"
    >
      <p class="top">
        根据
        <span class="tips-color">《中华人民共和国老年人权益保障法》</span>，
        建议您添加“赡养扶养关系”，否则将会影响您在本平台享有的权益和服务。
      </p>
      <p class="bottom">提示：添加赡养扶养关系可再拿200积分</p>
    </van-dialog>
  </div>
</template>
<script>
import { Overlay, Dialog } from "@ylz/vant"
import { claimApi } from "@/api"
export default {
  components: {
    [Overlay.name]: Overlay,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      state: {
        show: true,
        showSupportRaise: false,
        shwoFamilyAccount: false
      }
    }
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener("popstate", this.goBack, false)
    }
    this.tiemr = setTimeout(() => {
      this.state.show = false
    }, 2000)
    this.getCardState()
  },
  destroyed() {
    sessionStorage.removeItem("verifiedfrom")
    clearTimeout(this.tiemr)
    window.removeEventListener("popstate", this.goBack, false)
  },
  methods: {
    async getCardState() {
      const { psnName, idCard } = await this.$store.dispatch("getUserInfo")
      const { code, data } = await claimApi.ec_cert_state({
        appId: "53928a083adb4a7dad2eecf05564873f",
        idType: "身份证",
        idNo: idCard,
        userName: psnName
      })
      if (code === 0) {
        this.selcetAutuCode(data)
      }
    },
    // 获取用户授权码
    async selcetAutuCode(params) {
      await claimApi.selcetAutuCode({
        uactId: params.uactId,
        psnName: params.psnName,
        certNo: params.idCard,
        appId: "53928a083adb4a7dad2eecf05564873f"
      })
    },
    goBack() {
      this.state.showSupportRaise = true
    },
    confirm(path) {
      this.$router.push({ path: `/support-raise`,query:{tabindex:0} })
    },
    cancel() {
      this.$router.push({ path: "/" })
    }
  }
}
</script>
<style lang="less" scoped>
//结果页面
.result {
  padding-top: 40px * @ratio;
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
.container-dialog {
  width: 310px * @ratio;
  line-height: 27px * @ratio;
  margin: 0 auto;
  .top {
    padding: 28px * @ratio 16px * @ratio 12px * @ratio;
    font-size: 20px * @ratio;
    color: #333333;
  }
  .bottom {
    padding: 0 16px * @ratio;
    padding-bottom: 12px * @ratio;
    color: #666666;
  }
}
.tips-color {
  color: #ff5500;
}
</style>
