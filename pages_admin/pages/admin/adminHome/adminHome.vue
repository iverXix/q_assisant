<template>
	<view class="container">
		<view class="top">
			<view class="tpl-icon">
				<img src="/static/picture/logo_cs.png">
				<p>admin</p>
			</view>
			<view class="tpr" @tap="loginout">
				<p>退出</p>
			</view>
		</view>
		<!-- 内容 -->
		<view class="bg_fg2"></view>
		<view class="middle">
			<view class="shops" @tap="ShopsList">
				<unicloud-db v-slot:default="{data, loading, error, options}" collection="shops">
					<view v-if="error">{{error.message}}</view>
					<view v-else>
						<view class="table">
							<view class="list">
							<p>档口管理</p>
							<span class="geng">更多></span>
							</view>
							<uni-list class="list">
								<uni-list-item v-for="item in data" :key="item._id" :title="item.s_name"></uni-list-item>
							</uni-list>
						</view>
					</view>
				</unicloud-db>
			</view>
			<view class="bg_fg"></view>
			<view class="coupons" @tap="couponsList">
				<unicloud-db v-slot:default="{data, loading, error, options}" collection="coupons">
					<view v-if="error">{{error.message}}</view>
					<view v-else>
						<view class="table">
							<view class="list">
							<p>优惠券管理</p>
							<span class="geng">更多></span>
							</view>
							<uni-list>
								<uni-list-item v-for="item in data" :key="item._id" :title="item.c_name"></uni-list-item>
							</uni-list>
						</view>
					</view>
				</unicloud-db>
			</view>
			<view class="bg_fg"></view>
			<view class="food" @tap="foodList">
				<view class="table">
					<view class="list">
					<p>菜品管理</p>
					<span class="geng">更多></span>
					</view>
					<uni-list>
						<uni-list-item v-for="item in food" :key="item._id" :title="item.f_name"></uni-list-item>
					</uni-list>
				</view>
			</view>
			<view class="bg_fg"></view>
			<view class="food" @tap="foodEvaluateList()">
				<view class="table">
					<view class="list">
					<p>评论管理</p>
					<span class="geng">更多></span>
					</view>
					<uni-list>
						<uni-list-item v-for="item in foodEvaluate" :key="item._id" :title="item.content"></uni-list-item>
					</uni-list>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				food: [],
				foodEvaluate: []
			}
		},
		methods: {
			ShopsList() {
				uni.navigateTo({
					url: '/pages_admin/pages/shops/list'
				})
			},
			couponsList() {
				uni.navigateTo({
					url: '/pages_admin/pages/coupons/list'
				})
			},
			foodList() {
				uni.navigateTo({
					url: '/pages_admin/pages/food/list'
				})
			},
			InfoShow() {
				const db = uniCloud.database();
				db.collection('food-evaluate').orderBy('create_date desc').limit(5).get().then(res => {
					console.log(res.result.data)
					this.foodEvaluate = res.result.data
				}).catch(err => {
					console.log(err)
				})
				db.collection('food').orderBy('create_date desc').limit(5).get().then(res => {
					console.log(res.result.data)
					this.food = res.result.data
				}).catch(err => {
					console.log(err)
				})
			},
			foodEvaluateList() {
				uni.navigateTo({
					url: '/pages_admin/pages/food-evaluate/list'
				})
			},
			loginout() {
				uni.redirectTo({
					url:'/pages/login/login'
				})
			}
		},
		onLoad() {
			this.InfoShow()
		},
		components: {

		}
	};
</script>

<style lang="scss" scoped>
	.geng{
		 color:#A9A9A9;
	 }
	.bg_fg2 {
		background-color: #f3f4f8;
		width: 100%;
		height: 10px;
		margin-bottom: 15px;
	}
	.bg_fg {
		background-color: #f3f4f8;
		width: 100%;
		height: 10px;
		margin-bottom: 15px;
		margin-top: -20px;
	}
	.search {
		margin: 20rpx;
	}

	.top {
		// border: 1px solid blue;
		width: 100%;
		height: 45px;
	}

	.tpl-icon {
		// border: 1px solid blue;
		float: left;
		width: 50%;
	}
	.list{
		margin-bottom: 30rpx;
	}

	.tpl-icon img {
		// border: 1px solid red;
		 margin: 5px 20px 0 10px;
		 float: left;		
		width: 30px;
		height:30px;
	}
	.tpl-icon p {
		// border: 1px solid red;
		 margin: 10px 5px 0 0;		
	}

	.tpr {
		// border: 1px solid blue;
		float: right;
		margin: 10px 20px 0 0;
		color: #696969;
		
	}

	.table {
		// border: 0.5px solid gray;
		margin-bottom: 20px;
	}

	.table p {
		// border: 1px solid blue;
		display: inline;
		margin-left: 10px;
		
	}

	.table span {
		// border: 1px solid blue;
		float: right;
		margin-right: 10px;
	}
</style>
