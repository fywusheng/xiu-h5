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
      <div class="text">四川大学华西第四医院睡眠中心/耳鼻喉科，是集医疗、教学、科研为一体迅速发展壮大的临床科室,同时是“四川省医学会睡眠医学专委会主任委员单位”。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F0/wKgupGHlHVWAdNIZAAOTNqU3Tr4711.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">睡眠中心成立于2002年，作为推动睡眠医学发展的成功案例，得到中华医学会四川省睡眠大会的充分肯定和推广，长期以来深受广大市民的信赖。经省卫计委批准，2013年正式冠名为“四川省睡眠呼吸疾病诊治中心”，以下简称“中心”。中心设有睡眠医学专科门诊，拥有一支含一级专家、硕士、博士等人才的专业技术团队，长期保持与国内外睡眠专家进行学术交流及合作，致力于提高我省睡眠障碍疾病的研究和诊疗水平。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F0/wKgupGHlHY2AFfPeABH6ZXGEOxk997.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">中心创始人张晓晴教授作为中华医学会四川省睡眠医学专业委员会主任委员、四川省卫健委学术技术带头人、四川大学华西第四医院睡眠中心、耳鼻咽喉科主任及“四川省睡眠呼吸疾病诊治中心”主任、中美合作鼾症微创治疗中心主任，于2001年在西南地区率先引进等离子低温消融手术系统、ellman射频电波刀和pillar上腭植入系统等高科技技术治疗睡眠障碍。多年来探索出微创手术模式，其创新在于将复杂、风险大的全麻传统手术转化成简单的、安全性高的局麻微创手术。该系统能快速解决上气道多平面的阻塞问题，重塑患者咽腔的自然形态和保留了患者完整的解剖结构，手术创伤小、恢复快、疼痛轻、护理易，无需全麻、插管、住院，从而改善患者就医体验，降低手术风险。18年来诊治OSAHS患者16万余人次，成功治疗1万多例国内外OSAHS患者，手术效果良好，无一例鼻腔返流、软腭穿孔、大出血、死亡等并发症，获得诸多称赞和好评，填补了此项医疗技术在西南地区的空白。创造18年零死亡和零医疗事故的记录，其学术和技术水平处于国内领先地位，获得国内外同行的认可。央视《走进科学》专程采访并报道过。主编《警惕“睡眠杀手”--别拿打鼾不当病》一书。先后获 “四川名医”、“OSAHS微创先行者”、“首届临床技能名师”、“十佳医德奖”等称号。作为研究生导师，专心致志的培养硕士研究生10余名，完成多项OSAHS相关课题，为我国睡眠医学事业的发展做出了贡献。</div>
	  <div class="text">中心在每个监测室配备有液晶电视和独立的卫浴室，为患者提供舒适的就医环境和最优质的医疗服务。配备有国际最先进的多导睡眠监测系统，能实现：</div>
	  <div class="text">1、无线遥测：可通过内置蓝牙模块实时无线数据传输对患者无阻碍，患者可自由活动，时间安排更灵活；</div>
	  <div class="text">2、连续无创动态血压监测：已获全球专利；</div>
	  <div class="text">3、上气道阻塞程度分析：判断阻塞部位，优化手术治疗方案。</div>
	  <div class="text">中心具有最先进的微创手术系统，内镜室配备国际先进的Xion、Pentax电子鼻咽喉镜系统和Xion、STORZ鼻内窥镜系统，为高质量的医疗技术提供硬件支持。还有专门的物理治疗室，提供数十台大型治疗设备，特别是对神经性耳鸣、突发性耳聋、神经性耳聋、急慢性中耳炎、分泌性中耳炎、过敏性鼻炎、急慢性鼻窦炎、神经性失嗅、急慢性咽喉炎、声带小结、声带息肉等疾病疗效明显，得到广大市民的一致好评。</div>
	  
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

