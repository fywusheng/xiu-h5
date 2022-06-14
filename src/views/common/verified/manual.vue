<!--
 * @Description: 是实名认证，手动
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-08-06 09:53:04
-->
<template>
  <div class="page-manual">
    <div class="title">
      <van-icon :name="require('@/assets/svg/home/icon-base-info.svg')" />
      <span>基本信息</span>
    </div>
    <van-form ref="manual" @submit="handleClickBtn">
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
       <van-button round block class="gradient-btn" native-type="submit">下一步手33动</van-button>
    </van-form>
    <!-- <p @click="handleClickBtn" class="gradient-btn">下一步手动</p> -->
  </div>
</template>

<script>
import { claimApi } from "@/api"
import { jumpFaceRecognition } from "@/utils/index"
import { validateIdCard, checkCN } from "@/utils/check"
export default {
  data() {
    return {
      state: {
        userName: "",
        idCard: "",
        faceImg: ""
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (newValue.query.ismatch) {
          if (sessionStorage.getItem("cardData")) {
            this.state = JSON.parse(sessionStorage.getItem("cardData"))
          }
          this.state.faceImg = newValue.query.img//TODO 之后要删除
          localStorage.setItem('first-img-face' , JSON.stringify(newValue.query.img))
          this.submit(newValue.query)
        }
      }
    }
  },
  methods: {
   async handleClickBtn() {
      //校验通过
      try{
         const { code, message } = await claimApi.checkIdCard(this.state);
          sessionStorage.setItem("cardData", JSON.stringify(this.state))
          jumpFaceRecognition({
            userName: this.state.userName,
            idCard: this.state.idCard,
            url: "user-center/manual"
          })
      }catch(err){
         this.$toast(err+'')
      }
         
    },
    async submit(routeQuery) {
      const { code } = await claimApi.bindBankAcct({
        userName: this.state.userName,
        idCard: this.state.idCard,
        faceImg: this.$route.query.img
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
    checkCN,
    validateIdCard
  }
}
</script>

<style lang="less" scoped>
.page-manual {
  padding: @space_md_16;
  .item {
    height: 70px * @ratio;
  }
  .button {
    margin-top: 100px * @ratio;
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
  .title {
    margin: 30px * @ratio 0 15px * @ratio;
    font-size: 22px * @ratio;
    padding: 0 @space_md_16;
    span {
      margin-left: 8px * @ratio;
    }
  }
  .form {
    padding: 0 8px * @ratio;
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
}
/deep/ .van-field__label {
  margin-right: 0;
}
/deep/ .van-field__control--right {
  padding-left: 0 !important;
}
</style>