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
	<div class="title">一、科室简介</div>
      <div class="text">华西第医院健康管理中心依靠强大的医院背景，从1976年建院开始便为企事业员工提供体检服务，是四川省最早开展体检工作的机构，已为上万企业、近千万人群提供体检服务。质量第一 沐浴“华西”文化，遵循最高原则，受过高等教育、经验丰富的专业人士，行业先进的仪器设备，严谨的管理模式，保证了我们的体检是“可靠的、优质的、放心的”。温馨服务践行“爱”在心中，把体检者放在我们“眼里、心里、话语里”。体检者满意就是对我们工作最大的肯定和激励。展望未来 秉承“持续改进”，落实“2030健康中国”的战略目标，在“质量第一，温馨服务”基础上，加大信息化建设，向建设成为最高最好的健康管理中心而努力奋斗。</div>
	  <div class="title">二、科室优势</div>
	  <img src="https://api.hpgjzlinfo.com/nepsp-file/group1/M00/49/AC/wKgupGHeefeAGjYOAA8Kn8RvRN0760.png" style="width:100%;height:auto;margin: 15px 0;"/>
	  <div class="instructions">体检咨询／预约电话：85589064</div>
	  <div class="instructions">预约体检方式：微信关注“华西第四医院健康管理中心”公众号，回复“体检套餐”即可查询详细套餐种类并预约</div>
	  <div class="instructions">科学严谨，求实创新</div>
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
      // color: #666666;
      line-height: 30px * @ratio;
    }
  }
}
</style>

