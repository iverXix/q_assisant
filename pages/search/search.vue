<template>
	<view>
		<view class="search">
			<uni-search-bar @confirm="cancel" v-model="value" radius="5" placeholder="输入搜索内容" cancelText="搜索" clearButton="always" :focus="focus"
				@cancel="cancel" />
		</view>
		<view class="search-item">
			<view class="search-title">
				<view>最近搜索</view>
				<view @tap="clearHistory">清除</view>
			</view>
			<view v-if="searchData.length > 0">
				<view class="search-name" 
				@click="keyclick(item)"
				v-for='(item,index) in searchData'
				:key='index'
				>{{item}}</view>
			</view>
			<view v-else class="search-end">暂无搜索记录</view>
		</view>
		<view class="search-item">
			<view class="search-title">
				<view>搜索发现</view>
			</view>
				<view @click="keywordclick(tag)" v-for="(tag,index) in searchFind" :key="index" class="search-name">{{tag}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				focus: true, //搜索框获取焦点
				value: '',
				//搜索过的词记录
				searchData:[],
				searchFind:["Q堡堡","壹杯烧仙草","汉堡","多肉葡萄","芒果","杨国福"]
			}
		},
		//页面加载时
		onLoad(){
			uni.getStorage({ //数据缓存
				key:"searchData",
				success:(res)=> {
					this.searchData = JSON.parse(res.data);
				}
			})
		},
		methods: {
			cancel(e) {
				if (e.value == "") {
					uni.showToast({
						title: '请输入搜索内容',
						icon: 'none',
					})
				}else{
					uni.navigateTo({
						url:"/pages/search/search-list?keyword="+this.value+""
					})
				}
				this.addSearch(e);
			},
			
			//记录最近搜索词
			addSearch(e){
				if (e.value == "") {
					uni.showToast({
						title: '请输入搜索内容',
						icon: 'none',
					})
				}else{
					let idx = this.searchData.indexOf(this.value);
					if(idx < 0){ // 不存在
						this.searchData.unshift(this.value);
					}else{ // 已存在
						this.searchData.unshift( this.searchData.splice(idx,1)[0] );
					}
					uni.setStorage({
						key:"searchData",
						data:JSON.stringify(this.searchData)
					})
				}								
			},
			keywordclick(tag){
				this.value = tag;
				this.addSearch(tag);
				uni.navigateTo({
					url:"/pages/search/search-list?keyword="+this.value+""
				})
				
				
			},
			keyclick(item){
				this.value = item;
				this.addSearch(item);
				uni.navigateTo({
					url:"/pages/search/search-list?keyword="+this.value+""
				})
			},
			//清除搜索记录
			clearHistory(){
				uni.showModal({
					title:'重要提示',
					content:'是否要清除搜索记录',
					cancelText:'取消',
					confirmText:'确定',
					success: (res) => {
						if(res.confirm){
							uni.removeStorage({
								key:"searchData"
							})
							this.searchData=[];
						}
					}
				})
			},			
		}
	}
</script>

<style lang="scss">
	.search {
		padding-top: 20rpx;
		font-size: 25rpx;
		margin-top: -15px;
	}

	.search-item {
		padding: 20rpx;
		font-size: 12px;
	}

	.search-title {
		display: flex;
		justify-content: space-between;
		color: grey;
	}

	.search-name {
		padding: 4rpx 24rpx;
		display: inline-block;
		margin: 10rpx;
		border: 1px solid #959595;
		background: #FFFFFF;
		color: #959595;
		border-radius: 20upx;
		font-size: 27upx;
	}
	.search-end{
		text-align: center;
		color: #959595;
	}
</style>
