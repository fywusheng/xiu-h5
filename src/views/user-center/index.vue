<!--
 * @Description: 个人中心
 * @Version: 1.0.0
 * @Author: yjm
 * @Date: 2021-05-21 18:42:07
-->
<template>
  <div class="user-page">
    <van-dialog v-model="dialogShow" title="提示" message="请下载国家老龄服务平台使用该功能" confirmButtonText="下载" show-cancel-button :before-close="beforeClose">
    </van-dialog>
    <div class="score"><span>积分</span><span>1000</span></div>
    <header>
      <div class="avatar">
        <img src="@/assets/svg/user-center/avatar.svg" alt="avatar" />
      </div>
      <div class="message">
        <div class="name">
          {{ this.state.psnName | desensitization("name") }}123
        </div>
        <!-- <div class="card-id">
          {{ this.state.idCard | desensitization("idCard") }}123
        </div> -->
        <div class="crtfStas">
          {{ this.state.crtfStas === "2" ? "已实名认证" : "未实名认证" }}
        </div>
      </div>
    </header>
    <section class="main">
      <div class="row">
        <p @click="showPage('support-raise')" class="support-raise">赡养扶养</p>
        <p @click="showFimilyPage" class="family-account">亲情账号</p>
      </div>
      <div class="row">
        <p @click="showPage('null')" class="coupon">我的券包</p>
        <p @click="download()" class="order">我的订单</p>
      </div>
    </section>
    <section class="vice">
      <div class="row">
        <dl v-for="(item, index) in viceList" :key="index" class="item">
          <dt @click="showPage(item.path)" class="icon">
            <van-icon :name="require(`@/assets/imgs/user-center/${item.icon}`)" />
          </dt>
          <dd class="text">
            {{ item.text }}
          </dd>
        </dl>
      </div>
    </section>
    <van-overlay :show="show" @click="show = false">
      <div class="container-overlay">
        <div class="content">
          <div>
            <img src="@/assets/imgs/user-center/overlay.png" alt="avatar" class="img-block" />
          </div>
          <p class="tips">选择信息录入方式</p>
          <p @click="gotoCardRecognition('scanning')" class="btn-overlay">
            <van-icon :name="require('@/assets/imgs/user-center/scanning.svg')" />
            扫描身份证
          </p>
          <p @click="gotoCardRecognition('manual')" class="btn-overlay">
            <van-icon :name="require('@/assets/imgs/user-center/input.svg')" />
            手动输入
          </p>
        </div>
      </div>
    </van-overlay>
    <nav-list :select="select" />
  </div>
</template>
<script>
import { Overlay, Dialog } from "@ylz/vant"
import { familyApi } from "@/api"
import navList from "@/views/home/comp/nav"
export default {
  components: {
    [Overlay.name]: Overlay,
    [Dialog.Component.name]: Dialog.Component,
    navList
  },
  data() {
    return {
      show: false,
      vice: [
        { text: "实名认证", icon: "vice01.svg", path: "card-recognition" },
        { text: "我的发票", icon: "vice02.svg", path: "invoice" },
        { text: "消息中心", icon: "vice03.svg", path: "null" },
        { text: "收藏中心", icon: "vice04.svg", path: "null" },
        { text: "意见反馈", icon: "vice05.svg", path: "null" },
        { text: "退出账号", icon: "vice06.svg", path: "null" }
      ],
      state: {},
      select: "2",
      dialogShow: false
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    viceList() {
      let viceList = []
      if (this.state.crtfStas === "2") {
        viceList = this.vice.filter((item) => item.path !== "card-recognition")
      } else {
        viceList = this.vice
      }
      return viceList
    }
  },
  methods: {
    async getUserInfo() {
      this.state = await this.$store.dispatch("getUserInfo")
    },
    gotoCardRecognition(type) {
      if (type === "scanning") {
        this.$router.push({
          path: "/card-recognition",
          query: { redirect: "user-center/scanning" }
        })
      }
      if (type === "manual") {
        this.$router.push({ path: `/user-center/${type}` })
      }
    },
    async showFimilyPage() {
      const { data } = await familyApi.findUserIsAddSup({
        selectType: 1
      })
      if (data) {
        this.$router.push({ path: "family-account/management" })
      } else {
        this.$router.push({ path: "family-account" })
      }
    },
    showPage(path) {
      console.log(path)
      if (path === "null") {
        this.$toast("功能建设中")
        return false
      }
      if (path === "card-recognition") {
        this.show = true
        return false
      }
      if (path === "invoice") {
        this.dialogShow = true
        return false
      }
      this.$router.push({ path: `${path}`, query: { tabindex: 0 } })
    },
    /**
     * @description: 选择下载或取消
     * @param {*} action
     * @param {*} done
     * @return {*}
     * @author: shn
     */
    beforeClose(action, done) {
      if (action === "confirm") {
        this.$router.push("/download")
        this.show = false
      } else if (action === "cancel") {
        done()
      }
    },
    /**
     * @description: 打开下载弹窗
     * @param {*}
     * @return {*}
     * @author: shn
     */
    download() {
      console.log("---去页面---")
      //  this.$router.push("/discovery/small-video-class")
      // return
      this.dialogShow = true
    }
  }
}
</script>
<style lang="less" scoped>
.user-page {
  position: relative;
  padding: @space_md_16 0;
  min-height: 100%;
  background-image: url("~@/assets/svg/user-center/background.png");
  background-repeat: no-repeat;
  background-size: 100%;
  /deep/ .van-cell__left-icon {
    margin-right: 12px * @ratio;
  }
  .main {
    padding: 0 16px * @ratio;
    margin-top: 25px * @ratio;
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px * @ratio;
      p {
        width: 165px * @ratio;
        height: 80px * @ratio;
        padding-top: 12px * @ratio;
        padding-left: 10px * @ratio;
      }
      .support-raise {
        font-weight: 500;
        color: #634312;
        background: url("~@/assets/imgs/user-center/support-raise.png");
        background-size: 100% 100%;
      }
      .family-account {
        font-weight: 500;
        color: #752f31;
        background: url("~@/assets/imgs/user-center/family-account.png");
        background-size: 100% 100%;
      }
      .coupon {
        font-weight: 500;
        color: #ca4900;
        background: url("~@/assets/imgs/user-center/coupon.png");
        background-size: 100% 100%;
      }
      .order {
        font-weight: 500;
        color: #089274;
        background: url("~@/assets/imgs/user-center/order.png");
        background-size: 100% 100%;
      }
    }
  }
  .vice {
    background: #ffffff;
    box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    margin: 0 16px * @ratio;
    .row {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      .item {
        margin-top: 15px * @ratio;
        margin-bottom: 15px * @ratio;
        flex-basis: 33%;
        text-align: center;
        .icon {
          font-size: 50px * @ratio;
          margin: 0 auto;
        }
        .text {
          height: 28px * @ratio;
          font-size: 20px * @ratio;
          font-weight: 500;
          color: #333333;
          line-height: 28px * @ratio;
        }
      }
    }
  }
}
.container-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .content {
    width: 310px * @ratio;
    background: #fff;
    .tips {
      text-align: center;
      font-size: 20px * @ratio;
      font-weight: 400;
      color: #333333;
      line-height: 2.5;
    }
    .btn-overlay {
      width: 278px * @ratio;
      height: 54px * @ratio;
      line-height: 54px * @ratio;
      color: #ff5500;
      background: #ffffff;
      text-align: center;
      border-radius: 30px * @ratio;
      border: 1px * @ratio solid #ff5500;
      margin: 0 auto;
      margin-bottom: 25px * @ratio;
    }
  }
}
header {
  margin: 0 @space_md_16;
  display: flex;
  img {
    width: 92px * @ratio;
    height: 92px * @ratio;
    margin-right: 10px * @ratio;
    vertical-align: top;
  }
  .message {
    font-size: @font_size_md;
    .crtfStas {
      font-size: 18px * @ratio;
      font-weight: 400;
      color: #999999;
      line-height: 25px * @ratio;
      margin-top: 9px * @ratio;
    }
    .name {
      font-size: 30px * @ratio;
      margin-bottom: 3px * @ratio;
    }
  }
}
.score {
  position: absolute;
  right: 0px * @ratio;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 99px * @ratio;
  height: 34px * @ratio;
  background: linear-gradient(180deg, #5f4705 0%, #403001 100%);
  border-radius: 100px * @ratio 0px * @ratio 0px * @ratio 100px * @ratio;
  font-size: 16px * @ratio;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fdeedb;
  line-height: 22px * @ratio;
  span::nth-child(2) {
    font-size: 20px * @ratio;
    margin-left: 4px * @ratio;
  }
}
/deep/ .van-dialog {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 310px * @ratio!important;
  height: 184px * @ratio!important;
  background: #ffffff;
  border-radius: 8px * @ratio;
  .van-dialog__header {
    font-size: 22px * @ratio;
    font-weight: 500;
    color: #333333;
  }
  .van-dialog__message {
    font-size: 20px * @ratio;
    font-weight: 400;
    color: #333333;
  }
  .van-button__content .van-button__text {
    font-size: 22px * @ratio;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
  .van-hairline--left .van-button__content .van-button__text {
    color: #ff5500;
  }
}
</style>
