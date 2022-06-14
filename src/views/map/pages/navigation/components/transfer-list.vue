<!--
 * @Description: 公共交通列表
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-26 20:57:49
-->
<template>
  <div>
    <ul class="page-transferList">
      <li v-for="(item, index) in state.newPlans" :key="index" class="item">
        <div>
          <div class="top">
            <span v-if="item.leastTime" class="label">时间最短</span>
            <span v-if="item.leastSegment" class="label">换乘最少</span>
            <span v-if="item.leastWalking" class="label">步行最少</span>
          </div>
          <div class="mid" @click="drawPath(index)">
            <!-- {{ item.segments[0].instruction }}
            <van-icon name="play" class="icon-play" />
            {{ item.segments[item.segments.length - 1].instruction }} -->
            {{bus_subway(item)}}
          </div>
          <div class="bottom">
            {{ parseInt(item.time / 60) }}分钟 | 步行
            {{ item.walking_distance | distance }}
          </div>
        </div>
        <div>
          <van-icon name="arrow" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "transferList",
  props: {
    plans: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      state: {
        originalPlans: [],
        newPlans: [],
        time: 0,
        segments: 0
      }
    }
  },
  watch: {
    plans: {
      handler(newValue,oldvalue) {
        this.state.newPlans = []
        console.log("=====水分---",this.state.originalPlans)
        if (newValue.length > 0) {
          this.state.originalPlans = newValue
          
          console.log("====拿到新的公交传入的值1---", newValue , oldvalue)
          this.sorting()
          console.log("====进行处理后的值2---", this.state.newPlans)
        }
      },
      immediate: true
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
    drawPath(index) {
      console.log("===点击了这一行---",index)
      this.$emit("drawPath", { list: this.state.newPlans, index: index })
    },
    sorting() {
      const { timeIndex, leastTime } = this.sortTime()
      const { segmentsIndex, leastSegment } = this.sortSegments()
      const { walkIndex, leastWalking } = this.sortWalking()
      const tempArr = [timeIndex]
      this.state.originalPlans[timeIndex].leastTime = leastTime
      this.state.originalPlans[segmentsIndex].leastSegment = leastSegment
      this.state.originalPlans[walkIndex].leastWalking = leastWalking
      if (!tempArr.includes(segmentsIndex)) {
        tempArr.push(segmentsIndex)
      }
      if (!tempArr.includes(walkIndex)) {
        tempArr.push(walkIndex)
      }
      tempArr.forEach(item => {
        this.state.newPlans.push(this.state.originalPlans[item])
      })
      this.state.originalPlans.forEach((item, index) => {
        if (!tempArr.includes(index)) {
          this.state.newPlans.push(item)
        }
      })
    },
    sortTime() {
      const tempTime = []
      let leastTime = 0, tempIndex = 0
      this.state.originalPlans.forEach((item, index) => {
        tempTime.push(item.time)
        if (index === this.state.originalPlans.length - 1) {
          leastTime = Math.min.apply(this, tempTime)
          tempIndex = tempTime.indexOf(leastTime)
        }
      })
      return { leastTime, timeIndex: tempIndex }
    },
    sortSegments() {
      const tempSegments = []
      let leastSegment = 0, tempIndex = 0
      this.state.originalPlans.forEach((item, index) => {
        tempSegments.push(item.segments.length)
        if (index === this.state.originalPlans.length - 1) {
          leastSegment = Math.min.apply(this, tempSegments)
          tempIndex = tempSegments.indexOf(leastSegment)
        }
      })
      return { leastSegment, segmentsIndex: tempIndex }
    },
    sortWalking() {
      const tempWalk = []
      let leastWalking = 0, tempIndex = 0
      this.state.originalPlans.forEach((item, index) => {
        tempWalk.push(item.walking_distance)
        if (index === this.state.originalPlans.length - 1) {
          leastWalking = Math.min.apply(this, tempWalk)
          tempIndex = tempWalk.indexOf(leastWalking)
        }
      })
      return { leastWalking, walkIndex: tempIndex }
    }
  },
  filters: {
    distance(val) {
      if (val) {
        return val > 1000 ? (val / 1000).toFixed(2) + "公里" : val + "米"
      }
      return val
    }
  }
}
</script>

<style lang="less" scoped>
.page-transferList {
  height: 100%;
  padding-top: 10px * @ratio;
  padding-bottom: 25px * @ratio;
  background: #f2f2f2;
  overflow: auto;
  .item {
    width: 96%;
    height: auto;
    padding: 12px * @ratio 12px * @ratio 0px * @ratio 12px * @ratio;
    margin: 0 auto;
    margin-bottom: 10px * @ratio;
    background: #ffffff;
    border-radius: 4px * @ratio;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px * @ratio;
    .top {
      .label {
        font-size: 18px * @ratio;
        padding: 4px * @ratio;
        border-radius: 2px * @ratio;
        color: #12b362;
        border: 1px * @ratio solid #12b362;
        margin-right: 10px * @ratio;
      }
    }
    .mid {
      font-size: 20px * @ratio;
      line-height: 28px * @ratio;
      color: #333333;
      margin-top: 14px * @ratio;
      .icon-play {
        font-size: 12px * @ratio;
        color: #999;
      }
    }
    .bottom {
      margin-top: 10px * @ratio;
      font-size: 18px * @ratio;
      line-height: 25px * @ratio;
      color: #999999;
    }
  }
}
</style>