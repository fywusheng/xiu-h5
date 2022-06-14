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
      <div class="text">华西四院重症医学科是研究和治疗危重病的临床科室，是现代化医疗水平发展的集中体现。重症加强治疗病房（ICU）主要负责收治全院临床各科室危重症及手术前后高危患者的集中管理单元。自2012年成立以来，担负了全院、全川乃至西南地区内外科各种危重症患者的救治工作。</div>
	  <div class="text">我院ICU为院感防控设计的单间病房，现有13间正压监护病房和2间负压隔离病房。每个ICU单元均配备多功能监护仪、输注集成系统、重症呼吸机及视频探视系统，可供重症患者与家属随时交流。中央监护系统能实现每个监护单元的所有监测数据实时传输至护士站、医生站及家属探视看板。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F0/wKgupGHlG-uAL0MjAAk1ept11Do504.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F0/wKgupGHlHB-Acg5ZAAUWXeIKSuo699.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F0/wKgupGHlHEyAVtRfAAUMKEmg9fo234.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">此外，ICU还拥有CRRT机、血液灌流机、纤维支气管镜、PiCCO、床旁血气生化免疫检测仪、亚低温治疗仪、除颤起搏仪、床旁超声、心肺复苏机、康复理疗设备等先进的床旁监护和诊治设备。医院能配套提供床旁DR、胃镜、高压氧等服务支持。ICU先进的设备和技术水平能随时为危重患者提供脏器功能支持、监测和治疗。全新的数字化病房能给危重患者及家属提供更加精确、便捷、快速的服务。同时，我科与急诊、普通病房实现急危重症无缝化救治，确保患者抢救、重症监护及康复一体化衔接。经过多年持续改进和完善，我科危重症救治水平得到不断提升和强化，尤其在急慢性中毒和职业病重症的救治、各类疾病的血液净化方面累及了丰富经验，并做出了特色，达到川内领先水平。</div>
	  <div class="text">全科医护人员共38人，医生12人，其中副主任医师1人，主治医师6人，住院医师5人；护士26人，其中主管护师3人，护师11人，护士12人。</div>
	  <div class="text">四川大学华西第四医院ICU人本着“卓越、为民”的华西公卫精神，实施以人为本的人性化理念，“以病人为中心”的服务宗旨，以其良好的医德医风、精湛的技术、个体化的服务、精细化管理为广大重症患者提供优质的医疗护理服务。</div>
	  <div class="instructions">科室电话：028-85501076</div>
	  
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

