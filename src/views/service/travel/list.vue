<!--
 * @Description: 出行旅行列表
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-27 10:32:09
-->
<template>
  <div>
    <list :first-class="state.firstClass" />
  </div>
</template>

<script>
import list from "../comp/list"
export default {
  components: {
    list
  },
  data() {
    return {
      state: {
        firstClass: ""
      }
    }
  },
  created() {
    this.state.firstClass = this.$route.query && this.$route.query.classId
  }
}
</script>

<style lang="less" scoped>
</style>