<template>
    <div>
        <img :src="imgs[state]" alt="">
        <div v-if="state == 4" class="card">
            <div class="t">{{notice[state].t}}</div>
            <div><span class="d">申领时间:</span>{{notice[state].d}}</div>
        </div>
        <div v-if="state == 5" class="card">
            <div><span class="d">申领时间:</span>{{notice[state].d}}</div>
            <div class="t"><span>失败原因:</span>{{notice[state].t}}</div>
        </div>
        <div v-if="state == 3" class="card">
            <div class="t">{{notice[state].t}}</div>
        </div>
        <van-button v-if="btnT[state]"  size="large" class="_m" round @click="goClick">{{btnT[state]}}</van-button>   
    </div>
</template>
<script>
export default {
    name:'watch',
    props:{
     sta:{
         type:String,
         default:''
     },
     timestamp:{
       type:String,
       default:''  
     }
    },
    data(){
        //require(imgs[state])
        return{
         imgs:{0:require('@/assets/imgs/state/3.png'),3:require('@/assets/imgs/state/3.png'),4:require('@/assets/imgs/state/4.png'),5:require('@/assets/imgs/state/5.png')},
         state:'',
         //4:审核中，5，失败 ，3无领取
         notice:{4:{t:'您的电子老年人证正在审核中',d:''},
                 5:{t:'证件照审核未通过,请重新拍照并申请',d:''},
                 3:{t:'请遵循自愿申领,即时办结的原则。需要办理电子老年人证的老年人。',d:''},
                 0:{t:'请遵循自愿申领,即时办结的原则。需要办理电子老年人证的老年人。',d:''}    
                },
        btnT:{5:'重新领取',3:'立即领取',0:'立即领取'}        
        }
    },
     created(){
      this.state = this.sta;
      this.notice[this.state].d = this.timestamp;
      console.log("===传入的stateu---",this.sta,this.notice)
    },
    methods:{
        goClick(){
         this.$emit("goClick");
        }
    }
}
</script>
<style lang="less" scoped>
._m{
  background: #e24e31 linear-gradient(144deg, #ff8800 0%, #ff5000 100%);
  color: #fff;
  margin-top: 42px * @ratio;
  position: absolute;
  bottom: 11px * @ratio;
  width: 90%;
  margin: auto;
}
.card{
    width: 90%;
    margin: auto;
}
</style>


