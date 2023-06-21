<template name="showshop">
	<view>
		<view>
			<u-picker :show="show" ref="uPicker" :columns="columns" @confirm="confirm" @change="changeHandler"
				defaultIndex=[0,0] closeOnClickOverlay  @close="close" @cancel="show=false">
			</u-picker>
			<view class="fenlei" v-model="shop"  @click="show=true">{{shop}}▼</view>
		</view>
		<view  v-for="item in list" :key="item._id" data-id="_id" @tap="goToshop(item)">
			<view class="flex-container2">
				<view class="flex-item2">
					<uni-row>
						<uni-col :span="8">
							<img :src="item.s_img">
		
						</uni-col>
						<uni-col :span="6">
							<p class="shop_name">{{item.s_name}}</p>
							<uni-rate :readonly="true" :value="item.s_level" size="15" :is-fill="false" />
							<p style="margin-top: 10px; font-size: 25rpx; color: red;">{{item.s_level}}
								<uni-tag text="电话预定" type="warning" size="mini" />
							</p>
						</uni-col>
						<uni-col :span="10">
							<p class="dz">{{item.s_address}}</p>
							<p class="dz">{{item.s_category}}</p>
							<p class="dz">营业时间：{{item.s_hours}}</p>
							
						</uni-col>
					</uni-row>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "showshop",
		data() {
			return {
				shop: "分类",
				index: 0,
				show: false,
				list: { //档口对象
					s_name: '',
					s_address: '',
					s_category: '',
					s_telephone: '',
					s_img: '',
					_id: '',
					s_level:''
				},
				columns: [
					['综合', '等级', '品类'],
					['按综合排序']
				],
				columnData: [
					['按综合排序'],
					['按等级排序'],
					['汉堡', '粉面', '奶茶', '正餐']
				]
			};
		},
		watch: {
		    shop (newshop,oldshop) {
		           console.log(newshop)
				   	const db = uniCloud.database();
				  if(newshop=='按综合排序'){				  
				  	db.collection('shops').get().then(res => { //shops是数据库里面集合的名称
				  		// 　　　　console.log(res.result); //如果更新数据成功则输出成功信息
				  		this.list = res.result.data
				  		// console.log(this.list)
				  	}).catch(err => {
				  		console.log(err); //如果更新数据失败则输出失败信息
				  	})
				  }else if(newshop=='按等级排序'){
				  	
				  	db.collection('shops').orderBy('s_level desc').get().then(res => { //shops是数据库里面集合的名称
				  		// 　　　　console.log(res.result); //如果更新数据成功则输出成功信息
				  		var list = res.result.data
				  		this.list = list
				  		console.log(list)
				  	}).catch(err => {
				  		console.log(err); //如果更新数据失败则输出失败信息
				  	})
				  }else if(newshop=='汉堡'){
				  	
				  	db.collection('shops').where('s_category=="汉堡"').get().then(res => { //shops是数据库里面集合的名称
				  		// 　　　　console.log(res.result); //如果更新数据成功则输出成功信息
				  		this.list = res.result.data
				  		// console.log(this.list)
				  	}).catch(err => {
				  		console.log(err); //如果更新数据失败则输出失败信息
				  	})
				  }else if(newshop=='粉面'){
				  	
				  	db.collection('shops').where('s_category=="粉面馆"').get().then(res => { //shops是数据库里面集合的名称
				  		// 　　　　console.log(res.result); //如果更新数据成功则输出成功信息
				  		this.list = res.result.data
				  		// console.log(this.list)
				  	}).catch(err => {
				  		console.log(err); //如果更新数据失败则输出失败信息
				  	})
				  }else if(newshop=='奶茶'){
				  	
				  	db.collection('shops').where('s_category=="奶茶"').get().then(res => { //shops是数据库里面集合的名称
				  		// 　　　　console.log(res.result); //如果更新数据成功则输出成功信息
				  		this.list = res.result.data
				  		// console.log(this.list)
				  	}).catch(err => {
				  		console.log(err); //如果更新数据失败则输出失败信息
				  	})
				  }else{
				  	
				  	db.collection('shops').where('s_category=="正餐"').get().then(res => { //shops是数据库里面集合的名称
				  		// 　　　　console.log(res.result); //如果更新数据成功则输出成功信息
				  		this.list = res.result.data
				  		// console.log(this.list)
				  	}).catch(err => {
				  		console.log(err); //如果更新数据失败则输出失败信息
				  	})
				  }
		       }
		    },
		mounted() {
			this.shops();
		},
		methods: {
			
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData[index])					
				}
				
			},
			shops(){				
					const db = uniCloud.database();
					db.collection('shops').get().then(res => { //shops是数据库里面集合的名称
						// 　　　　console.log(res.result); //如果更新数据成功则输出成功信息
						this.list = res.result.data
						// console.log(this.list)
					}).catch(err => {
						console.log(err); //如果更新数据失败则输出失败信息
					})				
			},
			close() {
				this.show = false	
				
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {				
				this.shop = e.value[1]	
				//console.log(this.shop)
				this.show = false
				
			
			},
			goToshop(item) {
				uni.navigateTo({
					url: '/pages/shop/shop?item=' + JSON.stringify(item)
				})
			},
			
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";

	.fenlei {
		margin-left: 20px;
		font-size: 12px;
		color: darkgrey;
	}
.flex-container2 {
		display: flex;
		width: 112%;
		height: 120px;
		margin-left: -23px;
	}

	.flex-item2 {
		background-color: white;
		width: 85%;
		height: 83%;
		margin: auto;
		border-radius: 15px;
	}

	.lb {
		padding-left: 10px;
	}

	.flex-item2 img {
		width: 180rpx;
		height: 140rpx;
		margin: 16px 10px 0px 10px;
		border-radius: 8px;
	}

	.shop_name {
		font-size: 16px;
		font-weight: 550;
		margin-top: 35rpx;
		margin-bottom: 5px;
		color: #2f2f2f;
	}
	
	.dz {
		font-size: 19rpx;
		font-weight: 550;
		margin: 25px 0px -15px 5px;
	
		color: darkgray;
	}

</style>
