<!--
 * @Description: 距离和地址
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-28 14:53:21
-->
<template>
  <div class="distance">
    <p class="text">
      <span v-if="distance">{{ distance | distance }}</span>
      <span v-if="distance"> | </span>
      <span>{{ addr }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "addr-distance",
  props: {
    distance: {
      type: Number,
      default: 0
    },
    addr: {
      type: String,
      default: ""
    }
  }, filters: {
    distance(val) {
      if (val) {
        return val > 1000 ? (val / 1000).toFixed(2) + "公里" : val.toFixed(2) + "米"
      } else {
        return "-"
      }
    }
  }
}
</script>

<style lang="less" scoped>
.distance {
  margin-bottom: 10px * @ratio;
  .text {
    display: flex;
    align-items: center;
    font-size: 18px * @ratio;
    color: #333;
    span {
      margin-right: 5px * @ratio;
    }
  }
}
</style>