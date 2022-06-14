<!--
 * @Description: 敬老优待
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-25 23:44:49
-->
<template>
  <div>
    <div>
      <img :src="require('@/assets/imgs/person-rights/policy01.png')" class="img-block" />
    </div>
    <p class="tit">60-64周岁及以上保障和福利待遇</p>
    <p v-for="(item, index) in state['60-64周岁及以上保障和福利待遇']" :key="index + '1'" class="text">
      <span class="qure">·</span>{{ item }}
    </p>
    <p class="tit">65-79岁新增敬老优待政策</p>
    <p v-for="(item, index) in state['65-79岁新增敬老优待政策']" :key="index + '2'" class="text">
      <span class="qure">·</span>{{ item }}
    </p>
    <p class="tit">90-94周岁新增敬老优待政策</p>
    <p v-for="(item, index) in state['90-94周岁新增敬老优待政策']" :key="index + '3'" class="text">
      <span class="qure">·</span>{{ item }}
    </p>
    <p class="tit">100周岁新增敬老优待政策</p>
    <p v-for="(item, index) in state['100周岁新增敬老优待政策']" :key="index + '4'" class="text">
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
      this.state = data.preTreatPoliDesc["北京市"].respectPreferentialTreatment
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
