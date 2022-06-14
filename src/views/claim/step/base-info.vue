<!--
 * @Description: 基本信息
 * @Version: 0.1
 * @Autor: yjm
 -->
<template>
  <div class="graduateRegister">
    <div class="title">
      <van-icon :name="require('@/assets/svg/home/icon-base-info.svg')" />
      <span>基本信息</span>
    </div>
    <van-form v-if="inputType === 'manual'" ref="manual">
      <van-field
        readonly
        clickable
        required
        :value="form.nation"
        label="民族(必填)"
        placeholder="请选择民族"
        :rules="[{ required: true, message: '' }]"
        @click="showState.nation = true"
      />
      <van-field
        readonly
        clickable
        :value="form.blood"
        label="血型"
        placeholder="请选择血型"
        @click="showState.blood = true"
      />
      <van-field
        readonly
        clickable
        required
        :value="form.residentialArea"
        label="现居住地址(必填)"
        placeholder="请选择省、市、区"
        :rules="[{ required: true, message: '' }]"
        @click="showState.residential = true"
      />
      <van-field
        v-model="form.residentialAddr"
        :rules="[{ required: true, message: '' }]"
        placeholder="请输入详细地址：街道、路、小区"
      />
      <van-field
        readonly
        clickable
        required
        :value="form.licenceAuthority"
        label="办证机构(必填)"
        placeholder="请选择办证机构"
        :rules="[{ required: true, message: '' }]"
        @click="showState.licenceAuthority = true"
      />
      <van-field
        readonly
        clickable
        required
        :value="form.permanentArea"
        label="户籍地址(必填)"
        placeholder="请选择"
        :rules="[{ required: true, message: '' }]"
        @click="showState.permanent = true"
      />
      <van-field
        v-model="form.permanentAddr"
        :rules="[{ required: true, message: '' }]"
        placeholder="请输入详细地址：街道、路、小区"
      />
    </van-form>
    <!-- 扫描OCR 身份证 -->
    <van-form v-if="inputType === 'scanning'" ref="scanning">
      <van-field
        readonly
        clickable
        :value="form.blood"
        label="血型"
        placeholder="请选择血型"
        @click="showState.blood = true"
      />
      <van-field
        readonly
        clickable
        required
        :value="form.residentialArea"
        label="现居住地址(必填)"
        placeholder="请选择省、市、区"
        :rules="[{ required: true, message: '' }]"
        @click="showState.residential = true"
      />
      <van-field
        v-model="form.residentialAddr"
        :rules="[{ required: true, message: '' }]"
        placeholder="请输入详细地址：街道、路、小区"
      />
      <van-field
        readonly
        clickable
        required
        :value="form.licenceAuthority"
        label="办证机构(必填)"
        placeholder="请选择办证机构"
        :rules="[{ required: true, message: '' }]"
        @click="showState.licenceAuthority = true"
      />
    </van-form>
    <div class="notes-btn">
      <y-button round type="info" size="large" @click="handleClickBtn">
        下一步22
      </y-button>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model="showState.blood" position="bottom">
      <van-picker
        show-toolbar
        :columns="options.blood"
        @confirm="bloodConfirm"
        @cancel="showState.blood = false"
      />
    </van-popup>
    
    <van-popup
      v-model="showState.residential"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-picker
        show-toolbar
        title="请选择省、市、区"
        :columns="options.residential"
        @confirm="areaConfirm"
        @cancel="showState.area = false"
      />
    </van-popup>
    <van-popup
      v-model="showState.licenceAuthority"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-picker
        show-toolbar
        title="请选择办证机构"
        :columns="options.licenceAuthority"
        @confirm="licenceAuthorityConfirm"
        @cancel="showState.licenceAuthority = false"
      />
    </van-popup>
    <van-popup v-model="showState.nation" position="bottom">
      <van-picker
        show-toolbar
        :columns="options.nation"
        value-key="label"
        @confirm="nationConfirm"
        @cancel="showState.nation = false"
      />
    </van-popup>
    <van-popup
      v-model="showState.permanent"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-picker
        show-toolbar
        title="请选择省、市、区"
        :columns="options.residential"
        @confirm="permanentConfirm"
        @cancel="showState.permanent = false"
      />
    </van-popup>
  </div>
</template>
<script>
import { Picker } from "@ylz/vant"
import { claimApi, commonApi } from "@/api"
export default {
  components: {
    [Picker.name]: Picker
  },
  data() {
    return {
      form: {
        birthday: "",
        nation: "",
        psnNo: "",
        name: "",
        blood: "", // 血型
        residentialArea: "", // 现居住地
        residentialAddr: "",
        licenceAuthority: "", // 发证机关
        permanentArea: "", // 户籍地
        permanentAddr: "",
        memo: ""
      },
      options: {
        blood: ["A型", "B型", "AB型", "O型", "不明"],
        area: [],
        nation: [],
        licenceAuthority: []
      },
      showState: {
        nation: false,
        blood: false,
        residential: false,
        licenceAuthority: false,
        permanent: false
      }
    }
  },
  created() {
    this.inputType = "manual"
    if (sessionStorage.getItem("verifiedfrom")) {
      this.inputType = JSON.parse(sessionStorage.getItem("verifiedfrom")).type
    }
    this.options.nation = JSON.parse(sessionStorage.getItem("codeList")).nation
    this.getArea()
  },
  methods: {
    //下一步按钮
    async handleClickBtn() {
      this.getUserInfo()
      if (this.inputType === "manual") {
        this.$refs.manual.validate().then((err) => {
          if (!err) {
            this.form.residentialAddress = `${this.form.residentialArea}${this.form.residentialAddr}`
            this.form.permanentAddress = `${this.form.permanentArea}${this.form.permanentAddr}`
            this.$emit("baseInfo", {
              form: this.form,
              actived: 1
            })
          }
        })
      }
      if (this.inputType === "scanning") {
        this.$refs.scanning.validate().then((err) => {
          if (!err) {
            this.form.residentialAddress = `${this.form.residentialArea}${this.form.residentialAddr}`
            this.form.permanentAddress = JSON.parse(sessionStorage.getItem("userData")).area
            this.$emit("baseInfo", {
              form: this.form,
              actived: 1
            })
          }
        })
      }
    },
    // 获取当前用户/替他人领证用户信息
    async getUserInfo() {
      if (sessionStorage.getItem("otherUserInfo")) {
        const otherUser = JSON.parse(sessionStorage.getItem("otherUserInfo"))
        this.form.psnNo = otherUser.toIdCard
        this.form.name = otherUser.userName
        if (parseInt(this.form.psnNo.substr(16, 1)) % 2 == 1) {
          this.form.sex = "男"
        } else {
          this.form.sex = "女"
        }
        const year = this.form.psnNo.substring(6, 10)
        const month = this.form.psnNo.substring(10, 12)
        const date = this.form.psnNo.substring(12, 14)
        this.form.birthday = `${year}-${month}-${date}`
      } else {
        const user = await this.$store.dispatch("getUserInfo")
        this.form.sex = user.gend === "1" ? "男" : "女"
        this.form.birthday = user.brdy
        this.form.nation = this.form.nation || user.naty
        this.form.psnNo = user.idCard
        this.form.name = user.psnName
      }

    },
    async bindBankAcct(params) {
      return await claimApi.bindBankAcct(params)
    },
    licenceAuthorityConfirm(value) {
      this.showState.licenceAuthority = false
      this.form.licenceAuthority = value
    },
    permanentConfirm(value) {
      this.showState.permanent = false
      this.form.permanentArea = `${value[0]}${value[1]}${value[2]}`
    },
    areaConfirm(value) {
      this.showState.residential = false
      this.form.residentialArea = `${value[0]}${value[1]}${value[2]}`
      this.options.licenceAuthority = [this.form.residentialArea]
    },
    bloodConfirm(value) {
      this.form.blood = value
      this.showState.blood = false
    },
    nationConfirm(picker) {
      this.form.nation = picker.value
      this.showState.nation = false
    },
    async getArea() {
      const res = await commonApi.getRegnAreaTree({})
      this.options.residential = this.format(res.data)
    },
    format(data) {
      !(function fn(arr) {
        arr.forEach(item => {
          item.text = item.regnName
          if (item.children && item.children.length) {
            fn(item.children)
          } else {
            item.children = null
          }
        })
      })(data)
      return data
    }
  },
  activated() {
    const { ismatch } = this.$route.query
    if (ismatch) {
      const { cardno, accept, score, timeused, matchlogid, img } = this.$route.query
      this.form.birthday = cardno.substring(6, 14)
      this.form.name = localStorage.getItem("psnName")
      if (parseInt(cardno.substr(16, 1)) % 2 == 1) {
        this.form.sex = "男"
      } else {
        this.form.sex = "女"
      }
      this.form.psnNo = cardno
      this.form.accept = accept
      this.form.score = score
      this.form.timeused = timeused
      this.form.matchlogid = matchlogid
      this.form.licenceDate = "发证日期"
      this.form.memo = "备注"
      const params = {
        userName: this.form.name, //建立方姓名
        idCard: this.form.psnNo, //建立方身份证
        faceImg: img // 人脸Base64
        // gend: this.form.sex, // 性别
        // brdy: this.form.birthday, // 生日
        // hsregAddr: "address",// 地址
        // neckCardType: "1" // 领证方式（为自己领，为他人领）
      }
      const realName = this.bindBankAcct(params)
      if (realName.message === "success") {
        this.$store.commit("SET_USER", {
          psnName: this.form.name,
          idCard: cardno
        })
      } else {
        this.$toast("实名认证失败")
        setTimeout(() => {
          this.$router.push({ path: "/" })
        }, 2000)
      }

    }
  }
}
</script>
<style lang="less" scoped>
.title {
  margin: 30px * @ratio 0 15px * @ratio;
  font-size: 22px * @ratio;
  display: flex;
  align-items: center;
  padding: 0 @space_md_16;
  span {
    margin-left: 8px * @ratio;
  }
}
.form {
  padding: 0 8px * @ratio;
}
.notes-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: @space_md_16;
}
/deep/ .van-field__label {
  margin-right: 0;
}
/deep/ .van-field__control--right {
  padding-left: 0 !important;
}
</style>