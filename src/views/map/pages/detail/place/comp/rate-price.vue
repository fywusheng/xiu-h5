<!--
 * @Description: 评分价格
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-28 14:39:14
-->
<template>
  <div class="rate">
    <van-rate
      v-model="scoreNum"
      allow-half
      gutter="2px"
      color="#FF9A00"
      void-icon="star"
      void-color="#eee"
    />
    <span class="text">{{ score }}</span>
    <span class="average-price">人均：{{ price }}</span>
  </div>
</template>

<script>
import { Rate } from "@ylz/vant"
export default {
  name: "ratePrice",
  components: {
    [Rate.name]: Rate
  },
  props: {
    score: {
      type: String
    },
    price: {
      type: String,
      default: "0元/人"
    }
  },
  data() {
    return {
      scoreNum: 0
    }
  },
  watch: {
    score: {
      handler(newValue) {
        const num = parseFloat(newValue)
        this.scoreNum = Number(num.toFixed(1))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.rate {
  display: flex;
  align-items: center;
  margin-bottom: 12px * @ratio;
  /deep/.van-rate {
    .van-rate__icon {
      font-size: 25px * @ratio;
    }
  }
  .text {
    font-size: 18px * @ratio;
    line-height: 25px * @ratio;
    color: #333;
    margin-left: 9px * @ratio;
  }
  .average-price {
    font-size: 18px * @ratio;
    line-height: 25px * @ratio;
    color: #333;
    margin-left: 12px * @ratio;
  }
}
</style>