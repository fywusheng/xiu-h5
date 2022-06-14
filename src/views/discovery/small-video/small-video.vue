<template>
	<div class="small-video">
		<div class="item" v-for="(item,index) in datalist" :key="index" @click="clickItem(item)">
			<img mode="aspectFill" :src='item.imgs[0]' class='top_img'/>
			<div class="text">{{item.ttl}}</div>
			<div class="bottom">
				<img v-if="item.logoUrl"  mode="aspectFill" class="left_icon" :src='item.logoUrl'/>
			    <div  class="des">{{item.categoryName}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components:{
		
		},
		props:{
           datalist:{
			   type:Array,
			   default:[]
		   }
		},
		data() {
			return {
			  list:[]
			}
		},
		onLoad() {
		},
		methods: {
			clickItem(item){
				this.$emit('return_data',item)
			}
		}
	}
</script>

<style lang="less" scoped>
	.small-video{
		background: #F5F5F5;
		// height:100vh;
		display: flex;
        flex-wrap: wrap;
		justify-content:space-between;
		.item{
			width:336px  ;
            background: #FFFFFF;
			border-radius: 16px  ;
			border: 4px   solid #E5D6B6;
			margin-bottom:15px  ;
			// margin-top: 24px  ;
            // margin-left: 21px  ;
			.top_img{
              width:100%;
			  height:336px  ;
			  border-radius: 16px  ;
			}
			.text{
              height:100px  ;
			  font-size:36px  ;
			  font-family: PingFangSC-Regular, PingFang SC;
			  font-weight: 400;
			  color: #333333;
			  line-height:50px  ;
			  width: 296px  ;
              margin: 0 auto;
			  overflow: hidden;
		 	  text-overflow: ellipsis;
		      display: -webkit-box;
			  word-wrap: break-word;
			  white-space: normal !important;
			  -webkit-line-clamp: 2;
			  -webkit-box-orient: vertical;
			}
			.bottom{
				height:88px  ;
				line-height:88px  ;
				display:flex;
				justify-content:flex-start;
              .left_icon{
                width: 48px  ;
				height: 48px  ;
				padding-top: 15px  ;
				padding-left: 15px  ;
			  }
			  .des{
                font-size:32px  ;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			    margin-left:12px;
			  }
			}
		}
	}
</style>
