<!--
 * @Description: 入口页面
 * @Version: 1.0.0
 * @Author: Chenyt
 * @Date: 2020-04-19 17:00:47
-->
<template>
  <div id="app">
    <!-- 页面切换容器 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      loadingStatus: true //加载展示
    }
  },
  mounted() { },
  created() {
    const accessToken = this.$route.query.token || localStorage.getItem("token")
    // if (!accessToken) {
    //   return this.$dialog
    //     .alert({
    //       message: "无token信息"
    //     })
    //     .then(() => {
    //       this.$router.go(-1)
    //     })
    // }
    localStorage.setItem("token", accessToken)
    this.$store.dispatch("getCity")
    this.$store.dispatch("getHomeCity")
  },
  methods: {}
}
</script>

<style lang="less">
#app {
  background: #fff;
  height: 100%;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
