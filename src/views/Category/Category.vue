<!-- 分类组件 -->
<template>
	<div class="category">
		<div class="c_search">
			<a href="javascript:;" class="iconfont icon-jiantou3" onclick="window.history.back()"></a>
			<span>
				<router-link type="text" to="/search" tag="input"></router-link>
				<i class="iconfont icon-sousuo1"></i>
			</span>
		</div>
		<div class="c_centent">
			<category-content></category-content>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import 《组件名称》 from '《组件路径》';

	// 引入footer组件 @ 此符号默认指向src文件夹
	import Footer from "@/components/Footer.vue";
	// 引入分类具体内容组件
	import CategoryContent from "./components/CategoryContent.vue";
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			Footer,
			CategoryContent,
		},
		data() {
			//这里存放数据
			return {};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {},
	};
</script>
<style lang="less">
	.category {
		margin: 4.4rem 0 4.9rem 0;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		height: calc(100% - 9.3rem);
		display: flex;
		overflow: auto;

		.c_search {
			width: 100%;
			height: 5rem;
			padding: 1rem;
			height: calc(5rem - 2rem);
			width: calc(100% - 2rem);
			border-bottom: 1px solid #EFEFEF;
			display: flex;
			align-items: center;
			z-index: 99;
			background-color: #fff;
			position: fixed;
			top: 0;
			left: 0;

			span:nth-child(2) {
				height: 100%;
				border: 1px solid #ddd;
				width: 90%;
				border-radius: 1.5rem;
				margin-left: 1rem;
				overflow: hidden;
				position: relative;
			}

			i {
				position: absolute;
				top: 50%;
				right: 1rem;
				transform: translateY(-50%);
			}
		}
	}
</style>
