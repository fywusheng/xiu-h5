<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-20 22:11:26
-->
<template v-show="segment.transit_mode === 'SUBWAY'">
  <div>
    <div class="item">
      <div class="left">
        <p class="start"><svg-icon icon-class="subway" class-name="custom" /></p>
        <p class="center"></p>
        <p class="end"></p>
      </div>
      <div class="right">
        <p class="tit">
          {{ segment.transit.on_station.name }}-
          {{ segment.transit.entrance ? segment.transit.entrance.name : ''}}
        </p>
        <p class="lines">
          {{ segment.transit.lines[0].name }}
        </p>
        <p class="next">
          下一站:{{ segment.transit.via_stops.length != 0? segment.transit.via_stops[0].name :'无'}}｜共
          {{ segment.transit.via_num + 1 }}站
        </p>
        <p class="tit" v-if="segment.transit_mode == 'SUBWAY'">
          {{ segment.transit.off_station.name }}-
          {{ segment.transit.exit ? segment.transit.exit.name : "" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "subway",
  props: {
    segment: {
      type: Object,
      default: () => { }
    }
  },
  created(){
   console.log("----地铁页面",this.segment)
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 5px * @ratio;
  .left {
    margin-right: 6px * @ratio;
    .start .custom {
      width: 2em;
      height: 2em;
    }
    .center {
      width: 10px * @ratio;
      height: 100px * @ratio;
      border-radius: 12px * @ratio;
      margin: 0 auto;
      background-color: #b9858a;
    }
    .end {
      width: 16px * @ratio;
      height: 16px * @ratio;
      border-radius: 50%;
      margin: 0 auto;
      border: #b9858a solid 2px * @ratio;
      border-color: darkorange;
    }
  }
  .right {
    .tit {
      font-size: 20px * @ratio;
      font-weight: 500;
      color: #333;
      line-height: 28px * @ratio;
    }
    .lines {
      color: #333;
    }
    .next {
      color: #999;
      line-height: 25px * @ratio;
    }
  }
}
</style>