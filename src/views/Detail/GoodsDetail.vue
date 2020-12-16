<!-- 商品详情页 -->
<template>
	<div class="goods-detail">
		<div class="detail-title" ref="header" :style="{backgroundColor:'rgba(255, 255, 255, '+transparent+')'}">
			<i class="iconfont icon-jiantou3" onclick="window.history.back();"></i>
			<div class="dt-option"  :style="{opacity:transparent}">
				<span :class="{active:navActive==index}" v-for="(item,index) in navList" :key="index" @click="activeChange(index)">{{item}}</span>
			</div>
			<i class="iconfont icon-icon_share_alt" style="font-size: 2.8rem;" @click="showShareMask"></i>
		</div>
		<!-- 商品图片轮播图 -->
		<mt-swipe :auto="4000" id="title0">
			<mt-swipe-item v-for="(item,index) in detailData.gallery_list" :key="index">
				<img :src="item.img_url" alt="">
			</mt-swipe-item>
		</mt-swipe>
		<!-- 商品信息 -->
		<div class="goods-info">
			<div class="goods-price">
				<span>{{detailData.membership_card_discount_price}}</span>
				<span>{{detailData.market_price}}</span>
			</div>
			<div class="hig-vip">
				<div class="hig-vip-warp">
					<span><img src="@/assets/images/icon-vip.png" alt=""></span>
					<div class="text">高级VIP享超值优惠价
						<span class="currency-price"><i style="font-size: 1.2rem;">￥</i>{{detailData.membership_card_discount_price}}</span>
					</div>
					<router-link to="#">
						<span>立即开通<i class="iconfont icon-jiantou1"></i></span>
					</router-link>
				</div>
			</div>
			<div class="goods_title">
				<p>
					{{detailData.goods_name}}
				</p>
			</div>
			<div class="goods_outer">
				<span>积累销量 {{detailData.sales_volume}}</span>
				<span>库存 {{detailData.goods_number}}</span>
				<span>{{detailDataInfo.province_name}} {{detailDataInfo.city_name}}</span>
			</div>
			<div class="give-integral">
				<p>
					赠送积分：
					<span>{{detailData.give_integral}} 积分</span>
				</p>
			</div>
			<div class="van-cell">
				<span>服务：</span>
				<span>正品保证 七天无理由退换 闪速配送</span>
			</div>
			<div class="to-address" @click="showPopUp">
				<span>送至：</span>
				<div class="address-info">
					<!-- ================== -->
					<span>{{province}}</span>&nbsp;
					<span>{{city}}</span>&nbsp;
					<span>{{county}}</span>&nbsp;
					<!-- <span>枫杨街道</span> -->
				</div>
				<i class="iconfont icon-jiantou2"></i>
			</div>
			<!-- 选择省份 -->
			<div class="address-mask">
				<mt-popup v-model="popupVisible" position="bottom">
					<div class="address">
						<h2>所在地区<i class="iconfont icon-chahao" @click="maskClose"></i></h2>
						<div class="option">
							<input type="text" disabled="disabled" v-model="province">
							<input type="text" disabled="disabled" v-model="city">
							<input type="text" disabled="disabled" v-model="county">
						</div>
						<mt-picker :slots="slots" @change="onValuesChange" :visibleItemCount="visibleItemCount"></mt-picker>
					</div>
				</mt-popup>
			</div>

			<!-- 运费 -->
			<div class="freight">
				<span>运费：</span>
				<span>{{detailData.formated_goods_rate}}</span>
			</div>

			<!-- 已选 -->
			<div class="selected" @click="showMask">
				<span>已选：</span>
				<span>{{goodsNum}}个</span>
				<span class="iconfont icon-jiantou2"></span>
			</div>
			<!-- 底部滑出选择商品 -->
			<div class="selected-mask" v-show="maskActive" @click.self="closeMask">
				<div class="selected-goods" ref="selectedGoods">
					<i class="iconfont icon-chahao" style="position: absolute; top: 1rem; right: 1rem;" @click="closeMask"></i>
					<div class="selected-wrap">
						<div class="left-img">
							<img :src="detailData.goods_thumb" alt="">
						</div>
						<div class="right-info">
							<p>{{detailData.goods_name}}</p>
							<p>{{detailData.membership_card_discount_price_formated}}</p>
							<p>库存：{{detailData.goods_number}}</p>
						</div>
					</div>
					<div class="goods-number">
						<span>数量</span>
						<div>
							<span @click="numberReduce" :style="goodsNum == 1?'background:#f8f8f8':'#fff'">-</span>
							<input type="number" v-model.number="goodsNum">
							<span @click="numberAdd">+</span>
						</div>
					</div>
					<div class="goods_btn">
						<span>立即购买</span>
						<span @click="addCart">加入购物车</span>
					</div>
				</div>
			</div>
			<!-- 讨论圈 -->
			<div class="discussion">
				<span>网友讨论圈</span>
				<span class="iconfont icon-jiantou2"></span>
			</div>

			<!-- 评价 -->
			<div class="evaluate" id="title2">
				<span>评价：</span>
				<span>2000+</span>
				<span>好评度 97%</span>
				<span class="iconfont icon-jiantou2"></span>
			</div>

			<!-- 店铺 -->
			<div class="goods-shop">
				<div class="shop-title">
					<div class="g-s-i-img">
						<img src="https://x.dscmall.cn/storage/images/seller_imgs/seller_logo/logo_thumb/1598316246303568918.jpg" alt="">
					</div>
					<div class="g-s-i-title">
						<h3>{{detailDataInfo.shop_name}}<i style="color: #f00;" class="iconfont icon-xiangqingyeshangpu"></i></h3>
						<h5>已经有 12 个人关注</h5>
					</div>
					<div class="g-s-info-add">
						<span>未关注</span>
					</div>

				</div>
				<div class="shop-info">
					<span>商品<i>5分</i><i>高</i></span>
					<span>服务<i>5分</i><i>高</i></span>
					<span>时效<i>5分</i><i>高</i></span>
				</div>
			</div>

			<!-- 商品tab切换详情 -->
			<div class="tabs-info" id="title1">
				<mt-navbar v-model="selected">
					<mt-tab-item id="t1">商品详情</mt-tab-item>
					<mt-tab-item id="t2">规格参数</mt-tab-item>
				</mt-navbar>
				<mt-tab-container v-model="selected">
					<mt-tab-container-item id="t1">
						<div class="img">
							<div v-html="detailData.goods_desc"></div>
						</div>
					</mt-tab-container-item>
					<mt-tab-container-item id="t2">
						<div class="params">
							<table>
								<tr v-for="(item,index) in detailData.attr_parameter" :key="index">
									<td>{{item.attr_name}}</td>
									<td>{{item.attr_value}}</td>
								</tr>
							</table>
						</div>
					</mt-tab-container-item>
				</mt-tab-container>
			</div>
		</div>
		<!-- 商品分享 -->
		<div class="goods-share" v-show="shareMask">
			<div class="share-mask" @click="shareCloseMask"></div>
			<div class="share-which" ref="shareWhich">
				<!-- 微信 -->
				<div class="wechat" v-if="wechatShowHide" @click="changeShareInfo">
					<span class="iconfont icon-weixin"></span>
					<span>分享给好友</span>
				</div>
				<!-- 海报 -->
				<div class="poster" @click="changePoster">
					<span class="iconfont icon-haibaofenxiang" style="color: #999"></span>
					<span>分享为海报</span>
				</div>
			</div>
		</div>
		<!-- 接收子传递的数据 ,修改之后进行传回-->
		<share-info v-on:setShareInfoStatus="setShareInfoStatus" :showShareInfo="showShareInfo"></share-info>
		
		<share-poster :showPoster="showPoster" v-on:posterEmitData="posterEmitData"></share-poster>
		
		<!-- 底部 -->
		<footer>
			<ul>
				<li><i class="iconfont icon-kefu1"></i><span>客服</span></li>
				<li><i class="iconfont icon-shoucang1"></i><span>收藏</span></li>
				<li onclick="window.location.href='#/cart';"><i class="iconfont icon-gouwuche1"></i><span>购物车</span><em class="van-info">{{countCart}}</em>
					<span :class="{anim:flag}" v-show="flag">+{{goodsNum}}</span>
				</li>
				<li class="add-cart" @click="addCart">加入购物车</li>
				<li>立即购买</li>
			</ul>
		</footer>
	</div>
</template>

<script>
	// 导入地址数据
	import cityData from "@/assets/json/city.json";
	//引入防抖函数
	import debounce from "lodash.debounce";
	// 检测是否为微信端
	import {isWeChat} from "@/utils/index.js";
	// 引入点击微信分享指向组件
	import ShareInfo from "./components/ShareInfo.vue";
	// 引入点击生成海报
	import SharePoster from "./components/SharePoster.vue";
	export default {
		components:{
			ShareInfo,
			SharePoster,
		},
		data() {
			return {
				flag:false,//控制+1的动画显示
				showPoster:false, //控制海报的显示与隐藏
				showShareInfo:false, // 分享指向箭头显示隐藏
				wechatShowHide:false,//检测是否为微信端打开
				shareMask:false, //分享显示隐藏
				navActive: 0,
				navList: ["商品", "详情", "评价"],
				transparent: 0, //头部透明度
				selected: "t1", //tab切换
				maskActive: false, //控制选择商品的隐藏显示
				goodsNum: 1, //商品数量
				province: "选择省", //省
				city: "选择市", //市
				county: "选择县/区", //区/县
				popupVisible: false,
				goods_id: "",
				slots: [{
					flex: 1, //占一列
					values: Object.keys(cityData), //显示的数据
					className: 'slot1', //第一列设置名称
					textAlign: 'left', //右对齐
					defaultIndex: 0,
				}, {
					divider: true,
					content: '-',
					className: 'slot6'
				}, {
					flex: 1, //占一列
					values: [], //显示的数据
					className: 'slot2', //第一列设置名称
					textAlign: 'left', //右对齐
				}, {
					divider: true,
					content: '-',
					className: 'slot5'
				}, {
					flex: 1,
					values: [],
					className: 'slot3',
					textAlign: 'left',
				}],
				visibleItemCount: 10,
			}
		},
		methods: {
			// 使用防抖
			scrollPage:debounce(function(){
				let title0Top = document.querySelector("#title0").offsetTop;
				let title1Top = document.querySelector("#title1").offsetTop;
				let title2Top = document.querySelector("#title2").offsetTop;
				let elTop = document.documentElement.scrollTop+this.$refs.header.offsetHeight;
				if(elTop >= title0Top && elTop < title2Top){
					this.navActive = 0;
				}else if(elTop >= title2Top && elTop < title1Top){
					this.navActive = 2;
				}else if(elTop > title1Top){
					this.navActive = 1;
				}
			},500),
			postDetailData() {
				this.$store.dispatch("actChangeDetailData", {
					goods_id: this.goods_id
				});
			},
			// 点击弹出选择地址
			showPopUp() {
				this.popupVisible = true;
			},
			// 点击关闭地址弹框
			maskClose() {
				this.popupVisible = false;
			},
			// 联动内容改变事件
			onValuesChange(picker, values) {
				// 参数1 vue组件对象
				// 参数二 联动选择的内容
				// console.log(values);
				picker.setSlotValues(1, Object.keys(cityData[values[0]]));
				picker.setSlotValues(2, cityData[values[0]][values[1]]);
				this.province = values[0];
				this.city = values[1];
				this.county = values[2];
			},

			// 商品加
			numberAdd() {
				this.goodsNum++;
			},
			// 商品减
			numberReduce() {
				if (this.goodsNum > 1) {
					this.goodsNum--;
				}
			},
			// 点击显示蒙版选择商品
			showMask() {
				this.maskActive = true;
				setTimeout(() => {
					this.$refs.selectedGoods.style.bottom = 0;
					this.$refs.selectedGoods.style.transition = "all 0.5s";
				})
			},
			// 点击关闭选择商品的蒙版
			closeMask() {
				this.$refs.selectedGoods.style.bottom = "-35.7vh";
				setTimeout(() => {
					this.maskActive = false;
				}, 250)
			},
			// 加入购物车
			addCart(){
				this.$refs.selectedGoods.style.bottom = "-35.7vh";
				setTimeout(() => {
					this.maskActive = false;
					this.flag = true;
					setTimeout(()=>{
						this.flag = false;
					},1000);
				}, 250);
				
				// 使用本地存储存储数据
				// console.log(this.detailData);
				// console.log(this.$store.state.cartDatas);
				// 查找该点击的商品是否与状态管理中的数据有相同的
				// 有就在原商品数量上加1，没有就添加
				let isCart = null;
				let isChild = null;
				isCart = this.$store.state.cartDatas.find((item)=>{
					if(item.shop_id == this.detailDataInfo.ru_id){
						isChild = item.child.find((item2)=>{
							if(item2.goods_id == this.detailData.goods_id){
								item2.value += this.goodsNum;
								return item2.goods_id == this.detailData.goods_id;
							}else{
								return undefined;
							}
						})
					}
					return item.shop_id == this.detailDataInfo.ru_id;
				});
				console.log(isChild)
				// 判断购物车中是否存在此商品
				// 如果取反成立的话说明购物车中不存在当前数据
				console.log(isCart);
				if(!isCart){
					var addCartDatas = {
						shop_id:this.detailDataInfo.ru_id,
						shop_name: this.detailDataInfo.shop_name,
						shop_isSelect:true,
						child:[{
							goods_id: this.detailData.goods_id,
							goods_name: this.detailData.goods_name,
							shop_price: this.detailData.shop_price,
							market_price: this.detailData.market_price,
							goods_thumb: this.detailData.goods_thumb,
							// 传入地址
							address:[this.province,this.city,this.county],
							value:1,//默认商品数量为1
							isSelect:true,//默认选中
						}],
					}
				}else{
						if(!isChild){
							let child = {
								goods_id: this.detailData.goods_id,
								goods_name: this.detailData.goods_name,
								shop_price: this.detailData.shop_price,
								market_price: this.detailData.market_price,
								goods_thumb: this.detailData.goods_thumb,
								// 传入地址
								address:[this.province,this.city,this.county],
								value:1,//默认商品数量为1
								isSelect:true,//默认选中
							}
							console.log(isCart);
							isCart.child.unshift(child)
						}
				}
				this.$store.commit("setCartDatas",addCartDatas);
			},
			//修改头部透明度
			scrollChangeTransparent() {
				// 获取文档的scrollTop被卷的距离
				let top = document.documentElement.scrollTop || document.body.scrollTop;
				let transparent = top / 250;
				transparent = transparent > 1 ? 1 : transparent;
				this.transparent = transparent;
			},
			activeChange(index) {
				this.$nextTick(()=>{
					this.navActive = index;
					// 获取对应的地方
					let el = document.getElementById("title" + index);
					window.scrollBy({
						top: el.offsetTop-window.scrollY-this.$refs.header.offsetHeight,
						left: 0,
						behavior: "smooth",
					})
				})
			},
			// 控制分享蒙版
			showShareMask(){
				this.$refs.shareWhich.style.bottom = "0";
				this.shareMask = true;
				// 是微信端就显示分享微信
				if(isWeChat()){
					this.wechatShowHide = true;
				}
				// console.log(this.wechatShowHide)
			},
			// 关闭分享蒙版
			shareCloseMask(){
				this.$refs.shareWhich.style.bottom = "-15vh";
				this.shareMask = false;
				
			},
			setShareInfoStatus(data){
				this.showShareInfo = data;
			},
			changeShareInfo(){
				this.showShareInfo = true;
				this.shareMask = false;
			},
			// 控制海报蒙版
			changePoster(){
				this.showPoster = true;
				this.shareMask = false;
			},
			// 接收海报组件传来的值
			posterEmitData(data){
				this.showPoster = data;
			}
			
		},
		computed: {
			detailData() {
				return this.$store.state.detailDatas;
			},
			detailDataInfo() {
				return this.$store.state.detailDatasInfo;
			},
			// 计算加入购物车的数量
			countCart(){
				let count = 0;
				this.$store.state.cartDatas.forEach((item)=>{
					item.child.map((itemChild)=>{
						count += itemChild.value;
					})
				})
				return count;
			},
		},
		mounted() {
			// 页面初始化
			let oTop = document.documentElement || document.body;
			oTop.scrollTop = 0;
			
			this.goods_id = this.$route.params.cid;
			this.postDetailData();
			this.$nextTick(() => {
				// 默认指定省份
				this.slots[0].defaultIndex = 15;
			});
			// 页面滚动透明度改变
			window.addEventListener("scroll", this.scrollChangeTransparent, false);
			// 有防抖的事件
			window.addEventListener("scroll",this.scrollPage,false);
			
		},
		destroyed() {
			// 销毁时解绑
			window.removeEventListener("scroll", this.scrollChangeTransparent, false);
			window.removeEventListener("scroll",this.scrollPage,false);
		}
	}
</script>

<style lang="less">
	.goods-detail {
		.detail-title {
			width: 100%;
			height: 4rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 1rem;
			width: calc(100% - 2rem);
			position: fixed;
			top: 0;
			left: 0;
			font-size: 1.4rem;
			z-index: 99;
			i{
				color: #666;
			}
			.dt-option {
				width: 60%;
				height: 4rem;
				display: flex;
				justify-content: space-around;
				align-items: center;

				span {
					flex: 1;
					height: 4rem;
					text-align: center;
					line-height: 4rem;
				}

				.active {
					color: #f00;
					border-bottom: 2px solid #f00;
					box-sizing: border-box;
				}
			}
		}

		.mint-swipe {
			width: 100%;
			height: 37.5rem;

			img {
				width: 100%;
			}

			.mint-swipe-indicators {
				.mint-swipe-indicator {
					background-color: #999;
					opacity: 1;
					width: 0.6rem;
					height: 0.6rem;
				}

				.is-active {
					background-color: #ff976a;
				}
			}
		}

		.goods-info {
			background-color: #F4F4F4;

			.goods-price {
				display: flex;
				height: 4.6rem;
				padding: 1rem;
				align-items: center;
				background-color: #fff;

				span:first-child::before,
				span:last-child::before {
					content: "￥";
					font-size: 1.4rem;
				}

				span:first-child {
					font-size: 2.4rem;
					color: #f00;
					font-weight: 700;
				}

				span:last-child {
					text-decoration: line-through;
					color: rgb(153, 153, 153);
					margin-left: 1rem;
					font-size: 1.3rem;
				}
			}

			.hig-vip {
				background-color: #fff;
				padding: 0 1rem 1rem;

				.hig-vip-warp {
					padding: 1rem;
					display: flex;
					align-items: center;
					background-color: #f7f8fc;
					border-radius: 2rem;
					font-size: 1.4rem;
					position: relative;

					&>span:first-child {
						width: 2rem;
						height: 2rem;

						img {
							width: 100%;
						}
					}

					.text {
						margin: 0 0 0.2rem 0.5rem;

						.currency-price {
							margin-left: -0.5rem;
							font-weight: 700;
						}
					}

					& a {
						position: absolute;
						right: 1rem;
						color: #e3c49e;
						background-color: #000;
						padding: 0.2rem 0.5rem;
						padding-left: 1rem;
						border-radius: 2rem;
					}
				}
			}

			.goods_title {
				padding: 0 1rem 1rem;
				background-color: #fff;
				font-size: 1.4rem;
			}

			.goods_outer {
				padding: 0 1rem 1rem;
				display: flex;
				justify-content: space-between;
				background-color: #fff;
				font-size: 1.4rem;
				color: #999;
			}

			.give-integral {
				padding: 1rem;
				margin-top: 1rem;
				background-color: #fff;
				font-size: 1.3rem;
				color: #999;

				span {
					color: #333;
				}
			}

			.van-cell {
				padding: 1rem;
				font-size: 1.3rem;
				background-color: #fff;

				span:first-child {
					color: #999;
				}

				span:last-child {
					color: #333;
				}
			}

			.to-address {
				padding: 1rem;
				background-color: #fff;
				font-size: 1.3rem;
				display: flex;
				justify-content: space-between;
				margin-top: 1rem;

				span {
					color: #999;
				}

				.address-info {
					flex: 1;

					span {
						color: #333;
					}
				}
			}

			.address-mask {
				.mint-popup {
					width: 100%;
					border-radius: 2rem 2rem 0 0;

					.picker {
						overflow: visible;
						height: 100%;

						.picker-items {
							height: 100%;
						}

						.picker-item {
							text-align: center;
							font-size: 1.4rem;
						}

						.picker-slot-divider {
							margin-top: -47px;
						}

						.picker-selected {
							color: #ef4f4f;
						}

						.picker-center-highlight {
							top: 40.5%;
						}
					}
				}

				.address {
					height: 49rem;
					background-color: #fff;
					border-radius: 2rem 2rem 0 0;

					h2 {
						text-align: center;
						padding: 1.5rem 0;
						position: relative;

						i {
							position: absolute;
							top: 1.6rem;
							right: 1.5rem;
							font-size: 1.6rem;
							color: #999;
						}
					}

					.option {
						padding: 0.5rem 1rem;
						border-bottom: 1px solid #EFEFEF;

						input {
							width: 25%;
							background-color: transparent;
						}
					}
				}
			}

			.freight {
				color: #999;
				font-size: 1.3rem;
				padding: 1rem;
				background-color: #fff;

				span:last-child {
					color: #333;
				}
			}

			.selected,
			.discussion,
			.evaluate {
				padding: 1.5rem 1rem;
				background-color: #fff;
				margin-top: 1rem;
				font-size: 1.3rem;
				color: #999;
				display: flex;
				justify-content: space-between;

				span:nth-of-type(2) {
					flex: 1;
					color: #333;
				}

				span:last-child {
					color: #333;
				}
			}

			.selected-mask {
				width: 100%;
				height: 100%;
				position: fixed;
				top: 0;
				left: 0;
				background-color: rgba(0, 0, 0, 0.5);
				z-index: 999;

				.selected-goods {
					position: absolute;
					bottom: -35.7vh;
					left: 0;
					height: 32.7vh;
					width: 100%;
					background-color: #fff;
					border-radius: 2rem 2rem 0 0;

					.selected-wrap {
						padding: 1rem;
						padding-right: 2.8rem;
						display: flex;

						.left-img {
							margin-top: -3rem;
							margin-right: 1rem;

							img {
								border-radius: 1rem;
								height: 9.2rem;
								width: 9.2rem;
							}
						}

						.right-info {
							p:first-child {
								font-size: 1.4rem;
								height: 4rem;
								overflow: hidden;
								display: -webkit-box;
								text-overflow: ellipsis;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
							}

							p:nth-child(2) {
								font-size: 1.8rem;
								padding: 0.5rem 0;
								color: #f00;
							}

							p:last-child {
								color: #888;
							}
						}
					}

					.goods-number {
						height: 3.2rem;
						padding: 1rem;
						display: flex;
						justify-content: space-between;
						align-items: center;

						&>span:first-child {
							color: #888;
							font-size: 1.4rem;
						}

						&>div {
							input {
								width: 4.2rem;
								height: 3rem;
								border-top: 1px solid #EFEFEF;
								border-bottom: 1px solid #EFEFEF;
								text-align: center;
							}

							span {
								width: 3rem;
								height: 3rem;
								display: inline-block;
								font-size: 1.8rem;
								font-weight: 700;
								border: 1px solid #EFEFEF;
								text-align: center;
								line-height: 3rem;
								vertical-align: middle;
							}
						}
					}

					.goods_btn {
						display: flex;
						height: 5rem;
						width: 100%;
						margin-top: 0.5rem;

						span {
							flex: 1;
							height: 5rem;
							line-height: 5rem;
							text-align: center;
							font-size: 1.6rem;
							color: #fff;
						}

						span:first-child {
							background-color: #fba534;
						}

						span:last-child {
							background-color: #f92028;
						}
					}
				}
			}

			.discussion {
				span:nth-of-type(2) {
					flex: 0;
				}
			}
			// .evaluate{
			// 	span:nth-of-type(2){
			// 	}
			// }

			.goods-shop {
				margin-top: 1rem;
				background-color: #fff;

				.shop-title {
					padding: 1rem;
					display: flex;
					align-items: center;

					.g-s-i-img {
						padding: 0.4rem;
						width: calc(5.8rem - 0.8rem);
						height: calc(5.8rem - 0.8rem);
						border: 1px solid #EFEFEF;

						img {
							width: 100%;
						}
					}

					.g-s-i-title {
						flex: 1;
						height: 5.8rem;
						margin-left: 1rem;

						h3 {
							font-size: 1.5rem;
							font-weight: normal;
						}

						h5 {
							font-size: 1.3rem;
							font-weight: normal;
							margin-top: 0.5rem;
							color: #999;
						}
					}

					.g-s-info-add {
						padding: 0 1rem;
						height: 2rem;
						line-height: 2rem;
						border: 1px solid #f00;
						border-radius: 1rem;
						color: #f00;
					}
				}

				.shop-info {
					padding: 0 1rem 1rem;

					span {
						margin-right: 3rem;
						font-size: 1.3rem;
						color: #999;

						i:nth-child(2) {
							display: inline-block;
							width: 2rem;
							height: 1.8rem;
							line-height: 1.8rem;
							text-align: center;
							color: #fff;
							border-radius: 1.2rem;
						}

						&:nth-child(1) {
							i:first-child {
								color: #fba534;
							}

							i:last-child {
								background-color: #fba534;
							}
						}

						&:nth-child(2) {
							i:first-child {
								color: #13ab53;
							}

							i:last-child {
								background-color: #13ab53;
							}
						}

						&:nth-child(3) {
							i:first-child {
								color: #f447c9;
							}

							i:last-child {
								background-color: #f447c9;
							}
						}
					}
				}

			}

			.tabs-info {
				.mint-navbar {
					border-bottom: 1px solid #EFEFEF;
					margin-bottom: 1rem;
					.mint-tab-item-label {
						font-size: 1.4rem;
					}

					.is-selected {
						color: #f00;
						border-bottom: 3px solid #f00;
					}
				}

				.mint-tab-container {
					background-color: #fff;
					padding-bottom: 5rem;
					.img {
						img {
							width: 100%;
						}
					}

					.params {
						padding: 1rem;

						table {
							border-collapse: collapse;
							width: 100%;

							tr td {
								border: 1px solid #dadada;
								padding-left: 1rem;

								&:nth-child(1) {
									width: 30%;
									height: 3rem;
								}
							}
						}
					}

				}
			}
		}
		.goods-share{
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: 999;
			.share-mask{
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,0.5);
			}
			.share-which{
				height: 15vh;
				width: 100%;
				position: absolute;
				bottom: -15vh;
				left: 0;
				background-color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: all 0.5s;
				div{
					display: flex;
					flex-direction: column;
					text-align: center;
					flex: 1;
					span:first-child{
						font-size: 3.5rem;
						color: #20d86d;
					}
					span:last-child{
						font-size: 1.4rem;
						margin-top: 1rem;
					}
				}
			}
		}
		footer {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 5rem;
			background-color: #fff;

			ul {
				display: flex;

				li {
					flex: 1;
					height: 5rem;
					display: flex;
					flex-direction: column;
					justify-content: center;
					text-align: center;
					position: relative;

					i {
						font-size: 2rem;
						color: #666;
					}

					span {
						color: #666;
					}
					
					.van-info {
						position: absolute;
						top: 0.4rem;
						right: 1rem;
						display: block;
						min-width: 1.4rem;
						height: 1.4rem;
						background-color: #f44;
						border-radius: 0.7rem;
						color: #fff;
						text-align: center;
						line-height: 1.4rem;
						padding: 0.05rem;
					}
					&:nth-child(3){
						.anim{
							font-size: 1.8rem;
							font-weight: 700;
							color: #f44;
							position: absolute;
							top: 0;
							left: 1.5rem;
							animation: moveNum 1s linear;
						}
					}
					@keyframes moveNum{
						0%{
							top: 0;
							opacity: 0;
						}
						50%{
							top: -2.5rem;
							opacity: 1;
						}
						100%{
							top: -2.5rem;
							opacity: 0;
						}
					}
					

					&:nth-child(4) {
						flex: 2;
						background-color: #f44;
						color: #fff;
						font-size: 1.6rem;
					}

					&:nth-child(5) {
						flex: 2;
						background-color: #ff976a;
						color: #fff;
						font-size: 1.6rem;
					}
				}
			}
		}
	}
</style>
