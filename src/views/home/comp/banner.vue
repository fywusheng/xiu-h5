<!--
 * @Description: 首页-banner
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-16 00:45:57
-->
<template>
  <div>
    <van-swipe class="swipe-self" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img :src="require('@/assets/imgs/common/banner.png')" class="img"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "@ylz/vant"
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  }
}
</script>

<style lang="less" scoped>
.swipe-self {
  height: 90px * @ratio;
  margin: 12px * @ratio 0;
  .img{
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>