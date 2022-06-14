<!--
 * @Description: 二维码、条形码
 * @Version: 0.1
 * @Autor: yjm
-->
<template>
<div>
  <div class="page-qr-code">
    <div class="top">
      <p @click="jumpPage('elderly-card')" class="item">亮证</p>
      <p @click="jumpPage('qr-code-scan')" class="item">扫一扫</p>
      <p @click="jumpPage('elderly-code')" class="item active">老年码</p>
    </div>
  </div>
  
  <van-empty :description="error.des" v-if="carState === '7'" />
   <!-- 没有领卡 -->
   <empty v-if="carState === '3'" />
   <codewatch v-if="carState === '1' || carState === '4' || carState === '5'">
     <template v-slot:changeCenter>
       <div v-if="carState === '1'">
          <div class="watch">点击可查看数字条形码</div>
          <div class="code" >
            <canvas id="barcode" />
            <y-qr-code :content="qrCode" :width="qrSize" :height="qrSize" />
            <div class="tip">
              每隔1分钟自动<span class="refresh" @click="refresh">刷新</span>
            </div>
          </div>
       </div>
       <van-empty
          v-if=" carState === '4' || carState === '5'"
          class="custom-image" 
          :image="require('@/assets/imgs/electronic-card/chenggong.png')"
          :description="message[carState]"
        />
     </template>
   </codewatch>
   <otherAuth @handAuth="handAuth" v-if="carState === '6'" />
</div>
  
</template>
<script>
import YQrCode from "@/components/plugins/y-qr-code"
import jsbarcode from "@ylz/jsbarcode"
import { claimApi } from "@/api"
import empty from "@/views/home/comp/tool-bar/empty.vue"
import codewatch from "@/views/home/comp/tool-bar/codewatch.vue"
import otherAuth from "@/views/home/comp/tool-bar/otherAuth.vue"
import { jumpFaceRecognition } from "@/utils"
import localStorage from '@/utils/local-storage';
export default {
  components: {
    YQrCode,
    empty,
    codewatch,
    otherAuth
  },
  data() {
    return {
      error:{
        des:''
      },//授权码失败情况
      message:{5:'电子老年人证申领失败暂时无法使用',4:"电子老年人证审核中暂时无法使用"},
      carState:"",//卡状态1,3,4,5,6
      timer: "",
      time: 60000, // 定时刷新时间ms
      qrSize: 210, //二维码尺寸
      qrCode: "" //二维码内容
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
            console.log("====激活状态值---",go)
            go.then((res)=>{
              console.log("====回来什么",res)
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
  computed: {
    user() {
      return this.$store.state["user"].user
    }
  },
  mounted() {
    this.refresh()
    this.setTimeoutRefresh()
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
       console.log("===fanhuisdfsf---",code)
       return true;
      }
    }catch(erro){
      this.$Toast(erro +'');
      return false;
    }
   },

   async handAuth(){
      console.log('====去授权333===')
      const userinfor = await this.$store.dispatch("getUserInfo");
      localStorage.setItem('userinfor',JSON.stringify(userinfor))
      //人脸识别通过后
      jumpFaceRecognition({
          userName: userinfor.psnName,
          idCard: userinfor.idCard,
          url: "elderly-code"
      })
    },
    // 刷新二维码和条形码
    async refresh() {
      const data = await this.initData()
      this.qrCode = data
      this.genBarcode(data)
      this.setTimeoutRefresh()
    },
    // 定时刷新条形码和二维码
    setTimeoutRefresh() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.refresh()
      }, this.time)
    },
    async  initData(){
       const _mes = {4:'审核中',5:'审核失败',6:'其它渠道已经领取，在老龄委使用，需要进行用户授权'};
       const userinfor = await this.$store.dispatch("getUserInfo");
       this._userinfor = userinfor;//#0:未领卡 1:已领卡
       const appId = "53928a083adb4a7dad2eecf05564873f"
       if(userinfor.authCode){
            //查显示卡
             this.carState  = "1";
            return this.getGenCode(appId,userinfor.authCode)
          }else{
            if(userinfor.crtfStas === "0"){
              this.carState = "3";
              return;
            } 
            //查卡状态
            const state = await claimApi.ec_cert_state({
                "appId": appId,
                "idNo": userinfor.idCard,
                "idType": "身份证",
                "userName": userinfor.psnName
            })
            if(state.code === -1) return;
            if(state.data.authState === "1"){
               //显示证
                this.carState  = "1";
                const authCode = state.data.authCode;
               return this.getGenCode(appId, authCode)
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
                    this.carState  = "1";
                    return this.getGenCode(appId, data.authCode)
                  }
                }catch(erro){ 
                  this.$Toast(erro +'')
                  this.ecarState = '7';//授权失败
                  this.error.des = "获取用户授权码失败";
                }
            }else  if(state.data.authState === "3"){
              //没有领过卡  3：未激活 
               this.carState  = "3";
            }else if(state.data.authState === "4"){
              //4.审核中
               this.carState  = "4";
               this.timestamp = state.timestamp;//返回的时间戳
              Toast(_mes[state.data.authState])
            }else if(state.data.authState === "5"){
              //5.审核失败
               this.carState  = "5";
               this.timestamp = state.timestamp;//返回的时间戳
              Toast(_mes[state.data.authState])
            }else if(state.data.authState === "6"){
             //6.其它渠道已经领取，在老龄委使用，需要进行用户授权
             //TODO 暂时不去优化这部分
             this.carState  = "6";
             Toast(_mes[state.data.authState]);
            }
          }
     console.log("====最后卡状态---",this.carState)
    
    },
    // 获取数据
    /* eslint-disable */
    // async getData() {
    //   const appId = "53928a083adb4a7dad2eecf05564873f"
    //   const { psnName, idCard, uactId } = this.$store.state["user"].user
    //   if (psnName) {
    //     const state = await claimApi.ec_cert_state({
    //       "appId": appId,
    //       "idNo": idCard,
    //       "idType": "身份证",
    //       "userName": psnName
    //     })
    //     //存储状态
    //     this.ecState =  state.data.authState;
    //     switch (state.data.authState) {
    //       case "1": // 已激活已授权 ,
    //         const authCode = state.data.authCode
    //         return this.getGenCode(appId, authCode)
    //         break
    //       case "2": //已激活 未授权，掉用授权（获取授权码）接口
    //         const userAuthCode = await claimApi.selcetAutuCode({
    //           "uactId": uactId,
    //           "psnName": psnName,
    //           "certNo": idCard,
    //           "appId": appId
    //         })
    //         return this.getGenCode(appId, userAuthCode.data.authCode)
    //         break
    //       case "3": //未激活未授权
    //         this.$toast("请先申领电子证")
    //         // setTimeout(() => {
    //         //   this.$router.push({
    //         //     path: "/claim"
    //         //   })
    //         // }, 2000)
    //         break
    //       default: // 在申请中
    //         this.$toast("电子证正在申领中，请等待审核通过后使用该功能")
    //         // setTimeout(() => {
    //         //   this.$router.go(-1)
    //         // }, 2000)
    //         break
    //     }
    //   } else {
    //     this.$toast("请先申领电子证")
    //     // setTimeout(() => {
    //     //   this.$router.push({
    //     //     path: "/elderly-card"
    //     //   })
    //     // }, 2000)
    //   }
    // },
    /* eslint-disable */
    // 获取用户信息
    async getGenCode(appId, authCode) {
      const code = await claimApi.get_gen_code({
        appId: appId,
        authCode: authCode
      })
      return code.data.ecQrCode
    },
    // 生成条形码
    genBarcode(val) {
      jsbarcode("#barcode", val, {
        height: "64",
        displayValue: false,
        margin: 0,
        width: 1.45
      })
    },
    jumpPage(path) {
      this.$router.push({ path: `/${path}` })
    }
  },
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>
<style lang="less" scoped>
// padding: 0 16px * @ratio;
    .custom-image{
                    height:404px * @ratio;
                   /deep/ .van-empty__image{
                        width:50px * @ratio;
                        height:49px * @ratio;
                    }
                   /deep/ .van-empty__description{
                        text-align:center;
                    }
            }
.page-qr-code {
  padding: 0 16px * @ratio;
  height:100%;
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
  .wrapper {
    width: 100%;
    height:88%;
    // height: 600px * @ratio;
    border-radius: 8px * @ratio;
    background: linear-gradient(135deg, #ff8800 0%, #ff5000 100%);
    padding-bottom: 3px * @ratio;
    .info {
      font-size: 18px * @ratio;
      line-height: 1;
      letter-spacing: 2px;
      padding: 6px * @ratio 10px * @ratio;
      color: #fff;
      .title {
        font-size: @font_size_lg;
        font-weight: 500;
        line-height: 30px * @ratio;
      }
      div {
        margin-top: 16px * @ratio;
      }
    }
  }
}

.code {
  padding-bottom: 16px * @ratio;
  background: #fff;
  text-align: center;
  border-radius: @border_radius_lg;
  margin: 10px * @ratio;
  // margin-top: 30px * @ratio;
  // box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.16);
  // height: 421px * @ratio;
}
.watch{
  font-size:18px * @ratio;
  color:#666;
  height:25px * @ratio;
  line-height:25px * @ratio;
  padding-top: 14px * @ratio;
  text-align: center;
  padding-bottom: 25px * @ratio;
}
#barcode {
  margin: 16px * @ratio auto 30px * @ratio auto;
  display: block;
}
.tip {
  margin-top: @space_md_16;
  font-size: @font_size_lg;
  color: @third_text_color;
}
.refresh {
  padding-left: 10px * @ratio;
  color: @main_color;
}
// .content {
//       height: 74%;
//       border-radius: 8px * @ratio;
//       width: 94%;
//       margin: 17px * @ratio auto auto auto;
//   .pic {
//     width: 220px * @ratio;
//     position: absolute;
//     left: 50%;
//     top: 62%;
//     transform: translate(-50%, -50%);
//     img {
//       margin: 0 auto;
//       width: 110px * @ratio;
//     }
//   }
// }
</style>