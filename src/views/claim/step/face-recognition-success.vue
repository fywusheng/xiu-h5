<!--
 * @Description: 人脸识别成功
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-08-01 11:55:25
-->
<template>
  <div class="page-face-recognition-success">
    <div class="avatar">
      <img :src="base64" class="img-block" />
    </div>
    <p class="tips">
      <span class="tit">温馨提示：</span>
      当前照片将会做为电子老年人证照片，若不满意，可重新拍照或本地上传照片。提交后，也可在“证照管理-证照信息变更”中修改照片。
    </p>
    <div class="container-btn">
      <p @click="takePhotoAgain" class="item">重 新 拍 照</p>
      <van-uploader class="upload" :after-read="afterRead">
        <p  class="item">本 地 上 传</p>
      </van-uploader>
      <p @click="subumit" class="gradient-btn">确 认 提 交</p>
    </div>
  </div>

</template>

<script>
import { jumpFaceRecognition } from "@/utils"
import { clearBg , authComparions} from "@/api/modules/common-api.js"  
import sessionStorage from '@/utils/session-storage';
import {  Dialog } from "@ylz/vant"
import localStorage from '@/utils/local-storage';
export default {
  data() {
    return {
      state: {},
      fileList:[],//文件list
      base64:'',
      _newUser:{}
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(newValue) {
         this.state.faceImg = newValue.query.img || this.$route.query._firstImg;
         this.base64 = `data:image/jpeg;base64,${this.state.faceImg}`
        // if (newValue.query.ismatch === "false") {
        //   debugger
        //   this.state.userName = newValue.query.name
        //   this.state.idCard = newValue.query.cardno
        //   this.state.faceImg = newValue.query.img
        //   this.base64 = `data:image/jpeg;base64,${this.$route.query.img}`
        //   console.log("===不匹配的时候---",newValue.query)
        //   return false
        // }
        // if (newValue.query.ismatch === "true") {
        //   debugger
        //   console.log("===hander--",newValue.query)
         
        //   //this.$route.query._firstImg   
        //   this.state.userName = newValue.query.name //TODO name没有值
        //   this.state.idCard = newValue.query.cardno
        //   this.state.faceImg = newValue.query.img
        //   this.base64 = `data:image/jpeg;base64,${newValue.query.img}`
        //   const sessionA = localStorage.getItem('seArray');//[]
        //   const sessionFirst = localStorage.getItem('sessionFirst');
        //    if(!sessionA.includes('seArray')){
        //     localStorage.setItem('seArray',['seArray']);
        //     localStorage.setItem('sessionFirst',newValue.query.img)
        //   }
        // }
        
      }
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  created(){
    this.initData();
  },
  methods: {
   async initData(){
      this._newUser = await this.$store.dispatch("getUserInfo");
    },
    /**
     * 获取去除背景图片
     */
   async getBackGroundImg(faceImg){
        const resImg  =   await clearBg({photoBase64: faceImg});
        if(resImg.code === 0 ){
          let rephoto = resImg.data.photoBase64;
          this.state.faceImg = rephoto;
          this.base64 =`data:image/jpeg;base64,${rephoto}` 
        }
    },
   async afterRead(file){
     
      if(file.content){
        const base64 = file.content;
        const splitbase = base64.split(',')[1];
        this.getBackGroundImg(splitbase);
      }
    },
    localUpload(){
     //本地上传 this.state.faceImg
     
    },
    takePhotoAgain() {
      jumpFaceRecognition({
        userName: this._newUser.psnName,
        idCard: this._newUser.idCard,
        url: "claim/face-recognition-success"
      })
    },
    async subumit() {
     const user = await this.$store.dispatch("getUserInfo");
     console.log("===上传途径user---",user);
     const params = {
          psnName:  user.psnName,
          image64: this.state.faceImg,
          certNo: user.idCard,
          userId: user.uactId
     }
     console.log("====阐述---",this.state)
     const {code,data} = await authComparions(params);
      if(code === 0){
       //实例通过
       if(data.userPenFlag){
          sessionStorage.setItem("userData", JSON.stringify(this.state))
          const inputType = sessionStorage.getItem("inputType")
          //setp 三步
          this.$router.push({ path: "apply-card", query: { type: inputType } })
       }else{
           if(data.count && data.count < 0){
             //TODO
              const firstImg = localStorage.getItem('first-img-face'); 
              this.base64 =`data:image/jpeg;base64,${firstImg}`
              this.state.faceImg = firstImg;
             Dialog.alert({
                message: '更换照片次数已达上限，将使用您首张拍摄的照片继续申领',
                theme: 'round-button',
                confirmButtonText:'继续申领'
              }).then(() => {
                // on close
                  console.log("===第一章图片---",this.state)
                  //TODO 数据修改
                  sessionStorage.setItem("userData", JSON.stringify(this.state))

                  const inputType = sessionStorage.getItem("inputType")
                  //setp 三步
                  this.$router.push({ path: "apply-card", query: { type: inputType } })
              });
              return;
         }
         this.$toast('认证失败，请重新拍照或上传');
       }
      }
      this.state.faceImg = this.$route.query.img
      sessionStorage.setItem("userData", JSON.stringify(this.state))
      const inputType = sessionStorage.getItem("inputType")
      this.$router.push({ path: "apply-card", query: { type: inputType } })
    }
  }
}
</script>

<style lang="less" scoped>
.page-face-recognition-success {
  .avatar {
    width: 187px * @ratio;
    height: 262px * @ratio;
    margin: 0 auto;
  }
  .tips {
    width: 343px * @ratio;
    font-size: 18px * @ratio;
    font-weight: 400;
    color: #ff5500;
    line-height: 25px * @ratio;
    color: #999999;
    margin: 0 auto;
    margin-top: 38px * @ratio;
    .tit {
      color: #ff5500;
    }
  }
  .container-btn {
    width: 343px * @ratio;
    margin: 0 auto;
    margin-top: 50px * @ratio;
    .item {
      height: 54px * @ratio;
      font-size: 22px * @ratio;
      line-height: 54px * @ratio;
      border-radius: 27px * @ratio;
      border: 1px * @ratio solid #ff5500;
      text-align: center;
      color: #ff5500;
      margin-bottom: 12px * @ratio;
      width: 343px * @ratio;
    }
  }
}
</style>