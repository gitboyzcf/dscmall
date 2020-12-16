<!-- 首页内容 -->
<template>
	<div class="index-page" v-infinite-scroll="loadMore">
		<loading v-if="isShowLoading"></loading>
		<!-- 用于占位 -->
		<div class="index-header" :style="colorObj"></div>
		<!-- 引入轮播图 -->
		<!-- changeColor 指的是Swiper组件$emit广播出来的数据 -->
		<!-- getColor 在此组件中定义的方法 接收广播事件带来的数据 -->
		<swiper class="index-swiper" @changeColor="getColor"></swiper>
		<nav-swiper></nav-swiper>
		<home-news></home-news>
		<div class="index_advert">
			<a href="javascript:;">
				<img src="@/assets/images/index-advert.png" alt="">
			</a>
		</div>
		<!-- 秒杀 -->
		<div class="hs">
			<home-seckill></home-seckill>
		</div>
		<!-- 拼团专区 -->
		<div class="bg">
			<group-buying></group-buying>
		</div>
		<!-- 潮流科技 -->
		<div class="bg" style="background-color: transparent;">
			<goods-module1 :bg-datas="modelBgAndData1"></goods-module1>
		</div>
		<!-- 美妆个护 -->
		<div class="bg" style="background-color: transparent;">
			<goods-module1 :bg-datas="modelBgAndData2"></goods-module1>
		</div>
		<!-- 品质服饰 -->
		<div class="bg">
			<goods-module2 :bg-datas="goodsList1"></goods-module2>
		</div>
		<!-- 轻奢小调 -->
		<div class="bg">
			<goods-module2 :bg-datas="goodsList2"></goods-module2>
		</div>
		<!-- 店铺推荐 -->
		<div class="bg">
			<home-store></home-store>
		</div>
		<!-- 最后的tabs切换 -->
		<div class="">
			<!-- 父数据传子数据 -->
			<goods-list :goods-list="listDatas" @newIndex="getIndex"></goods-list>
		</div>
		
	</div>
</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import 《组件名称》 from '《组件路径》';
	// 导入公共轮播图Swiper
	import Swiper from "@/components/Swiper.vue";
	// 导入轮播导航组件
	import NavSwiper from "../components/IndexNavSwiper.vue";
	// 导航下的新闻
	import HomeNews from "../components/HomeNews.vue";
	// 秒杀组件
	import HomeSeckill from "../components/HomeSeckill.vue";
	// 拼团专区
	import GroupBuying from "../components/GroupBuying.vue";
	// 潮流科技-美妆个护  共用
	import GoodsModule1 from "../components/GoodsModule1.vue";
	// 品质服饰-轻奢小调  共用
	import GoodsModule2 from "../components/GoodsModule2.vue";
	// 店铺推荐组件
	import HomeStore from "../components/HomeStore.vue";
	// 公共的数据组件
	import GoodsList from "@/components/GoodsList.vue";
	// 引入加载组件
	import Loading from "@/components/Loading.vue";
	
	// 引入封装的Axios
	import ajax from "@/api/ajaxApi.js";
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			Swiper,
			NavSwiper,
			HomeNews,
			HomeSeckill,
			GroupBuying,
			GoodsModule1,
			GoodsModule2,
			HomeStore,
			GoodsList,
			Loading,
		},
		data() {
			//这里存放数据
			return {
				colorObj: {
					backgroundColor: "rgb(243, 70, 70)",
				},
				colorColor: ["rgb(243, 70, 70)", "rgb(228, 49, 36)", "rgb(60, 129, 255)", "rgb(2, 131, 121)", "rgb(64, 145, 255)"],
				
				// 模块背景和数据1
				modelBgAndData1:{
					bg:require("@/assets/images/bg1.jpeg"),
					datas:[{
						img:"https://img14.360buyimg.com/n1/s800x800_jfs/t1/146821/16/5045/125120/5f30a5a6E73b1b57d/e93faa593b84e9dc.jpg?imageView2/2/format/webp",
						goods_name:"猫王收音机 猫王小王子otr便携式智能蓝牙音箱收音机复古迷你低音炮可爱无线小音响【私人企业定制礼品】 嬉皮红+【福利3选1】",
						price:"￥398.00"
					},{
						img:"https://img14.360buyimg.com/n1/s800x800_jfs/t1/85352/9/18726/144442/5e967c4fE4f13970d/4d14742ae133cc3a.jpg?imageView2/2/format/webp",
						goods_name:"雷瓦 大功率可折叠负离子护发电吹风机RC-7800",
						price:"￥499.00"
					},{
						img:"https://img14.360buyimg.com/n1/s800x800_jfs/t1/111237/22/12261/71627/5f0e935fE3ebba938/6713341b3b17ffd5.jpg?imageView2/2/format/webp",
						goods_name:"beats Beats Studio3 Wireless苹果魔音耳机头戴式录音师3无线蓝牙降噪耳麦 魅影灰（6期分期免息） 通用版",
						price:"￥1698.00"
					},{
						img:"https://img14.360buyimg.com/n1/s800x800_jfs/t1/146821/16/5045/125120/5f30a5a6E73b1b57d/e93faa593b84e9dc.jpg?imageView2/2/format/webp",
						goods_name:"猫王收音机 猫王小王子otr便携式智能蓝牙音箱收音机复古迷你低音炮可爱无线小音响【私人企业定制礼品】 嬉皮红+【福利3选1】",
						price:"￥398.00"
					},{
						img:"https://img14.360buyimg.com/n1/s800x800_jfs/t1/146821/16/5045/125120/5f30a5a6E73b1b57d/e93faa593b84e9dc.jpg?imageView2/2/format/webp",
						goods_name:"猫王收音机 猫王小王子otr便携式智能蓝牙音箱收音机复古迷你低音炮可爱无线小音响【私人企业定制礼品】 嬉皮红+【福利3选1】",
						price:"￥398.00"
					}],
				},
				modelBgAndData2:{
					bg:require("@/assets/images/bg2.jpeg"),
					datas:[{
						img:"https://img.alicdn.com/imgextra/i4/2064892827/O1CN01X42esX1WkoIU0ZKn3_!!2064892827-0-lubanu-s.jpg_800x800.jpg?imageView2/2/format/webp",
						goods_name:"【七夕礼物】雅诗兰黛倾慕晶彩唇膏 保湿补水 滋润防水 130枫叶色",
						price:"￥280.00"
					},{
						img:"https://img.alicdn.com/imgextra/i1/2064892827/O1CN01xXHwr31WkoFNkKLKZ_!!0-item_pic.jpg_800x800.jpg?imageView2/2/format/webp",
						goods_name:"雅诗兰黛大牌蜜粉 臻透无痕蜜粉10g 定妆遮瑕",
						price:"￥500.00"
					},{
						img:"https://img.alicdn.com/imgextra/i4/2064892827/O1CN01X42esX1WkoIU0ZKn3_!!2064892827-0-lubanu-s.jpg_800x800.jpg?imageView2/2/format/webp",
						goods_name:"【七夕礼物】雅诗兰黛倾慕晶彩唇膏 保湿补水 滋润防水 130枫叶色",
						price:"￥280.00"
					},{
						img:"https://img.alicdn.com/imgextra/i4/2064892827/O1CN01X42esX1WkoIU0ZKn3_!!2064892827-0-lubanu-s.jpg_800x800.jpg?imageView2/2/format/webp",
						goods_name:"【七夕礼物】雅诗兰黛倾慕晶彩唇膏 保湿补水 滋润防水 130枫叶色",
						price:"￥280.00"
					},{
						img:"https://img.alicdn.com/imgextra/i4/2064892827/O1CN01X42esX1WkoIU0ZKn3_!!2064892827-0-lubanu-s.jpg_800x800.jpg?imageView2/2/format/webp",
						goods_name:"【七夕礼物】雅诗兰黛倾慕晶彩唇膏 保湿补水 滋润防水 130枫叶色",
						price:"￥280.00"
					},{
						img:"https://img.alicdn.com/imgextra/i4/2064892827/O1CN01X42esX1WkoIU0ZKn3_!!2064892827-0-lubanu-s.jpg_800x800.jpg?imageView2/2/format/webp",
						goods_name:"【七夕礼物】雅诗兰黛倾慕晶彩唇膏 保湿补水 滋润防水 130枫叶色",
						price:"￥280.00"
					}],
				},
				// 模块背景和数据2
				goodsList1:{
					bg:require("@/assets/images/bg3.jpeg"),
					bgColor:"rgb(204, 183, 161)",
					datas:[{
						img:"https://img14.360buyimg.com/n1/s800x800_jfs/t1/138880/22/6489/135565/5f4332e6E2b89c8f9/f8e10228bd2d311a.jpg?imageView2/2/format/webp",
						goods_name:"得听格子衬衫女长袖2020秋季新款小清新韩版宽松百搭学生春秋装纯棉衬衫大码外套上衣女 天蓝色 M",
						price:"￥78.00",
					},{
						img:"https://img14.360buyimg.com/n1/s800x800_jfs/t1/138880/22/6489/135565/5f4332e6E2b89c8f9/f8e10228bd2d311a.jpg?imageView2/2/format/webp",
						goods_name:"得听格子衬衫女长袖2020秋季新款小清新韩版宽松百搭学生春秋装纯棉衬衫大码外套上衣女 天蓝色 M",
						price:"￥78.00",
					},{
						img:"https://img14.360buyimg.com/n1/s800x800_jfs/t1/138880/22/6489/135565/5f4332e6E2b89c8f9/f8e10228bd2d311a.jpg?imageView2/2/format/webp",
						goods_name:"得听格子衬衫女长袖2020秋季新款小清新韩版宽松百搭学生春秋装纯棉衬衫大码外套上衣女 天蓝色 M",
						price:"￥78.00",
					},{
						img:"https://img14.360buyimg.com/n1/s800x800_jfs/t1/138880/22/6489/135565/5f4332e6E2b89c8f9/f8e10228bd2d311a.jpg?imageView2/2/format/webp",
						goods_name:"得听格子衬衫女长袖2020秋季新款小清新韩版宽松百搭学生春秋装纯棉衬衫大码外套上衣女 天蓝色 M",
						price:"￥78.00",
					},{
						img:"https://img14.360buyimg.com/n1/s800x800_jfs/t1/138880/22/6489/135565/5f4332e6E2b89c8f9/f8e10228bd2d311a.jpg?imageView2/2/format/webp",
						goods_name:"得听格子衬衫女长袖2020秋季新款小清新韩版宽松百搭学生春秋装纯棉衬衫大码外套上衣女 天蓝色 M",
						price:"￥78.00",
					},{
						img:"https://img14.360buyimg.com/n1/s800x800_jfs/t1/138880/22/6489/135565/5f4332e6E2b89c8f9/f8e10228bd2d311a.jpg?imageView2/2/format/webp",
						goods_name:"得听格子衬衫女长袖2020秋季新款小清新韩版宽松百搭学生春秋装纯棉衬衫大码外套上衣女 天蓝色 M",
						price:"￥78.00",
					}]
				},
				goodsList2:{
					bg:require("@/assets/images/bg4.jpeg"),
					bgColor:"rgb(44, 77, 105)",
					datas:[{
						img:"https://img.alicdn.com/imgextra/i2/2087981999/O1CN011v6EW81QdaJzw6uUK_!!0-item_pic.jpg_800x800.jpg?imageView2/2/format/webp",
						goods_name:"DR FLOWER LOVE系列玫瑰耳饰钻石群镶耳钉白红黄18K金浪漫送女友",
						price:"￥2799.00",
					},{
						img:"https://img.alicdn.com/imgextra/i2/2087981999/O1CN011v6EW81QdaJzw6uUK_!!0-item_pic.jpg_800x800.jpg?imageView2/2/format/webp",
						goods_name:"DR FLOWER LOVE系列玫瑰耳饰钻石群镶耳钉白红黄18K金浪漫送女友",
						price:"￥2799.00",
					},{
						img:"https://img.alicdn.com/imgextra/i2/2087981999/O1CN011v6EW81QdaJzw6uUK_!!0-item_pic.jpg_800x800.jpg?imageView2/2/format/webp",
						goods_name:"DR FLOWER LOVE系列玫瑰耳饰钻石群镶耳钉白红黄18K金浪漫送女友",
						price:"￥2799.00",
					},{
						img:"https://img.alicdn.com/imgextra/i2/2087981999/O1CN011v6EW81QdaJzw6uUK_!!0-item_pic.jpg_800x800.jpg?imageView2/2/format/webp",
						goods_name:"DR FLOWER LOVE系列玫瑰耳饰钻石群镶耳钉白红黄18K金浪漫送女友",
						price:"￥2799.00",
					},{
						img:"https://img.alicdn.com/imgextra/i2/2087981999/O1CN011v6EW81QdaJzw6uUK_!!0-item_pic.jpg_800x800.jpg?imageView2/2/format/webp",
						goods_name:"DR FLOWER LOVE系列玫瑰耳饰钻石群镶耳钉白红黄18K金浪漫送女友",
						price:"￥2799.00",
					},{
						img:"https://img.alicdn.com/imgextra/i2/2087981999/O1CN011v6EW81QdaJzw6uUK_!!0-item_pic.jpg_800x800.jpg?imageView2/2/format/webp",
						goods_name:"DR FLOWER LOVE系列玫瑰耳饰钻石群镶耳钉白红黄18K金浪漫送女友",
						price:"￥2799.00",
					}],
				},
				
				listDatas:[],
				page:1,
				size:10,
				type:"is_best",
				// is_new
				// is_hot
				
				isShowLoading:false,
			}
		},
		//方法集合
		methods: {
			getColor(data) {
				// 更换背景颜色
				this.colorObj.backgroundColor = this.colorColor[data];
			},
			
			async getBestDatas(page,size,type){
				this.isShowLoading = true;//请求数据时图标显示
				let result = await ajax("/goods/type_list",{
					page:page,
					size:size,
					type:type,
				});
				if(result.data.data){
					this.isShowLoading = false;
					this.listDatas = this.listDatas.concat(result.data.data);
					// console.log(this.listDatas instanceof Array)
				}
			},
			// 接收子组件传出的数据
			getIndex(data){
				// 判断点击的是哪个
				switch(data){
					case 0:
						this.page = 1;
						this.listDatas = [];
						this.type = "is_best";
						break;
					case 1:
						this.page = 1;
						this.listDatas = [];
					// 得不到、获取的数据不一样
						ajax("/discover/find_list",{
							page:this.page,
							size:this.size,
						}).then(rel=>{
							this.listDatas = rel.data.data;
							console.log(this.listDatas)
						})
						break;
					case 2:
						this.page = 1;
						this.listDatas = [];
						this.type = "is_new";
						break;
					case 3:
						this.page = 1;
						this.listDatas = [];
						this.type = "is_hot";
						break;
				}
			},
			// 页面到底部 进行请求数据
			loadMore(){
				console.log(111);
				// 页面到底，页数改变，再次请求
				this.getBestDatas(this.page,this.size,this.type);
				this.page++;
			}
				
		},
		mounted(){
			// this.getBestDatas(this.page,this.size,this.type);
		}
	};
</script>
<style lang="less">
	.index-page {
		.index-header {
			width: 100%;
			height: 14.8rem;
			border-radius: 0 0 2rem 2rem;
			transition: all .5s;
		}

		.index-swiper {
			margin-top: -4.8rem;
		}

		.index_advert {
			width: 95%;
			margin: 2rem auto 0;
			img {
				width: 100%;
			}
		}
		
		.bg{
			width: 95%;
			margin: 1rem auto;
			border-radius: 1rem;
			background-color: #fff;
		}
	}
</style>
