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
      <div class="text">四川大学华西第四医院是直属国家卫健委的“三甲”医院，我科由上世纪70年代老年病教研室为雏形发展而来，是西南地区较早从事老年病临床诊治、疾病预防、营养管理、康复保健、科研教学的老年专科之一，目前在提高老年危急重症诊治能力的基础上，建设神经内科亚专业方向，正式成立老年医学/神经内科。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F0/wKgupGHlFwyAI7nEAAx7WpCgII8069.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">我科结合神经系统疾病特点，运用现代医学的检查方法和治疗手段，形成了富有特色的诊疗体系，具备较强的神经内科疑难重症的诊治能力，在脑卒中、缺血缺氧性脑病、认知功能障碍、帕金森氏病、癫痫、脑炎、周围神经病变、颈椎病、三叉神经痛、坐骨神经痛、老年睡眠障碍等疾病的诊断、综合治疗、康复和护理方面拥有丰富的临床经验。现为四川省卒中学会卒中培训联盟单位。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F0/wKgupGHlF3GACWG6AAeixHfYb74439.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F0/wKgupGHlF9KAXlsyAAIwyAeAUqk568.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">多病共患、并发症多、病情进展快是老年疾病的重要特点，我科以老年患者健康风险综合评估为主要手段，贯彻“综合诊疗”、“全人管理”的理念，在老年慢性阻塞性肺部疾病、心力衰竭、高血压、糖尿病及相关并发症等老年危急重症的诊治方面具有丰富的临床经验，并在慢性病的临床预防、健康管理、营养管理、延伸性护理等方面形成了多学科的综合管理体系，为患者提供全方位的健康服务。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F0/wKgupGHlGDCAVGl6ABYKKPG1FsU412.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">护理方面拥有神经内科、老年病-糖尿病专科、静脉治疗、伤口护理等专科护士多名，在老年综合评估、疼痛评估及控制、压疮治疗、跌倒风险防范、糖尿病血糖管理等方面具有较高的专业技术水平。</div>
	  <div class="text">2016年我科在国家卫健委项目的支持下，成立神经电生理室，开展肌电图、神经传导速度、神经电图、针刺肌电图、常规脑电图、动态脑电图、视频脑电图听性脑干电位、事件相关电位、中潜伏期反应等检查，对癫痫、中枢神经系统感染、颅内占位性病变、糖尿病和颈椎病等多种原因所致的周围神经病变、前庭相关疾病、脑干病变、心身疾病等疾病的诊断和治疗具备较强的临床能力。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F0/wKgupGHlGJqAYk8GAAbokf7gfQU489.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">我科拥有一支年轻化、专业化的人才队伍，现拥有一支包括主任医师1人、副主任医师2人、副主任护师1人的医护团队。设有老年医学硕士点，承担了国家卫计委《危急老年病诊治及康复能力建设项目》重大任务，已承担国家级、省部级等与神经内科、老年病学等相关的科研项目10多项，实现了在老年病领域临床与科研的有机结合。</div>

      <div class="instructions">门诊地点：四川大学华西第四医院第三综合楼2楼A区10诊室</div>
	  <div class="instructions">病房：第三综合楼13楼</div>
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

