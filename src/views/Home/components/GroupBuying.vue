<!-- 拼团专区 -->
<template>
	<div class="group-buying">
		<div class="title">
			<router-link to="/team">
				<span>拼团专区</span>
				<span>拼着买更实惠</span>
				<span class="iconfont icon-jiantou1"></span>
			</router-link>
		</div>
		<div class="content">
			<swiper :options="swiperOption">
				<swiper-slide v-for="(items,index) in goodsDatas" :key="index">
					<img :src="items.goods_thumb" alt="">
					<p>{{items.goods_name}}</p>
					<p><img src="@/assets/images/下载.png" alt="">{{items.team_price_formated}}</p>
					<p>{{items.shop_price_formated}}</p>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script>
	import ajax from "@/api/ajaxApi.js"
	export default{
		data(){
			return{
				goodsDatas:[],
				swiperOption: {
					slidesPerView: 3,
					spaceBetween: 10, //设置模块之间的间距
				},
			}
		},
		methods:{
			async getGoods(){
				let result = await ajax("/visual/visual_team_goods");
				if(result){
					this.goodsDatas = result.data.data;
					// console.log(this.goodsDatas);
				}
			}
		},
		mounted(){
			this.getGoods();
		}
	}
</script>

<style lang="less">
	.group-buying{
		padding: 1rem ;
		.title{
			width: 100%;
			border-bottom: 1px solid #EFEFEF;
			padding-bottom: 1rem;
			span:nth-child(1){
				font-size: 1.8rem;
				font-weight: 700;
				margin-right: 1rem;
			}
			span:nth-child(2){
				color: #888;
				font-size: 1.4rem;
			}
			span:nth-child(3){
				color: #f20d23;
				font-size: 1.4rem;
				margin: 0 0 0 5px;
			}
		}
		.content{
			margin-top: 2rem;
			.swiper-slide{
				line-height: 2rem;
				text-align: center;
				img{
					width: 100%;
				}
				p:nth-of-type(1){
					color: #000;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}
				p:nth-of-type(2){
					color: #f20e28;
					font-weight: 700;
					font-size: 1.5rem;
					img{
						width: 1.8rem;
						margin-right: 5px;
						vertical-align: top;
					}
				}
				p:nth-of-type(3){
					color: #888888;
					text-decoration: line-through;
				}
			}
		}
	}	
</style>
