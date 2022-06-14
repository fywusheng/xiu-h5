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
      <div class="text">该中心建于一九八一年。现有医用高压氧治疗舱三台，其中10人舱、8人舱、单人舱各1台。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F1/wKgupGHlNTqAeqm5AAf_TBRKalQ750.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">自成立以来，在治疗各种缺血、缺氧性脑病,特别是对急性缺氧性疾病（如一氧化碳中毒、硫化氢中毒等）、突发性耳聋等疾病的治疗具有可靠的疗效。高压氧可以提高大脑血氧代谢,促进智力发展,帮助学生轻松应对各种考试，并能不断提升学生的学习成绩。中心的全体工作人员竭诚为您提供全天候服务。 高压氧室现有副教授一名，护师二名，技师一名。我们将以精湛的医术，良好的医德医风，为广大患者提供优质的服务。</div>
	  <div class="text">适应症:</div>
	  <div class="text">1. 急性一氧化碳其它气体以及四氯化碳、有机磷、奎宁等中毒及中毒性脑病 </div>
	  <div class="text">2. 急性气栓症</div>
	  <div class="text">3. 急性减压病</div>
	  <div class="text">4. 有害气体（硫化氢、液化石油气、汽油等）中毒</div>
	  <div class="text">5. 厌氧菌感染</div>
	  <div class="text">6. 休克</div>
	  <div class="text">7. 视网膜动脉栓塞 </div>
	  <div class="text">8. 心肺复苏后急性脑功能障碍（电击伤、溺水、缢伤、窒息、麻醉意外等） </div>
	  <div class="text">9. 脑水肿</div>
	  <div class="text">10. 肺水肿</div>
	  <div class="title">11. 挤压伤及挤压中合征</div>
	  <div class="text">12. 急性末梢循环障碍</div>
	  <div class="text">13. 急性脊髓损伤</div>
	  <div class="text">14. 断肢（指、趾）再植术后 </div>
	  <div class="text">15. 烧伤</div>
	  
	 
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

