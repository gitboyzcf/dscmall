<!-- 商品模块一，结构相同有两个 -->
<template>
	<div class="goods-module-1">
		<div class="gm-bg">
			<img :src="bgDatas.bg" alt="">
			<div class="content">
				<swiper :options="swiperOption">
					<swiper-slide v-for="(item,index) in bgDatas.datas" :key="index">
						<img :src="item.img" alt="">
						<p>{{item.goods_name}}</p>
						<p>{{item.price}}</p>
					</swiper-slide>
				</swiper>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				swiperOption: {
					slidesPerView: 3,
					spaceBetween: 5, //设置模块之间的间距
				},
			}
		},
		components:{},
		props:{
			bgDatas:Object
		},
	}
</script>

<style lang="less">
	.goods-module-1{
		.gm-bg{
			height: 29.5rem;
			&>img{
				width: 100%;
				border-radius: 1rem;
			}
			.content{
				transform: translateY(-50%);
				padding: 0 0.5rem;
				.swiper-slide{
					border-radius: 1rem;
					overflow: hidden;
					background-color: #fff;
				}
				img{
					width: 100%;
				}
				p:nth-of-type(1){
					padding: 1rem;
					font-size: 1.4rem;
					height: 2em;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
				p:nth-of-type(2){
					padding: 0.5rem 1rem;
					font-size: 1.3rem;
					font-weight: 700;
					color: #f20e28;
				}
			}
		}
	}
</style>
