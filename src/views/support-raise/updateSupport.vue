<!--
 * @Description: 编辑赡养关系
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-19 00:57:22
-->
<template>
  <div>
    <support :support-id="supportId" />
  </div>
</template>

<script>
import support from "./comp/support"
export default {
  components: {
    support
  },
  created() {
    this.supportId = this.$route.params && this.$route.params.supportId
  }
}
</script>

<style lang="less" scoped>
</style>