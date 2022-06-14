<!--
 * @Description: 实名认证，身份证扫描
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-08-06 09:51:50
-->
<template>
  <div>
    <div class="title">
      <van-icon :name="require('@/assets/svg/home/icon-base-info.svg')" />
      <span>基本信息</span>
    </div>
    <van-form ref="scanState" @submit="handleClickBtn">
      <van-field
        v-model="state.userName"
        required
        label="姓名(必填)"
        placeholder="请输入姓名"
        :rules="[{ validator: checkCN, message: '请输入中文姓名' }]"
        class="item"
      />
      <van-field
        v-model="state.idCard"
        required
        label="身份证号(必填)"
        placeholder="请输入身份证号"
        :rules="[{ validator: validateIdCard, message: '请输入正确身份证号' }]"
        class="item"
      />
      <van-field required name="radio" label="性别(必填)" class="item">
        <template #input>
          <van-radio-group v-model="state.sex"  direction="horizontal" @change="radioChange">
            <van-radio  name="1" >男</van-radio>
            <van-radio  name="2" >女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
 <!-- <van-field name="radio" label="单选框">
  <template #input>
    <van-radio-group v-model="state.sex" direction="horizontal">
      <van-radio name="1">单选框 1</van-radio>
      <van-radio name="2">单选框 2</van-radio>
    </van-radio-group>
  </template>
</van-field> -->


      <van-field
        v-model="state.naty"
        required
        label="民族(必填)"
        placeholder="请输入民族"
        :rules="[{ required: true, message: '' }]"
        class="item"
      />
      <van-field
        v-model="state.brdy"
        required
        label="出生日期(必填)"
        placeholder="请输入出生日期"
        :rules="[{ required: true, message: '' }]"
        class="item"
      />
      <van-field
        v-model="state.area"
        required
        label="户籍地址(必填)"
        placeholder="请输入户籍地址"
        :rules="[{ required: true, message: '' }]"
        class="item"
      />
      <van-field v-model="state.addr" placeholder="请输入详细地址" />
      <p @click="scaner" class="tips-cont">
        <svg-icon icon-class="claim" class-name="custom-class" />
        <span class="tips">重新扫描</span>
      </p>
       <van-button round block class="gradient-btn" native-type="submit">下一步扫描</van-button>
    </van-form>
    <!-- <p @click="handleClickBtn" class="gradient-btn">下一步扫描</p> -->
  </div>
</template>

<script>
import { RadioGroup, Radio, Overlay } from "@ylz/vant"
import { claimApi } from "@/api"
import { validateIdCard, checkCN } from "@/utils/check"
import { jumpFaceRecognition } from "@/utils/index"
export default {
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Overlay.name]: Overlay
  },
  data() {
    return {
      state: {
        userName: "",
        idCard: "",
        sex: "",
        naty: "",
        brdy: "",
        address: "",
        faceImg: ""
      }
    }
  },
  created() {
    if (sessionStorage.getItem("cardData")) {
      this.showInputType = false
      this.getUserInfo()
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (newValue.query.ismatch === "true") {
          if (sessionStorage.getItem("cardData")) {
            this.state = JSON.parse(sessionStorage.getItem("cardData"))
            this.state.faceImg = newValue.query.img //TODO 要删除
            localStorage.setItem('first-img-face' , JSON.stringify(newValue.query.img))
            this.submit(newValue.query)
          }
        }
      }
    }
  },
  methods: {
     radioChange(eve){
       console.log("===能点击吗===",eve)
      this.state.sex = eve;
      this.state.gend = eve;
    },
    getUserInfo() {
      const { name: userName, id_num: idCard, sex, nation: naty, address, birth: brdy } = JSON.parse(sessionStorage.getItem("cardData"))
      this.state = { userName, idCard, naty, brdy }
      const index = address.lastIndexOf("省") || address.lastIndexOf("市") || address.lastIndexOf("县") || address.lastIndexOf("区")
      this.state.area = address.slice(0, index + 1)
      this.state.addr = address.slice(index + 1, address.length)
      this.state.gend = sex === "男" ? "1" : "2"
      this.$set(this.state,'sex',sex === "女" ? "2" : "1")
      this.state.address = address
    },
    async submit(routeQuery) {
      const { code } = await claimApi.bindBankAcct({
        userName: this.state.userName,
        idCard: this.state.idCard,
        faceImg: this.$route.query.img,
        gend: this.state.sex,
        naty: this.state.naty,
        brdy: this.state.brdy,
        hsregAddr: this.state.address
      })
      if (code === 0) {
        sessionStorage.setItem("userInfo", JSON.stringify(this.state))
        const source = sessionStorage.getItem("verifiedfrom")
        if (source) {
          this.$router.push({
            path: "/claim/face-recognition-success",
            query: {
              ismatch: routeQuery.ismatch,
              img: routeQuery.img
            }
          })
        } else {
          this.$router.push({ path: "/user-center/success" })
        }
      }
    },
    async handleClickBtn() {
      console.log("====去点击")
      try{
         const params = {
            idCard:this.state.idCard,
            gend: this.state.gend,
            brdy:this.state.brdy,
            userName: this.state.userName
      }
      console.log("===this.state---",this.state)
        const { code, message } = await claimApi.checkIdCard(params)
        // 身份证信息
        sessionStorage.setItem("cardData", JSON.stringify(this.state))
        jumpFaceRecognition({
          userName: this.state.userName,
          idCard: this.state.idCard,
          url: "user-center/scanning"
        })
      }catch(error){
         this.$toast(error+'')
      }
    },
    scaner() {
      this.$router.push({
        path: "/card-recognition", query: {
          redirect: "user-center/scanning"
        }
      })
    },
    checkCN,
    validateIdCard
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 22px * @ratio;
  padding: 30px * @ratio @space_md_16 15px * @ratio;
  span {
    margin-left: 8px * @ratio;
  }
}
.tips-cont {
  margin-top: 24px * @ratio;
  text-align: center;
  .custom-class {
    font-size: 22px * @ratio;
  }
  .tips {
    font-size: 22px * @ratio;
    color: #0059ff;
    line-height: 27px * @ratio;
  }
}
.gradient-btn {
  position: fixed;
  left: 50%;
  bottom: 32px * @ratio;
  transform: translateX(-50%);
  width: 343px * @ratio;
  height: 54px * @ratio;
  border-radius: 27px * @ratio;
}
</style>