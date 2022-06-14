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
      <div class="text">医院药学工作是医院工作的重要组成部分，药剂科工作水平的高低，药品质量的好坏，直接关系患者的安危。长期以来，药剂科认真贯彻执行《药品管理法》、《处方管理办法》等法律、法规，科学地管理全院药品，为医疗临床需要及时准确地调配处方；科学、经济地采购和供应质量合格的药品，确保临床用药的安全、有效、经济、合理。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F1/wKgupGHlMzCAc1tfAAdbaNc_n-s699.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">除日常医疗工作外，药剂科还结合临床，积极开展临床药学科研。科室曾承担并完成卫生部科研基金资助课题1项；作为负责单位研制西药四类新药，获国家新药证书1个；通过科研实践，在全国公开刊物发表论文30余篇，参编著作2部。</div>
	  <div class="text">药剂科现有专业技术人员17人，包括副主任药师2人，主管药师1人，药师8人，药士3人，其他技术人员3人；其中硕士2人，在读研究生3人，本科6人。</div>
	  <div class="text">全科同仁在日常工作中，坚持以病人为中心，秉持“专业、服务”的理念，为患者提供优质、高效、安全便捷的医疗服务。</div>
	 
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

