<!--
 * @Description: 优惠券
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-28 16:45:49
-->
<template>
  <div>
    <van-cell value="更多" is-link class="title">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="icon">
          <img :src="require('@/assets/imgs/map/coupon@2x.png')" />
        </span>
        <span class="custom-title">优惠券</span>
      </template>
    </van-cell>
    <ul class="coupon-list">
      <li class="coupon-item type-coupon">
        <p class="price">100元</p>
        <p class="requirement">满1000元可用</p>
        <p class="time">有效期2021.3.5-2021.3.10</p>
        <p class="btn active">已领取</p>
      </li>
      <li class="coupon-item type-discount">
        <p class="price">100元</p>
        <p class="requirement">满1000元可用</p>
        <p class="time">有效期2021.3.5-2021.3.10</p>
        <p class="btn">立即领取</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "coupon",
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 20px * @ratio;
  color: #333;
  line-height: 28px * @ratio;
  .icon {
    width: 30px * @ratio;
    height: 32px * @ratio;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .custom-title {
    display: inline-block;
    vertical-align: text-bottom;
    margin-left: 5px;
  }
  /deep/ .van-cell::after {
    border: none;
  }
}
.coupon-list {
  margin-bottom: 10px * @ratio;
  .coupon-item {
    width: 100%;
    height: 171px * @ratio;
    position: relative;
    .price {
      position: absolute;
      top: 57px * @ratio;
      left: 18px * @ratio;
      font-size: 30px * @ratio;
      line-height: 42px * @ratio;
      color: #fff;
    }
    .requirement {
      position: absolute;
      left: 105px * @ratio;
      top: 70px * @ratio;
      font-size: 18px * @ratio;
      line-height: 25px * @ratio;
      color: #fff;
    }
    .time {
      position: absolute;
      left: 24px * @ratio;
      bottom: 18px * @ratio;
      color: #999;
      font-size: 18px * @ratio;
      line-height: 25px * @ratio;
    }
    .btn {
      width: 91px * @ratio;
      height: 30px * @ratio;
      line-height: 30px * @ratio;
      border-radius: 20px * @ratio;
      border: 1px * @ratio solid #ff5500;
      text-align: center;
      position: absolute;
      right: 24px * @ratio;
      bottom: 18px * @ratio;
      color: #ff5500;
      &.active {
        color: #999;
        border: 1px * @ratio solid #999999;
      }
    }
    &.type-coupon {
      background: url("~@/assets/imgs/map/bg-coupon@2x.png") no-repeat center
        center;
      background-size: contain;
    }
    &.type-discount {
      background: url("~@/assets/imgs/map/bg-discount@2x.png") no-repeat center
        center;
      background-size: contain;
    }
  }
}
</style>