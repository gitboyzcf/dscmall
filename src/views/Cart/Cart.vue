<!-- 购物车组件 -->
<template>
	<div class="cart">
		<!-- 有商品时显示 -->
		<div class="cart-wrap" v-if="cartData.length">
			<div class="top_address">
				<div class="left">
					<i class="iconfont icon-dingwei"></i>
					<span>{{cartData[0].child[0].address[0]}}</span>&nbsp;
					<span>{{cartData[0].child[0].address[1]}}</span>&nbsp;
					<span>{{cartData[0].child[0].address[2]}}</span>&nbsp;
				</div>
				<div class="right">
					<span>编辑商品</span>
				</div>
			</div>
			<div class="goods_shop" v-for="(item,index) in cartData" :key="index">
				<div class="shop_title">
					<div class="shop_select" @click="changeShopSelectStatus(index)">
						<i class="iconfont icon-danxuankuang" v-if="!item.shop_isSelect"></i>
						<i class="iconfont icon-danxuankuangxuanzhong" v-else style="color: #f44;"></i>
					</div>
					<div class="shop_name">
						<span>{{item.shop_name}}</span>
						<span>领取优惠券</span>
					</div>
				</div>
				<div class="goods_info" v-for="(itemChild,childIndex) in item.child" :key="childIndex">
					<div class="goods_select" @click="changeSelectStatue(item,index,childIndex)">
						<i class="iconfont icon-danxuankuang" v-if="!itemChild.isSelect"></i>
						<i class="iconfont icon-danxuankuangxuanzhong" v-else style="color: #f44;"></i>
					</div>
					<div class="goods_content" @click="toDetail(cartData[index].child[childIndex].goods_id)">
						<div class="top">
							<div class="g_img">
								<img :src="itemChild.goods_thumb" alt="">
							</div>
							<div class="g-info">
								<p>{{itemChild.goods_name}}</p>
								<div>
									<span>{{itemChild.shop_price | suffixFilter}}</span>
									<span>
										<em @click.stop="reduceGoods(index,childIndex)" :style="itemChild.value==1?'background:#f4f4f4':''">-</em>
										<input type="number" v-model="itemChild.value">
										<em @click.stop="addGoods(index,childIndex)">+</em>
										<i class="iconfont icon-shoucang1"></i>
										<i class="iconfont icon-shanchu" @click.stop="delGoods(index,childIndex)"></i>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
		<!-- 没有商品时显示 -->
		<div class="flow-no-cart" v-else>
			<div>
				<i class="iconfont icon-gouwuche"></i>
				<p>购物车空空如也，<router-link to="/home">去看看</router-link>
				</p>
			</div>
		</div>

		<!-- 价格计算 -->
		<div class="cart-submit" v-if="cartData.length">
			<div class="left">
				<div class="all-select" @click="changeSelectAllStatue">
					<i class="iconfont icon-danxuankuang" v-if="!selectV"></i>
					<i class="iconfont icon-danxuankuangxuanzhong" v-else style="color:#f44"></i>
					<span>全选</span>
				</div>
				<div class="count">
					<p>合计：<span>{{total}}</span></p>
					<p>(不含运费，以节省<span>￥0.00</span>)</p>
				</div>
			</div>
			<div class="right">
				去结算({{goods_count}})
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import 《组件名称》 from '《组件路径》';

	// 引入footer组件 @ 此符号默认指向src文件夹
	import Footer from "@/components/Footer.vue";
	// 引用vuex中的mapMutations提交简写
	import { mapMutations } from 'vuex';
	
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			Footer,
		},
		data() {
			//这里存放数据
			return {
				// selectAll:false,
			};
		},
		//监听属性 类似于data概念
		computed: {
			// 获取加入购物车的数据
			cartData() {
				return this.$store.state.cartDatas;
			},
			// 得到全选按钮的值
			selectV() {
				return this.$store.state.selectAll;
			},
			// 获取总价
			total() {
				let totalPrice = 0;
				this.$store.state.cartDatas.forEach(item => {
					item.child.forEach(itemChild => {
						if (itemChild.isSelect) {
							totalPrice += itemChild.shop_price * itemChild.value;
						}
					})
				})
				return totalPrice;
			},
			// 统计商品数量
			goods_count() {
				let num = 0;
				this.$store.state.cartDatas.forEach(item => {
					item.child.forEach(itemChild => {
						if (itemChild.isSelect) {
							num += itemChild.value;
						}
					});
				});
				return num;
			}
		},
		//监控data中的数据变化
		watch: {},
		filters: {
			// 去掉后缀 .00
			suffixFilter(args) {
				return args.slice(0, args.lastIndexOf("."));
			}
		},
		//方法集合
		methods: {
			// 商品列表按钮
			changeSelectStatue(item, p_index, c_index) {
				item.child[c_index].isSelect = !item.child[c_index].isSelect;
				// 提交修改状态管理
				this.$store.commit("changeSelectStatue", {
					item,
					p_index,
					c_index
				});
			},
			// 全选按钮
			changeSelectAllStatue() {
				this.$store.commit("changeSelectAllStatus");
			},
			// 店铺上的按钮
			changeShopSelectStatus(index) {
				this.$store.commit("changeShopSelectStatus", index);
			},
			// // 增加商品数量按钮
			// addGoods(shop_index, goods_index) {
			// 	this.$store.commit("addGoods", {
			// 		shop_index,
			// 		goods_index
			// 	})
			// },
			// // 减少商品数量
			// reduceGoods(shop_index, goods_index) {
			// 	this.$store.commit("reduceGoods", {
			// 		shop_index,
			// 		goods_index
			// 	})
			// },
			// // 删除商品
			// delGoods(shop_index, goods_index) {
			// 	this.$store.commit("delGoods",{shop_index,goods_index})
			// },
			// mutation的commit简写
			...mapMutations(["addGoods", "reduceGoods", "delGoods"]),
			// 点击商品进行跳转
			toDetail(gid) {
				this.$router.push("/goodsdetail/" + gid);
			}
		},
		mounted() {
			console.log(this.$store.state.cartDatas);
		}
	};
</script>
<style lang="less">
	.cart {
		width: 100%;
		height: 100%;
		background-color: #EFEFEF;
		position: fixed;
		overflow: auto;

		.flow-no-cart {
			padding: 1rem;
			text-align: center;
			line-height: 3rem;

			div {
				width: 100%;
				background-color: #fff;

				i {
					display: inline-block;
					width: 10rem;
					height: 10rem;
					line-height: 10rem;
					border-radius: 50%;
					background-color: #f8f8f8;
					font-size: 5rem;
					margin: 4rem 0;
				}

				p {
					padding-bottom: 2rem;
					font-size: 1.4rem;

					a {
						color: #f44;
					}
				}
			}
		}

		.cart-wrap {
			padding: 1rem 1rem 11rem;

			.top_address {
				display: flex;
				height: 2rem;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 2.5rem;

				.left {
					color: #666;

					i {
						vertical-align: middle;
					}

					span {
						font-size: 1.4rem;
					}
				}

				.right {
					font-size: 1.4rem;
					color: #f44;
				}
			}

			.goods_shop {
				margin-top: 1rem;

				.shop_title {
					display: flex;

					.shop_select {
						margin-right: 1rem;
					}

					.shop_name {
						flex: 1;
						display: flex;
						justify-content: space-between;

						span:nth-child(1) {
							font-size: 1.6rem;
							font-weight: 700;
						}

						span:nth-child(2) {
							font-size: 1.4rem;
							color: #f44;
						}
					}
				}

				.goods_info {
					display: flex;
					align-items: center;
					margin-top: 1rem;

					.goods_select {
						margin-right: 1rem;
					}

					.goods_content {
						background-color: #fff;
						padding: 1rem;

						.top {
							display: flex;

							.g_img {
								margin-right: 1rem;

								img {
									width: 7rem;
									height: 7rem;
								}
							}

							.g-info {
								display: flex;
								flex-direction: column;
								justify-content: space-between;

								p {
									font-size: 1.2rem;
									line-height: 1.6rem;
									display: -webkit-box;
									overflow: hidden;
									-webkit-line-clamp: 2;
									-webkit-box-orient: vertical;
									text-overflow: ellipsis;
								}

								&>div {
									display: flex;
									justify-content: space-between;

									span:nth-child(1) {
										color: #f44;
										font-size: 1.6rem;

										&::before {
											content: "￥";
											font-size: 1.2rem;
										}

										&::after {
											content: ".00";
											font-size: 1.2rem;
										}
									}

									span:nth-child(2) {
										input {
											width: 3rem;
											height: 2rem;
											text-align: center;
											border: 1px solid #EFEFEF;
											vertical-align: top;
										}

										em {
											display: inline-block;
											border: 1px solid #EFEFEF;
											font-size: 1.4rem;
											width: 2rem;
											height: 2rem;
											text-align: center;
											line-height: 2rem;
										}

										i:nth-of-type(1) {
											margin: 0 0.5rem;
										}
									}
								}
							}
						}
					}
				}
			}
		}

		.cart-submit {
			position: fixed;
			bottom: 5rem;
			left: 0;
			height: 5rem;
			width: 100%;
			background-color: #fff;
			z-index: 99;
			border-top: 1px solid #EFEFEF;
			display: flex;
			justify-content: space-between;

			.left {
				flex: 1;
				display: flex;
				justify-content: space-between;

				.all-select {
					height: 5rem;
					line-height: 5rem;
					padding: 0 1rem;

					span {
						vertical-align: top;
						margin-left: 0.5rem;
						font-size: 1.4rem;
					}
				}

				.count {
					text-align: right;
					padding-right: 0.5rem;
					line-height: 2rem;

					p:nth-child(1) {
						margin-top: 0.5rem;
						font-size: 1.4rem;

						span {
							color: #f44;
							font-size: 1.5rem;
							font-weight: 700;

							&::before {
								content: "￥";
								font-size: 1.2rem;
							}

							&::after {
								content: ".00";
								font-size: 1.2rem;
							}
						}
					}

					p:nth-child(2) {
						color: #999;
					}
				}
			}

			.right {
				width: 11rem;
				height: 5rem;
				line-height: 5rem;
				text-align: center;
				background-color: #f44;
				color: #fff;
				font-size: 1.4rem;
			}
		}
	}
</style>
