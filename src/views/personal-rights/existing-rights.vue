<!--
 * @Description: 已有权益
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-24 12:57:08
-->
<template>
  <div class="page-existing-rights">
    <div>
      <img :src="require('@/assets/imgs/person-rights/banner.png')" class="img-block"/>
    </div>
    <van-cell title="养老金查询" is-link to="pension" class="shadow" />
    <van-cell title="高龄津贴" is-link to="old-age-allowance" class="shadow" />
    <van-cell title="医保消费记录查询" is-link to="medicare" class="shadow" />
    <div class="content">
      <p class="tit">免费体检</p>
      <van-cell title="预约体检" is-link class="background-gary" />
      <van-cell title="健康档案" is-link class="background-gary" />
    </div>
    <div class="content">
      <p class="tit">家庭医生</p>
      <van-cell title="电话问诊" is-link class="background-gary" />
      <van-cell title="在线问诊" is-link class="background-gary" />
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.page-existing-rights {
  padding: 0 16px * @ratio;
  .shadow {
    margin-bottom: 12px * @ratio;
    box-shadow: 0px 2px * @ratio 4px * @ratio 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px * @ratio;
  }
  .content {
    background: #ffffff;
    box-shadow: 0px 2px * @ratio 4px * @ratio 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px * @ratio;
    padding: 0 12px * @ratio 12px * @ratio;
    margin-bottom: 12px * @ratio;
  }
  .background-gary {
    margin-top: 8px * @ratio;
    background: #f6f7f8;
    border-radius: 4px * @ratio;
  }
  .tit {
    font-size: 18px * @ratio;
    font-weight: 500;
    color: #333333;
  }
}
</style>
