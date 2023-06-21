<template>
	<view>
		<img class="shop_bg" src="/static/picture/swiper4.jpg">
		<view class="shuju">
			<img class="shop_p" :src="obj.s_img">

			<p class="shop_name">{{obj.s_name}}</p>
			<view style="padding-left: 20px;">
				<uni-row>
					<uni-col :span="6">
						<uni-rate :readonly="true" :value="obj.s_level" size="15" :is-fill="false" />
					</uni-col>
					<unicol :span="8">
						<p style="color: red; font-size: 13px;">
							{{obj.s_level}}
						</p>
					</unicol>
				</uni-row>
			</view>
			<view class="shop_x">
				<p class="dz">{{obj.s_address}}</p>
				<p class="dz">{{obj.s_category}}</p>
				<p class="dz">营业时间：10：00-23：00</p>
			</view>
			<view class="shop_tel">电话预定：13750499276<uni-icons type="phone-filled" size="20" color="#fcd402"></uni-icons>
			</view>
		</view>
		<view class="bg_fg"></view>
		<view>
			<uni-list>
				<view @tap="menu(obj.s_name)">
					<uni-list-item title="推荐菜" showArrow></uni-list-item>
				</view>
				<uni-list-item></uni-list-item>
				<view class="uni-title uni-common-mt">
					<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
						<view id="demo1" class="scroll-view-item_H uni-bg-red" v-for="item in foodInfo" :key="_id">
							<img class="menu" :src="item.f_img">
							<p class="text">{{item.f_name}}</p>
						</view>
					</scroll-view>
				</view>
				<view @tap="goTop" class="uni-link uni-center uni-common-mt"></view>
			</uni-list>
		</view>
		<view class="bg_fg2"></view>

		<view>
			<navigator hover-class="none" class="fuwu_yy" @click="toComList(obj.s_name)">
				<uni-list-item title="校友评价" showArrow></uni-list-item>
			</navigator>
			<view v-for="(item,index) in com" :key="index">
				<view class="touxiang"><img :src="item.avatarUrl"></view>
				<view class="pinjia">
					<p class="name">{{item.nickname}}</p>
					<p class="level">{{item.u_level}}</p>
					<p class="dafen">
						<uni-rate :readonly="true" :value="item.all_score" size="11" :is-fill="false" />
					</p>
					<div class="u_com">
						<p class="p_text">{{item.content}}</p>
						<!-- in item.imageValue双重数组的嵌套 -->
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

		<u-tabbar inactiveColor="#fcd402" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
			<u-tabbar-item text="写评价" icon="star-fill" @tap="evaluate(obj.s_name)"></u-tabbar-item>
			<u-tabbar-item text="查看菜品" icon="photo" @tap="menu(obj.s_name)"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// user_id:'',
				obj: {
					s_name: '',
					s_telephone: '',
					s_address: '',
					s_category: '',
					s_img: '',
					s_level:''
				},
				foodInfo: {
					_id: '',
					f_name: '',
					f_img: ''
				},
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				com: [],
				photo: []

			}
		},
		methods: {
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: ""
				})
			},
			evaluate(s_name) { //点击注册按钮跳转注册页面
				uni.redirectTo({
					url: "/pages/evaluate/evaluate?s_name=" + JSON.stringify(s_name)
				})
			},
			menu(s_name) { //点击注册按钮跳转菜品页
				uni.navigateTo({
					url: "/pages/shop/menu?s_name=" + JSON.stringify(s_name)
				})
			},
			showShopInfo(e) {
				var s_obj = {
					s_name: e
				}
				const db = uniCloud.database();
				db.collection("shops").where(s_obj).get().then(res => {
					// console.log(res.result.data)
					this.obj = res.result.data[0] //对象的值互换要涉及到下标值 若没有的话则是[{...}]数组对象形式
					// console.log(this.obj)
				}).catch(err => {
					console.log(err)
				})
				this.showFoodInfo()
			},
			showFoodInfo() {
				// console.log(e)
				// console.log(this.obj.s_name)//undefined
				let f_obj = {
					s_name: this.obj.s_name
				}
				const db = uniCloud.database();
				db.collection('food').where(f_obj).orderBy('f_recom desc').limit(5).get().then(res => {
					// console.log(res)
					this.foodInfo = res.result.data
					// console.log(this.foodInfo)
				}).catch(err => {
					console.log(err)
				})

			},
			showComment() {
				let f_obj = {
					s_name: this.obj.s_name
				}
				const db = uniCloud.database();
				db.collection('food-evaluate').where(f_obj).orderBy('create_date desc').limit(5).get().then(res => {
					// console.log(res.result.data)
					this.com = res.result.data
					//this.photo = res.result.data.

				}).catch(err => {
					console.log(err)
				})
			},
			toComList(e) {
				uni.navigateTo({
					url: '/pages/shop/evaluateList?s_name=' + e
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

			getShopCom() {
				let f_obj = {
					s_name: this.obj.s_name
				}
				const db = uniCloud.database();
				db.collection('food-evaluate').where(f_obj).get().then(res => {
					// console.log(res.result.data.length) //13-ok
					let haveImg = []//该店铺中所有有带图片得评论的数组
					let noImg = []//该店铺中所有没有带图片得评论的数组
					let haveImgScroeArr = []
					let noImgScroeArr = []
					
					for(var i = 0; i<res.result.data.length;i++){
						// console.log(res.result.data)
						let score = res.result.data[i].all_score
						// console.log(res.result.data[i].imageValue)//[] [] [{...}] [{...}] [{...}] ...
						let imgarr = res.result.data[i].imageValue
						if(imgarr != ''){//如果图片数组不为空——即带图评论时
							haveImg.push(imgarr)
							haveImgScroeArr.push(score)
						}else{//无图评论
							// console.log("meitu")
							noImg.push(imgarr)
							noImgScroeArr.push(score)
						}
					}
					if(haveImg != ''){//直接判断haveimg是否存在内容
							//1.带图的星星的数组元素相加
							var i,haveImgScoreSum=0;
							for(i=0;i<haveImgScroeArr.length;i++){  //循环遍历数组
								//将数组元素一个个相加求和
								haveImgScoreSum+=haveImgScroeArr[i];
							}
							//2.没带图的星星的数组元素相加
							var i,noImgScoreSum=0;
							for(i=0;i<noImgScroeArr.length;i++){  //循环遍历数组
								noImgScoreSum+=noImgScroeArr[i];
							}
							var haveImgSum = (5 * 0.2 + 8 * 0.3 + haveImgScoreSum * 0.5) / haveImg.length
							console.log(haveImgSum)
							var noImgSum = (5 * 0.3 + noImgScoreSum * 0.7) / noImg.length
							console.log(noImgSum)
							var shopSum = (haveImgSum + noImgSum) / 2
							var shopScoreSum = Math.round(shopSum * 10) / 10//四舍五入保留一位小数
							console.log(shopScoreSum)
							const db = uniCloud.database();
							db.collection("shops").where(f_obj).update({
								"s_level" : shopScoreSum
							}).catch(err => {
								console.log(err)
							})
							
					}else{
						var i,noImgScoreSum2=0;
						for(i=0;i<noImgScroeArr.length;i++){  //循环遍历数组
							//将数组元素一个个相加求和
							noImgScoreSum2+=noImgScroeArr[i];
						}
						var noImgSum2 = (5 * 0.3 + noImgScoreSum2 * 0.7) / noImg.length
						console.log(noImgSum2)
						var shopScoreSum2 = Math.round(noImgSum2 * 10) / 10//四舍五入保留一位小数
						console.log(shopScoreSum2)
						const db = uniCloud.database();
						db.collection("shops").where(f_obj).update({
							"s_level" : shopScoreSum2
						}).catch(err => {
							console.log(err)
						})
					}	
					}).catch(err => {
						console.log(err)
					})
			},

			onLoad: function(option) { //是个变量 不同的参数进来，变量则不同，所以可以用if...else实现
				if (option.item) {
					this.obj = JSON.parse(option.item)
					this.showFoodInfo()
				} else {
					var _s_name = this.obj.s_name = option.s_name //给obj.s_name赋值才能使showFoodInfo中的this.obj.s_name有值
					this.showShopInfo(_s_name)
				}
				this.showComment(); //无论是哪个参数进来都会显示评论列表
				this.getShopCom();
			}
		}
	}
</script>

<style>
	.scroll-view_H {
		white-space: nowrap;
		width: 95%;
		margin-left: 5px;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 150px;
		height: 200rpx;
		line-height: 50rpx;
		padding-bottom: 30px;
		text-align: center;
		font-size: 36rpx;
	}

	.bg_fg {
		background-color: #f3f4f8;
		width: 100%;
		height: 10px;
		margin-top: -30px;
	}

	.bg_fg2 {
		background-color: #f3f4f8;
		width: 100%;
		height: 10px;
	}

	.shop_bg {
		width: 100%;
		height: 120px;
		top: 0;
		left: 0;
		z-index: -1;
		position: absolute;
		filter: opacity(80%);
	}

	.shuju {
		width: 93%;
		height: 150px;
		background-color: white;
		border-radius: 12px;
		box-shadow: 2px 1px 10px 0px #8888;
		margin: 60px 14px;
	}

	.shop_p {
		width: 100px;
		height: 80px;
		position: relative;
		float: right;
		margin-right: 20px;
		margin-top: 20px;
		border-radius: 10px;
	}

	.shop_name {
		font-size: 18px;
		font-weight: 550;
		letter-spacing: 3px;
		padding: 20px 0px 5px 20px;
	}

	.shop_x {
		margin-top: -50px;
		margin-left: 15px;
	}

	.dz {
		font-size: 19rpx;
		font-weight: 550;
		margin: 20px 0px -15px 5px;
		color: darkgray;
	}

	.shop_tel {
		font-size: 13px;
		float: right;
		margin-top: 10px;
		margin-right: 10px;
		color: dimgrey;
		font-weight: 550;
	}

	.menu {
		width: 100px;
		height: 80px;
		margin-top: 5px;
		border-radius: 10px;
	}

	.text {
		font-size: 12px;
		font-weight: 550;
	}

	.touxiang img {
		width: 45px;
		height: 45px;
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
		/* border: 1px solid blue; */
		width: 90%;
		font-size: 12px;
		line-height: 20px;
		margin-top: 5px;
		padding-bottom: 10px;
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
