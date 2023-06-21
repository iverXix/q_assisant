<template>
	<view>
		<view >
			<view>
				<view class="shop" v-for="item in list" :key="index">
					<view class="photo">
						<img :src="item.f_img" alt="">
					</view>
					<uni-row>
					<uni-col span="12"><view class="text">{{item.f_name}}</view></uni-col>
					<uni-col span="12"><view class="text1">￥{{item.f_price}}</view></uni-col>
					<uni-col>
						<view class="text2">{{item.f_recom}}人推荐</view>
					</uni-col>
					</uni-row>
						
				</view>
				
				<view class="bg_fg2"></view>
			</view>
			<view class="footer"><u-divider text="我也是有底线的" ></u-divider></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
			}
		},
	
		methods: {
			
		},
		onLoad: function(e) {
			let s_obj = {
				s_name:JSON.parse(e.s_name)
			}
			console.log(s_obj)
			const db = uniCloud.database();
			db.collection('food').where(s_obj).orderBy('f_recom desc').get().then(res => {
				this.list = res.result.data
			}).catch(err => {
				console.log(err)
			})
			
		}
	}
</script>

<style>
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
		width: 400px;
	}
	.text1 {
		margin-top: 15px;
		text-align: left;
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
