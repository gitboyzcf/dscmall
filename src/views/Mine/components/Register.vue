<!-- 用户注册页面 -->
<template>
	<div class="user-register">
		<form action="">
			<div class="item-input">
				<i class="iconfont icon-pic" style="margin-top: 2.5px;"></i>
				<input type="text" v-model="captcha" placeholder="请输入图片验证码">
				<span class="key"><img :src="url+'/getcaptcha'" ref="svgCaptcha" @click="updCaptcha" style="height: 3rem;"></span>
			</div>
			<div class="phone-input">
				<i class="iconfont icon-Category_icon_MobilesAccessories" style="font-size: 1.9rem;margin-left: -3px;"></i>
				<input type="text" v-model="phone" placeholder="请输入手机号">
				<span class="key" @click="getCaptcha" v-if="!num">{{phoneTip}}</span>
				<span class="key" v-else>已发送{{num}}s</span>
			</div>
			<div class="verify-code-input">
				<i class="iconfont icon-icon-viewlist" style="font-size: 0.8rem;margin: 5px 2px 0 1px;"></i>
				<input type="text" v-model="msgCode" placeholder="请输入短信验证码">
			</div>
			<div class="login-pwd-input">
				<i class="iconfont icon-yaochi" style="font-size: 1.9rem;margin-left: -3px;"></i>
				<input type="text" v-model="login_password"  placeholder="请输入密码">
			</div>
			<div class="register-btn">
				<input type="button" value="立即注册" @click="userRegister">
			</div>
		</form>
		
	</div>
</template>

<script>
	import Axios from "axios";
	import {
		Toast,
		MessageBox,
	} from 'mint-ui';
	export default{
		data(){
			return{
				url: "http://8.129.125.249:3000/user/api",//请求路径
				captcha:"",//图片验证码
				phone:"", //手机号
				msgCode:"",//短信验证码
				login_password:"",//密码
				phoneTip:"获取验证码",
				num:"",
			}
		}, 
		computed:{
			// 验证手机号
			verifyPhone(){
				return /^1[3|5|8][0-9]{9}$/.test(this.phone);
			}
		},
		methods:{
			updCaptcha(){
				this.$refs.svgCaptcha.src = this.url+"/getcaptcha?t=" + new Date().getTime();
			},
			// 提示信息
			getTis(msg) {
				Toast({
					message: msg,
					position: 'middle',
					duration: 2000,
				});
			},
			// 获取手机验证码
			async getCaptcha(){
				if(this.captcha){
					if(this.phone){
						if(this.verifyPhone){
							this.phoneTip = "重新发送验证码";
							this.num = 59;
							let timer = setInterval(()=>{
								this.num--;
								if(this.num == 0){
									clearInterval(timer);
								}
							},1000);
							let result = await Axios.post(this.url+"/getcode",{
								phone:this.phone,
							});
							console.log(result);
						}else{
							this.getTis("手机格式不正确");
						}
					}else{
						this.getTis("请输入手机号");
					}
				}else{
					this.getTis("请输入验证码");
				}
			},
			// 点击注册
			async userRegister(){
				
				if(this.login_password != "" && this.msgCode != ""){
					if(this.verifyPhone){
						let result = await Axios.post(this.url+"/register",{
							captcha:this.captcha,
							login_password:this.login_password,
							phone:this.phone,
							msgCode:this.msgCode,
						});
						console.log(result);
						// 检测是否注册成功(手否有一行受影响)
						if(result.data.data.affectedRows){
							MessageBox.alert(result.data.msg).then(action => {
								if(action == "confirm"){
									console.log(result.data.username);
									this.$router.push({path:"/mine/login",query:{u_name:result.data.username}});
								}
							});
						}
						
					}else{
						this.getTis("手机格式不正确")
					}
				}else{
					this.getTis("内容有空，请补全");
				}
			}
		},
	}
</script>

<style lang="less">
	.user-register{
		width: 100%;
		margin-top: 1rem;
		form{
			&>div{
				border-bottom: 2px solid #EFEFEF;
				margin-bottom: 1rem;
				display: flex;
				&:last-child{
					border-bottom: none;
				}
				i{
					font-size: 1.6rem;
					color: #999;
				}
				input{
					flex: 1;
					height: 2.4rem;
					text-indent: 0.5rem;
					margin-bottom: 1rem;
					&::-webkit-input-placeholder{
						color: #999;
					}
				}
			}
			.item-input{
				.key{
					
				}
			}
			.phone-input{
				.key {
					background-color: #f44;
					font-size: 1.4rem;
					height: 3.2rem;
					line-height: 3.2rem;
					padding: 0 1rem;
					color: #fff;
				}
			}
			.register-btn{
				height: 4rem;
				background-color: #f44;
				border-radius: 0.5rem;
				margin-top: 2rem;
				input{
					height: 4rem;
					background-color: transparent;
					color: #fff;
					font-size: 1.4rem;
				}
			}
		}
	}
</style>
