<!-- 首页组件 -->
<template>
	<div class="home-page">
		<!-- 使用公共搜索栏组件 -->
			<home-header :class="{activeBg:bool}"></home-header>
			<div :class="{activeBg:bool}" class="navbar">
				<!-- 使用组件库中的tab切换效果 -->
				<ly-tab v-model="selectedId" :items="items" :options="options" @change="changeTab">

				</ly-tab>
				<!-- 右边分类 -->
				<div class="category-btn">
					<router-link to="/category">
						<i class="iconfont icon-fenlei"></i>
						<span>分类</span>
					</router-link>
				</div>
			</div>
			
		<div class="no" v-show="this.$route.path != '/home/index'"></div>
		<div>
			<!-- 把所有的公共头部除首页内容 -->
			<div style="height: 8.8rem;" v-if="this.$route.path != '/home/index'"></div>
			<!-- 首页内容展示 -->
			<router-view></router-view>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import 《组件名称》 from '《组件路径》';
	// 引入footer组件 @ 此符号默认指向src文件夹
	import Footer from "@/components/Footer.vue";
	// 引入home文件夹下公共组件首页头部
	import HomeHeader from "./components/HomeHeader.vue";

	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			// 引入公共样式组件
			Footer,
			HomeHeader,
		},
		data() {
			//这里存放数据
			return {
				bool:false,
				selectedId: 0,
				items: [{
					label: "首页"
				}, {
					label: "家用电器",
				}, {
					label: "男装女装",
				}, {
					label: "鞋靴箱包",
				}, {
					label: "手机数码",
				}, {
					label: "电脑办公",
				}, {
					label: "家居家纺",
				}, {
					label: "个人化妆",
				}, ],
				// 选中的字体
				options: {
					activeColor: "#fff",
				},
				routerDatas: ["/home/index", "/home/household", "/home/clothing", "/home/shoebag", "/home/mobilephones",
					"/home/computer", "/home/hometextiles", "/home/personalmakeup"
				]
			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			changeTab(item, index) {
				// 跳转链接
				this.$router.push(this.routerDatas[index]);
				
			},
		},
		mounted(){
			// 判断是否为首页内容
			this.routerDatas.forEach((item,index)=>{
				if(this.$route.path == item){
					this.selectedId = index;
				}
			});
			
			
			window.addEventListener("scroll",()=>{
				if(document.documentElement.scrollTop>=200){
					this.bool = true;
				}else{
					this.bool = false;
				}
			})
		}
	};
</script>
<style lang="less">
	.home-page {
		background-color: #f4f4f4;
		padding-bottom: 5rem;
		.navbar {
			width: 100%;
			position: absolute;
			top: 4.4rem;
			left: 0px;
			background-color: transparent;
			display: flex;
			z-index: 99;

			.ly-tab {
				width: 85%;

				.ly-tabbar {
					background-color: transparent;
					border: 0;
					box-shadow: none;

					.ly-tab-list {
						a {
							color: #fff;
						}
					}
				}
			}

			.category-btn {
					width: 15%;
				a{
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;

					i {
						font-size: 2rem;
						box-shadow: -6px 0px 4px -4px rgba(0, 0, 0, .4);
					}
					span{
						font-size: 1.3rem;
					}
					
				}
			}
		}

		.no {
			width: 100%;
			height: 8.8rem;
			position: fixed;
			left: 0;
			top: 0;
			background-color: rgb(243, 70, 70);
			z-index: 9;
		}
	}
	.activeBg{
		position: fixed !important;
		background-color: rgb(228, 49, 36) !important;
	}
</style>
