<!-- 首页内容的商城热点 -->
<template>
	<div class="home-news">
		<div>
			<div class="newsImg">
				<img src="@/assets/images/title-img-1.png" alt="">
			</div>
			<!-- ref 被用来给元素或子组件注册引用信息 -->
			<ul class="newsTitle" :class="{news_active:flag}" ref="newsTitle">
				<li v-for="(item,index) in newsDatas" :key="index"><a href="#">{{item.title}}</a></li>
			</ul>
			<div class="newsIcon">
				<i class="iconfont icon-jiantou1"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		components:{},
		data(){
			return{
				flag:false,//控制过渡
				newsDatas:[{
					id:1,
					title:"服务店突破2000多家"
				},{
					id:2,
					title:"我们成为中国最大家电零售B2B2C系统"
				},{
					id:3,
					title:"三大国际腕表品牌签约"
				}],
				timer:0,
			}
		},
		methods:{
			ulToMove(){
				// 获取移动的ul
				let oUl = this.$refs.newsTitle;
				oUl.style.top = "-5rem";
				this.flag = !this.flag;
				setTimeout(()=>{
					this.flag = !this.flag;
					this.newsDatas.push(this.newsDatas.shift());
					oUl.style.top = "0";
				},500);
			}
		},
		mounted(){
			this.timer = setInterval(this.ulToMove,4000);
		},
		destroyed(){
			clearInterval(this.timer);
		}
	}
	
</script>

<style lang="less">
	.home-news{
		width: 95%;
		background-color: #fff;
		margin: -1rem auto;
		border-radius:0 0 1rem 1rem;
		&>div{
			height: 5rem;
			margin: 0 0.5rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			border-top: 1px solid #dfdfdf;
			overflow: hidden;
			.newsImg{
				width: 7rem;
				height: 3rem;
				margin-right: 0.5rem;
				img{
					height: 100%;
				}
			}
			.news_active{
				transition: all 0.5s;
			}
			.newsTitle{
				flex-grow: 1;
				position: absolute;
				top: 0;
				left: 7.5rem;
				li{
					height: 5rem;
					line-height: 5rem;
					a{
						font-size: 1.4rem;
						font-weight: 600;
					}
				}
			}
			.newsIcon{
				color: #f00;
			}
		}
	} 
</style>
