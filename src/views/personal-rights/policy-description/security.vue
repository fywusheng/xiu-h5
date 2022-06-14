<!--
 * @Description: 养老保障
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-25 23:50:08
-->
<template>
  <div>
    <div>
      <img
        :src="require('@/assets/imgs/person-rights/policy02.png')"
        class="img-block"
      />
    </div>
    <p class="tit">60-64周岁及以上保障和福利待遇</p>
    <p
      v-for="(item, index) in state['60-64周岁及以上保障和福利待遇']"
      :key="index"
      class="text"
    >
      <span class="qure">·</span>{{ item }}
    </p>
  </div>
</template>

<script>
import { rightsApi } from "@/api"
export default {
  data() {
    return {
      state: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await rightsApi.getIndividualRights()
      this.state = data.preTreatPoliDesc["北京市"].oldAgeSecurity
    }
  }
}
</script>

<style lang="less" scoped>
.tit {
  font-size: 20px * @ratio;
  font-weight: 500;
  color: #ff711a;
  line-height: 30px * @ratio;
  margin-top: 20px * @ratio;
  margin-bottom: 20px * @ratio;
}
.text {
  font-size: 18px * @ratio;
  color: #333333;
  line-height: 30px * @ratio;
}
.qure {
  font-size: 30px * @ratio;
  line-height: 30px * @ratio;
}
</style>
