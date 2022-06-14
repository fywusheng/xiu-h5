<!--
 * @Description: 亮证
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-22 14:11:52
-->
<template>
  <div class="page-elderly-card">
    <div v-if="hasCard" class="hascard">
      <!-- 正面 -->
      <div class="container">
        <!-- <img :src="state.front" alt="frontImage" /> -->
        <div class="header">
          <div class="icon">
            <img src="@/assets/imgs/common/pre-icon.png" class="img-block" />
          </div>
          <div class="title">中华人民共和国老年人证</div>
        </div>
        <div class="content pre">
          <div class="item inline">
            <p>
              <span class="label">姓 名</span>
              <span class="text">{{ state.user.name }}</span>
            </p>
            <p>
              <span class="label">性 别</span>
              <span class="text">{{ state.user.sex }}</span>
            </p>
          </div>
          <div class="item">
            <p>
              <span class="label">出生日期</span>
              <span class="text">{{ state.user.birthday.slice(0, 4) }}年</span>
              <span class="text">{{ state.user.birthday.slice(5, 7) }}月</span>
              <span class="text">{{ state.user.birthday.slice(8, 10) }}日</span>
            </p>
            <p v-if="state.user.blood !== ''">
              <span class="label">血型</span>
              <span class="text">{{ state.user.blood }}</span>
            </p>
          </div>
          <div class="item">
            <span class="label">公民身份号码</span>
            <span class="text">{{ state.user.psnNo }}</span>
          </div>
          <div class="item">
            <span class="label">居住地址</span>
            <span class="text">{{ state.user.residentialAddress }}</span>
          </div>
        </div>
        <img :src="state.ecCertPhoto" class="avatar" />
        <p class="cardNo">
          <span class="label">编号</span>
          <span> {{ state.ecShowCardNo }}</span>
        </p>
      </div>
      <!-- 背面 -->
      <div class="back" @click="preview(state.back)">
        <!-- class="pre-box" -->
        <div class="container">
          <div class="content">
            <div class="item">
              <span class="label">紧急联系人</span>
              <span class="text">{{ state.user.emergencyContact }}</span>
            </div>
            <div class="item">
              <span class="label">联系电话</span>
              <span class="text">{{ state.user.emergencyPhone }}</span>
            </div>
            <div class="item">
              <span class="label">备注</span>
              <span class="text">{{ state.user.memo }}</span>
            </div>
          </div>
          <div class="footer">
            <p class="item">
              <span class="label">发证机关</span>
              <span class="text">中国老龄协会</span>
            </p>
            <p class="item">
              <span class="label">发证日期</span>
              <span class="text">{{ state.user.licenceDate }}</span>
            </p>
            <p class="cardIssuer">
              <span>中国老龄协会 制</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!hasCard" class="nocard">
      <p class="pic">
        <img
          src="@/assets/imgs/family-account/elderly-card.png"
          class="img-block"
        />
      </p>
      <p class="text">领取电子证照老年人证后可以使用更多功能</p>
      <div @click="getCertificatesForOthers" class="btn">立即领取</div>
    </div>
  </div>
</template>

<script>
import { claimApi } from "@/api"
import { jumpFaceRecognition } from "@/utils"
export default {
  props: {
    curItem: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      hasCard: false,
      userState: {},
      state: {}
    }
  },
  watch: {
    curItem: {
      immediate: true,
      handler(newValue) {
        this.userState = newValue
        this.getCertState(newValue)
      }
    }
  },
  methods: {
    // 为他人领证
    async getCertificatesForOthers() {
      sessionStorage.setItem("otherUserInfo", JSON.stringify(this.userState))
      jumpFaceRecognition({
        userName: this.userState.userName,
        idCard: this.userState.toIdCard,
        url: "claim/face-recognition-success"
      })
    },
    // 查询老年证状态
    async getCertState() {
      const { data } = await claimApi.ec_cert_state({
        "appId": "53928a083adb4a7dad2eecf05564873f",
        "idNo": this.userState.toIdCard,
        "idType": "身份证",
        "userName": this.userState.userName
      })
      if (data.authState === "1") {
        this.showCert(data.authCode)
      } else {
        this.hasCard = false
      }
      this.selcetAutuCode()
    },
    // 获取用户授权码
    async selcetAutuCode() {
      const { data, code } = await claimApi.selcetAutuCode({
        uactId: this.userState.uactId,
        psnName: this.userState.userName,
        certNo: this.userState.toIdCard,
        appId: "53928a083adb4a7dad2eecf05564873f"
      })
      if (code === 0) {
        this.showCert(data.authCode)
      }
    },
    // 电子老年证展证
    async showCert(tempAuthCode) {
      const { data, code } = await claimApi.show_senior_cert({
        chnlId: "53928a083adb4a7dad2eecf05564873f",
        authCode: tempAuthCode
      })
      if (code === 0) {
        this.hasCard = true
        this.state.showCard = true
        this.state.user = data.ecCertExtendDTO
        this.state.ecCertPhoto = data.ecCertPhoto
        this.state.ecShowCardNo = data.ecShowCardNo
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page-elderly-card {
  padding: 0 16px * @ratio;
  .hascard {
    .container {
      width: 303px * @ratio;
      height: 220px * @ratio;
      background: url("~@/assets/imgs/common/card-bj.png") no-repeat center
        center;
      background-size: 100% 100%;
      box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.16);
      border-radius: 8px * @ratio;
      margin-top: 30px * @ratio;
      padding-top: 15px * @ratio;
      padding-left: 20px * @ratio;
      position: relative;
      .header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .icon {
          width: 45px * @ratio;
          height: 47px * @ratio;
          margin-right: 5px * @ratio;
        }
        .title {
          color: #2860a6;
          text-align: center;
          font-size: 17px * @ratio;
          font-weight: bolder;
          letter-spacing: 3px * @ratio;
        }
      }
      .content {
        margin-left: -15px * @ratio;
        &.pre {
          margin-top: 16px * @ratio;
        }
      }
      .item {
        font-size: 10px * @ratio;
        margin-bottom: 12px * @ratio;
        .label {
          display: inline-block;
          width: 85px * @ratio;
          padding-right: 6px * @ratio;
          color: #2860a6;
          text-align: right;
        }
        .text {
          color: #333333;
        }
        &.inline {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
      .avatar {
        position: absolute;
        width: 59px * @ratio !important;
        height: 83px * @ratio !important;
        right: 24px * @ratio;
        top: 66px * @ratio;
      }
      .cardNo {
        position: absolute;
        bottom: 10px * @ratio;
        right: 25px * @ratio;
        font-size: 8px * @ratio;
        .label {
          color: #2860a6;
        }
      }
      .footer {
        position: absolute;
        right: 17px * @ratio;
        bottom: 13px * @ratio;
      }
      .cardIssuer {
        font-size: 10px * @ratio;
        color: #2860a6;
        text-align: right;
      }
    }
    .pre-box {
      position: absolute;
      top: 0;
      text-align: center;
      width: 100%;
      height: 100%;
    }
    .back {
      margin-top: 18px * @ratio;
    }
    .tip {
      margin: 8px * @ratio 0;
      text-align: center;
      font-size: @font_size_lg;
    }
  }
  .nocard {
    padding-top: 80px * @ratio;
    .pic {
      width: 110px * @ratio;
      margin: 0 auto;
      margin-bottom: 16px * @ratio;
    }
    .text {
      width: 220px * @ratio;
      font-size: 20px * @ratio;
      color: #999999;
      line-height: 28px * @ratio;
      margin: 0 auto;
      text-align: center;
    }
  }
  .btn {
    width: 260px * @ratio;
    height: 50px * @ratio;
    background: linear-gradient(144deg, #ff8800 0%, #ff5000 100%);
    border-radius: 27px * @ratio;
    font-weight: 500;
    color: #ffffff;
    font-size: 22px * @ratio;
    line-height: 54px * @ratio;
    text-align: center;
    margin: 0 auto;
    margin-top: 16px * @ratio;
  }
}
</style>