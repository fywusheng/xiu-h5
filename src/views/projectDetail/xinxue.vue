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
      <div class="text">心血管内科，源于1976年成立的老年医学科，2019年3月独立设置，是医院的重点科室。</div>
	  <div class="text">目前有医护人员30人，其中医生10人，其中主任医师1人，副主任医师2人，主治医师3人，住院医师4人，医学博士1人，医学硕士8人；护士19人，医学硕士1人，余均为大学本科学历。</div>
	  <div class="text">设备条件：编制床位60张，实际开放床位80张，其中重症监护病床12张。拥有1250mA philip和GE大型C臂心血管造影机2台、32导心脏电生理记录仪2台、24小时动态心电图机30台、24小时动态血压监测仪30台，主动脉球囊反搏仪1台，无创呼吸机1台；并配备中央心电监护系统、中心供氧、中心负压吸引及除颤监护仪、有创和无创血压监测仪等先进设备，完全满足心血管疾病现代诊疗的需要。</div>
	  <div class="text">诊治范围：各种心血管系统疾病如高血压、冠心病（心绞痛、心肌梗塞等）、各种类型的心律失常、心脏瓣膜病（风湿性心瓣膜病和老年瓣膜病等）、先天性心脏病、心肌病、心包疾病以及各种心力衰竭等 ，诊治水平达到国内先进水平。</div>
	  <div class="text">各类心血管介入诊疗技术：</div>
	  <div class="text">冠心病介入诊疗技术如冠状动脉造影、血流储备分数测定、血管内超声检查、冠状动脉内溶栓术、冠状动脉内膜旋磨术、冠状动脉球囊扩张术和冠状动脉内支架植入术，可快捷确诊冠心病，并且恢复冠状动脉血流，特别是支架内再狭窄的处理</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/AD/wKgupGHeiyeAGhYfAAQu2wllQxc678.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">肺血管疾病的诊断与治疗，如肺梗塞、肺动脉高压等</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/AD/wKgupGHei1GAFOE0AAIcfQQXuWU095.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">肾血管性高血压的诊断与治疗，如肾动脉造影术、球囊扩张术和支架植入术</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/AD/wKgupGHei5CAYEwlAAGwnV0oUHE334.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">心律失常的诊断与治疗：如射频消融术：根治快速心律失常如阵发性室上性心动过速、心房扑动和局灶性心房颤动等快速心律失常；各种永久人工心脏起搏器植入术：可防止各种缓慢性心律失常如高度、三度、房室传导阻滞、严重窦性心动过缓等患者发生的晕厥、抽搐乃至猝死，以及各种恶性心律失常导致猝死，心脏再同步化  治疗心力衰竭。</div>
	 <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/AD/wKgupGHei7KAGAfeAAQ7wTw4_7c235.png" style="width:100%;height:auto;margin: 15px 0;" />
	  
	 
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

