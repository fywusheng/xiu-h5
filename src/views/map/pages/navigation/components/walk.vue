<!--
 * @Description: 步行
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-06-20 22:10:16
-->
<template v-show="segment.transit_mode === 'WALK'">
  <div>
    <p class="item">
      <span class="pic">
        <svg-icon icon-class="walk" class="walk" />
      </span>
      <span class="">{{ segment.instruction }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "walk",
  props: {
    segment: {
      type: Object,
      default: () => { }
    }
  },
  filters: {
    distance(val) {
      if (val) {
        return val > 1000 ? (val / 1000).toFixed(2) + "公里" : parseInt(val) + "米"
      }
      return val
    }
  },
  created(){
   console.log("----步行页面")
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 10px * @ratio;
  .pic {
    width: 13px * @ratio;
    margin-left: 10px * @ratio;
    margin-right: 15px * @ratio;
    .walk{
      width: 13px* @ratio;
      height: 4em;
    }
  }
}
</style>