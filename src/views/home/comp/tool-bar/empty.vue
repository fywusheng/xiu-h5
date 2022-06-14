<template>
  <div class="content">
    <div class="topicon">
      <img src="@/assets/imgs/electronic-card/codeIcon.png"/><span class="_font">电子老年人证</span>
    </div>
     <div class="pic">
          <img
            src="@/assets/imgs/electronic-card/noget.png"
            class="img-block"
          />
    </div>
    <div @click="receive" class="gradient-btn">立即领取</div>

    <van-overlay :show="showInputType" @click="showInputType = false">
      <div class="container-overlay">
        <div class="content">
          <p class="tips">选择信息录入方式</p>
          <p @click="gotoCardRecognition('scanning')" class="btn-overlay">
            <van-icon
              :name="require('@/assets/imgs/user-center/scanning.svg')"
            />
            扫描身份证
          </p>
          <p @click="gotoCardRecognition('manual')" class="btn-overlay">
            <van-icon :name="require('@/assets/imgs/user-center/input.svg')" />
            手动输入
          </p>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { jumpFaceRecognition } from "@/utils/index"
import { Overlay ,Toast } from "@ylz/vant"
export default {
    components: {
    [Overlay.name]: Overlay
  
  },
    data(){
        return{
           showInputType:false
        }
    },
    methods:{
     gotoCardRecognition(type) {
      if (type === "scanning") {
        sessionStorage.setItem("verifiedfrom", JSON.stringify({
          path: "claim/face-recognition-success",
          type
        }))
        this.$router.push({
          path: "/card-recognition",
          query: { redirect: "user-center/scanning", type }
        })
      }
      if (type === "manual") {
        sessionStorage.setItem("verifiedfrom", JSON.stringify({
          path: "claim/face-recognition-success",
          type
        }))
        this.$router.push({ path: `/user-center/manual`, query: { type } })
      }
    },
     /**
     * @description 根据电子证的状态
     * @param {string} crtfStas 认证状态 0:未认证 1:实名、实人认证 2：实名认证
     */
        async receive() {
          //TODO 测试使用
          console.log("===点击")
          //  this.$router.push({
          //   path: "/claim/face-recognition-success"
          // })
          // return ;
        const { crtfStas } = await this.$store.dispatch("getUserInfo")
        if (crtfStas === "0") {
            this.showInputType = true
        }
        if (crtfStas === "2") {
            const { psnName, idCard } = JSON.parse(sessionStorage.getItem("userInfo")) || this.$store.getters.userInfo
            jumpFaceRecognition({
            userName: psnName,
            idCard: idCard,
            url: "process"
            })
            return false
        }
        },
    }
}
</script>
<style lang="less" scoped>
    .content {
      width:92%;
      margin:0 auto;
      height: 412px * @ratio;
      background: #ffffff;
      border-radius: 8px * @ratio;
      margin-top: 24px * @ratio;
      position: relative;
      box-shadow: 0px * @ratio 3px * @ratio 10px * @ratio 0px * @ratio rgba(0, 0 ,0 , 0.12);
      .topicon{
        padding: 14px * @ratio;
        img{
          width:32px * @ratio;
          height:32px * @ratio;
        }
        ._font{
          font-size:20px * @ratio;
          color:#333;
          vertical-align: super;
        }
      }
      .pic {
        width: 220px * @ratio;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        img {
          margin: 0 auto;
         
        }
      }
      .text {
        font-size: 20px * @ratio;
        color: #999999;
        line-height: 28px * @ratio;
        margin: 0 auto;
        text-align: center;
        margin-top: 16px * @ratio;
        margin-bottom:16px * @ratio;
      }
      .gradient-btn{
            position: absolute;
            width: 93%;
            left: 12px * @ratio;
            bottom: 15px * @ratio;
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
      border-radius: 8px * @ratio;
      padding-top: 24px * @ratio;
      // padding-bottom: 20px * @ratio;
      height:auto;
      .tips {
        text-align: center;
        font-size: 20px * @ratio;
        font-weight: 400;
        color: #333333;
        line-height: 2.5;
        padding-bottom: 40px * @ratio;
        font-size: 22px * @ratio;
        font-weight: 500;
        color: #333333;
        line-height: 27px * @ratio;
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
</style>


