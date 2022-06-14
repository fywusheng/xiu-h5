
<template>
  <div class="handle">
    <div class="handle-item handle-top">
      <div class="progress-block">
        <ul id="progressbar" class="progressbar">
          <template v-for="(item, index) in stepMap">
            <li :class="{ active: active >= index }" :key="index">
              <span>{{ item.title }}</span>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <base-info v-show="active === 0" @baseInfo="getBaseInfo" />
    <contact-person
      v-show="active === 1"
      @onPre="onPre"
      @getFormItem="getContactPerson"
    />
    <material v-show="active === 2" @onSetp="onSetp"/>
    <van-dialog
      v-model="show"
      confirmButtonText="继续申领"
      confirmButtonColor="#FF5500"
      :showCancelButton="true"
      cancelButtonText="放弃申领"
      cancelButtonColor="#333333"
      class="container-dialog"
      @confirm="confirm"
      @cancel="cancel"
    >
      <p class="top">您确定要中断申领电子老年人证吗？</p>
      <p class="bottom">提示：添加赡养扶养关系可再拿200积分</p>
    </van-dialog>
  </div>
</template>

<script>
import { Dialog, Overlay } from "@ylz/vant"
import { claimApi } from "@/api"
import baseInfo from "./base-info"
import contactPerson from "./contact-person/index"
import material from "./material"

export default {
  components: {
    material,
    baseInfo,
    contactPerson,
    [Dialog.Component.name]: Dialog.Component,
    [Overlay.name]: Overlay
  },
  data() {
    return {
      active: 0,
      show: false,
      state: {
        ecCertExtendDTO: {}
      },
      stepMap: [{ title: "完善基本信息" }, { title: "添加紧急联系人" }, { title: "提交审核" }]
    }
  },
  /**
   * TODO: 正式人脸识别地址需要修改
   * @description 人脸识别回跳数据读取, 如果未做人脸识别或者识别识别，跳到人脸识别界面
   * 如果手动修改过姓名和身份证号，以修改的为准
   * @param {boolean} ismatch
   * @param {String} img
   */
  created() {
    this.state.ecCertPhoto = this.$route.query.img || JSON.parse(sessionStorage.getItem("userData")).faceImg
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener("popstate", this.goBack, false)
    }
  },
  destroyed() {
    clearTimeout(this.tiemr)
    window.removeEventListener("popstate", this.goBack, false)
  },
  methods: {
    onSetp(type){
      console.log("====Fanhui的类型---",type)
      if(type == 1){
        this.active =  1;
      }else{
         this.submit()
      }
    },
    getBaseInfo(val) {
      this.active = val.actived
      this.state.ecCertExtendDTO = val.form
    },
    async getContactPerson(list) {
      const emergencyContact = []
      const emergencyPhone = []
      list.forEach(item => {
        emergencyContact.push(item.emergencyContact)
        emergencyPhone.push(item.emergencyPhone)
      })
      this.state.ecCertExtendDTO.emergencyContact = emergencyContact.join(",")
      this.state.ecCertExtendDTO.emergencyPhone = emergencyPhone.join(",")
     
      this.active = 2;
     
    },
    async submit() {
      const params = {
        appId: "53928a083adb4a7dad2eecf05564873f", // TODO: 需要换成实际接口appid
        idNo: this.state.ecCertExtendDTO.psnNo,
        idType: "身份证",
        name: this.state.ecCertExtendDTO.name,
        ecCertPhoto: this.state.ecCertPhoto,
        dataOr: "0",
        nwaFlag: "1",
        ecCertExtendDTO: this.state.ecCertExtendDTO
      }
      if (this.$route.query.name && this.$route.query.familyId) {
        const otherUserInfo = JSON.parse(sessionStorage.getItem("otherUserInfo"))
        params.name = otherUserInfo.toName
        params.idNo = otherUserInfo.idCard
        params.ecCertPhoto = otherUserInfo.faceImg
      }
      const { code } = await claimApi.ec_cert_save(params)
     
      if (code == 0) {
        this.$store.commit("SET_STATUS", 1)
        if (sessionStorage.getItem("otherUserInfo")) {
          this.$router.push({ path: "/claim/apply-card-sucess-others" })
        } else {
          this.$router.push({ path: "/claim/apply-card-sucess" })
        }
      }
    },
    confirm() {
      this.show = false
    },
    cancel() {
      this.$router.push({ path: "/elderly-card" })
    },
    // 紧急联系人上一步
    onPre() {
      this.active = 0
    },
    getUserInfo() {
      let area = "", sexVal = ""
      this.base64 = `data:image/jpeg;base64,${this.$route.query.img}`
      const cardData = JSON.parse(sessionStorage.getItem("cardData"))
      const { sex, nation: naty, address, birth: brdy } = cardData
      const idCard = cardData.id_num || cardData.idCard
      const userName = cardData.name || cardData.userName
      if (address) {
        const index = address.lastIndexOf("市") || address.lastIndexOf("县") || address.lastIndexOf("区")
        area = address.slice(0, index + 1)
      }
      if (sex && sex === "男") {
        sexVal = "1"
      }
      if (sex && sex === "女") {
        sexVal = "2"
      }
      this.state = { userName, idCard, sex: sexVal, naty, area, brdy }
    }
  }
}
</script>

<style lang="less" scoped>
.handle {
  background: #fff;
  padding-bottom: 30px * @ratio;
  padding-top: @space_md_16;
  .handle-item {
    background: #fff;
  }
  .handle-top {
    padding: 0 (10px / 2) * @ratio 0;
    box-sizing: border-box;
  }
  .graduate-line {
    background: rgba(245, 245, 245, 1);
    box-shadow: (0px / 2) * @ratio (2px / 2) * @ratio (11px / 2) * @ratio
      (0px / 2) * @ratio rgba(219, 219, 219, 0.31);
    height: (16px / 2) * @ratio;
  }
  .progressbar {
    counter-reset: step;
    &::after {
      content: "";
      display: block;
      height: 0;
      clear: both;
    }
    li {
      list-style-type: none;
      color: @four_text_color;
      font-size: 18px * @ratio;
      font-weight: 400;
      width: 33.333%;
      float: left;
      position: relative;
      text-align: center;
      padding: 0 16px * @ratio;

      &:first-child:after {
        content: none;
      }
      &:after {
        content: "";
        width: 100%;
        height: (6px / 2) * @ratio;
        background: @second_border_color;
        position: absolute;
        left: -50%;
        top: 18px * @ratio;
        z-index: 0;
      }
      &:before {
        content: counter(step);
        counter-increment: step;
        width: 38px * @ratio;
        height: 38px * @ratio;
        line-height: 38px * @ratio;
        text-align: center;
        display: block;
        font-size: 22px * @ratio;
        color: @four_text_color;
        background: @second_border_color;
        border-radius: 38px * @ratio;
        margin: 0 auto (20px / 2) * @ratio auto;
        z-index: 999;
        position: relative;
      }
      &.active {
        color: @main_text_color;
        &:before,
        &:after {
          background: #ffc769;
          color: #fff;
        }
      }
    }
  }

  .van-field__right-icon {
    padding: 0;
  }
  .van-field__right-icon {
    padding: 0;
  }
  .van-field--error .van-field__control,
  .van-field--error .van-field__control::placeholder {
    color: #aaa !important;
  }
  .tree .vue-treeselect__value-container {
    text-align: right !important;
  }

  .vue-treeselect__control {
    border: none !important;
  }
  .van-cell--clickable:active {
    background-color: #fff;
  }
}
</style>
<style scoped>
.handle /deep/ .van-field__error-message {
  text-align: right;
}
</style>
