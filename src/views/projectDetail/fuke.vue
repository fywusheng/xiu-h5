<!--
 * @Description: 优惠说明首页
 * @Autor: shn
 * @Date: 2021-08-30 13:42:12
 * @LastEditors: shn
 * @LastEditTime: 2021-09-13 16:12:30
-->
<template>
  <div class="page">
    <div class="note-page">
      <div class="text">我院妇科门诊创建于1994年，为妇科常见病、多发病的诊治累积了丰富经验。近年，诊疗也涉及生殖内分泌相关问题，包括月经紊乱、异常子宫出血、孕前、不孕、早孕、围绝经期与绝经后管理等等。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F1/wKgupGHlTyyAQ5KYABONpYoFQO8265.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">重视妇科体检，以临床的眼光开展体检工作，将实实在在的科普贯穿于日常体检中，极大地优化体检后咨询和临床处置的流程，以期早发现、早诊断、早治疗，为患者恢复健康争取宝贵的时间与机会。</div>
	 
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.page {
 background: #fff;
   
  .note-page {
    display: flex;
    flex-direction: column;
    padding: 15px * @ratio 12px * @ratio;
    background: #fff;
    border-radius: 8px * @ratio;
    .text,
    .text2 {
      font-size: 18px * @ratio;
      font-weight: 400;
      color: #333333;
      line-height: 30px * @ratio;
      text-indent: 2em;
    }
    .text2 {
      text-indent: 0;
    }
    .title {
      font-size: 18px * @ratio;
      font-weight: 600;
      color: #333333;
      line-height: 30px * @ratio;
    }
    .instructions {
      font-size: 16px * @ratio;
      font-weight: 400;
      color: #666666;
      line-height: 30px * @ratio;
    }
  }
}
</style>

