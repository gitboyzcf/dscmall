<!-- 首页内容的商品秒杀 -->
<template>
	<div class="home-seckill">
		<div class="seckill-new-style">
			<div class="title">
				<img src="@/assets/images/title-img-2.png" alt="">
			</div>
			<div class="title-time">
				距结束还剩:<span>{{hour | timeFormat}}</span>:<span>{{minute | timeFormat}}</span>:<span>{{seconds | timeFormat}}</span>
			</div>
		</div>
		<div class="seckill-time">
			<ul>
				<li v-for="(item,index) in time_list" :key="index" @click="toggle(index,item.id)" :class="{active:activeIndex == index}">
					<p>{{item.title}}</p>
					<p v-text="item.status==true?'抢购中':'即将开始'"></p>
				</li>
			</ul>
			<!-- 商品内容 -->
			<div class="content">
				<swiper :options="swiperOption" ref="mySwiper">
					<!-- slides -->
					<swiper-slide v-for="item in seckill_list" :key="item.id">
						<img :src="item.goods_thumb" alt="">
						<p>{{item.goods_name}}</p>
						<div class="price">
							<span>{{item.sec_price_formated}}</span>
							<span>{{item.market_price_formated}}</span>
						</div>
					</swiper-slide>
				</swiper>
			</div>
			
			<!-- 更多秒杀商品 -->
			<div>
				<router-link to="/seckill" tag="h4" class="seckill">查看更多秒杀商品<i class="iconfont icon-jiantou1"></i></router-link>
			</div>
		</div>
	</div>
</template>

<script>
	// import Axios from "axios";
	import ajax from "@/api/ajax.js";
	export default {
		data() {
			return {
				swiperOption: {
					slidesPerView: 3,
					spaceBetween: 30,
				},

				activeIndex: 0,
				tomorrow:0,
				hour: 0, //小时
				minute: 0, //分钟
				seconds: 0, //秒数

				timer: null,

				begin_time:"",
				end_time:"",
				seckill_list:[],
				time_list:[],
				time_id:"",
			}
		},
		methods: {
			// 秒杀倒计时targetTime
			countDown(targetTime) {
				let date1 = new Date(); //当前时间
				let date2 = new Date(); //目标时间
				date2.setHours(targetTime);
				date2.setMinutes(0);
				date2.setSeconds(0);
				// 总秒数
				let time = (date2.getTime() - date1.getTime());
				this.hour = parseInt(time / 1000 / 60 / 60 % 24);
				this.minute = parseInt(time / 1000 / 60 % 60);
				this.seconds = parseInt(time / 1000 % 60);
			},
			toggle(index,id) {
				console.log(index);
				this.activeIndex = index;
				this.tomorrow = index;
				this.time_id = id;
				this.reqData();
			},
			// 请求数据
			reqData(){
				ajax("/api/visual/visual_seckill",{
					id:this.time_id,
					tomorrow:this.tomorrow,
				}).then(rel =>{
					this.seckill_list = rel.data.data.seckill_list;
					this.time_list = rel.data.data.time_list;
					let temp = rel.data.data.time_list.filter((item)=>{
						return item.status == true;
					})
					// 拿到对应数据里的时间戳
					this.begin_time = temp[0].begin_time;
					this.end_time = temp[0].end_time;
				})
			},
		},
		mounted() {
			let h;
			let date = new Date;
			this.timer = setInterval(() => {
				h = date.getHours();
				if(h >= 8 && h < 10){
					this.countDown(10);
				}else if(h >=10 && h < 16){
					this.countDown(16);
				}else if(h >=16 && h < 24){
					this.countDown(24);
				}else{
					this.countDown(8);
				}
			}, 1000);
			
			
			this.reqData();
		},
		// 对时间进行过滤
		filters: {
			timeFormat(val) {
				return val < 10 ? "0" + val : val;
			}
		}
	}
</script>

<style lang="less">
	.home-seckill {
		padding: 1rem 1rem 0;
		.seckill-new-style {
			width: 100%;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			width: calc(100% - 2rem);
			padding: 2rem 1rem;
			border-radius: 1rem 1rem 0 0;

			.title,
			img {
				height: 2rem;
			}

			.title-time {
				font-size: 1.4rem;
				span {
					padding: 2px 4px;
					margin: 0 2px;
					background-color: #f91f28;
					border-radius: 0.5rem;
					font-size: 1.2rem;
					color: #fff;
				}
			}
		}

		.seckill-time {
			padding: 1rem 0;
			background-color: #fff;
			border-radius: 0 0 1rem 1rem;
			ul {
				display: flex;
				justify-content: space-between;
				padding: 0 1rem;
				li {
					text-align: center;
					font-size: 1.2rem;
					padding: 0.5rem 1rem;
					color: #999;

					&.active {
						font-size: 1.4rem;
						color: #f91f28;
						border-bottom:2px solid #f91f28;

						p:nth-child(1) {
							font-weight: 700;
						}
					}
				}
			}

			.content {
				width: 100%;
				padding-top: 1rem;
				border-top: 1px solid #f4f4f4;
				&>div {
					width: 100%;
					padding: 0 1rem;
					width: calc(100% - 2rem);


					img {
						width: 100%;
					}

					p {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						font-size: 1.3rem;
						color: #000;
					}

					span {
						display: block;
						margin: 0.5rem;

						&:nth-child(1) {
							color: #f20e28;
							font-weight: 700;
							font-size: 1.3rem;
						}

						&:nth-child(2) {
							color: #888888;
							text-decoration: line-through;
						}
					}
				}

			}
			.seckill{
				height: 4rem;
				text-align: center;
				line-height: 4rem;
				
			}

		}
	}
</style>
