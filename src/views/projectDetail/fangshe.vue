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
      <div class="text">四川大学华西第四医院放射科是集临床、科研、教学应用的重要学科之一。本科室创建至今，由曾任老年学会骨质疏松分会副理事长、《中国骨质疏松杂志》副主编、四川省尘肺诊断组组长、成都市医学会放射学专委会主任委员杨定焯教授指导诊断工作。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F1/wKgupGHlL-KAe77nAAReE2RjMGo299.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">科室在完成临床工作和本科生、研究生教学工作的基础上，先后承担、参与纵向及横向课题21项，一项通过四川省科技厅科技成果鉴定，在国内外刊物发表论文90多篇。我院放射科科已发展成为亚专业设置较齐全、技术力量雄厚、梯队结构合理并以职业病诊断为特色的学科，是国内职业病影像医学专业人才培养的主要基地。该科具有雄厚的诊断技术力量，现有在岗职工15名，诊断医生7名（硕士研究生毕业6人，教授1人，主任医师1人）；技师7名；护士1名。本科室医务人员始终保持“211”院校附属医院的严谨作风，在临床工作中坚持“以人为本”的科学发展观，牢固树立“以病人为中心”的服务理念，以“关怀、服务”为宗旨，严格规范医疗行为，不断提高服务质量。</div>
	  <div class="text">放射科服务项目：</div>
	  <div class="text">1、24小时x7天 急诊DR、CT检查、床旁CR检查</div>
	  <div class="text">2、全身各部位普通X摄线检查</div>
	  <div class="text">3、全身各部位DR检查</div>
	  <div class="text">4、消化道造影检查</div>
	  <div class="text">5、静脉肾盂检查</div>
	  <div class="text">6、尘肺高千伏摄影检查</div>
	  <div class="text">7、全身各部位CT平扫</div>
	  <div class="text">8、全身各部位增强CT扫描</div>
	  <div class="text">9、动态CT扫描；灌注CT扫描</div>
	  <div class="text">10、胸部高分辨CT扫描及其它各部位薄层CT扫描</div>
	  <div class="text">11、全身各部位CT软组织三维重建</div>
	  <div class="text">12、全身CT骨三维重建</div>
	  <div class="text">13、CT大血管成像</div>
	  <div class="text">14、CT消化道成像</div>
	  <div class="text">15、CT泌尿道成像</div>
	  <div class="text">16、骨密度检查</div>
	 
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

