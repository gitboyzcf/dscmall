<!-- 分类中的单个商品类别 -->
<template>
	<!--  v-infinite-scroll="loadMore" -->
	<div class="category-list" ref="categoryList">
		<!-- <Loading  v-if="this.$store.state.showLoading"></Loading> -->
		<div ref="listGoods">
			<div class="header-list-goods">
				<div class="secrch-warp">
					<span class="iconfont icon-jiantou3" onclick="window.history.back();"></span>
					<router-link to="/search" tag="span"><input type="text" v-model="keywords"><i class="iconfont icon-sousuo1"></i></router-link>
					<span :class="toggleStyle?'iconfont icon-leimupinleifenleileibie':'iconfont icon-icon-viewlist'" @click="changeStyle"></span>
				</div>
				<div class="filter_tab">
					<ul >
						<li @click="allSort" :class="{active:active}" class="list-item">综合
							<i class="iconfont icon-xiala" v-if="toggle1"></i>
							<i class="iconfont icon-xiala2" v-else></i>
						</li>
						<li @click="newProductsSort" class="list-item">新品</li>
						<li @click="saleNum" class="list-item">销量</li>
						<li @click="priceSort" class="list-item">价格
							<i class="iconfont icon-xiala" v-if="toggle2"></i>
							<i class="iconfont icon-xiala2" v-else></i>
						</li>
						<li @click="showMask=!showMask"><i class="iconfont icon-shaixuan" style="font-size: 1.2rem; vertical-align: top;"></i>筛选</li>
					</ul>
				</div>
			</div>
			<div :class="toggleStyle? 'product-list':'product-list2'" >
				<ul ref="uls">
					<li v-for="item in categoryListDatas" :key="item.goods_id">
						<router-link :to="'/goodsdetail/'+item.goods_id">
							<img :src="item.goods_thumb" alt="商品">
							<div>
								<h4>{{item.goods_name}}</h4>
								<p>￥<span>{{item.shop_price}}</span></p>
								<div class="outer">
									<span>进店</span>
									<span><i>{{item.sales_volume}}</i>人已购买</span>
									<span class="iconfont icon-gouwuche1"></span>
								</div>
							</div>
						</router-link>
					</li>
				</ul>
				<div class="tip" v-if="getPostBool" style="color: #999;text-align: center;padding: 0.5rem 0;">—— 人家也是有底线的 ——</div>
			</div>
		</div>
		<!-- 筛选弹出 -->
		<transition name="sort">
			<div class="mask" v-if="showMask">
				<div class="top">
					<!-- 标题 -->
					<div class="title">
						<h2>自营产品</h2>
					</div>
					<!-- 选择 -->
					<div class="choice">
						<span>仅看有货</span>
						<span>促销</span>
					</div>
					<!-- 价格区间 -->
					<div class="price-range">
						<div class="pr-title">
							<h2>价格区间</h2>
						</div>
						<div class="price-input">
							<input type="number" v-model="min" placeholder="最低价" />
							<span>—</span>
							<input type="number" v-model="max" placeholder="最高价" />
						</div>
					</div>
					<!-- 品牌 -->
					<div class="brand">
						<h2>品牌</h2>
						<span class="iconfont icon-jiantou2"></span>

					</div>
				</div>
				<div class="bottom">
					<span class="close" @click="closeFn">关闭</span>
					<span class="ok" @click="okFn">确定</span>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	// import Loading from "@/components/Loading.vue";
	export default {
		data() {
			return {
				showMask:false,
				toggle1: true,
				toggle2: true,
				active: true,
				cat_id: 1131,
				size: 10,
				page: 1,
				sort: "goods_id",
				order: "desc",
				keywords:"",
				min: "",
				max: "",
				oH:"0",
			}
		},
		components:{
			// Loading,
		},
		methods: {
			// 排他
			exclusive(e) {
				let listItems = document.querySelectorAll(".list-item");
				for (let i = 0; i < listItems.length; i++) {
					listItems[i].setAttribute("class", "list-item");
				}
				e.target.setAttribute("class", "list-item active");
			},
			// 点击修改布局
			changeStyle() {
				this.$store.commit("changeToggleStyle", !this.$store.state.toggleStyle);
			},
			// 综合事件
			allSort(e) {
				this.toggle1 = !this.toggle1;
				this.exclusive(e);
				this.sort = "goods_id";
				this.listInit();
				if (this.toggle1) {
					this.order = "desc";
					this.postCategoryList();
				} else {
					this.order = "asc";
					this.postCategoryList();
				}
			},
			// 新品事件
			newProductsSort(e) {
				this.exclusive(e); //清除其它的样式
				//当点击其它 将综合、价格箭头重置
				this.toggle1 = true;
				this.toggle2 = true;
				this.order = "desc";
				this.sort = "last_update";
				this.listInit();
				this.postCategoryList(); //请求数据
			},
			// 销量事件
			saleNum(e) {
				this.exclusive(e);
				this.toggle1 = true;
				this.toggle2 = true;
				this.order = "desc";
				this.sort = "sales_volume";
				this.listInit();
				this.postCategoryList();
			},
			// 价格事件
			priceSort(e) {
				this.toggle2 = !this.toggle2;
				this.exclusive(e);
				this.sort = "shop_price";
				this.listInit();
				if (this.toggle2) {
					this.order = "desc";
					this.postCategoryList();
				} else {
					this.order = "asc";
					this.postCategoryList();
				}
			},
			
			// 筛选里的确定事件
			okFn(){
				this.listInit();
				this.postCategoryList();
				this.showMask = false;
			},
			// 筛选里的关闭事件
			closeFn(){
				this.showMask = false;
				this.min = "";
				this.max = "";
				this.listInit();
				this.postCategoryList();
			},
			// 对数据初始化
			listInit(){
				this.$store.state.categoryListDatas = [];
				this.$store.state.postBool = false;
				this.page = 1;
			},
			
			// post请求的方法
			postCategoryList() {
				let listObj = {
					cat_id: this.cat_id,
					size: this.size,
					page: this.page,
					sort: this.sort,
					order: this.order,
					min: this.min,
					max: this.max,
					keywords:this.keywords,
				}
				this.$store.dispatch("actChangeCategoryList", listObj);
			},
			// 触底操作
			touchBottom(){
				let that = this;
				this.$refs.categoryList.onscroll = function(){
					let y1 = Math.ceil(this.scrollTop+this.offsetHeight);
					let y2 = that.$refs.listGoods.scrollHeight;
					if(y1 == y2 || y1 > y2){
						console.log("触底");
						that.page++;
						that.postCategoryList();
					}
					
				}
			}
		},
		computed: {
			toggleStyle() {
				return this.$store.state.toggleStyle;
			},
			categoryListDatas() {
				return this.$store.state.categoryListDatas;
			},
			getPostBool(){
				return this.$store.state.postBool;
			}
		},
		watch:{
			cat_id:function(){
				this.$store.state.categoryListDatas = [];
				this.$store.state.postBool = false;
			}
		},
		mounted() {
			this.cat_id = this.$route.params.cid;
			this.keywords = this.$route.query.keywords;
			this.postCategoryList();
			this.touchBottom();
			
		},
	}
</script>

<style lang="less">
	.sort-enter,.sort-leave-to{
		transform: translateX(100%);
	}
	.sort-enter-active,.sort-leave-active{
		transition: all 0.3s linear;
	}
	.category-list {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #F4F4F4;
		overflow-x: hidden;

		.mask {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			background-color: #EFEFEF;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.top {
				width: 100%;

				h2 {
					font-weight: normal;
				}

				.title {
					display: flex;
					height: 4.5rem;
					line-height: 4.5rem;
					padding: 0 1rem;
					background-color: #fff;
					margin-bottom: 1rem;
				}

				.choice {
					padding: 1rem;
					color: #666;
					background-color: #fff;
					margin-bottom: 1rem;
					display: flex;

					span {
						width: 12.1rem;
						height: 2.5rem;
						margin-right: 1rem;
						background-color: #f7f7f7;
						text-align: center;
						line-height: 2.5rem;
					}
				}

				.price-range {
					background-color: #fff;
					margin-bottom: 1rem;

					.pr-title {
						padding: 1rem;
						border-bottom: 1px solid #f7f7f7;
					}

					.price-input {
						padding: 1rem;

						input {
							height: 5rem;
							width: 12.6rem;
							background-color: #f7f7f7;
							text-align: center;
						}

						span {
							margin: 0 1rem;
							color: #ccc;
						}
					}
				}

				.brand {
					display: flex;
					padding: 1rem;
					background-color: #fff;
					justify-content: space-between;
				}
			}

			.bottom {
				display: flex;

				span {
					flex: 1;
					height: 4.9rem;
					text-align: center;
					line-height: 4.9rem;
					font-size: 1.4rem;
				}

				span:first-child {
					background-color: #fff;
				}

				span:last-child {
					background-color: #e93b3d;
					color: #fff;
				}
			}
		}

		.header-list-goods {
			background-color: #fff;

			.secrch-warp {
				width: 100%;
				padding: 0.8rem 0;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #f1f1f1;

				span:nth-child(1),
				span:nth-child(3) {
					margin: 0 1rem;
				}

				span:nth-child(3) {
					font-size: 2rem;
					color: #666;
				}

				span:nth-child(2) {
					flex: 1;
					border: 1px solid #ddd;
					height: 3rem;
					border-radius: 1.5rem;
					position: relative;

					input {
						height: 100%;
						width: 80%;
						border-radius: 1.5rem;
					}

					i {
						color: #999;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						right: 1rem;
					}
				}
			}

			.filter_tab {
				background-color: #fff;
				width: 100%;
				height: 3.5rem;

				ul {
					display: flex;
					font-size: 1.4rem;

					li {
						width: 20%;
						height: 3.5rem;
						text-align: center;
						line-height: 3.5rem;

						i {
							vertical-align: middle;
						}
					}

					.active {
						color: #f00;
					}
				}
			}
		}

		.product-list {
			padding: 0.5rem 0.5rem 0;

			ul {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				height:100%;
				li {
					width: 49%;
					background-color: #fff;
					border-radius: 1rem;
					overflow: hidden;
					margin: 0.4rem 0;

					img {
						width: 100%;
					}

					& a>div {
						h4 {
							font-weight: normal;
							font-size: 1.4rem;
							padding: 0 0.5rem;
							height: 3.8rem;
							line-height: 1.9rem;
							overflow: hidden;
							display: -webkit-box;
							text-overflow: ellipsis;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}


						p {
							color: #f00;
							margin: 1rem 0;
							padding: 0 0.5rem;

							span {
								font-size: 1.4rem;
								font-weight: 700;
							}
						}
					}

					.outer {
						display: flex;
						align-items: center;
						padding: 0 0.5rem 1rem;

						span:first-child {
							margin-right: 0.5rem;
							padding: 1px 5px;
							background-color: #fef0f0;
							color: #f00;
							border-radius: 0.2rem;
							font-size: 1.3rem;
						}

						span:nth-child(2) {
							flex: 1;
							color: #999;
						}

						span:last-child {
							color: #f00;
						}
					}

				}
			}

		}

		.product-list2 {
			padding: 0.5rem 0.5rem 0;

			ul {
				display: flex;
				flex-direction: column;

				li a {
					width: 100%;
					background-color: #fff;
					border-radius: 1rem;
					overflow: hidden;
					display: flex;
					margin-bottom: 0.5rem;

					img {
						width: 9rem;
					}

					&>div {
						h4 {
							font-weight: normal;
							font-size: 1.4rem;
							padding: 0 0.5rem;
							height: 3.8rem;
							line-height: 1.9rem;
							overflow: hidden;
							display: -webkit-box;
							text-overflow: ellipsis;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}

						p {
							color: #f00;
							margin: 1rem 0;
							padding: 0 0.5rem;

							span {
								font-size: 1.4rem;
								font-weight: 700;
							}

							span::before {
								content: "￥";
							}
						}

					}

					.outer {
						display: flex;
						align-items: center;
						padding: 0 0.5rem 1rem;

						span:first-child {
							margin-right: 0.5rem;
							padding: 1px 5px;
							background-color: #fef0f0;
							color: #f00;
							border-radius: 0.2rem;
							font-size: 1.3rem;
						}

						span:nth-child(2) {
							flex: 1;
							color: #999;
						}

						span:last-child {
							color: #f00;
						}
					}

				}
			}
		}
	}
</style>
