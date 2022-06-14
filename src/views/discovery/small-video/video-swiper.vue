<template>
	<div>
		<van-swipe class="swiper" vertical :interval="interval" :duration="duration" @change="animationfinish">
			<van-swipe-item v-for="(item,index) in list[0]" :key="index" >
						<div class="swiper-item uni-bg-red"   @click="saveplay('video'+index)" >
							<div>
								 <video class="video"
								    :poster="item.imgs"
								    controls
									loop 
									webkit-playsinline="true"
									x5-video-player-type="h5-page"
                                    x5-video-player-fullscreen="true" 
									playsinline 
									preload="auto"
									autoplay="true"
									:playOrPause="playOrPause"
                                    :src="item.mediaUrl">
                                </video>
							</div>
							<div class="info">
								<div class="_float">
									<div class="desc">{{item.ttl}}</div>
								</div>
							</div>
							<div class="audio" v-show="false">
								<div class="text-group">
									<div class="text"></div>
								</div>
							</div>
						</div>  
						<div class="buttons">
								<div class="header_group" @click="goType(item)">
									<img v-if="item.logoUrl" class="header" :src="item.logoUrl"/>
									<img v-if="!item.logoUrl" class="header" src="@/views/discovery/small-video/static/defaultIcon.png"/>
								</div>
								<div class="button">
									<img @click="collect(item,index)" mode="widthFix" class="icon" :src="collectIcon(0)"/>
									<div>收藏</div>
								</div>
								<!-- <div class="button">
									<img @click="share(index)" mode="widthFix" class="icon" :src="shareIcon"/>
									<div>分享</div>
								</div> -->
							</div>
			 </van-swipe-item>
		</van-swipe>
		<van-dialog v-model="dialogShow" title="提示" message="请下载国家老龄服务平台使用该功能" confirmButtonText="下载" show-cancel-button :before-close="beforeClose">
        </van-dialog>
  
	</div>
</template>

<script>
import { discoveryApi } from "@/api"
import { Swipe, SwipeItem, Dialog , Toast} from "@ylz/vant"

	export default {
		name: "small-video",
		props: {
			shareIcon: {
				type: String,
				default: 'https://ggllstatic.e-drink.cn/static/find/fenxiang.png'
			}
		},
		components: {
			[Dialog.Component.name]: Dialog.Component,
		},
		data() {
			return {
				dialogShow:false,
				playOrPause: true,
				loading:1,
				current: 0,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				list:[[]],
				pageNum:1,
				pageSize:2,
				categoryName:'',
				logoUrl:'',
				playState:{},
				ttl:''
			};
			// {
			// 		categoryName: "反诈视频",
			// 		contId: "18",
			// 		mediaUrl: "https://api.hpgjzlinfo.com/nepsp-file/group1/M00/48/53/wKgupGG5mDSAOJNrAO5fQZWwoXc507.mp4",
			// 		ttl: "广州反诈民警帮阿姨保住780万 到底是怎样的神操作？#反诈 #全国反诈短视频大赛",
			// 		imgs:["https://api.hpgjzlinfo.com/nepsp-file/group1/M00/48/91/wKgupGG_4mOAKC4mAADtHV3gBcI146.png"]
			// }
		},
		created() {
			this.envi()
			this.contId = this.$route.query.contId || ''
			this.categoryName = this.$route.query.categoryName || ''
			this.ttl = this.$route.query.ttl || ''
			if(this.phoneType == 'ios' ){
		      if(this.categoryName){
               this.categoryName = decodeURI(this.categoryName)
			  }
			  if(this.ttl){
                 this.ttl = decodeURI(this.ttl)
			  }		
		   }
			let item = {
				categoryName:this.categoryName,
				contId:this.$route.query.contId || '',
				mediaUrl:this.$route.query.mediaUrl || '',
				ttl:this.ttl,
				imgs:this.$route.query.imgs || '',
				logoUrl:this.$route.query.logoUrl || ''
			}                                 
			this.logoUrl =  this.$route.query.logoUrl || ''
			this.list[0].push(item)
			console.log('---111111111111---',this.list)
			
		},
		mounted(){
			this.playVideo()
	    const params = {
				contId:this.contId,
				pageNum:this.pageNum,
				pageSize:this.pageSize
		    }
		 //   this.videoList(params)		
        
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
			 beforeClose(action, done) {
				if (action === "confirm") {
					this.$router.push("/download")
					this.dialogShow = false
				} else if (action === "cancel") {
					done()
				}
			},
			collectIcon(status){ 
			  const icons = {1:require('./static/icon-map-collected.png'),0:'https://ggllstatic.e-drink.cn/static/find/shoucang_w.png'}	
              return icons[status]
			},
			saveplay(id){
			   let video = document.querySelectorAll('video')[0];
			   if(this.playOrPause){
                 video.pause()
			   }else{
				 video.play()
			   }
			   this.playOrPause = !this.playOrPause
			},
			goType(item){
			  console.log("=---去分类---",item)
			  this.$router.push({path:'/discovery/small-video-class',query:{contId:item.contId,categoryName:item.categoryName,logoUrl:this.logoUrl}})
			},
			playVideo() {
				let _this = this;
				let currentId =  this.current; 
				console.log('----播放---',document.querySelectorAll('video'))
				let video = document.querySelectorAll('video')[this.current];

				video.play();
				let trailer = this.list[0];
				trailer.forEach((item, index) => { 
					if (item.mediaUrl != null && item.mediaUrl != "") {
						let temp = index;
						if (temp != currentId) {
							document.querySelectorAll('video')[temp].pause();
						}
					}
				})
			},
			//收藏
			collect(item,index) {
              this.dialogShow  = true
			},
			animationfinish(index) {
				this.current = index;
				this.playVideo();
				const end = this.list[0][index]['isLoad'] 
				if(end){
					const params = {
							contId:this.list[0][index].contId,
							pageNum:this.pageNum,
							pageSize:this.pageSize
					}
		            this.videoList(params)
				}
			},
			async videoList(params){
				let res =  await discoveryApi.getRandomVideo({
							userId:'',
							contId:params.contId,
							pageNum:params.pageNum,
							pageSize:params.pageSize 
				})
				res = res.data
				let list = res.list || []
				list[list.length - 1]['isLoad'] = true
				if(list.length > 0){
					this.$set(this.list,0,this.list[0].concat(list))
					this.pageNum ++
				} 
			  this.playVideo()
			}
		}
	}
</script>

<style lang="less" scope>
	.swiper {
		position: relative;
		width: 100%;
         height:100vh;
		.swiper-item {
			background-color:black;
			.info {
				z-index: 1;
				position: absolute;
				bottom: 80px;
				color: white;
				// text-indent: 1em;
				font-size: 30upx;
				left:36px;
				.title{
					width: auto;
					height: 60px;
					font-size: 44px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 60px;
				}
				._float{
					    display: flex;
						.desc{
							width: 686px;
							height: 100px;
							font-size: 36px;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #E7E7E7;
							line-height: 50px;
							margin-top:16px;   
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							word-wrap: break-word;
							white-space: normal !important;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
						// ._end{
						// 	flex-direction: column;
                        //     align-self: flex-end;
						// }
				}
				
			}
			.audio {
				position: absolute;
				bottom: 20upx;
				z-index: 1;
				text-indent: 1em;
				color: white;
				font-size: 30upx;
				display: flex;
				width: 100%;
				flex-direction: row;
				justify-content: space-between;
				align-items: flex-end;
				@-webkit-keyframes move {
					0% {
						left: 100vw;
					}

					100% {
						left: -50vw;
					}
				}

				@-moz-keyframes move {
					0% {
						left: 100vw;
					}

					100% {
						left: -50vw;
					}
				}

				@-ms-keyframes move {
					0% {
						left: 100vw;
					}

					100% {
						left: -50vw;
					}
				}

				@keyframes move {
					0% {
						left: 100vw;
					}

					100% {
						left: -50vw;
					}
				}
				.text-group{
					position: relative;
					width: 50vw;
					height: 40upx;
				
					overflow: hidden;
					.text {
						position: absolute;
						top: 0upx;
						white-space: nowrap;
						/*文本不会换行，文本会在在同一行上继续*/
						-webkit-animation: 10s move infinite;
						-moz-animation: 10s move infinite;
						-ms-animation: 10s move infinite;
						animation: 10s move infinite;
						width: 50vw;
						left: 100vw;
					
					}
				}
				

				.icon {
					width: 60upx;
					height: 60upx;
					border-radius: 60upx;
					animation: turn 3s linear infinite;
					margin-right: 5vw;
					border: 10upx solid white;
				}

				/* 
				      turn : 定义的动画名称
				      1s : 动画时间
				      linear : 动画以何种运行轨迹完成一个周期
				      infinite :规定动画应该无限次播放
				     */
				@keyframes turn {
					0% {
						-webkit-transform: rotate(0deg);
					}

					25% {
						-webkit-transform: rotate(90deg);
					}

					50% {
						-webkit-transform: rotate(180deg);
					}

					75% {
						-webkit-transform: rotate(270deg);
					}

					100% {
						-webkit-transform: rotate(360deg);
					}
				}
			}
			.video {
				width: 100%;
				z-index: 0;
				height:100vh;
				// height: calc(100vh - 120px);
			}
		}
		.buttons {
				display: flex;
				flex-direction: column;
				position: absolute;
				right: 5vw;
				bottom: 18vh;
				color: white;
				text-align: center;
				justify-content: center;
				z-index: 1;
				.header_group{
					margin-bottom: 44px;
					height: 120px;
					width: 56px;
					position: relative;
					.header{
						height: 120px;
						width: 120px;
					}
				}
				
				.button {
					    text-align: center;
						font-size: 36px;
						margin-bottom: 54px;

					.icon {
						    margin: 20px;
							width: 80px;
							margin-bottom: 0;
							height: 80px;
					}
				}
			}
        .netError{
			position: absolute;
			top: 0;    
			width: 750px;
			height: 100vh;
			color: #fff;
			background: #000000;
			.text_center{
				text-align: center;
				color: #fff;
				padding-top: 253px;
				.noData{
					width:440px;
					height:214px;
				}
				.try{
					color: #fff;
					font-size: 36px;
					border-radius: 36px;
					line-height: 108px;
					margin: 0 auto;
					margin-top: 106px;
					width: 610px;
					height: 108px;
					background: #292828;
					border-radius: 54px;
				}
				.err_info {
					font-size: 36px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #C7C7C7;
					margin-top:42px;
				}
			}
		} 
	}
	.share-pop{
    background-color: #F2F2F2;
    border-radius: 16px 16px 0px 0px;
    color: #333333;
    .title{
      text-align: center;
      line-height: 50px;
    }
    .list{
      
      // #ifdef MP-ALIPAY
      justify-content: flex-start;
      // #endif

      // #ifdef MP-WEIXIN
      justify-content: center;
      // #endif

      align-items: center;

      padding: 24px 74px;
      flex-wrap:wrap ;
      .item{
        image{
          flex-shrink: 0;
          width: 134px;
          height: 134px;
          margin-bottom: 8px;
        }
        text{
          line-height: 50px;

        }
      }
    }
    .btn{
      padding: 24px 74px ;
      box-sizing: border-box;
      .cancle{
        height: 108px;
        border-radius: 54px;
        color: #666;
        font-weight: 500;
      }
    }
  }
</style>
