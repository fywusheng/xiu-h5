<!--
 * @Description: 首页导航
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-18 12:12:12
-->
<template>
  <div class="page-nav">
    <p @click="$router.push('/')" :class="select == '1'? 'active':''">首页</p>
    <p class="voice">
      <img :src="require('@/assets/imgs/common/home-voice.png')" />
    </p>
    <p @click="$router.push('/user-center')" :class="select == '2'? 'active':''">我的</p>
  </div>
</template>

<script>
export default {
  props: {
    select: {
      type: String
    }
  },
  data() {
    return {
      state: {}
    }
  }
}
</script>

<style lang="less" scoped>
.page-nav {
  width: 100%;
  height: 84px * @ratio;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  box-shadow: 0px 1px * @ratio 0px 0px #d9dee8;
  p {
    font-size: 20px * @ratio;
    font-weight: 500;
    color: #606266;
    cursor: pointer;
    &.active {
      color: #ff5500;
      border-bottom: #ff5500 solid 3px * @ratio;
      border-radius: 2px * @ratio;
    }
    &.voice {
      margin-top: -30px * @ratio;
      img {
        width: 84px * @ratio;
        height: 84px * @ratio;
        display: block;
      }
    }
  }
}
</style>