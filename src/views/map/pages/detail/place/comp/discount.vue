<!--
 * @Description: 折扣
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-05-28 16:45:49
-->
<template>
  <div class="page">
    <p class="title">
      <span class="icon">
        <img :src="require('@/assets/imgs/map/discount@2x.png')" />
      </span>
      <span class="text">打折/立减</span>
    </p>
    <div class="goods-list">
      <dl>
        <dt></dt>
        <dd>
          <p class="name">黑糖珍珠奶茶</p>
          <p class="text">9.3折</p>
          <p>
            <span class="text">￥12</span><del class="text del">￥13</del
            ><span class="btn">抢购</span>
          </p>
        </dd>
      </dl>
      <dl>
        <dt></dt>
        <dd>
          <p class="name">黑糖珍珠奶茶</p>
          <p class="text">9.3折</p>
          <p>
            <span class="text">￥12</span><del class="text del">￥13</del
            ><span class="btn">抢购</span>
          </p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: "discount"
}
</script>

<style lang="less" scoped>
.page {
  padding: 14px * @ratio 15px * @ratio 12px * @ratio;
  border-bottom: solid #f2f2f2 8px * @ratio;
}
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
  .text {
    display: inline-block;
    vertical-align: text-bottom;
    margin-left: 5px;
  }
}
.goods-list {
  display: flex;
  justify-content: space-between;
  dl {
    dt {
      width: 165px * @ratio;
      height: 95px * @ratio;
      background-color: #999;
    }
    dd {
      .name {
        color: #333333;
        font-size: 18px * @ratio;
        line-height: 25px * @ratio;
      }
      .text {
        color: #ff711a;
        font-size: 18px * @ratio;
        line-height: 25px * @ratio;
        &.del {
          color: #999;
          margin-left: 4px * @ratio;
        }
      }
      .btn {
        display: inline-block;
        width: 76px * @ratio;
        height: 25px * @ratio;
        background: linear-gradient(136deg, #ffa98e 0%, #ff1200 100%);
        border-radius: 27px * @ratio;
        font-size: 18px * @ratio;
        color: #ffffff;
        text-align: center;
        margin-left: 13px * @ratio;
      }
    }
  }
}
</style>