<template>
	<view class="shop-list">
		<view class="box-bg">
			<uni-nav-bar left-icon="left" @clickLeft="back" :title="keyword" v-model="keyword" />
		</view>
		<view>
			<view v-for="(item,index) in newlist" :key="item._id" @tap="toShop(newlist[index])">
				<view class="shop">
					<view class="photo"><img :src="item.f_img" alt=""></view>
					<uni-row>
					<uni-col span="12"><view class="text">{{item.f_name}}</view></uni-col>
					<uni-col span="12"><view class="text1">￥{{item.f_price}}</view></uni-col>
					<uni-col>
						<view class="text2">档口：{{item.s_name}}</view>
					</uni-col>
					</uni-row>
						
				</view>
				
				<view class="bg_fg2"></view>
			</view>

		</view>



		<view class="footer"><u-divider text="我也是有底线的" ></u-divider></view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
				newlist:{
					
				},
			}
		},
		onLoad(e) {
			this.keyword = e.keyword
			this.getData(e);
			// this.getkey();
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			toShop(e){
				uni.navigateTo({
					url:'/pages/shop/shop?s_name=' + e.s_name
				})
			},
			getData(e) {
				let key = this.keyword;
				console.log(key);
				const db = uniCloud.database();
				uniCloud.database().collection('food').get().then(res => {
					var list = res.result.data.filter(item =>
						item.f_name.includes(key) || item.s_name.includes(key))
					this.newlist = list.map((item, index) => {
						return Object.assign({}, {
							's_name': item.s_name,
							'f_name':item.f_name,
							'f_img':item.f_img,
							'f_price':item.f_price,
						})
					})
				})




			},

		}
	}
</script>

<style lang="scss">
	.box-bg {
		padding: 5px 0;
		margin-top: 35px;
	}
	.shop {
		display: flex;		
	}

	.photo img {
		width: 65px;
		height: 65px;
		margin: 15px 0px 2px 15px;
		border-radius: 10px;
	}

	.text {
		margin: 15px;
	}
	.text1 {
		margin-top: 15px;
		margin-left: 80px;
		font-size: 14px;
		color: #fcd402;		
	}
	.text2 {
		font-size: 12px;
		margin-left: 15px;
		color: #CFCFCF;
	}

	.bg_fg2 {
		background-color: #E8E8E8;
		height: 0.2px;
		margin-left: 8px;
		margin-right: 8px;
		margin-top: 5px;
	}
	.footer{
		margin: 0 5px;
	}
</style>
