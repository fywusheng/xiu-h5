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
	  <div class="text">职业病中毒科是国家临床重点专科，国家卫生健康委员会唯一直属的职业病防治院的专科培训基地，拥有数名省部级专家，致力于诊断、鉴定、救治和研究各种职业性尘肺病、化学中毒、物理因素职业损害等疾病。科室具有全部十大类职业病的诊断资质。多次获得国家级、省级科研奖，其学术水平在全国处于领先地位，承担我国职业病医师培训、进修及相关疾病会诊任务。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F1/wKgupGHlNpyAFwvGAARXfaBFX9k088.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">肾脏内科专业主要诊治各种原发性和继发性肾脏疾病、泌尿系结石和感染、慢性肾脏病管理。常规开展肾脏穿刺活检、自体动静脉内瘘成形术、血液透析临时导管和长期导管植入等专科特色的诊疗技术。擅长应用血液透析、灌流等血液净化技术治疗有机化合物、农药、重金属及有毒气体等急性中毒肾损伤以及慢性肾功能衰竭。</div>
	  <div class="text">本着求真务实、开拓进取、科学实效的精神，科室已然形成了方向明确、结构合理、前沿探知与实用研究相结合的学术团队，科室开放病床120张，肩负四川省和成都市的化学中毒救治基地、核辐射救治基地的重要任务。科室现有一批潜心学术，献身医学、技术力量雄厚，具有丰富临床实践经验的专科医护人员：医师13人，其中高级职称5人，中级职称6人，初级职称2人，均为硕士及以上学历，其中博士5人，医师学科梯队建设完善，专业全面；护士39人，均为护理本科以上学历，训练有素，具有丰富的整体护理经验，能解决专科疑难重症的护理问题。</div>
	  <div class="text">历四十年铅华，集数十年积淀，科室秉承“贴心为病人服务，悉心为病人指导，耐心为病人解释，全心陪病人康复”的“四心”的理念，以其临床和科研的累累成果，凭借高尚的医德医风、高超的医术医技、优良周到的服务态度，充满关爱、友善和谐而温馨的科室文化氛围赢得了整个社会的普遍赞誉。</div>
	  
	 
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

