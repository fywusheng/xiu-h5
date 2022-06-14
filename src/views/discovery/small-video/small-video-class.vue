<template>
	<div class="small_video_class">
	  <div class="top_header">
		  <div v-if="showDefault" class="imgBg bg"></div>
		  <img class="imgBg" @error="defaultImg" src='https://ggllstatic.e-drink.cn/static/find/head_icon.png'/>
		  <div>
              <img class="classIcon" :src='logoUrl'/>
              <div  class="classTitle">{{categoryName}}</div>
		  </div>
	  </div>
	  <van-pull-refresh v-model="isrefreshing" @refresh="onRefresh" :success-text="loading_test[loading]">
	  <div class="type_center">
        <small-video :datalist="list[0]" @return_data="reurnData"></small-video> 
	  </div>
	  </van-pull-refresh>
	  <div v-if="loading != 2">
			<div class="_center" v-if="loading === 1">
				<img class="status-box" src="https://ggllstatic.e-drink.cn/static/common/business_loading.gif"/>
				<div class="flex-c-c status-text">{{loading_test[loading]}}</div>
			</div>
			<div  v-if="loading == 22 || loading == 3">
				<!-- <img class="noData" src="@/views/discovery/small-video/static/no-data.png" /> -->
				<div class="status-text">{{loading_test[loading]}}</div>
			</div>
      </div>
	</div>
</template>

<script>
import { PullRefresh } from "@ylz/vant"
import smallVideo from "@/views/discovery/small-video/small-video.vue"
import { discoveryApi } from "@/api"
	export default {
		components:{
		 smallVideo,
		 [PullRefresh.name]: PullRefresh
		},
		data() {
			return {
			  isrefreshing:false,
			  list:[[]],
			  pageNum:1,
			  pageSize:20,
			  contId:'',
			  categoryName:'',
			  logoUrl:'',
			  showDefault:false,
			  loading_test:{1:'',3:'网络或服务器异常',22:'暂无数据'},
			  loading:1,
			  phoneType:''			}
		},
		created(){
		   this.envi()	
		   this.categoryName = this.$route.query.categoryName || ''
		   if(this.phoneType == 'ios'){
			   if(this.categoryName){
                this.categoryName = decodeURI(this.categoryName)
			   }
		   }
		   this.logoUrl = this.$route.query.logoUrl || ''
		   this.contId  = this.$route.query.contId || ''
		   this.getTypeList(this.contId) 
		},
	
		methods: {
			envi(){
                const u = navigator.userAgent
				const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				if (isAndroid) {
					this.phoneType = "android"
				} else {
					this.phoneType = "ios"
				}
			},
			onRefresh(){
	   console.log('----刷新----')
			  this.getTypeList(this.contId)
			  this.isrefreshing = false
			},
			defaultImg(){
              this.showDefault = true
			},
			reurnData(data){
				console.log('---data---',data)
				this.$router.push({path:'/discovery/video-swiper',query:{logoUrl:this.logoUrl,categoryName:data.categoryName,contId:data.contId,mediaUrl:data.mediaUrl,ttl:data.ttl,imgs:data.imgs[0]}})
			},
		   async	getTypeList(contId){
			  let res = await discoveryApi.getCategoryList({
					userId:'',
					contId:contId,
					pageNum:this.pageNum,
					pageSize:this.pageSize
				})

				if(res.code === 0){
				  	console.log('----接口---',res)
					res = res.data	
					let getList = res.list || []
					if(getList.length > 0){
			        this.loading = 2			
					this.$set(this.list,0,this.list[0].concat(getList))
					console.log('===查看---',this.list)
					this.pageNum ++
					}else{
					  this.loading =  22
					  this.isrefreshing = false
					}
				}else{
				   this.loading = 3
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.small_video_class{
		.top_header{
		   position: relative;
           width: 750px  ;
           height: 346px  ;
		   margin-bottom: 40px  ;
		   .imgBg{
			   width:100%;
			   height:100%;
		   }
		   .bg{
			   background-color:#333;
		   }
		   .classIcon{
			   width:164px   ;
			   height:164px   ;
			   border-radius:50%;	
			   position: absolute;
			   top: 222px  ;
			   left: 32px  ;
		   }
		   .classTitle{
			    position: absolute;
				left: 216px  ;
				font-size: 48px  ;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				bottom: 24px  ;
		   }
		}
		.type_center{
			padding:25px  ;
		}
		.noData{
			width: 440px  ;	
		}
		.status-text{
			font-size: 36px  ;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			text-align: center;
             padding-bottom: 11px;
		}
		._center{
			text-align: center;
            margin-top: 42%;
		}
		.status-box{
			width: 198px  ;
		}    
	}
</style>
