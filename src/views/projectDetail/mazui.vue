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
      <div class="text">华西附四院麻醉科成立于2009年。前身从属于华西四院外科，由成都市三医院主任医师马性觉指导工作。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F0/wKgupGHlGwaAd77FAAt6Gu2v9mk402.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">在院领导的关怀下，科室不断壮大，成员现有3人，主治2人，住院医师1人。科室主任雷晓虹，主治医师。2004年毕业于四川大学华西医科大学，毕业后参加华西医院住院医师培训，顺利完成五年培训，并取得相关资质及硕士学位。培训结束后在华西医院从事麻醉工作，期间曾于2011年至德国进修一年。在国内医学刊物上发表论文多篇。熟练掌握各种麻醉技术及方法，尤其擅长全麻及椎管内麻醉，对无痛胃肠镜检查及多种手术麻醉治疗有丰富经验。现我科有手术室4间，肺灌洗室1间，眼科手术室1间，耳鼻喉科手术室1间，具备术后复苏室。开展无痛胃镜等检查项目。我科承担了肺灌洗、普外科、妇科、泌尿外科、耳鼻喉科、眼科和胃镜室等科室临床手术、检查的麻醉工作。在双腔支气管内麻醉、老年病人麻醉以及围手术期监测与治疗、围手术期镇痛等方面形成了自己的特色。</div>
	  
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

