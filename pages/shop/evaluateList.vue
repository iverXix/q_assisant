<template>
	<view>
		<view v-for="(item,index) in com" :key="index">
			<view class="touxiang"><img :src="item.avatarUrl"></view>
			<view class="pinjia">
				<p class="name">{{item.nickname}}</p>
				<p class="level">{{item.u_level}}</p>
				<p class="dafen">
					<uni-rate :readonly="true" :value="2" size="11" :is-fill="false" />
				</p>
				<div class="u_com">
					<p class="p_text">{{item.content}}</p>
					<img v-for="(items,indexs) in item.imageValue" :key="indexs" :src="items.path" alt="评论图片"
						@tap="prviewImage(items.path)">
				</div>
				<p class="date">
					<uni-dateformat :date="item.create_date" />
				</p>
			</view>
			<view style="margin:20px 0px 0px 40px;">
				<uni-list-item></uni-list-item>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				com: [],
				imgArr: []

			}
		},
		methods: {
			showComment(e) {
				console.log(e)
				let f_obj = {
					s_name: e //用不了this.e
				}
				const db = uniCloud.database();
				db.collection('food-evaluate').where(f_obj).orderBy('create_date desc').get().then(res => {
					console.log(res.result.data)
					this.com = res.result.data
					this.imgArr = res.result.data.imageValue
				}).catch(err => {
					console.log(err)
				})
			},
			prviewImage(current) {
				let urls = []				
				this.com.forEach(item => {
					item.imageValue.forEach(items => {
					urls.push(items.path)
					})
				})			
				uni.previewImage({
					urls: urls,
					current: current
				});
			},
			onLoad: function(option) { //是个变量 不同的参数进来，变量则不同，所以可以用if...else实现
				this.showComment(option.s_name); //无论是哪个参数进来都会显示评论列表
			}
		}
	}
</script>

<style>
	.touxiang img {
		width: 50px;
		height: 50px;
		border-radius: 100px;
		margin: 10px 0px 0px 15px;
		position: absolute;
	}

	.pinjia {
		margin: 8px 0px 0px 75px;
	}

	.name {
		font-size: 14px;
		font-weight: 550;
		color: #446689;
		letter-spacing: 1px;
	}

	.level {
		font-size: 9px;
		color: #8888;
		letter-spacing: 1px;
		padding-top: 3px;
	}

	.dafen {
		margin-left: -2px;
		margin-top: 2px;
	}

	.p_text {
		width: 90%;
		font-size: 12px;
		line-height: 20px;
		margin-top: 5px;
	}

	.u_com img {
		margin: 0;
		padding: 0;
		width: 80px;
		height: 70px;
	}


	.date {
		font-size: 9px;
		color: #8888;
		letter-spacing: 1px;
		padding-top: 3px;
		margin-right: 32px;
		float: right;
	}
</style>
