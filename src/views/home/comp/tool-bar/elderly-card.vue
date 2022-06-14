<!--
 * @Description: 老年证证件照
 * @Version: 0.1
 * @Autor: yjm
-->
<template>
  <div class="wrapper">
    <div class="top">
      <p @click="jumpPage('elderly-card')" class="item active">亮证</p>
      <p @click="jumpPage('qr-code-scan')" class="item">扫一扫</p>
      <p @click="jumpPage('elderly-code')" class="item">老年码</p>
    </div>
   <van-empty :description="error.des" v-if="otherPage == '7'" />
   <watch v-if="otherPage == '3' || otherPage == '4' || otherPage == '5' " :timestamp="timestamp" :sta="otherPage" @goClick="receive"/>
   <div v-if="otherPage == '1'" class="hascard">
      <!-- 正面 -->
      <div class="container">
        <img :src="state.ecCertPhoto" class="avatar" />
        <!-- <img :src="state.front" alt="frontImage" /> -->
        <div class="header">
          <div class="icon">
            <img src="@/assets/imgs/common/pre-icon.png" class="img-block" />
          </div>
          <div class="title">中华人民共和国老年人证</div>
        </div>
        <div class="content pre">
          <div class="_card">
            <div class="left">
              <div class="_line">
                <span class="label">姓 名</span>
                <span class="text">{{ state.user.name }}</span>
              </div>
              <div class="_line">
                <span class="label">出生日期</span>
                <span class="text">{{ birthday.slice(0, 4) }}年</span>
                <span class="text">{{ birthday.slice(5, 7) }}月</span>
                <span class="text">{{ birthday.slice(8, 10) }}日</span>
              </div>
              <div class="_line">
                 <span class="label">公民身份号码</span>
                 <span class="text">{{ state.user.psnNo }}</span>
              </div>
              <div class="_line">
                <span class="label">居住地址</span>
                <span class="text">{{ state.user.residentialAddress }}</span>
              </div>
            </div>
            <div class="right">
              <div class="_line">
                <span class="label">性 别</span>
                <span class="text">{{ state.user.sex }}</span>
              </div>
              <div class="_line">
                <span class="label">血型</span>
                <span class="text">{{ state.user.blood }}</span>
              </div>
            </div>
          </div>
          <div class="_bottom">
            <span class="label">编号</span>
            <span> {{ state.ecShowCardNo }}</span>
          </div>
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
  </div>
    <otherAuth @handAuth="handAuth" v-if="otherPage === '6'" />
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
    <!-- 预览图片 -->
    <y-preview-image v-model="show" :url="previewImage" :datetime="datetime" />
    <van-button size="large" v-if="otherPage === '1'" class="_m" round @click="showAction = true">证照管理3</van-button>
    <van-action-sheet
      v-model="showAction"
      :actions="maction"
      cancel-text="取消"
      description="证照管理"
      close-on-click-action
      @select="selItem"
    />
  </div>
 
</template>
<script>
import { Overlay ,Toast } from "@ylz/vant";
import { jumpFaceRecognition } from "@/utils/index";
import { claimApi } from "@/api";
import empty from "@/views/home/comp/tool-bar/empty.vue";
import watch from '@/views/home/comp/tool-bar/watch.vue';
import otherAuth from "@/views/home/comp/tool-bar/otherAuth.vue"
export default {
  components: {
    [Overlay.name]: Overlay,
    empty,
    watch,
    otherAuth
  },
  data() {
    return {
      error:{
        des:''
      },
      timestamp:'',//时间
      otherPage:'',
      showAction:false,
      maction:[
         { name: '证照信息变更',index:1 },
         { name: '赡养抚养关系',index:2 }
      ],
      birthday:'',//
      showInputType: false, // 展示实名输入方式
      datetime: "",
      previewImage: "",
      showActionSheet: false,
      show: false,
      user: {},
      actions: [
        { name: "证照信息变更", to: "/" },
        // { name: "证明材料", to: "/" },
        { name: "更改绑定手机", to: "/" },
        { name: "赡养抚养关系", to: "/" }
      ],
      state: {
        showCard: false,
        front: "",
        back: "",
        user: {},
        ecCertPhoto: ""
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(newValue) {
         if(newValue.query.ismatch === "true"){
            const userinfor = localStorage.getItem('userinfor');
            const userObjec = JSON.parse(userinfor);
            const go =  this.other_cert_active(userObjec);  
            console.log("====激活状态值card---",go)
            go.then((res)=>{
              console.log("====回来什么card",res)
              if(res){
                this.goauth(userObjec);
              }else{
                this.$Toast("其它渠道激活异常，请查看后端服务")
              }
            }).catch(erro=>{
                console.log("====回来erro什么",erro)
            })
         }
      }
    }
  },
  activated() {
    this.showActionSheet = false
  },
  mounted() {
    this.getPhoto();
    this.initData();
  //  this.selcetAutuCode()
  },
  methods: {
         //去授权
  async goauth(userinfor){
             try{
                  const { data, code } = await claimApi.selcetAutuCode({
                  uactId: userinfor.uactId,
                  psnName:userinfor.psnName,
                  certNo: userinfor.idCard,
                  appId: "53928a083adb4a7dad2eecf05564873f"
                 })
                  if (code === 0) {
                    this.carState  = "1";
                    return this.getGenCode(appId, data.authCode)
                  }
                }catch(erro){ 
                  this.$Toast(erro +'')
                  this.carState = '7';//授权失败
                  this.error.des = "获取用户授权码失败";
                }
   } , 
   //去调用非老龄委渠道激活
  async other_cert_active(userinfor){
    try{
       const {code ,message} = await claimApi.other_cert_active({
        idNo:userinfor.idCard,
        userName:userinfor.psnName
      })
      if(code === 0){
       return true;
      }
    }catch(erro){
      this.$Toast(erro +'');
      return false;
    }
   },
   async handAuth(){
      const userinfor = await this.$store.dispatch("getUserInfo");
      localStorage.setItem('userinfor',JSON.stringify(userinfor))
      //人脸识别通过后
      jumpFaceRecognition({
          userName: userinfor.psnName,
          idCard: userinfor.idCard,
          url: "elderly-card"
      })
    },
    selItem(action,index){
      if(index == 0){
       Toast('功能建设中!');
      }else if(action.index == 2){
        // add 关系
         this.$router.push({ path: `../support-raise` })
      }
    },
    onCancel() {

    },
    onSelect({ to }) {
      this.$router.push({ path: to })
    },
    /**
     * @description 根据电子证的状态
     * @param {string} crtfStas 认证状态 0:未认证 1:实名、实人认证 2：实名认证
     */
    async receive() {
      const { crtfStas } = await this.$store.dispatch("getUserInfo")
      if (crtfStas === "0") {
        this.showInputType = true
      }
      if (crtfStas === "2") {
        const { psnName, idCard } = JSON.parse(sessionStorage.getItem("userInfo")) || this.$store.getters.userInfo
        jumpFaceRecognition({
          userName: psnName,
          idCard: idCard,
          url:'process'
        })
        return false
      }
    },
  async  initData(){
      //1：已授权已激活 2：未授权已激活 3：未激活 4.审核中 5.审核失败 6.其它渠道已经领取，在老龄委使用，需要进行用户授权
       const _mes = {4:'审核中',5:'审核失败',6:'其它渠道已经领取，在老龄委使用，需要进行用户授权'};
       const userinfor = await this.$store.dispatch("getUserInfo");
       this._userinfor = userinfor;//#0:未领卡 1:已领卡
          if(userinfor.authCode){
            //查显示卡
             this.otherPage = "1";
             this.showCert(userinfor.authCode)
          }else{
            if(userinfor.crtfStas === "0"){
              this.otherPage = "3";
              return;
            }  
            //查卡状态
            const state = await claimApi.ec_cert_state({
                "appId": '53928a083adb4a7dad2eecf05564873f',
                "idNo": userinfor.idCard,
                "idType": "身份证",
                "userName": userinfor.psnName
            })
            if(state.code === -1) return;
            if(state.data.authState === "1"){
               //显示证
               this.otherPage = "1";
               this.showCert(state.data.authCode)
            }else if(state.data.authState === "2"){
               //去授权
                try{
                  const { data, code } = await claimApi.selcetAutuCode({
                  uactId: userinfor.uactId,
                  psnName:userinfor.psnName,
                  certNo: userinfor.idCard,
                  appId: "53928a083adb4a7dad2eecf05564873f"
                 })
                  if (code === 0) {
                    this.otherPage = "1";
                    this.showCert(data.authCode)
                  }
                }catch(erro){ 
                  this.$Toast(erro +'')
                  this.otherPage = "7";
                  this.error.des = "获取用户授权码失败";
                }
            }else if(state.data.authState === "3"){
              //没有领过卡  3：未激活 
              this.otherPage = "3";
            }else if(state.data.authState === "4"){
              //4.审核中
               this.otherPage = "4";
               this.timestamp = state.timestamp;//返回的时间戳
              Toast(_mes[state.data.authState])
            }else if(state.data.authState === "5"){
              //5.审核失败
               this.otherPage = "5";
               this.timestamp = state.timestamp;//返回的时间戳
              Toast(_mes[state.data.authState])
            }else if(state.data.authState === "6"){
             //6.其它渠道已经领取，在老龄委使用，需要进行用户授权
             this.otherPage = "6";
             Toast(_mes[state.data.authState])
            }
          }
      console.log("===查看--",userinfor)
    },
    // 获取用户授权码
    // async selcetAutuCode() {
    // //  const { uactId, psnName, idCard } = this.$store.getters.userInfo;
    //   const { uactId, psnName, idCard } = await this.$store.dispatch("getUserInfo")
    //    console.log("用户执行---",uactId,psnName,idCard)
    //   if(uactId === undefined || psnName === undefined || idCard === undefined) return;
    //   const { data, code } = await claimApi.selcetAutuCode({
    //     uactId: uactId,
    //     psnName: psnName,
    //     certNo: idCard,
    //     appId: "53928a083adb4a7dad2eecf05564873f"
    //   })
    //   if (code === 0) {
    //     this.showCert(data.authCode)
    //   }
    // },
    // 电子老年证展证
    async showCert(tempAuthCode) {
      const { data, code } = await claimApi.show_senior_cert({
        chnlId: "53928a083adb4a7dad2eecf05564873f",
        authCode: tempAuthCode
      })
      if (code === 0) {
        this.state.user = data.ecCertExtendDTO
        this.birthday = this.state.user.birthday;//生日
        this.state.ecCertPhoto = data.ecCertPhoto
        this.state.ecShowCardNo = data.ecShowCardNo
      }
    },
    //TODO 去跳转记录第一张图片
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
    jumpPage(path) {
      this.$router.push({ path: `/${path}` })
    },
    // 获取证件照
    getPhoto() {
      this.state.front = require("@/assets/imgs/common/card-bj.png")
      this.state.back = require("@/assets/imgs/common/card-bj.png")
      this.datetime = new Date().getTime()
    },
    // 预览证件照
    preview(url) {
      this.previewImage = url
      // this.state.showCard = true
    }
  }
}
</script>
<style lang="less" scoped>
._card {
    display: table;
    width: 100%;
    height: 100%;
    font-size: 9.97px * @ratio;
    .left {
    display: table-cell;
    width: 61%;
    ._line{
      margin-bottom:7px * @ratio;
      .label {
            color: #2860A6;
            margin-right: 7px * @ratio;
            display: inline-block;
            width: 73px * @ratio;
            text-align: right;
        }
    }
   }
   .right {
    display: table-cell;
    ._line{
      margin-bottom:7px * @ratio;
      .label {
            color: #2860A6;
            margin-right: 7px * @ratio;
        }
    }
   }
}
._m{
  background: #e24e31 linear-gradient(144deg, #ff8800 0%, #ff5000 100%);
  color: #fff;
  position: absolute;
  bottom: 17px * @ratio;
  width: 90%;
}
.wrapper {
  padding: 0 16px * @ratio;
  background-size: 100%;
  overflow: hidden;
  /deep/ .van-popup {
    background: transparent;
  }
  height: 100vh;
  .top {
    padding-top: 14px * @ratio;
    margin-bottom: 16px * @ratio;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      width: 102px * @ratio;
      height: 36px * @ratio;
      line-height: 36px * @ratio;
      text-align: center;
      font-size: 22px * @ratio;
      font-weight: 500;
      &.active {
        background: #e24e31 linear-gradient(144deg, #ff8800 0%, #ff5000 100%);
        border-radius: 20px * @ratio;
        color: #ffffff;
      }
    }
  }
  .nocard {
    border-radius: 8px * @ratio;
    background: #e24e31 linear-gradient(144deg, #ff8800 0%, #ff5000 100%);
    padding: 16px * @ratio 10px * @ratio 0;
    height:89%;
    .info {
      color: #fff;
      .title {
        font-size: @font_size_lg;
      }
      div {
        margin-top: 16px * @ratio;
      }
      font-size: @font_size_md;
      line-height: 1;
      letter-spacing: 2px;
    }
    .content {
      height: 76.5%;
      background: #ffffff;
      border-radius: 8px * @ratio;
      margin-top: 24px * @ratio;
      position: relative;
      .pic {
        width: 220px * @ratio;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        img {
          margin: 0 auto;
          width: 110px * @ratio;
        }
      }
      .text {
        font-size: 20px * @ratio;
        color: #999999;
        line-height: 28px * @ratio;
        margin: 0 auto;
        text-align: center;
        margin-top: 16px * @ratio;
      }
    }
    .gradient-btn {
      margin-top: 16px * @ratio;
    }
  }
  .hascard {
    .container {
      width: 343px * @ratio;
      height: 220px * @ratio;
      background: url("~@/assets/imgs/common/card-bj.png") no-repeat center
        center;
      background-size: 100% 100%;
      box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.16);
      border-radius: 8px * @ratio;
      margin-top: 30px * @ratio;
      padding-top: 17px * @ratio;
      // padding-left: 30px * @ratio;
      position: relative;
      .header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 43px * @ratio;
        .icon {
          width: 45px * @ratio;
          height: 47px * @ratio;
          margin-right: 5px * @ratio;
        }
        .title {
          color: #2860a6;
          text-align: center;
          font-size: 18px * @ratio;
          font-weight: bolder;
          letter-spacing: 3px * @ratio;
        }
      }
      .content {
        margin-left: 10px * @ratio;
        margin-top: 12px * @ratio;
        &.pre {
          margin-top: 16px * @ratio;
        }
        ._bottom{
              font-size:7.97px * @ratio;
              text-align: right;
              padding-right: 12px * @ratio;
          .label{
            color:#2860A6;
          }
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
        right: 10px * @ratio;
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
      margin-top: 65px * @ratio;
    }
    .tip {
      margin: 8px * @ratio 0;
      text-align: center;
      font-size: @font_size_lg;
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
      padding-bottom: 20px * @ratio;
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
}

</style>