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
	<img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/AC/wKgupGHeSv6AMeLiAAiZ8eOAxik173.png" style="width:100%;height:auto;margin: 15px 0;" />
      <div class="title">一、【科室简介】</div>
      <div class="text">骨质疏松科成立于1993年，是西南地区首家引进应用美国双能X线骨密度仪并设立骨质疏松专科的医院。该科有全国知名骨质疏松专家、省市骨质疏松专委会常委和委员。科室医师11名，护士20名。该科在骨质疏松诊疗方面处于全国领先水平，同时在骨关节炎、颈椎病、椎间盘突出、骨肿瘤、多发性骨髓瘤、风湿免疫骨骼疾病等诊治方面也有丰富的临床经验。采取多学科合作，开展微创手术---椎体成形术，迅速有效缓解骨质疏松骨折骨痛。该科积极参加科研活动，先后参加国家九五攻关课题《原发性骨质疏松症发病及骨折流行病学调查》和数项国家级抗骨质疏松药物临床验证、主研国家自然科学基金课题和省市课题10项。在国家级医学期刊发表论文100余篇，主编骨质疏松专著3部，参编专著数篇。该科全体医护人员以病人为中心，注重医疗服务质量，为广大骨痛骨质疏松患者提供优质服务。 </div>
	  <div class="title">二、【科室特色】</div>
	  <div class="text">擅长绝经后骨质疏松症、老年性骨质疏松症、骨关节炎、颈椎病、椎间盘突出、骨肿瘤性疾病、风湿免疫性骨关节疾病的诊治。并在成骨不全、骨软化等骨代谢疾病诊治中有丰富经验。</div>
      <div class="title">三、【诊疗范围】</div>
	  <div class="text">各种类型骨质疏松症、骨关节退行性疾病（骨关节炎、颈椎病、腰椎病）、椎间盘突出、骨肿瘤性疾病、风湿免疫性骨关节疾病以及内科常见疾病。</div>
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

