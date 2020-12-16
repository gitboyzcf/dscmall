<!-- 个人中心组件 -->
<template>
	<div class="user-operate">
		<h2 v-if="isLogin">登录成功界面</h2>
		<!-- 手机号验证登录组件 -->
		<mobile-login :phone-login-top="top" @m_top="toUserLogin"></mobile-login>
		<!-- 用户页面 -->
		<div v-if="!isLogin">
			<div class="text-header">
				<i class="iconfont icon-jiantou3" style="z-index: 10;" onclick="window.history.back();"></i>
				<span>大商创登录注册</span>
			</div>
			<div class="midden">
				<div class="logo">
					<img :src="logoImg" alt="">
				</div>
				<div class="operate">
					<router-link to="/mine/login" :class="{active:this.$route.path=='/mine/login'}">用户登录</router-link>
					<router-link to="/mine/register" :class="{active:this.$route.path=='/mine/register'}">新用户注册</router-link>
				</div>
				<div class="operate-view">
					<transition mode="out-in">
						<router-view></router-view>
					</transition>
				</div>
			</div>
			<div class="phone-message">
				<span @click="toMessage">短信验证码登录<i class="iconfont icon-jiantou1"></i></span>
			</div>
		</div>
		<Footer v-else></Footer>
	</div>
</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import 《组件名称》 from '《组件路径》';

	import MobileLogin from "./components/MobileLogin.vue";
	// 引入footer组件 @ 此符号默认指向src文件夹
	import Footer from "@/components/Footer.vue";
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			Footer,
			MobileLogin,
		},
		data() {
			//这里存放数据
			return {
				isLogin: false, //是否登录
				logoImg: require("@/assets/images/logo.png"),
				top:"",
			};
		},
		//监听属性 类似于data概念
		computed: {
			userInfo(){
				return this.$store.state.userInfo;
			}
		},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			// 父传子给数据
			toMessage() {
				// this.$refs.mobileLogin.style.top = "0";
				this.top = "0";
			},
			// 子传父得到数据
			toUserLogin(data) {
				this.top = data;
				console.log(this.top);
			},
		},
		mounted() {
			// console.log(this.$store.state.userInfo)
			if(this.$store.state.userInfo.token){
				this.isLogin = true;
			}else{
				this.isLogin = false;
			}
		}
	};
</script>
<style lang="less">
	.user-operate {
		.mobile-login {
			width: 100%;
			height: 100%;
			background-color: #fff;
			position: fixed;
			top: 100vh;
			left: 0;
			z-index: 99;
			display: flex;
			align-items: center;
			transition: all 0.5s;

			form {
				width: 100%;
				padding: 0 1rem;
				position: relative;

				h1 {
					position: absolute;
					top: -8rem;
					font-size: 3rem;
					color: #333;
				}

				&>div {
					border-bottom: 2px solid #EFEFEF;
					margin-bottom: 1rem;
					display: flex;

					&:last-child {
						border-bottom: none;
					}

					i {
						font-size: 1.6rem;
						color: #999;
					}

					input {
						flex: 1;
						height: 2.4rem;
						text-indent: 0.5rem;
						margin-bottom: 1rem;

						&::-webkit-input-placeholder {
							color: #999;
						}
					}
				}

				.phone-input {
					.key {
						background-color: #f44;
						font-size: 1.4rem;
						height: 3.2rem;
						line-height: 3.2rem;
						padding: 0 1rem;
						color: #fff;
					}
				}

				.login-btn {
					width: 100%;
					height: 4rem;
					background-color: #f44;
					border-radius: 0.5rem;
					text-align: center;
					line-height: 4rem;
					margin-top: 2rem;

					input {
						width: 100%;
						height: 4rem;
						font-size: 1.4rem;
						color: #fff;
						background-color: transparent;
					}
				}

				.phone-message {
					display: block;
					height: 4rem;
					text-align: center;
					line-height: 4rem;
					margin-top: 1rem;
					font-size: 1.4rem;

					span,
					i {
						color: #f44;
					}
				}
			}
		}

		// -------------
		.v-enter,
		.v-leave-to {
			opacity: 0;
		}

		.v-enter-active,
		.v-leave-active {
			transition: all 0.5s;
		}

		.text-header {
			height: 4.4rem;
			line-height: 4.4rem;
			display: flex;
			border-bottom: 1px solid #EFEFEF;
			padding: 0 1rem;

			span {
				font-size: 1.6rem;
				// font-family: "agency fb";
				font-weight: 700;
				flex: 1;
				text-align: center;
				margin-left: -1.6rem;
			}
		}

		.midden {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 5rem;
			padding: 0 1rem;

			.logo {
				width: 8rem;
				height: 8rem;
				border-radius: 50%;
				box-shadow: 0 0 12px 1px #ccc;
				display: flex;
				justify-content: center;
				align-items: center;

				img {
					width: 4.5rem;
					margin-top: 1rem;
				}
			}

			.operate {
				width: 100%;
				display: flex;
				height: 5rem;
				margin: 2rem 0 1rem;

				a {
					flex: 1;
					height: 5rem;
					text-align: center;
					line-height: 5rem;
					font-size: 1.4rem;
					border: 1px solid #efefef;

					&.active {
						background-color: #f44;
						color: #fff;
					}
				}
			}

			.operate-view {
				width: 100%;
			}
		}

		.phone-message {
			height: 4rem;
			text-align: center;
			line-height: 4rem;
			color: #f44;
			margin-top: 1rem;
			font-size: 1.4rem;
		}
	}
</style>
