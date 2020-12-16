<!-- 轮播图下的导航轮播 -->
<template>
	<div class="indxNavSwiper">
		<mt-swipe :auto="0" :continuous="false">
			<mt-swipe-item v-for="(items,index) in navDatas" :key="index">
				<ul>
					<li v-for="(item,index) in items" :key="index">
						<a href="javascript:;">
							<img :src="item.imgSrc" alt="">
							<span>{{item.title}}</span>
						</a>
					</li>
				</ul>
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				navDatas:[
					[{
						id:1,
						imgSrc:require("@/assets/images/nav-img-1.png"),
						title:"潮流服饰"
					},
					{
						id:2,
						imgSrc:require("@/assets/images/nav-img-2.png"),
						title:"箱包适配"
					},
					{
						id:3,
						imgSrc:require("@/assets/images/nav-img-3.png"),
						title:"美容护肤"
					},
					{
						id:4,
						imgSrc:require("@/assets/images/nav-img-4.png"),
						title:"母婴儿童"
					},
					{
						id:5,
						imgSrc:require("@/assets/images/nav-img-5.png"),
						title:"手机数码"
					},
					{
						id:6,
						imgSrc:require("@/assets/images/nav-img-6.png"),
						title:"微社区"
					},
					{
						id:7,
						imgSrc:require("@/assets/images/nav-img-7.gif"),
						title:"拼团"
					},
					{
						id:8,
						imgSrc:require("@/assets/images/nav-img-8.gif"),
						title:"预售"
					},
					{
						id:9,
						imgSrc:require("@/assets/images/nav-img-9.png"),
						title:"拍卖"
					},
					{
						id:10,
						imgSrc:require("@/assets/images/nav-img-10.gif"),
						title:"超值礼包"
					},],[{
						id:1,
						imgSrc:require("@/assets/images/nav-img-1.png"),
						title:"潮流服饰"
					},
					{
						id:2,
						imgSrc:require("@/assets/images/nav-img-2.png"),
						title:"箱包适配"
					},
					{
						id:3,
						imgSrc:require("@/assets/images/nav-img-3.png"),
						title:"美容护肤"
					},
					{
						id:4,
						imgSrc:require("@/assets/images/nav-img-4.png"),
						title:"母婴儿童"
					},
					{
						id:5,
						imgSrc:require("@/assets/images/nav-img-5.png"),
						title:"手机数码"
					},
					{
						id:6,
						imgSrc:require("@/assets/images/nav-img-6.png"),
						title:"微社区"
					},
					{
						id:7,
						imgSrc:require("@/assets/images/nav-img-7.gif"),
						title:"拼团"
					},
					{
						id:8,
						imgSrc:require("@/assets/images/nav-img-8.gif"),
						title:"预售"
					},
					{
						id:9,
						imgSrc:require("@/assets/images/nav-img-9.png"),
						title:"拍卖"
					},
					{
						id:10,
						imgSrc:require("@/assets/images/nav-img-10.gif"),
						title:"超值礼包"
					},],[{
						id:1,
						imgSrc:require("@/assets/images/nav-img-1.png"),
						title:"潮流服饰"
					},
					{
						id:2,
						imgSrc:require("@/assets/images/nav-img-2.png"),
						title:"箱包适配"
					},
					{
						id:3,
						imgSrc:require("@/assets/images/nav-img-3.png"),
						title:"美容护肤"
					},
					{
						id:4,
						imgSrc:require("@/assets/images/nav-img-4.png"),
						title:"母婴儿童"
					},
					{
						id:5,
						imgSrc:require("@/assets/images/nav-img-5.png"),
						title:"手机数码"
					},
					{
						id:6,
						imgSrc:require("@/assets/images/nav-img-6.png"),
						title:"微社区"
					},
					{
						id:7,
						imgSrc:require("@/assets/images/nav-img-7.gif"),
						title:"拼团"
					},
					{
						id:8,
						imgSrc:require("@/assets/images/nav-img-8.gif"),
						title:"预售"
					},
					{
						id:9,
						imgSrc:require("@/assets/images/nav-img-9.png"),
						title:"拍卖"
					},
					{
						id:10,
						imgSrc:require("@/assets/images/nav-img-10.gif"),
						title:"超值礼包"
					},]]
			}
		},
		methods: {
			getSwiperIndex(index) {
				console.log(index.activeIndex)
			}
		}
	}
</script>

<style lang="less">
	.indxNavSwiper {
		width: 95%;
		height: 20.8rem;
		background-color: #fff;
		border-radius:  1rem 1rem 0 0;
		margin: 1rem auto;
		text-align: center;

		ul {
			width: 100%;
			height: 100%;
			display: flex;
			flex-wrap: wrap;

			li {
				width: 20%;
				height: 50%;
				img {
					width: 100%;
				}
			}
		}
		.mint-swipe{
			position: relative;
			.mint-swipe-indicators{
				position: absolute;
				bottom: 0px;
				.mint-swipe-indicator{
					width: 1.5rem;
					height: 0.4rem;
					margin: 0;
					background-color: #ffe1de;
					border-radius: 0.5rem;
					opacity: 1;
				}
				.mint-swipe-indicator.is-active{
					background-color: #f91f27;
				}
			}
			
		}
	}
</style>
