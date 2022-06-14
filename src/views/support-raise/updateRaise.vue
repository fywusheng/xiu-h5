<!--
 * @Description: 编辑抚养关系
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-19 00:59:13
-->
<template>
  <div> <raise :supportId="supportId" /></div>
</template>

<script>
import raise from "./comp/raise"
export default {
  components: {
    raise
  },
  created() {
    this.supportId = this.$route.params && this.$route.params.supportId
  }
}
</script>

<style lang="less" scoped>
</style>