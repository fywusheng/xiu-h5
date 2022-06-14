/*自动生成组件模板
 * @Author: chenyt 
 * @Date: 2020-03-27 15:53:51 
 * @Last Modified by: chenyt
 * @Last Modified time: 2020-03-27 16:45:04
 */
module.exports = {
  routerTemplate: routerCont => {
    return `export default [${routerCont}]`
  },
  routerStr: (moduleName, pageName, pageChineseName) => {
    return `{
      path: "/${moduleName}/${pageName}",
      name: "${pageName}",
      meta: {
        title: "${pageChineseName}"
      },
      component: () => import("@/views/${moduleName}/${pageName}")
    },`
  },
  vueTemplate: (pageNane,pageChineseName) => {
    return `<template>
<div class="${pageNane}">${pageChineseName}页面创建成功</div>
</template>
<script>
export default {
  name: '${pageNane}',
  data(){
    return{

    }
  },
  computed: {
  },
  mounted () {
  },
  created(){

  },
  methods:{
    
  },
 
}
</script>
<style lang="less" scoped>
.${pageNane} {

}
</style>`
  },
  entryTemplate: `import Main from './main.vue' 
  export default Main`
}
