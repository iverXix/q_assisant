<template>
	<view>
		<image class="bg-img" src="/static/picture/bg_img.jpg"></image>
		<view class="flex-container">
			<view class="flex-item">
				<img class="logo" src="/static/picture/logo.png">
				<view class="login"><text>登录</text></view>
				<view class="login_yz">
					<view class="login_jl">
						<uni-easyinput v-on:blur="resname(user_telephone)" prefixIcon="person" v-model="user_telephone"
							placeholder="请输入手机号码" maxlength="11" />
					</view>
					<view class="login_jl">
						<uni-easyinput prefixIcon="locked-filled" @blur="respassword(password)" password="true"
							type="password" v-model="password" placeholder="请输入密码" maxlength="16" />
					</view>
					<view class="login_yzm">
						<uni-easyinput prefixIcon="checkbox-filled" @blur="rescode(graphicVerifyCode)"
							v-model="graphicVerifyCode" placeholder="请输入验证码" maxlength="4" />
					</view>
					<canvas class="canva" style="width:95px;height:86rpx;" canvas-id="canvas"
						@click="updateImageCode"></canvas>
					<view class="login_jl"><button class="b_login" @tap="login()">登录</button></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		Fcaptcha
	} from "@/common/fcaptcha.js"

	export default {
		data() {
			return {
				graphicVerifyCode: "",
				tescode: "",
				user_telephone: "",
				tesname: "",
				password: "",
				tespassword: "",
				hobby: [{
					text: '记住密码',
					value: 0
				}],
			}
		},

		mounted() {},
		onReady() {
			this.fcaptcha = new Fcaptcha({
				el: 'canvas',
				width: 80,
				height: 35,
				createCodeImg: ""
			});
		},

		methods: {
			resname(val) { //用户名输入框失去焦点触发,根据需求使用正则判断
				var regPhone = (/^(13[0-9]|14[1579]|15[0-3,5-9]|16[6]|17[0123456789]|18[0-9]|19[89])\d{8}$/);
				//手机号码正则判断:各运营商开头前三位+八位,即11位的电话号码。
				if (!regPhone.test(val)) {
					// !表示:与regPhone(正则判断)不符
					this.tesname = 1 //标记判断结果,0——正确;1——错误;
					uni.showToast({
						title: '手机号格式错误',
						icon: 'none'
					});
					return;
				}
				if (regPhone.test(val)) {
					this.tesname = 0
					uni.showToast({
						title: '手机号格式正确',
					});
					return;
				}
			},

			// 刷新验证码
			updateImageCode() {
				this.fcaptcha.refresh()
			},
			rescode(val) {
				//获取提交的验证码
				if (!this.graphicVerifyCode) {
					uni.showToast({
						title: '验证码为空',
						icon: "none"
					});
					return;
				}
				let validate = this.fcaptcha.validate(this.graphicVerifyCode)
				if (!validate) {
					this.updateImageCode();
					this.tescode = 1
					uni.showToast({
						title: '验证码错误',
						icon: "none"
					});
					return;
				} else {
					this.tescode = 0
					return;
				}
			},

			respassword(val) { //密码输入框失去焦点触发,密码只要不为空就行
				if (val != "") {
					this.tespassword = 0 //标记判断结果,0——正确;1——错误;
					return;
				}
				if (val == "") {
					this.tespassword = 1
					uni.showToast({
						title: '密码不能为空',
						icon: 'none'
					});
					return;
				}
			},
			login() { //点击登录触发,格式都对就执行,错就提示
				if(this.testphone == 1){
					uni.showToast({
						title:'用户名格式错误',
						icon:'none'
					});
					return;
				}
				if(this.password == ""){
					uni.showToast({
						icon:'none',
						position:'bottom',
						title:"密码不能为空"
					});
					return;
				}
				if(this.tescode == 1 || this.graphicVerifyCode == ''){
					uni.showToast({
						icon:'none',
						position:'bottom',
						title:"验证码为空或验证码错误"
					});
					return;
				}
				if (this.tesname == 0 && this.tespassword == 0 && this.tescode == 0) { //&&——与符号,表示前后两个条件都要符合才行。
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					});
					uniCloud.callFunction({
						name: "adminlogin",
						data: {
							"user_telephone": this.user_telephone,
							"password": this.password,
						},
						success: (res) => {
							console.log("对login函数发送请求成功", res)
							var status = res.result.status
							if (status == 0) {
								uni.showToast({
									title: '登录成功',
									icon: 'none'
								});
								uni.redirectTo({
									url: '/pages_admin/pages/admin/adminHome/adminHome'
								});
							}
							if (status == 1) {
								uni.showToast({
									title: '用户名不存在',
									icon: 'none'
								});
							}
							if (status == 2) {
								uni.showToast({
									title: '密码错误',
									icon: 'none'
								});
							}

						},
						fail: (err) => {
							console.log("发送请求失败,错误信息如下", res)
						}
					})
				} else {
					uni.showToast({
						title: '错了,重来',
						icon: 'none'
					});
					
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.bg-img {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.flex-container {
		display: -webkit-flex;
		display: flex;
		width: auto;
		height: 450px;
		margin-top: 20%;
		padding-top: 20%;

	}

	.flex-item {
		background-color: white;
		width: 85%;
		height: 80%;
		margin: auto;
		border-radius: 25px;
		box-shadow: 5px 5px 15px 2px #8888;
		text-align: center;
	}

	.logo {
		width: 100px;
		height: 40px;
		padding-top: 10px;
	}

	.login {
		font-size: 25px;
		color: #fcce0a;
		margin: 10rpx auto;
	}

	.login_yz {
		width: 80%;
		margin: 30rpx auto;
	}

	.login_jl {
		margin: 20rpx auto;
	}
    
	.login_yzm {
		margin: 20rpx 0;
		position: absolute;
		width: 40%;
	}
	
    canvas{
		margin: 8px 0 0 0;
		float: right;
	}

	.b_login {
		margin-top: 70px;
		background-color: #fcce0a;
		color: white;
		border-radius: 25px;
	}

	.btregister {
		border: none;
		color: #999;

	}
</style>
