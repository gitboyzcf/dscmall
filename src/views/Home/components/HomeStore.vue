<!-- 首页的商店组件 -->
<template>
	<div class="home-store">
		<div class="title">
			<!-- 跳转到发现组件 -->
			<router-link to="/find" tag="div">
				<span>店铺推荐</span>
				<span>更多品质好店</span>
				<span class="iconfont icon-jiantou1"></span>
			</router-link>
		</div>
		<div class="store">
				<swiper :options="swiperOption">
					<swiper-slide v-for="(item,index) in storeList" :key="index">
						<img :src="item.img" alt="">
						<span><img :src="item.logoImg" alt=""></span>
						<p>{{item.store_name}}</p>
						<p v-html="item.count"></p>
					</swiper-slide>
				</swiper>
		</div>
		<div class="adv-list">
				<span><img src="https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978468372.png" alt=""></span>
				<span><img src="https://x.dscmall.cn/storage/data/gallery_album/177/original_img/177_P_1597978469174.png" alt=""></span>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				swiperOption: {
					slidesPerView: 3,
					spaceBetween: 10, //设置模块之间的间距
				},
				storeList:[{
					img:"https://x.dscmall.cn/storage/data/store_street/street_thumb/1595180901830760018.jpg?imageView2/2/format/webp",
					logoImg:"https://x.dscmall.cn/storage/images/seller_imgs/seller_logo/logo_thumb/1536872208964241423.jpg?imageView2/2/format/webp",
					store_name:"普陀区 - 万卓旗舰店",
					count:"共计<span class='goods_count'> 13 </span>件商品"
				},{
					img:"https://x.dscmall.cn/storage/data/store_street/street_thumb/1598316246456357634.jpg?imageView2/2/format/webp",
					logoImg:"https://x.dscmall.cn/storage/images/seller_imgs/seller_logo/logo_thumb/1598316246303568918.jpg?imageView2/2/format/webp",
					store_name:"创造旗舰店",
					count:"共计<span class='goods_count'> 62 </span>件商品"
				},{
					img:"https://x.dscmall.cn/storage/data/store_street/street_thumb/1598569068574637464.png?imageView2/2/format/webp",
					logoImg:"https://x.dscmall.cn/storage/images/seller_imgs/seller_logo/logo_thumb/1598552978820058889.jpg?imageView2/2/format/webp",
					store_name:"大商创旗舰店",
					count:"共计<span class='goods_count'> 13 </span>件商品"
				},{
					img:"https://x.dscmall.cn/storage/data/store_street/street_thumb/1595180901830760018.jpg?imageView2/2/format/webp",
					logoImg:"https://x.dscmall.cn/storage/images/seller_imgs/seller_logo/logo_thumb/1536872208964241423.jpg?imageView2/2/format/webp",
					store_name:"普陀区 - 万卓旗舰店",
					count:"共计<span class='goods_count'> 13 </span>件商品"
				},{
					img:"https://x.dscmall.cn/storage/data/store_street/street_thumb/1595180901830760018.jpg?imageView2/2/format/webp",
					logoImg:"https://x.dscmall.cn/storage/images/seller_imgs/seller_logo/logo_thumb/1536872208964241423.jpg?imageView2/2/format/webp",
					store_name:"普陀区 - 万卓旗舰店",
					count:"共计<span class='goods_count'> 13 </span>件商品"
				},{
					img:"https://x.dscmall.cn/storage/data/store_street/street_thumb/1595180901830760018.jpg?imageView2/2/format/webp",
					logoImg:"https://x.dscmall.cn/storage/images/seller_imgs/seller_logo/logo_thumb/1536872208964241423.jpg?imageView2/2/format/webp",
					store_name:"普陀区 - 万卓旗舰店",
					count:"共计<span class='goods_count'> 13 </span>件商品"
				},],
			}
		}
	}
</script>

<style lang="less">
	.home-store{
		.title{
			height: 5rem;
			padding: 0 1rem;
			border-bottom: 1px solid #EFEFEF;
			span{
				line-height: 5rem;
			}
			span:nth-child(1){
				font-size: 1.8rem;
				font-weight: 700;
				margin-right: 1rem;
			}
			span:nth-child(2){
				font-size: 1.4rem;
				color: #888;
			}
			span:nth-child(3){
				color: #f20d23;
				font-size: 1.4rem;
				margin-left: 5px;
				margin-top: 10px;
			}
		}
		.store{
			width: 100%;
			padding:  1rem;
			width: calc(100% - 2rem);
			position: relative;
			& .swiper-slide{
				background-color: #EFEFEF;
				border-radius: 1rem;
				overflow: hidden;
			}
			& .swiper-slide>img{
				width: 100%;
				height: 8.5rem;
			}
			.swiper-slide>span:nth-of-type(1){
				display: block;
				width: 3.5rem;
				height: 3.5rem;
				border-radius: 50%;
				overflow: hidden;
				position: absolute;
				left: 50%;
				transform: translate(-50%,-50%);
				img{
					width: 100%;
				}
			}
			p:nth-of-type(1){
				margin-top: 2rem;
				padding: 0 0.5rem;
				text-align: center;
				overflow: hidden;
				white-space: nowrap;// 文本不换行
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				font-size: 1.3rem;
			}
			p:nth-of-type(2){
				text-align: center;
				color: #888888;
				margin: 1rem 0;
			}
		}
		.adv-list{
			display: flex;
			justify-content: space-between;
			padding: 0 1rem 1rem;
			span{
				width: 48.5%;
				img{
					width: 100%;
				}
			}
		}
	}
</style>
