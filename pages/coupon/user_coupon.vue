<template>
	<view class="body">
		<view class="coup">
			<uni-section class="mb-5" title="卡包" type="line"></uni-section>
			<view class="one" v-for="(item,index ) in coupons" :key="_id">
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
						<u-button type="error" text="到店使用" size="small" shape="circle" @tap="exchange(coupons[index])">
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
				coupons: {
					_id: '',
					c_name: '',
					c_time: '',
					c_score: '',
					c_price: '',
					c_term: '',
				},
				userInfo: {
					u_id: '',
				},
			}
		},
		onLoad: function(options) {
			uni.getStorage({
				key: 'user',
				success: (res) => {
					this.userInfo.u_id = res.data.user._id
					let u_id = {
						u_id: this.userInfo.u_id
					}
					const db = uniCloud.database();
					db.collection('user_coupon').where(u_id).get().then(res => { //shops是数据库里面集合的名称
						this.coupons = res.result.data
					}).catch(err => {
						console.log(err); //如果更新数据失败则输出失败信息
					})
				},
			
			});
			
		},
		methods: {
			exchange(e) {
				console.log(e)
				uni.showModal({
					title: '重要提示',
					content: '您是否要使用此优惠卷',
					cancelText: '取消',
					confirmText: '确定',
					success: (res) => {
						if (res.confirm) {
							let coupon = {
								_id: e._id
							}
							const db = uniCloud.database();
							db.collection("user_coupon").where(coupon).remove()
							uni.redirectTo({
								url: '/pages/coupon/user_coupon'
							});
						} else {
							uni.showToast({
								title: '您取消了使用此优惠卷',
								icon: 'none',
							})
						}
					}

				})


			}
		}
	}
</script>

<style>
	page {
		background-color: #f2f3f8;
	}

	.coup {
		position: absolute;
		width: 100%;
		height: auto;
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
