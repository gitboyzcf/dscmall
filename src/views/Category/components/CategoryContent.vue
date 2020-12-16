<!-- 分类的具体内容组件 -->
<template>
	<div class="category-content">
		<Loading v-if="isShowLoading"></Loading>
		<div class="left_tabs">
			<swiper :options="swiperOption">
				<swiper-slide>
					<ul>
						<li v-for="item in categoryLeftDatas" :key="item.cat_id" @click="getGoodsData(item.cat_id)" :class="{active:activeIndex == item.cat_id}">{{item.cat_name}}</li>
					</ul>
				</swiper-slide>
			</swiper>
		</div>
		<div class="right_contniner" id="wrapper">
			<div class="category-right-content">
				<img :src="categoryImg" alt="">
				<div class="goods-type">
					<ul v-for="(items,index) in categoryRightDatas" :key="index" class="item">
						<li>{{items.cat_name}}</li>
						<li>
							<div v-for="(item,index) in items.child" :key="index">
								<router-link :to="'/categoryList/'+item.cat_id">
									<img :src="item.touch_icon" alt="">
									<p>{{item.cat_name}}</p>
								</router-link>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// 加载图标
	import Loading from "@/components/Loading.vue";
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				activeIndex: "858",
				swiperOption: {
					direction: 'vertical',
				},
				scrollObj: null,
				scrollTop: 0,
				oHeight: 0,
				arr: ["858", "6", "8", "3", "4", "5", "860"],
			}
		},
		components: {
			Loading,
		},
		methods: {
			// 点击tabs切换触发的方法
			getGoodsData(cat_id) {
				this.activeIndex = cat_id;
				this.$store.dispatch("actChangeCat_right", cat_id);
			},

			getScrollObj() {

				this.scrollObj = new BScroll('#wrapper', {
					pullUpLoad: true,
					scrollbar: false,
					pullDownRefresh: true,
					click: true, //解决阻止事件的默认行为
				});

				let da = document.querySelector(".category-right-content");
				let xiao = document.querySelector(".right_contniner");
				this.scrollObj.on("scroll", (obj) => {
					this.scrollTop = Math.abs(obj.y);
					// console.log(obj.y);
					if (da) {
						// 存入计算的值
						this.oHeight = da.scrollHeight - xiao.offsetHeight;
					}
					// 判断当前滑动的距离是否大于计算的距离
					// if (this.scrollTop > this.oHeight + 100) {
					// 	let index = this.arr.findIndex(val => val == this.$store.state.cat_id);
						// 当滑动到底部时进行请求下一分类
						// this.$store.dispatch("actChangeCat_right",this.arr[index+1]);
						// this.activeIndex = index;
						// da.style.transform = "translateX(0px) translateY(0) translateZ(1px)";
					// }

				})
			}
		},
		computed: {
			categoryLeftDatas() {
				return this.$store.state.categoryLeftDatas;
			},
			categoryRightDatas() {
				return this.$store.state.categoryRightDatas;
			},
			categoryImg() {
				return this.$store.state.ad;
			},
			isShowLoading() {
				return this.$store.state.showLoading;
			}
		},
		mounted() {
			this.$store.dispatch("actChangeCat_left");
			this.$store.dispatch("actChangeCat_right", this.activeIndex);

			this.getScrollObj();
			this.$nextTick(() => {
				this.scrollObj.refresh();
				// console.log(this.scrollObj)
			})


		},
	}
</script>

<style lang="less">
	.category-content {
		width: 100%;
		height: 100%;
		display: flex;
		overflow-y: hidden;

		.left_tabs {
			width: 25%;
			height: 100%;
			position: fixed;
			top: 5rem;
			left: 0;

			.swiper-container {
				height: 100%;
				border-right: .05rem solid #f5f5f5;

				.swiper-slide {
					height: 100% !important;
				}
			}

			ul {
				li {
					padding: 0 1.5rem;
					margin: 2rem 0;
					color: #999;
					font-size: 1.4rem;
				}

				.active {
					border-left: .25rem solid #f23030;
					color: #f23030;
					box-sizing: border-box;
					padding: 0 1.3rem;
				}
			}
		}

		.right_contniner {
			width: 75%;
			height: 100%;
			margin-left: 25%;
			padding: 1rem;
			margin-top: 1rem;
			height: calc(100% - 2rem);

			&>.category-right-content {
				&>img {
					width: 100%;
					height: 9.6rem;
				}

				.goods-type {
					ul {
						li:nth-child(1) {
							text-align: center;
							margin: 1rem 0;
							font-size: 1.4rem;
						}

						li:nth-child(2) {
							display: flex;
							flex-wrap: wrap;
							justify-content: space-between;

							div {
								width: 33%;
								height: 8.2rem;
								text-align: center;
								margin-bottom: 2rem;
								color: #777;

								img {
									width: 5.2rem;
									height: 5.2rem;
								}
							}
						}
					}

				}
			}

		}
	}
</style>
