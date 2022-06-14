<template>
  <div @click="pay" class="payC">
    <div class="left">
      <div class="_t">优惠买单</div>
      <div class="_mes">逛超市 享优惠 单单立减</div>
    </div>
    <div class="right">
      <img :src="require('@/assets/imgs/pay/paylogo.png')" alt="">
    </div>
  </div>
</template>
<script>
import { commonApi, claimApi } from "@/api"
import localStorage from '@/utils/local-storage';
import { Toast } from "@ylz/vant"
export default {
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    /**
     * @description: 打开支付
     * @param {*}
     * @return {*}
     * @author: shn
     */    
    pay() {
    //   this.$emit("openWindow", true)
      const token = localStorage.getItem('token')
      if(token){
        this.$router.push({ path: "/order" })
      }else{
        Toast('请先登录后在进行操作!')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.payC {
  width: 100%;
  height: 95px * @ratio;
  display: table;
  background-color: #fff;
  margin-bottom: 12px * @ratio;
  border-radius: 8px * @ratio;
  .left {
    display: table-cell;
    vertical-align: middle;
    padding-left: 13px * @ratio;
    ._t {
      font-size: 20px * @ratio;
      font-weight: 600;
      color: #333;
    }
    ._mes {
      font-size: 18px * @ratio;
      font-weight: 400;
      color: #999;
      margin-top: 14px * @ratio;
    }
  }
  .right {
    display: table-cell;
    vertical-align: middle;
  }
}
</style>

