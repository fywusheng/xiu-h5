<!--
 * @Description: 公共交通信息详情
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-09 17:28:52
-->
<template>
  <div :class="!state.show?'active':''" class="page-transferDetail">
    <div class="list">
      <p @click="handleShow"  class="arrow"><van-icon :name="state.show?'arrow-down':'arrow-up'" /></p>
      <van-swipe @change="onChange">
        <van-swipe-item v-for="(item, index) in state.plans" :key="index">
          <div class="self-swipe-item">
            <p class="_way">{{bus_subway(item)}}</p>
            <p class="summary">17分钟｜步行504米</p>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="_split"></div>
    </div>
    <div class="detail">
      <p><span class="start"></span></p>
      <p v-for="(item, index) in state.segments" :key="index">
        <component :is="item.transit_mode" :segment="item"></component>
      </p>
      <p><span class="end"></span></p>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "@ylz/vant"
import BUS from "./bus"
import SUBWAY from "./subway"
import WALK from "./walk"
export default {
  name: "transferDetail",
  components: {
    BUS,
    SUBWAY,
    WALK,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  props: {
    plans: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      state: {
        show: true,
        curIndex: 0,
        plans: [],
        segments: []
      }
    }
  },
  watch: {
    plans(newVal) {
      this.state.curIndex = newVal.index
      this.state.plans = newVal.list  //newPlans
      this.state.segments = newVal.list[newVal.index].segments
    }
  },
  methods: {
     bus_subway(item){
      const segments = item['segments'] || []
      const pathWay = segments.reduce((pre,cur,index,array)=>{
       if(cur['transit_mode'] === "SUBWAY" || cur['transit_mode'] === "BUS") {
         const transit = cur['transit'] || {}
         const lines = transit['lines'] || []
         const first = lines[0] || {}
         pre.push(first['name'])
       }
       return pre;
      },[])
      return pathWay.join('→')
    },
    onChange(index) {
      this.$nextTick(() => {
        this.state.segments = this.state.plans[index].segments
      })
    },
    handleShow() {
      this.state.show = !this.state.show
    }
  }
}
</script>

<style lang="less" scoped>
.page-transferDetail {
  padding:4px * @ratio 17px * @ratio 17px * @ratio 17px * @ratio;
  background: #fff;
  box-shadow: 0px 0px 10px * @ratio 0px rgba(204, 200, 197, 0.27);
  bottom: 0;
  transition: all 0.5s;
  &.active{
    bottom: -50%;
  }
  .arrow {
    text-align: center;
    font-size: 20px * @ratio;
  }
  .self-swipe-item {
    height: 90px * @ratio;
    text-align: center;
    ._way{
      text-align:left;
      height: 45px * @ratio;
      overflow: auto;
    }
    .start,
    .end {
      color: #333;
      font-size: 20px * @ratio;
      line-height: 28px * @ratio;
    }
    .summary {
      font-size: 18px * @ratio;
      line-height: 25px * @ratio;
      color: #999;
      text-align: left;
      font-size: 14px * @ratio;
    }
  }
  .detail {
    height: 72%;
    overflow: auto;
    padding-top:21px * @ratio;
    .start {
      width: 20px * @ratio;
      height: 20px * @ratio;
      border: 2px * @ratio solid #12b362;
      border-radius: 50%;
      display: inline-block;
      margin-bottom: 10px * @ratio;
      margin-left: 7px * @ratio;
    }
    .end {
      width: 20px * @ratio;
      height: 20px * @ratio;
      border: 2px * @ratio solid #f54743;
      border-radius: 50%;
      display: inline-block;
      margin-left: 7px * @ratio;
    }
  }
  .list{
    ._split{
     position:absolute;
     top: 114px * @ratio;
     width: 100%;
     left: 0;
     height:8px * @ratio;
     width:100%;
     background-color:#F2F2F2;
   }
  }
  
}
</style>