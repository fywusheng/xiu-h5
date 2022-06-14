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
      <div class="text">四川大学华西第四医院姑息医学科始建于1996年，学科起步时由于各个层面对学科的认识和重视都不足，仅只有一名医生两名护士，在医院骨质疏松科的框架内开展姑息关怀服务。尽管学科的建设和发展在不断推进，但在其进程中困难重重、举步维艰，最重要的是医护人员面对患者的频繁的濒死和死亡感到压抑，和/或没有成就感等，不愿意和/或仅只做短暂时间的工作便调离；（这个是分号）学科的幸存几度面临肢解。学科带头人及其骨干坚持和不懈的努力，并与国际相关组织学术上保持着紧密的联系，使得学科不断改进和扩展；2002年成为WHO/OICPC姑息医学合作中心；2006年成为美国IAHPC国际姑息关怀协会成都教育培训部；同年，成为亚太地区APHN姑息关怀网络组织成员机构；2007年建立起李嘉诚基金会全国宁养医疗服务计划四川大学华西第四医院宁养院；至2012年姑息医学科已建设成为“四川省医学重点学科”。</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/F0/wKgupGHlKS6AD-R8AAjejAvFTbU488.png" style="width:100%;height:auto;margin: 15px 0;" />
	  <div class="text">2015年获四川省卫计委“宁养天年”健康服务业重大项目的资助，建立起“四川大学华西第四医院姑息医学中心”在成都市区范围内的社区卫生服务中心/基层医院建立起18家姑息医学；使得姑息医学服务获得有效的推广，并初步形成家居-社区-医院三级联动的姑息关怀服务网络；初步实现三级联动服务的远程查房/会诊服务，将传统的临床医疗服务模式与现代科技的电子化的网络服务紧密的结合在一起。在四川建立起不同层面的、便利的和现代化的服务模式，让更多的生命有限患者能获得更好的生存质量。</div>
	  <div class="title">姑息医学科团队和服务机构</div>
	  <div class="text">四川大学华西第四医院姑息医学科是国内率先建立姑息医学病房服务、姑息医学家居服务和社区服务的专业化机构；并且建立起家居-社区-医院病房的三级联动姑息关怀服务网络和远程查房/会诊联动网络服务。</div>
	  <div class="text">姑息医学科拥有36名专业化医护团队，包括11名医生、25名护士。该团队先后有50人/次赴英国、美国、加拿大、澳大利亚、奥地利、新加坡、马来西亚、香港、台湾和泰国等国家和地区受过严格的姑息医学专业化培训和留学，并且在20多年的姑息关怀/姑息医学服务实践中积累了丰富的临床经验。</div>
	  <div class="text">四川大学华西第四医院姑息医学临床服务实体包括病房服务、家居服务和社区服务。病房服务设置48张病床，开放单人间（可供病人和家属同住）和 三人间；每年大约为＞ 600名生命有限患者提供姑息关怀住院服务。</div>
	  <div class="text">姑息怀家居服务 — 宁养院是一个典型的慈善姑息关怀家庭服务项目，对成都市为中心的100公里地域的“贫困癌症晚期疼痛”的生命有限患者提供上门免费家居服务，每年提供服务病人数≥550名。</div>
	  
	 
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

