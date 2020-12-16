<!-- 用户登录页 -->
<template>
	<div class="user-login">
		<form action="">
			<div class="uname-input">
				<i class="iconfont icon-wode" style="font-weight: 700;"></i>
				<input type="text" v-model="user_name" placeholder="请输入您的用户名">
			</div>
				<label style="color: #f44;" v-show="u_name">您注册时的用户名是：{{u_name}}</label>
			<div class="upwd-input">
				<i class="iconfont icon-icon-pwd" style="font-size: 1.6rem; color: #a8a8a8;"></i>
				<input type="text" v-model="login_password" placeholder="请输入登录密码" v-if="isShow">
				<input type="password" v-model="login_password" placeholder="请输入登录密码" v-else>
				<span class="iconfont icon-xianshi" v-if="isShow" @click="isShowFn"></span>
				<span class="iconfont icon-yincang" v-else @click="isShowFn"></span>
			</div>
			<div class="login-btn">
				<input type="button" value="登录" ref="login" @click="userLogin">
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
	export default {
		data() {
			return {
				isShow: false,
				url: "http://8.129.125.249:3000/user/api",
				user_name: "",
				login_password: "",
				u_name:"",
			}
		},
		methods: {
			// 密码显示隐藏
			isShowFn() {
				this.isShow = !this.isShow;
			},
			getTis(msg) {
				Toast({
					message: msg,
					position: 'middle',
					duration: 2000,
				});
			},
			// 用户登录
			async userLogin() {
				if (this.user_name != "" && this.login_password != "") {
					let result = await Axios.post(this.url + "/login", {
						user_name: this.user_name.trim(),
						login_password: this.login_password.trim(),
					});
					if(result.data.status == 200){
						console.log(result.data.status);
						MessageBox.alert(result.data.msg).then(ok => {
							if(ok == "confirm"){
								this.$store.commit("changeUserInfo",result.data);
								this.$router.replace("/home");
							}
						});
					}else{
						MessageBox.alert(result.data.msg).then(() => {});
					}
					console.log(result);
				} else {
					this.getTis("内容有空，请填全");
				}
			}
		},
		mounted(){
			this.u_name = this.$route.query.u_name;
		}

	}
</script>

<style lang="less">
	.user-login {
		width: 100%;

		form {

			div:nth-child(1),
			div:nth-child(3) {
				padding-bottom: 1rem;
				border-bottom: 2px solid #EFEFEF;
				margin: 1rem 0;
				position: relative;

				input {
					text-indent: 2rem;
					width: 100%;
					height: 2.4rem;
					font-size: 1.5rem;

					&::-webkit-input-placeholder {
						color: #999;
					}
				}

				i {
					color: #999;
					position: absolute;
					font-size: 1.8rem;
					top: 0.2rem;
					left: 0;
				}
			}

			.upwd-input {
				span {
					font-size: 2rem;
					position: absolute;
					right: 0;
					top: 0;

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
		}
	}
</style>
