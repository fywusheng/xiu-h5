<template>
    <div>
        <div class="auth">
          <div class="_flex">
                <div class="_icon"><img src="@/assets/imgs/electronic-card/codeIcon.png"/></div>
                <div class="_col">
                    <div class="_par">中华人民共和国老年人证</div>
                </div>
            </div>
            <div class="shore">享受优惠待遇</div>
        </div>
         <div @click="goAuth" class="gradient-btn">同意协议并授权</div>
         <div class="notice">
             查看《用户授权协议》《电子老年人证用户协议》《人脸识别认证服务须知》,
             授权电子老年人证获取你的姓名、手机号、身份证用于实名领卡，
             并经由国家老龄服务平台上传您的相片、姓名、社会保障号码信息以完成实人认证。
         </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        goAuth(){
           this.$emit("handAuth")
        }
    }
}
</script>
<style lang="less" scoped>  
.auth{
     background:url('../../../../assets/imgs/electronic-card/ban.png') 100% 100%;
     width: 375px * @ratio;
     height: 138px * @ratio;
     background-repeat: no-repeat;
      ._flex{
                display: flex;
                flex-flow: row;
                padding: 15px * @ratio;
                ._icon{
                 img{
                        width:32px * @ratio;
                        height:32px * @ratio;
                    }
                }
                ._col{
                    margin-left:5px * @ratio;
                    
                    ._par{
                        font-size: 22px * @ratio;
                        color: #fff;
                    }
                    ._sub{
                        font-size: 18px * @ratio;
                        color: #fff;
                    }
                }
            }
     .shore{
         font-size:18px * @ratio;
         color:#fff;
         padding-left: 17px * @ratio;
     }       
}
.gradient-btn{
        width: 90%;
        margin: 0 auto;
        margin-top: 46px * @ratio;
    }
    .notice{
        font-size: 16px * @ratio;
        color: #333;
        width: 90%;
        text-align: center;
        margin: 0 auto;
        margin-top: 30px * @ratio;
    }    

</style>


