<!--
 * @Description: 首页-个人权益模块
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-15 23:57:42
-->
<template>
  <div class="personal-rights">
    <van-cell value="更多权益" is-link to="/personal-rights" class="top">
      <template #title>
        <span class="bor"></span>
        <span class="custom-title">个人权益</span>
      </template>
      <template #right-icon>
        <van-icon name="arrow" class="search-icon" />
      </template>
    </van-cell>
    <div class="content">
      <div class="rows">
        <dl @click="jumpPage('/personal-rights/pension')" class="item">
          <dd>
            <svg-icon icon-class="home-pension" class-name="custom-class" />
          </dd>
          <dt class="txt">养老金查询</dt>
        </dl>
        <dl @click="jumpPage('/personal-rights/old-age-allowance')" class="item">
          <dd>
            <svg-icon icon-class="home-allowance" class-name="custom-class" />
          </dd>
          <dt class="txt2">高龄津贴</dt>
        </dl>
      </div>
      <div class="rows">
        <dl @click="jumpPage('/personal-rights/medicare')" class="item">
          <dd>
            <svg-icon icon-class="home-medical" class-name="custom-class" />
          </dd>
          <dt class="txt2">医保查询</dt>
        </dl>
        <dl @click="jumpPage('/personal-rights/policy-description')" class="item">
          <dd>
            <svg-icon icon-class="home-treatment" class-name="custom-class" />
          </dd>
          <dt class="txt2">优待说明</dt>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    jumpPage(path) {
      this.$router.push({ path })
    }
  }
}
</script>

<style lang="less" scoped>
.personal-rights {
  background: #ffffff;
  border-radius: 8px * @ratio;
  padding-bottom: 16px * @ratio;
  .top {
    border-radius: 8px * @ratio;
  }
  .custom-title {
    font-weight: 600;
    color: #333333;
  }
  .bor {
    height: 85%;
    vertical-align: middle;
    display: inline-block;
    margin-right: 3px * @ratio;
    border-left: 5px * @ratio solid #ff5121;
    border-radius: 5px * @ratio;
  }
  .search-icon {
    color: #999;
    font-size: 20px * @ratio!important;
    line-height: inherit;
  }
  .content .rows {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 14px * @ratio;
    .item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 155px * @ratio;
      height: 68px * @ratio;
      background: #fafafa;
      border-radius: 8px * @ratio;
      padding-right: 8px * @ratio;
      .txt {
        white-space: nowrap;
        text-indent: -25px * @ratio;
      }
      .txt2 {
        white-space: nowrap;
        text-indent: -15px * @ratio;
      }
    }
    .custom-class {
      font-size: 80px * @ratio;
    }
  }
}
/deep/ .van-cell::after {
  border-bottom: none;
}
</style>