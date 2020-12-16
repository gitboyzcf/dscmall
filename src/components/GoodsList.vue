<!-- 获取所有商品 -->
<template>
	<div class="goods-list">
		<ul class="tabs">
			<li v-for="(tab,index) in tabsTitle" :key="index" @click="clickActive(index)">
				<span>{{tab.title}}</span>
				<span :class="{active:indexActive == index}">{{tab.tips}}</span>
			</li>
		</ul>
		<div class="content">
			<ul>
				<li v-for="(item,index) in goodsList" :key="index">
					<router-link :to="'/goodsdetail/'+item.goods_id">
						<img :src="item.goods_img" alt="">
						<p>{{item.title}}</p>
						<p>￥<span>{{item.shop_price}}</span></p>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	// import ajax from "@/api/ajaxApi.js";
	
	export default{
		data(){
			return{
				indexActive:0,
				tabsTitle:[{
					title:"精选",
					tips:"为你推荐",
				},{
					title:"社区",
					tips:"新奇好物",
				},{
					title:"新品",
					tips:"潮流上新",
				},{
					title:"热卖",
					tips:"火热爆款",
				},]
			}
		},
		// 接收父传来的数据
		props:{
			goodsList:Array,
		},
		methods:{
			clickActive(index){
				this.indexActive = index;
			}
		},
		watch:{
			indexActive(newIndex){
				console.log(newIndex);
				// 内容改变把值传出
				this.$emit("newIndex",newIndex);
			}
		}
	}
</script>

<style lang="less">
	.goods-list{
		.tabs{
			display: flex;
			margin-top: 2rem;
			li{
				border-right:2px solid #888 ;
				text-align: center;
				flex: 1;
				span{
					display: block;
					&:first-child{
						font-size: 1.6rem;
						font-weight: 600;
						margin-bottom: 2px;
					}
					&:last-child{
						color: #888;
						width: 6.5rem;
						border-radius: 1rem;
						margin: 0 auto;
					}
					&.active{
						background: linear-gradient(-88deg,#ff4f2e,#f91f28);;
						color: #fff;
					}
				}
				&:last-child{
					border-right: none;
				}
			}
		}
		.content{
			padding: 1rem;
			ul{
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				justify-content: space-between;
				li{
					width: 48%;
					background-color: #fff;
					margin: 0.5rem 0;
					border-radius: 1rem;
					overflow: hidden;
					img{
						width: 100%;
					}
					p:nth-of-type(1){
						height: 4rem;
						font-size: 1.5rem;
						padding: 0 1rem;
						margin: 1rem 0;
						color: #000;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
					p:nth-of-type(2){
						padding: 0 1rem 1rem;
						color: #f20e28;
						span{
							font-weight: 700;
							font-size: 1.8rem;
							color: rgb(242, 14, 40);
						}
					}
				}
			}
		}
	}
</style>
