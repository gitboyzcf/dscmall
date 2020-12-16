<!-- 短信登录验证 -->
<template>
	<!-- 手机短信验证登录 -->
	<div class="mobile-login" ref="mobileLogin" :style="{top:phoneLoginTop}">
		<form action="" method="">
			<h1>短信验证码登录</h1>
			<div class="item-input">
				<i class="iconfont icon-pic" style="margin-top: 2.5px;"></i>
				<input type="text" placeholder="请输入图片验证码" name="captcha" v-model="userCaptcha">
				<span class="key"><img :src="url+'/getcaptcha'" ref="svgCaptcha" @click="updCaptcha" style="height: 3rem;"></span>
			</div>
			<div class="phone-input">
				<i class="iconfont icon-Category_icon_MobilesAccessories" style="font-size: 1.9rem;margin-left: -3px;"></i>
				<input type="text" placeholder="请输入手机号" name="phone" maxlength="11" v-model="userPhone">
				<span class="key" @click="getCaptcha" v-if="!num">{{phoneTip}}</span>
				<span class="key" v-else>已发送{{num}}s</span>
			</div>
			<div class="verify-code-input">
				<i class="iconfont icon-icon-viewlist" style="font-size: 0.8rem;margin: 5px 2px 0 1px;"></i>
				<input type="text" placeholder="请输入短信验证码" name="code" v-model="u_phoneCaptcha">
			</div>
			<div class="login-btn">
				<input type="button" value="立即登录" @click="submitLogin">
			</div>

			<div class="phone-message">
				<span @click="toUserLogin">用户密码登录<i class="iconfont icon-jiantou1"></i></span>
			</div>
		</form>
	</div>
</template>

<script>
	import Axios from "axios";
	import {
		Toast
	} from 'mint-ui';
	export default{
		data(){
			return{
				url:"http://8.129.125.249:3000/user/api",
				phoneTip: "获取验证码", //获取手机验证码提示
				num: 0,
				timer: null,
				userCaptcha: "", //用户输入的验证码
				userPhone: "", //用户输入的手机号
				u_phoneCaptcha: "", //用户输入的手机短信验证码
			}
		},
		props:{
			phoneLoginTop:String,
		},
		computed: {
			// 判断手机号输入是否合法
			verifyPhone() {
				return /^1[3|5|8][0-9]{9}$/.test(this.userPhone);
			}
		},
		methods:{
			// 回到用户登录
			toUserLogin() {
				
				// this.$refs.mobileLogin.style.top = "100vh";
				this.$refs.mobileLogin.style.top = "100vh";
				this.$emit("m_top",this.$refs.mobileLogin.style.top)
				this.$router.replace("/mine/login");
			},
			// 获取从后台请求到的验证码图片
			updCaptcha() {
				this.$refs.svgCaptcha.src = this.url+"/getcaptcha?t=" + new Date().getTime();
			},
			async getCaptcha() {
				// 获取后台验证码
				let result = await Axios.get(this.url+"/getsvg_cap");
				// 先判断用户输入验证码是否正确
				if(this.userCaptcha.toLowerCase() == result.data.data.toLowerCase()){
					// 非空验证
					if (this.userPhone != "") {
						// 手机号验证
						if (this.verifyPhone) {
							this.phoneTip = "重新发送验证码";
							this.num = 59;
							this.timer = setInterval(() => {
								this.num--
								if (this.num == 0) {
									clearInterval(this.timer);
								}
							}, 1000);
							// 发送短信获取验证码
							let phone_result = await Axios.post(this.url+"/getcode",{phone:this.userPhone});
							console.log(phone_result);
						} else {
							this.tipMsg("手机号格式错误")
						}
					} else {
						this.tipMsg("手机号不能为空")
					}
				}else{
					this.tipMsg("验证码错误")
				}
			},
			// 提示信息
			tipMsg(str){
				Toast({
					message: str,
					position: 'middle',
					duration: 2000,
				});
			},
			submitLogin(e) {
				// 内容非空验证
				if (this.userCaptcha == "" || this.u_phoneCaptcha == "") {
					e.preventDefault();
					this.tipMsg("内容有空，请填全");
				}else if(!this.verifyPhone){
					e.preventDefault();
					this.tipMsg("手机号格式不正确")
				}else{
					e.preventDefault();
					Axios.post(this.url+"/getphonelogin",{
						phone:this.userPhone,
						captcha:this.userCaptcha,
						code:this.u_phoneCaptcha,
					}).then(rel=>{
						this.$store.commit("changeUserInfo",rel.data);
						// console.log(this.$store.state.userInfo)
					});
					// 跳转页面
					this.$router.replace("/home")
				}
			}
		}
	}
</script>

<style lang="less">
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
