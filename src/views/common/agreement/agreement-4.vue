<template>
  <div class="page">
    <img class="img" :src="url" alt="">    
  </div>
</template>

<script>
export default {
  data() {
    //   @/assets/imgs/common/icon-card-desc.png  @/assets/imgs/common/relationImg.png
    return {
      url: ''
    }
  },
  mounted() {
  },
  created(){
   const relation = this.$route.query.relation;
   if(relation == 1){
     this.url = require("@/assets/imgs/common/relationImgs.png")
   }else{
     this.url = require("@/assets/imgs/common/icon-card-descs.png")
   }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  .img{
    width: 100%;
    height:auto;
  }
  
}
</style>