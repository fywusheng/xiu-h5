<!--
 * @Description: 
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-25 12:51:00
-->
<template>
  <div class="page-medicare-item">
    <div>
      <p>
        <span class="name">{{ item.name }}</span
        ><span class="tag">{{ item.type }}</span>
      </p>
      <p class="date">{{ item.date }}</p>
    </div>
    <p class="summary">
      <span class="label">总费用</span
      ><span class="value">{{ item.totalFee }} 元</span>
    </p>
    <div class="detail">
      <p>
        <span class="label">现金支付</span>
        <span class="value">{{ item.cashPayment }} 元</span>
      </p>
      <p>
        <span class="label">基金支付</span>
        <span class="value">{{ item.fundPay }} 元</span>
      </p>
      <p>
        <span class="label">个账支付</span>
        <span class="value">{{ item.billPayment }} 元</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      item: {}
    }
  },
  watch: {
    state: {
      handler(newValue) {
        console.log("newValue", newValue)
        this.item = newValue
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.page-medicare-item {
  margin-top: 12px * @ratio;
  padding-top: 12px * @ratio;
  .name {
    display: inline-block;
    width: 265px * @ratio;
    font-size: 20px * @ratio;
    font-weight: 500;
    color: #333333;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .tag {
    display: inline-block;
    width: 40px * @ratio;
    height: 22px * @ratio;
    background: #ff5500;
    border-radius: 4px * @ratio;
    text-align: center;
    color: #fff;
  }
  .date {
    font-size: 18px * @ratio;
    font-weight: 400;
    color: #666666;
    line-height: 25px * @ratio;
  }
  .summary {
    padding: 16px * @ratio 0;
    border-top: 1px * @ratio solid #e5e5e5;
    border-bottom: 1px * @ratio solid #e5e5e5;
    .label {
      font-size: 20px * @ratio;
      font-weight: 400;
      color: #333333;
    }
    .value {
      font-size: 20px * @ratio;
      font-weight: 500;
      color: #ff5000;
      float: right;
    }
  }
  .detail {
    padding-top: 16px * @ratio;
    .label {
      font-size: 18px * @ratio;
      font-weight: 400;
      color: #333333;
    }
    .value {
      font-size: 18px * @ratio;
      font-weight: 400;
      color: #ff5000;
      float: right;
    }
  }
}
</style>