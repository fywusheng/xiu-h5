<!--
 * @Description: 底部导航
 * @Version: 0.1
 * @Author: Chendh
 * @Date: 2021-04-19 17:00:47
-->
<template>
  <div class="navbar" v-show="navList1.length > 0">
    <van-grid  :column-num="5" :border="false">
      <van-grid-item v-for="(item, index) in navList1" :key="index" :class="item.focus ? 'focusStyle' : ''" :icon="item.focus ? item.iconActive : item.icon" :text="item.text" @click="getMarkers(item, index)" />
    </van-grid>
  </div>
</template>
<script>
import Markers from "../../controller/markers"
import { mapApi } from "@/api"
import localStorage from '@/utils/local-storage';
export default {
  data() {
    return {
      listMap:{
       "助餐点":{
          icon: require("@/assets/svg/map/icon-help-meal.svg"),
          iconActive: require("@/assets/svg/map/icon-help-meal-active.svg"),
          text: "助餐点",
          typeId: 0,
          type: "helpfoodMarker",
          disable: false,
          focus: false
       },
       "日间照料":{
          icon: require("@/assets/svg/map/icon-look-after.svg"),
          iconActive: require("@/assets/svg/map/icon-look-after-active.svg"),
          text: "日间照料",
          typeId: 1,
          type: "dayfoodMarker",
          disable: false,
          focus: false
       },
       "商超":{
          icon: require("@/assets/svg/map/icon-store.svg"),
          iconActive: require("@/assets/svg/map/icon-store-active.svg"),
          text: "商超",
          typeId: 2,
          type: "shopMarker",
          disable: false,
          focus: false
       },
       "美食":{
          icon: require("@/assets/svg/map/icon-deliciousFood.svg"),
          iconActive: require("@/assets/svg/map/icon-deliciousFood-active.svg"),
          text: "美食",
          typeId: 3,
          type: "deliciousFoodMarker",
          disable: false,
          focus: false
       },
       "景点":{
          icon: require("@/assets/svg/map/icon-scenic.svg"),
          iconActive: require("@/assets/svg/map/icon-scenic-active.svg"),
          text: "景点",
          typeId: 4,
          type: "scenicMarker",
          disable: false,
          focus: false
       },
       "医院":{
          icon: require("@/assets/svg/map/icon-hospital.svg"),
          iconActive: require("@/assets/svg/map/icon-hospital-active.svg"),
          text: "医院",
          typeId: 5,
          type: "hospitalMarker",
          disable: false,
          focus: false
       },
       "药店":{
          icon: require("@/assets/svg/map/icon-pharmacy.svg"),
          iconActive: require("@/assets/svg/map/icon-pharmacy-active.svg"),
          text: "药店",
          typeId: 6,
          type: "pharmacyMarker",
          disable: false,
          focus: false 
       },
      "住宿":{
           icon: require("@/assets/svg/map/icon-hotel.svg"),
           iconActive: require("@/assets/svg/map/icon-hotel-active.svg"),
           text: "住宿",
           typeId: 7,
           type: "stayMarker",
           disable: false,
           focus: false
       },
      "政务服务":{
          icon: require("@/assets/svg/map/icon-government.svg"),
          iconActive: require("@/assets/svg/map/icon-government-active.svg"),
          text: "家政服务",
          typeId: 8,
          type: "homeMarker",
          disable: false,
          focus: false
       },
      "养老院":{
          icon: require("@/assets/svg/map/icon-nursing-home.svg"),
          iconActive: require("@/assets/svg/map/icon-nursing-home-active.svg"),
          text: "养老院",
          typeId: 9,
          type: "agedMarker",
          disable: false,
          focus: false
       }
      },
      navList1:[],
      navList: [
        {
          icon: require("@/assets/svg/map/icon-all.svg"),
          iconActive: require("@/assets/svg/map/icon-all-active.svg"),
          text: "全部",
          typeId: "",
          type: "allMarker",
          disable: false,
          focus: true
        },
        {
          icon: require("@/assets/svg/map/icon-help-meal.svg"),
          iconActive: require("@/assets/svg/map/icon-help-meal-active.svg"),
          text: "助餐点",
          typeId: 0,
          type: "helpfoodMarker",
          disable: false,
          focus: false
        },
        {
          icon: require("@/assets/svg/map/icon-look-after.svg"),
          iconActive: require("@/assets/svg/map/icon-look-after-active.svg"),
          text: "日间照料",
          typeId: 1,
          type: "dayfoodMarker",
          disable: false,
          focus: false
        },
        {
          icon: require("@/assets/svg/map/icon-store.svg"),
          iconActive: require("@/assets/svg/map/icon-store-active.svg"),
          text: "商超",
          typeId: 2,
          type: "shopMarker",
          disable: false,
          focus: false
        },
        {
          icon: require("@/assets/svg/map/icon-deliciousFood.svg"),
          iconActive: require("@/assets/svg/map/icon-deliciousFood-active.svg"),
          text: "美食",
          typeId: 3,
          type: "deliciousFoodMarker",
          disable: false,
          focus: false
        },
        {
          icon: require("@/assets/svg/map/icon-scenic.svg"),
          iconActive: require("@/assets/svg/map/icon-scenic-active.svg"),
          text: "景点",
          typeId: 4,
          type: "scenicMarker",
          disable: false,
          focus: false
        },
        {
          icon: require("@/assets/svg/map/icon-hospital.svg"),
          iconActive: require("@/assets/svg/map/icon-hospital-active.svg"),
          text: "医院",
          typeId: 5,
          type: "hospitalMarker",
          disable: false,
          focus: false
        },
        {
          icon: require("@/assets/svg/map/icon-pharmacy.svg"),
          iconActive: require("@/assets/svg/map/icon-pharmacy-active.svg"),
          text: "药店",
          typeId: 6,
          type: "pharmacyMarker",
          disable: false,
          focus: false
        },
        {
          icon: require("@/assets/svg/map/icon-hotel.svg"),
          iconActive: require("@/assets/svg/map/icon-hotel-active.svg"),
          text: "住宿",
          typeId: 7,
          type: "stayMarker",
          disable: false,
          focus: false
        },
          {
          icon: require("@/assets/svg/map/icon-government.svg"),
          iconActive: require("@/assets/svg/map/icon-government-active.svg"),
          text: "家政服务",
          typeId: 8,
          type: "homeMarker",
          disable: false,
          focus: false
        },
        {
          icon: require("@/assets/svg/map/icon-nursing-home.svg"),
          iconActive: require("@/assets/svg/map/icon-nursing-home-active.svg"),
          text: "养老院",
          typeId: 9,
          type: "agedMarker",
          disable: false,
          focus: false
        }
      ]
    }
  },
  created(){
    this.getOfficeTypes();
  },
  methods: {
    //获取类型的值
    async getOfficeTypes(){
    const curPos = localStorage.getItem('curPos')  
    console.log("===当前位置城市",curPos)
    const {data: ret} = await mapApi.getOfficeTypes({
        areaCode: curPos.city
       },{
         authorization: "ec_token"
       });
      if(ret.length == 0) return
      ret.forEach((currentV,index,array)=>{
        if(this.listMap[currentV['serviceName']]){
          this.navList1.push(this.listMap[currentV['serviceName']])
        }
      })
      this.navList1.unshift({
          icon: require("@/assets/svg/map/icon-all.svg"),
          iconActive: require("@/assets/svg/map/icon-all-active.svg"),
          text: "全部",
          typeId: "",
          type: "allMarker",
          disable: false,
          focus: true
        })
       console.log("===分类重新组装的值---",this.navList1,this.navList1.length)
    },
    async getMarkers(item, index) {
      this.$store.dispatch("map/setClassification", item)
      this.navList1.forEach(item => {
        item.focus = false
      })
      this.navList1[index].focus = true
      const fn = this.$parent.$refs.amap.onClickMarker
      const marks = new Markers()
      const ret = await marks[item.type](fn, item.typeId)
      if (ret.length === 0) {
        this.$toast("该区域无结果，换个位置试试吧")
      }
      this.$emit("setMarkers", ret)
    }
  }
}
</script>
<style lang="less" scoped>
.navbar {
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #fff;
  padding: 20px * @ratio 16px * @ratio;
  border-radius: 12px * @ratio;
  z-index: 999;
  box-shadow: 0px -2px * @ratio 10px * @ratio 0px * @ratio rgba(0, 0, 0, 0.1);
  /deep/ .van-grid{
    flex-wrap: nowrap;
    height: 70px * @ratio;
    overflow-x: auto;
  }
  /deep/ .van-grid-item{
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    white-space: nowrap;
  }
  /deep/ .van-grid .van-grid-item__content--center {
    background: #fff;
    padding: 0;
  }
  /deep/ .van-grid-item__text {
    font-size: 20px * @ratio;
    color: #999999;
  }
  .focusStyle{
      /deep/ .van-grid-item__text {
        font-weight: bold;
        color: #333;
     }
  }
}
.popup {
  height: 180px * @ratio;
  border-radius: 12px * @ratio;
}
</style>