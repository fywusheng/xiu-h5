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
      <div class="text">四川大学华西第四医院超声医学科/超声介入科成立于1982年，是四川省最早开展超声检查的单位之一。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/AD/wKgupGHeifOAdAyIAElfPV7zd8E338.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">科室开展业务广泛，涵盖腹部、小器官、肌骨、周围血管、妇产科及男科、心脏及大血管、头颈颌面、皮瓣移植、腔内超声（经阴道及经直肠）、胃肠超声、超声造影、介入超声、弹性超声及经颅多普勒超声等，是集医疗、科研、教学为一体的综合性超声医学科。科室医生学历水平普遍为博士及硕士，在多个国家级及省市级学术组织任职，具有相当的学术影响力。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F1/wKgupGHlNKGAXiv4AApwX5gdG-k573.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">我科为临床提供专业化、专科化的高质量影像服务，除传统的超声诊断业务外，常规开展以下超声介入诊疗项目：</div>
	  <div class="title">1.诊断类</div>
	  <div class="text">超声造影：脏器造影、腔道造影及双重造影</div>
	  <div class="text">穿刺活检：乳腺、甲状腺、淋巴结、肝脏、前列腺等全身脏器及肿块的穿刺活检</div>
	  <div class="text">胸腹腔心包积液及其他体腔积液的抽吸培养、脱落细胞学检查</div>
	  <div class="title">2.引流置管类</div>
	  <div class="text">胸腹腔心包腔等体腔积液的穿刺及置管引流</div>
	  <div class="text">囊肿、脓肿的引流及硬化治疗</div>
	  <div class="text">经皮肝胆管穿刺置管引流（PTCD）、经皮胆囊穿刺置管引流（PTGD）</div>
	  <div class="text">肾盂穿刺造瘘、膀胱穿刺造瘘</div>
	  <div class="text">腹腔化疗管置入</div>
	  <div class="text">血管置管</div>
	  <div class="title">3.治疗类</div>
	  <div class="text">肿瘤消融</div>
	  <div class="text">乳腺肿块旋切</div>
	  <div class="text">药物注射</div>
	  <div class="title">4.其他</div>
	  <div class="text">乳腺肿瘤术前钩针定位</div>
	  <div class="text">乳腺癌新辅助化疗marker植入 </div>
	  <div class="text">科主任简介</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/AD/wKgupGHeicSAe1EBABjXbLmzAWk948.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">贾浥苹，医学博士，主任医师。2000年毕业于华西医科大学临床医学专业，后相继获得四川大学华西临床医学院影像医学硕士及博士学位。对包括超声、放射及核医学等影像检查有全面的理解和掌握，临床功底扎实、全面，擅长腹部、浅表、血管及介入超声。主持和参与多项省部级课题，在中国超声医学工程学会、中国研究型医院学会、四川省医学会、四川省超声医学工程学会等多个国家级及省市级学术组织任职。</div>
	  
	 
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

