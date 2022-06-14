<template>
    
</template>
<script>
export default {
    data(){
        return{
         
        }
    },
    watch: {
            $route: {
            immediate: true,
            handler(newValue) {
                if (newValue.query.ismatch === "false") {
                this.$router.push({ path: "elderly-card"})
                return false
                }
                if (newValue.query.ismatch === "true") {
                this.$router.push({ path: "claim/face-recognition-success" , query:{_firstImg:newValue.query.img}})
                localStorage.setItem('first-img-face' , JSON.stringify(newValue.query.img))
                }
               
            }
            }
  },
}
</script>


