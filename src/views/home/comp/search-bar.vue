<!--
 * @Description: 搜索框
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-16 16:57:11
-->
<template>
  <div class="page-search-bar">
    <div class="content">
      <div class="location">
        <div @click="show = true">
          <span class="text">{{ fieldValue }}</span>
          <van-icon class="arrow-down" :name="require('@/assets/svg/home/icon-arrow-down.svg')" />
        </div>
      </div>
      <div>
        <van-search v-model="state.keyword" placeholder="国家老龄服务平台" class="search-bar">
          <template #left-icon>
            <span></span>
          </template>
          <template #right-icon>
            <div class="right-icon">
              <span class="record">|</span>
              <svg-icon icon-class="home-record" class-name="custom-class" />
            </div>
          </template>
        </van-search>
      </div>
      <div @click="toMess" class="email">
        <van-icon class="icon-email" :name="require('@/assets/svg/home/home-notice.svg')" />
        <!-- <svg-icon icon-class="home-notice" class-name="custom-class" /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fieldValue: "北京市",
      state: {
        keyword: ""
      }
    }
  },
  methods: {
    toMess() {},
    onSearch() {}
  }
}
</script>

<style lang="less" scoped>
.page-search-bar {
  width: 100%;
  position: fixed;
  top: 0;
  padding-top: 20px * @ratio;
  padding-bottom: 10px * @ratio;
  background: linear-gradient(180deg, #ff7936 0%, #ff692d 100%);
  z-index: 99;
  .content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .location {
      color: #fff;
      .text {
        font-size: 18px * @ratio;
        font-weight: 500;
      }
      .arrow-down {
        width: 8px * @ratio;
        height: 5px * @ratio;
        margin: 0px * @ratio 8px * @ratio 0px * @ratio 4px * @ratio;
      }
    }
  }
}
.search-bar {
  width: 228px * @ratio;
  height: 36px * @ratio;
  background: #ffffff;
  border-radius: 27px * @ratio;
  overflow: hidden;
}
/deep/ .van-search__content {
  margin-left: -12px * @ratio;
  background-color: #fff;
}
/deep/.van-search .van-field__body input {
  font-size: 18px * @ratio;
  font-weight: 400;
  color: #999999 !important;
}
/deep/.van-search .van-field__body input::-webkit-input-placeholder {
  color: #999999;
  font-size: 18px * @ratio;
}
.record {
  color: #999999;
}
.icon-email {
  position: relative;
  font-size: 25px * @ratio;
  &::after {
    content: "";
    position: absolute;
    top: -2px * @ratio;
    right: -5px * @ratio;
    width: 10px * @ratio;
    height: 10px * @ratio;
    border: 1px * @ratio solid #fff;
    border-radius: 50%;
    background: #FF5000;
  }
}
.right-icon {
  display: flex;
  align-items: center;
}
.custom-class {
  width: 24px * @ratio!important;
  height: 24px * @ratio!important;
  color: #ff5121;
  margin-left: 6px * @ratio;
}
</style>