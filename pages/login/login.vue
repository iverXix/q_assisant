<template>
	<view>
		<image class="bg-img" src="/static/picture/bg_img.jpg"></image>
		<img class="logo" src="/static/picture/logo.png">
		<hr class="hr-solid">
		<p style="color: darkgray; margin:20px 30px;line-height: 2;">欢迎来到轻帮手，授权登录即表示您同意并愿意遵守用户协议和隐私政策。</p>
		<button type="primary" class="button" @click="getUserInfo">微信登录</button>
		<view class="admin" @tap="goAdmin">
			<p>管理员入口</p>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			getUserInfo() {
				const _this = this
				uni.getUserProfile({
					desc: '用于完善会员资料',
					success: (result) => {
						_this.userInfo = result.userInfo
						_this.wxLogin()
						uni.setStorage({
							key: 'storage_key',
							data: {
								userInfo: result.userInfo
							},
							success: function() {
							}
						});

						uni.switchTab({
							url: '/pages/home/home'
						});
					},
					fail: () => {
						uni.hideLoading();
						uni.showModal({
							content: '您取消了授权，请重新授权登录',
							showCancel: false
						})
					}
				})
			},

			wxLogin() {
				const _this = this
				uni.showLoading({
					title: '加载中'
				});

				uni.login({
					provider: 'weixin',
					success: (res) => { // 获取 code
						if (res.code) {
							uniCloud.callFunction({
								name: 'login',
								data: {
									action: 'code2Session',
									js_code: res.code,
									user_info: _this.userInfo
								},
							}).then(res => {
								// console.log(res.result.result)
								uni.setStorage({
									key: 'user',
									data: {
										user: res.result.result.result
									},
									success: function() {
										console.log('success')

									}
								})
							});
						}
					}
				})
			},
			goAdmin() {
				uni.navigateTo({
					url: '../../pages_admin/pages/admin/adminLogin/adminLogin'
				})
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

	.button {

		margin-left: 30px;
		margin-right: 30px;
	}

	.logo {
		margin-top: 80%;

		width: 120px;
		height: 50px;
		margin-left: 30%;
	}

	.hr-solid {
		border: 0;
		border-top: 1px solid #d0d0d5;
		margin: 15px;
	}
	
	.admin{
			margin-top: 15px;
			color: cornflowerblue;
			text-align: center;
		}
</style>
