<template>
	<view>
		<image class="coupon_bg" src="/static/coup/coupon_bg.jpg"></image>
		<view style="margin-top: 5px;">
			<uni-data-select v-model="value" :localdata="range" @change="change" :clear="false"></uni-data-select>
		</view>
		<navigator hover-class="none" class="search-s" url="/pages/search/search">
			<uni-search-bar class="uni-mt-10" radius="25" placeholder="搜索" clearButton="auto" cancelButton="none"
				@confirm="search" />
		</navigator>
		<view class="vip">会员福利</view>
		<view class="score">当前积分：{{newscore}}</view>
		<view class="shuju">
			<uni-row>
				<uni-col :span="5">
					<img style="width: 30px;height: 30px; margin: 25px 0px 0px 30px;" src="/static/coup/icon_score.jpg">
				</uni-col>
				<uni-col :span="6">
					<p style="padding-top: 30px;">积分兑换</p>
				</uni-col>
				<uni-col :span="5">
					<img style="width: 30px;height: 30px; margin: 25px 0px 0px 30px;"
						src="/static/coup/icon_package.jpg" @tap="goucoupon">
				</uni-col>
				<uni-col :span="5">
					<p style="padding-top: 30px;" @tap="goucoupon">我的卡包</p>
				</uni-col>
			</uni-row>
		</view>

		<view class="coup">
			<uni-section class="mb-5" title="福利卡卷" type="line"></uni-section>
			<view class="one" v-for="(item,index ) in coupon" :key="_id">
				<img src="../../static/coup/coupon_bj.png">
				<view class="yhj">
					<view class="coup_left">
						<p class="left_rt">{{item.c_price}}元</p>
						<p class="left_rb">{{item.c_term}}</p>
					</view>
					<view class="left_l">
						<p>优惠券</p>
					</view>
					<view class="coup_right">
						<p class="shop_name">{{item.c_name}}</p>
						<p class="use_time">{{item.c_time}}</p>
						<p class="use_score">￥{{item.c_score}}积分</p>
					</view>
					<view class="button">
						<u-button type="error" text="立即兑换" size="small" shape="circle" @tap="exchange(coupon[index])">
						</u-button>
					</view>
				</view>
			</view>
			<view class="footer"><u-divider text="您没有更多优惠卷了" ></u-divider></view>
		</view>





	</view>
</template>

<script>
	export default {
		data() {
			return {
				gutter: 0,
				coupon: {
					_id: '',
					c_name: '',
					c_time: '',
					c_score: '',
					c_price: '',
					c_term: ''
				},
				userInfo: {
					id: '',
				},
				newscore: '',
				u_id:'',
				// nvueWidth: 730,
				value: 0,
				range: [{
						value: 0,
						text: "新港区"
					},
					{
						value: 1,
						text: "南海南"
					},
					{
						value: 2,
						text: "南海北"
					},
				],
				searchValue: '123123',
			};
		},
		onLoad: function(options) {
			this.showscore();
			const db = uniCloud.database();
			db.collection('coupons').get().then(res => { //shops是数据库里面集合的名称
				this.coupon = res.result.data
			}).catch(err => {
				console.log(err); //如果更新数据失败则输出失败信息
			})


		},
		methods: {
			change(e) {
				
			},
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})

			},
			showscore() {
				uni.getStorage({
					key: 'user',
					success: (res) => {
						this.userInfo.id = res.data.user._id
						let _id = {
							_id: this.userInfo.id
						}
						const db = uniCloud.database();
						db.collection("uni-id-users").where(_id).get().then(res => {
							this.newscore = res.result.data[0].new_score
							this.u_id = res.result.data[0]._id
						}).catch(err => {
							console.log(err)
						})
					},

				});
			},
			exchange(e) {
				uni.showModal({
					title: '重要提示',
					content: '是否要兑换此卷',
					cancelText: '取消',
					confirmText: '确定',
					success: (res) => {
						if (res.confirm) {
							this.duihuan(e);
						} else {
							uni.showToast({
								title: '您取消了兑换',
								icon: 'none',
							})
						}
					}

				})
			},

			//判断积分是否足够兑换该优惠卷
			duihuan(e) {
				var c_score = e.c_score
				var newscore = this.newscore
				if (c_score > newscore) {
					uni.showToast({
						title: '您的积分不够兑换此卷',
						icon: 'none',
					})
				} else {
					let _id = {
						_id: this.userInfo.id
					}
					let score = newscore - c_score
					const db = uniCloud.database();
					db.collection("uni-id-users").where(_id).update({
						new_score: score
					})
					//获取卡卷信息并传到卡包的数据表里
					let coupon = {
						_id: e._id
					}
					
					db.collection("coupons").where(coupon).get().then(res => {
						var u_id = this.u_id
						db.collection("user_coupon").add({
							c_name: res.result.data[0].c_name,
							c_time: res.result.data[0].c_time,
							c_score: res.result.data[0].c_score,
							c_price: res.result.data[0].c_price,
							c_term: res.result.data[0].c_term,
							u_id: u_id,
						}).then(res => {
							
						})
					})
					uni.showModal({
						title: '重要提示',
						content: '您已成功兑换此卷，已放入卡包',
						showCancel: false,
						confirmText: '确定',
						success: (res) => {
							if (res.confirm) {
								//console.log('点击')
								uni.redirectTo({
									url: '/pages/coupon/coupon'
								});
							} else {
								console.log('失败')
							}
						}

					})

				}
				
			},
			goucoupon(){
				uni.navigateTo({
					url: '/pages/coupon/user_coupon'
				});
			}

		},
	};
</script>

<style scoped lang='scss'>
	.bgcolor {
		background-color: #f2f3f8;
	}

	::v-deep .uni-stat__select {
		width: 20%;
		position: absolute;
		margin-top: 10px;
		z-index: 1;
	}

	.coupon_bg {
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
		position: absolute;
	}

	::v-deep .uni-searchbar {
		width: 73%;
		float: right;
		z-index: 1;
		margin-top: -10px;
	}

	::v-deep .uni-searchbar__box-icon-search {
		margin-left: 25px;
	}

	.vip {
		display: block;
		position: absolute;
		margin-top: 80px;
		margin-left: 75px;
		font-size: 24px;
		color: white;
	}

	.score {
		display: block;
		position: absolute;
		margin-top: 120px;
		margin-left: 135px;
		font-size: 20px;
		color: white;
	}

	.coup {
		position: absolute;
		margin: 250px 0 0 0px;
		width: 100%;
		height: auto;
		background-color: #f2f3f8;
	}



	.shuju {
		width: 85%;
		height: 80px;
		background-color: white;
		border-radius: 12px;
		box-shadow: 0px 1px 6px 0px #8888;
		margin: 160px 28px;
		position: absolute;
	}

	.one {
		position: relative;
	}

	.one img {
		width: 95%;
		height: 120px;
		margin-left: 10px;
	}

	.yhj {
		position: absolute;
		margin-top: -125px;
	}

	.coup_left {
		float: left;
		margin-left: 10px;
	}

	.left_rt {
		color: red;
		font-size: 22px;
		font-weight: 600;
		width: 50px;
		letter-spacing: 3px;
		margin: 38px 0px 0px 23px;
	}

	.left_rb {
		font-size: 10px;
		width: 56px;
		margin-left: 15px;
		color: #888;

	}

	.left_l {
		float: left;
		width: 5px;
		margin-top: 30px;
		padding-left: 3px;
		color: red;
		font-weight: 600;
	}

	.coup_right {
		float: left;

	}

	.shop_name {
		margin: 30px 0px 0px 30px;
		letter-spacing: 3px;
		font-weight: 550;
		color: dimgray;
	}

	.use_time {
		font-size: 12px;
		margin: 5px 0px 0px 50px;
		color: #888;
	}

	.use_score {
		margin: 8px 0px 0px 110px;
		color: #fcd402;
	}

	.button {
		float: left;
		margin: 48px 0px 0px 8px;
	}
</style>
