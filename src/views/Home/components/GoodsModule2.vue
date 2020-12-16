<!-- 商品模块二，结构相同有两个 -->
<template>
	<div class="goods-module-2">
		<div class="gm-bg" :style="{backgroundColor:bgDatas.bgColor}">
			<img :src="bgDatas.bg" alt="">
			<div class="content">
				<ul>
					<li v-for="(item,index) in bgDatas.datas" :key="index">
						<img :src="item.img" alt="">
						<p>{{item.goods_name}}</p>
						<p>{{item.price}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
			}
		},
		props:{
			bgDatas:Object,
		}
		
	}
</script>

<style lang="less">
	.goods-module-2{
		.gm-bg{
			border-radius: 1rem;
			overflow: hidden;
			&>img{
				width: 100%;
			}
			.content{
				padding: 1rem;
				margin-top: -95px;
				ul{
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					li{
						width: 31%;
						background-color: #fff;
						border-radius: 1rem;
						overflow: hidden;
						margin-bottom: 1rem;
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
		}
	}
</style>
