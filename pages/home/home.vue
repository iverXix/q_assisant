<template>
	<view>
		<image class="bg-img" src="/static/picture/search1.jpg"></image>
		<view class="dh">
			<view class="search">
				<uni-row>
					<uni-col :span="5">
						<picker @change="bindPickerChange" :value="index" :range="array" style="font-size: 30rpx;">
							<view class="uni-input">{{array[index]}}
								<uni-icons type="arrowdown" color="#666" size="18" />
							</view>
						</picker>
					</uni-col>
					<uni-col :span="12">
						<navigator hover-class="none" class="search-s" url="/pages/search/search">
							<uni-search-bar radius="100" placeholder="输入搜索内容" cancelButton="none" />
						</navigator>
					</uni-col>
				</uni-row>
			</view>

			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<swiper-item>
						<view class="swiper-item"><img src="/static/picture/swiper1.jpg"></view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item"><img src="/static/picture/swiper2.jpg"></view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item"><img src="/static/picture/swiper3.jpg"></view>
					</swiper-item>
				</swiper>
			</view>

			<view class="yingyong1">
				<navigator hover-class="none" class="search-w"><img
						src="/static/picture/wenda.png">
					<p>问答库</p>
				</navigator>
				<navigator hover-class="none" class="search-w"><img
						src="/static/picture/daka.png">
					<p>健康打卡</p>
				</navigator>
				<navigator hover-class="none" class="search-w"><img
						src="/static/picture/ditu.png">
					<p>校园地图</p>
				</navigator>
				<navigator hover-class="none" class="search-w"><img
						src="/static/picture/kebiao.png">
					<p>我的课表</p>
				</navigator>
				<navigator hover-class="none" class="search-w"><img
						src="/static/picture/gengduo.png">
					<p>更多</p>
				</navigator>
			</view>

		</view>

		<view class="flex-container">
			<view class="flex-item">
				<uni-section class="mb-10" title="美食推荐" type="line"></uni-section>
				<view class="ph">
					<view class="ph_bg">
						<img src="/static/picture/ph_bg2.png">
						<uni-title type="h3" title="TOP1" color="red"></uni-title>
					</view>
					<view class="ph_bg">
						<img src="/static/picture/ph_bg.png">
						<uni-title type="h3" title="TOP2" color="red"></uni-title>
					</view>
					<view class="ph_bg">
						<img src="/static/picture/ph_bg3.png">
						<uni-title type="h3" title="TOP3" color="red"></uni-title>
					</view>
					<view class="text_f">
						<view class="tp" v-for="(item,index ) in food" :key="item._id" @tap="toShop(food[index])">
							<img :src="item.f_img">
							<text class="text1">{{item.f_name}}</text>
						</view>
					</view>

				</view>
			</view>
		</view>

		<view class="bg">
			<view class="lb">
				<uni-section class="mb-10" title="商家列表" type="line">
					<showshop></showshop>
				</uni-section>
			</view>

			<view class="footer"><u-divider text="我也是有底线的" ></u-divider></view>

		</view>

	</view>

</template>

<script>
import showshop from '@/components/showshop/showshop.vue'//这里就是在页面中引入组件路径的写法
	export default {
		components:{
					showshop //这里是组件中name名称，在import引入的时候名称要一致
				},
		data() {
			return {
				food: {},
				title: 'picker',
				array: ['南海北', '南海南', '新港', '琵洲'],
				index: 0,
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				value: 2,
				
				
			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			change(e) {
				console.log("e:", e);
			},
			onChange(e) {
				console.log('rate发生改变:' + JSON.stringify(e))
			},
			
			toShop(e) {
				uni.navigateTo({
					url: '/pages/shop/shop?s_name=' + e._s_name
				})
			},
		
			onLoad: function(options) {
				const db = uniCloud.database();
				db.collection('food').orderBy('f_level desc').limit(3).get().then((res) => {
					var arr = res.result.data
					this.food = arr.map((item, index) => {
						return Object.assign({}, {
							'_s_name': item.s_name,
							'f_name': item.f_name,
							'f_img': item.f_img
						})
					})
					
				}).catch(err => {
					console.log(err); //如果更新数据失败则输出失败信息
				})
			}



		}
	}
</script>

<style>
	.bg {
		background-color: #f3f4f8;
		margin-top: -18px;
	}

	.bg-img {
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
		position: absolute;
	}

	.dh {
		margin-left: 30rpx;
	}

	.search {
		padding-top: 50rpx;
	}

	.search-s {
		font-size: 25rpx;
		margin-top: -15px;
		width: 530rpx;
	}

	.swiper {
		margin-top: 30rpx;
		width: 680rpx;
		height: 300rpx;
	}

	.swiper-item {
		width: 680rpx;
		height: 300rpx;
	}

	.swiper-item img {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50rpx;
	}

	.search-w {
		margin: 50rpx 43rpx 0rpx 10rpx;
		float: left;
	}

	.search-w img {
		width: 70rpx;
		height: 70rpx;
	}

	._p {
		font-size: 25rpx;
	}

	.yingyong1 {
		text-align: center;
	}

	.flex-container {
		display: flex;
		width: 112%;
		height: 220px;
		padding-top: 5%;
		margin-left: -23px;
	}

	.flex-item {
		background-color: white;
		width: 85%;
		height: 83%;
		margin: auto;
		border-radius: 25px;
	}

	.ph {
		position: absolute;
	}

	.ph_bg {
		margin-left: 10rpx;
		width: 110px;
		float: left;
	}

	.ph_bg img {
		width: 110px;
		height: 135px;
		position: relative;
	}

	::v-deep .uni-title__box {
		position: absolute;
		margin: -130px 0px 0px 20px;
	}

	.tp {
		float: left;
		width: 50px;
		padding-left: 35px;
		padding-right: 30px;

	}

	.tp img {
		width: 50px;
		height: 50px;
		border-radius: 50px;
	}

	.text_f {
		position: absolute;
		margin-top: 40px;
	}

	.text1 {
		display: inline-block;
		font-size: 20rpx;
		font-weight: 700;
		text-align: left;
		margin-left: 5px;
	}

	
</style>
