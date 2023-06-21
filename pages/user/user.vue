<template>
	<view class="bg_color">
		<view class="touxiang">
			<uni-row>
				<uni-col :span="8"><img class="touxiang1" :src="userInfo.avatarUrl"></img></uni-col>
				<uni-col :span="12">
					<p class="u_name">{{userInfo.nickname}}</p>
					<p class="u_level">等级：{{u_level}}</p>
				</uni-col>
			</uni-row>
		</view>
		<view class="shuju">
			<uni-row>
				<uni-col :span="6">
					<p class="store">{{newscore}}</p>
					<p class="store2">我的积分</p>
				</uni-col>
				<uni-col :span="10">
					<p class="store">{{u_coupon}}</p>
					<p class="store2">我的卡卷</p>
				</uni-col>
				<uni-col :span="8">
					<p class="store">{{evaluate}}</p>
					<p class="store2">我的评价</p>
				</uni-col>
			</uni-row>
		</view>

		<view class="zhongxing">
			<uni-section class="mb-10" title="账户中心" type="line"></uni-section>
			<navigator hover-class="none" class="search-s">
				<uni-icons type="person-filled" size="30"></uni-icons>
				<p>个人信息</p>
			</navigator>
			
			<navigator hover-class="none" class="search-s">
				<uni-icons type="hand-up-filled" size="30"></uni-icons>
				<p>我的推荐</p>
			</navigator>
			<navigator hover-class="none" class="search-s">
				<uni-icons type="chatboxes" size="30"></uni-icons>
				<p>我的消息</p>
			</navigator>
			<navigator hover-class="none" class="search-s">
				<uni-icons type="wallet-filled" size="30"></uni-icons>
				<p>我的卡包</p>
			</navigator>
			<navigator hover-class="none" class="search-s">
				<uni-icons type="gear" size="30"></uni-icons>
				<p>我的设置</p>
			</navigator>
		</view>
		<view class="fuwu">
			<uni-section class="mb-10" style="float: left;" title="我的服务" type="line">
				<navigator hover-class="none" class="gengduo">
					<p style="float: right; margin: -31px -120px; font-size: 12px;color: gray;">更多 ></p>
				</navigator>
				<navigator hover-class="none" class="fuwu_yy"><img
						src="/static/picture/wenda.png">
					<p style="font-size: 12px;">问答库</p>
				</navigator>
				<navigator hover-class="none" class="fuwu_yy"><img
						src="/static/picture/kebiao.png">
					<p style="font-size: 12px;">我的课表</p>
				</navigator>
				<navigator hover-class="none" class="fuwu_yy"><img
						src="/static/picture/ditu.png">
					<p style="font-size: 12px;">校园地图</p>
				</navigator>
			</uni-section>
		</view>

		<view class="tuichu">
			<uni-list>
				<uni-list-item title="客服热线" showArrow></uni-list-item>

				<text style="text-align: center; margin-bottom: 12px;" @click="exitLogin">退出登录</text>
			</uni-list>
		</view>
		<u-divider text="没有更多啦"></u-divider>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					nickname: '',
					id: '',
					avatarUrl: ''
				},
				newscore: '',
				u_level: '',
				u_coupon:'',
				evaluate:''
			}
		},
		onLoad() {
			this.showscore()
			this.showucoupon()
		},
		methods: {
			
			exitLogin() {
				uni.removeStorage({
					key: 'storage_key',
					success: function(res) {
						uni.showToast({
							title: "账号已退出!",
							icon: "success",
						})
					}
				});
				uni.reLaunch({
					url: "../login/login"
				})
			},
			showscore() {				
				uni.getStorage({
					key: 'user',
					success: (res) => {
						this.userInfo.id = res.data.user._id
						this.userInfo.nickname = res.data.user.nickName
						this.userInfo.avatarUrl = res.data.user.avatarUrl
						let _id = {
							_id: this.userInfo.id
						}
						let user_id = {
							user_id: this.userInfo.id
						}
						const db = uniCloud.database();
						db.collection("uni-id-users").where(_id).get().then(res => {
							this.newscore = res.result.data[0].new_score
							this.u_level = res.result.data[0].u_level

						}).catch(err => {
							console.log(err)
						})
						db.collection("food-evaluate").where(user_id).get().then(res => {
							this.evaluate = res.result.data.length
							
						
						}).catch(err => {
							console.log(err)
						})
						
					},

				});
			},
			showucoupon(){
			uni.getStorage({
				key: 'user',
				success: (res) => {
					let u_id = {
						u_id: res.data.user._id
					}
					const db = uniCloud.database();
					db.collection("user_coupon").where(u_id).get().then(res => {
						 this.u_coupon = res.result.data.length
						
			
					}).catch(err => {
						console.log(err)
					})
				},
			
			});
			}

		}
	}
</script>

<style lang="scss">
	.bg_color {
		background-color: #f3f4f8;
	}

	.touxiang {
		width: 100%;
		height: 150px;
		background-color: #fcd402;
	}

	.touxiang1 {
		width: 70px;
		height: 70px;
		border-radius: 100px;
		margin: 30px 0px 0px 30px;
	}

	.u_name {
		margin: 40px 0px;
		font-size: 25px;
	}

	.u_level {
		margin: -35px 0px;
		color: dimgrey;
		font-size: 14px;
	}

	.shuju {
		width: 93%;
		height: 100px;
		background-color: white;
		border-radius: 12px;
		box-shadow: 2px 1px 10px 0px #8888;
		margin: -35px 14px;

	}

	.store {
		text-align: center;
		font-size: 25px;
		font-weight: 500;
		margin-top: 20px;
		margin-left: 20px;
	}

	.store2 {
		text-align: center;
		margin-left: 20px;
		padding-top: 5px;
		font-size: 15px;
	}

	.zhongxing {
		width: 93%;
		height: 180px;
		background-color: white;
		border-radius: 12px;
		margin: 65px 14px;
	}

	.search-s {
		margin-left: 10px;
		float: left;
		text-align: center;
		padding-left: 20px;
		padding-top: 15px;
	}

	.search-s p {
		font-size: 12px;
	}

	.fuwu {
		width: 93%;
		height: 110px;
		background-color: white;
		border-radius: 12px;
		margin: -40px 14px;
	}

	.fuwu_yy img {
		width: 70rpx;
		height: 70rpx;
	}

	.fuwu_yy {
		float: left;
		margin-left: 25px;
		text-align: center;
	}

	.tuichu {
		clear: both;
		margin-top: 65px;
		width: 91%;
		margin-left: 18px;
	}
</style>
