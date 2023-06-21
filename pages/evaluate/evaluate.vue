<template>
	<view>
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<view class="title">— 写下真实体验，帮助万千用户选店 —</view>
			<view class="shop_name">{{_s_name}}</view>
			<view class="s_level">
				<view class="z_level">总体</view>
				<view class="x">
					<uni-rate allow-half :value="3.5" color="#8888" v-model="rateValue" @change="onChange" />
				</view>
			</view>
			<view>
				<textarea v-model="value2" maxlength="500" placeholder="大家都在问: 菜品口味如何,卫生怎么样,价格合理吗？"
					@input="get(value2)"></textarea>
				<uni-file-picker file-mediatype="image" mode="grid" v-model="pinlun_item.imageValue" @select="select"
					limit="9" @success="success" />
			</view>
			<view class="bg_fg"></view>

			<uni-list-item title="推荐菜"></uni-list-item>


			<view class="">
				<view class="page index">
					<view class="list-box">
						<view v-for="(item,index) in list" :key="index" @click="choice(index)"
							:class="[item.selected?'selde':'noselde']">
							{{item.selected?item.title:item.title}}
						</view>
					</view>
				</view>
			</view>
		</uni-forms>
		<view style="margin: 10px; margin-top: 30px;">
			<u-button color="#fcd402" text="发布" @click="submit"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr: [],
				_s_name: '',
				rateValue: 0,
				value2: '',
				list: [],
				selectId: [],
				pinlun_item: {
					s_name: '', 
					content: '',
					all_score: this.rateValue,
					imageValue: [],
					user_id: '',
					nickname: '',
					avatarUrl: '',
					u_level: ''
				}
			}
		},
		methods: {
			onChange(e) {
				this.pinlun_item.all_score = e.value
			},
			//选择按钮
			choice(index) {
				//当再次被选中时，取消当前选中项
				if (this.list[index].selected == true) {
					this.list[index].selected = false;
					//取消选中时删除数组中的值
					for (var i = 0; i < this.selectId.length; i++) {
						if (this.selectId[i] === this.list[index].title) {
							this.selectId.splice(i, 1);
						}
					}
				} else {
					this.list[index].selected = true;
					this.selectId.push(this.list[index].title)
				}
			},
			select() {

			},
			//上传图片
			success(e) { //上传成功后才有值 但此时的photo是[]--@success、只有用@select方法时才能实现能解决一次性获取值赋给photo但不能手动上传
				console.log(this.pinlun_item.imageValue)
			},
			showFoodName(val) {
				this.pinlun_item.s_name = this._s_name = JSON.parse(val.s_name)
				let f_obj = {
					s_name: this._s_name
				}
				const db = uniCloud.database();
				db.collection('food').where(f_obj).get().then(res => {
					var arr = res.result.data //{(...),(...),(...)}
					this.list = arr.map((item, index) => {
						return Object.assign({}, {
							'title': item.f_name,
						})
					})
				}).catch(err => {
					console.log(err)
				})
			},
			get(val) {
				this.pinlun_item.content = val
			},
			submit() {
				if (this.pinlun_item.content == '' || this.pinlun_item.all_score == '') { //用&&则可以提交成功，得用||
					uni.showToast({
						title: '请为档口打分或填写相应评价内容',
						icon: 'none',
					})
					return
				} else {
					//遍历推荐菜的数组，添加推荐人数
					for (var i = 0; i < this.selectId.length; i++) {
						let f_name_obj = {
							f_name: this.selectId[i]//遍历选中的数组[草莓麻薯奶茶，波霸奶茶...]
						}
						//console.log(f_name_obj)
						const db = uniCloud.database();
						db.collection('food').where(f_name_obj).get().then(res => {//可以取出对应的推荐次数
							const num = res.result.data[0].f_recom
							let _id_obj = {//再获取对应的_id
								_id: res.result.data[0]._id
							}
							db.collection('food').where(_id_obj).update({//通过查找id筛选出f_recom推荐人数字段
								f_recom: num + 1//f_recom是int类型
							}).catch(err => {
								console.log(err)
							})

						})

					}
					const db = uniCloud.database();
					db.collection('food-evaluate').add(this.pinlun_item).then(res => {
						// console.log(res)
					}).catch(err => {
						console.log(err)
					})

					//评论得到积分，判断是否达到升级要求，如果达到则升级
					let _id = {
						_id: this.pinlun_item.user_id
					}
					let user_id = {
						user_id: this.pinlun_item.user_id
					}
					db.collection('uni-id-users').where(_id).get().then(res => {
						const score = res.result.data[0].score
						const img = this.pinlun_item.imageValue.length
						if (img !== 0) {
							db.collection('uni-id-users').where(_id).update({
								score: score + 2,
								new_score: score + 2,

							}).catch(err => {
								console.log(err)
							})
						} else {
							db.collection('uni-id-users').where(_id).update({
								score: score + 1,
								new_score: score + 1,
							})
							//验证等级是否够更改
							db.collection('uni-id-users').where(_id).get().then(res => {
								// const ulevel = res.result.data[0].u_level
								const uscore = res.result.data[0].score
								console.log(uscore)
								if (uscore <= 30) {
									db.collection('uni-id-users').where(_id).update({
										u_level: '初级级鉴赏官'
									})
									db.collection('food-evaluate').where(user_id).update({
										u_level: '初级级鉴赏官'
									})

								} else if (uscore > 30 && uscore <= 50) {
									db.collection('uni-id-users').where(_id).update({
										u_level: '中级鉴赏官'
									})
									db.collection('food-evaluate').where(user_id).update({
										u_level: '中级鉴赏官'
									})

								} else {
									db.collection('uni-id-users').where(_id).update({
										u_level: '高级鉴赏官'
									})
									db.collection('food-evaluate').where(user_id).update({
										u_level: '高级鉴赏官'
									})
								}

							})

						}
					})
					uni.redirectTo({
						url: '/pages/shop/shop?s_name=' + this._s_name
					});
				}
			},
			getuser() {
				uni.getStorage({
					key: 'user',
					success: (res) => {
						this.pinlun_item.user_id = res.data.user._id
						this.pinlun_item.nickname = res.data.user.nickName
						this.pinlun_item.avatarUrl = res.data.user.avatarUrl
						let _id = {
							_id: this.pinlun_item.user_id
						}
						const db = uniCloud.database();
						console.log(_id)
						db.collection('uni-id-users').where(_id).get().then(res => {
							this.pinlun_item.u_level = res.result.data[0].u_level
						})
					}
				});
			},
			onLoad: function(val) {
				this.showFoodName(val)
				this.getuser()
			}
		}
	}
</script>

<!-- 样式表 -->
<style lang="scss">
	.list-box {
		display: flex;
		flex-wrap: wrap;
		padding: 16upx;
		border-radius: 10upx;
		margin-left: 5px;


		view {
			width: 20%;
			height: 60upx;
			line-height: 60upx;
			text-align: center;
			margin-top: 15upx;

			&:not(:nth-child(3n)) {
				margin-right: calc(8% / 2);

			}
		}
	}

	/* 已选择 */
	.selde {
		border: 1px solid #fcd402;
		background: #fcd402;
		color: #FFFFFF;
		border-radius: 20upx;
		font-size: 20upx;
		padding: 0 10upx;
	}

	/* 未选择 */
	.noselde {
		border: 1px solid #959595;
		background: #FFFFFF;
		color: #959595;
		border-radius: 20upx;
		font-size: 20upx;
		padding: 0 10upx;
	}

	.valueList {
		margin-top: 20rpx;
		padding: 20rpx;
		display: flex;
		justify-content: center;
	}

	.title {
		text-align: center;
		color: darkgoldenrod;
		font-size: 13px;
		font-weight: 530;
		margin-top: 5px;
	}

	.shop_name {
		font-size: 18px;
		letter-spacing: 2px;
		margin: 15px;
	}

	.z_level {
		font-size: 14px;
		float: left;
		margin-left: 13px;
		padding-top: 2px;
	}

	.x {
		padding-left: 50px;

	}

	.bg_fg {
		background-color: #f3f4f8;
		width: 100%;
		height: 10px;
		margin-top: 10px;
	}

	textarea {
		border: 1px solid #DCDCDC;
		margin: 10px;
		width: 92%;
		padding: 5px;
	}

	::v-deep .file-picker__box {
		margin-left: 10px;
	}
</style>
