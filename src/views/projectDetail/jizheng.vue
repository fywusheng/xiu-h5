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
      <div class="text">我科秉承“救死扶伤，实行革命人道主义”的宗旨，坚持时刻以病人为中心、以精湛的技艺为基础、优质的服务为目标、恪守医学职业道德、发挥专科特色优势，提供全年、全天候、全面、紧急、便捷的急诊出诊、内外科急诊和便民门诊服务。我科以先进的现代急诊医学技术和设备为基础，依托本院雄厚的急性中毒救治能力，逐步形成的院前急救—院内急诊—留观室及监护室一体化模式，为广大患者提供抢救生命的绿色通道。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F1/wKgupGHlMkmAbPGqAAGJ1lTwDzU661.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F1/wKgupGHlMniAFdhwAAFVrIKDCyI216.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">医疗设备及业务范围</div>
	  <div class="text">我科拥有先进的多参心电监护仪3台、除颤仪1台、重症呼吸机1台、转运呼吸机3台、全自动洗胃机1台、血液灌流机1台、快速血糖检测仪1台、心电图机1台、可视喉镜1台、微量输液泵及注射泵数套、骨髓腔内输注系统1台、多功能抢救床以及功能齐备的救护车等全套先进的急诊抢救设备。</div>
	  <div class="text">我科设有急诊分诊和候诊区、急诊抢救监护室、内外科急诊诊断室、发热诊断室、腹泻诊断室、急诊清创间、输液室、留观室（急诊病房）、腹泻留观室、急诊采血室、注射室及急诊辅助功能检查、挂号收费室、急诊入院处等功能区，开放抢救床2张，输液椅12张，普通留观床位5张，发热腹泻留观床位各1张，24小时为急诊患者服务。常规开展心肺脑复苏术、体外除颤、呼吸与循环支持、急诊床旁血液净化、各种内外科急危重症紧急救治等技术，能对各种原因所致的心跳呼吸骤停、昏迷、休克、心律失常、心衰、呼衰、大出血、急性创伤等常见的急危重症给予快速的评估和救治。同时，我科也作为四川省卫生应急队成员，承担省内外各种公共卫生突发事件的紧急救援任务。</div>
	  <div class="text">急救特色</div>
	  <div class="text">我科以中毒为特色，作为四川省化学中毒救治基地，对工业性、农业性、药物性及生活中毒有较强的救治能力，提供急性中毒患者第一步抢救和治疗，为后续的专科治疗与康复创造条件。我院备有液相、气相色谱分析仪等毒检分析设备，能提供铅、汞、砷、铬、铊等毒物的快速检测。我科开展床旁血液灌流等血液净化技术为各种急性中毒提供先进快速地救治手段。急诊高压氧治疗给各种急性有害气体中毒、中毒性肺水肿及缺血缺氧性疾病患者提供了有效的紧急救治。此外，我科也逐步在各种动物咬伤和物理因素所致急症治疗中形成自己的特色。</div>
	  
	 
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

