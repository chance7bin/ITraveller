<template>
	<view class="search-route">
		<view class="select-destination">
			<view class="switch" @click="switchBtn">
				<image class="animation" :style="{transform:'rotateZ('+deg+'deg)'}" src="../../static/images/switch.png" mode="widthFix"></image>
			</view>
			<view class="input-area">
				<view class="input-item">
					<view class="prefix">起</view>
					<view class="input-location" @click="focusInput(0)">{{originAddress.name}}</view>
				</view>
				<view class="input-item">
					<view class="prefix">终</view>
					<view class="input-location" @click="focusInput(1)">{{destinationAddress.name}}</view>
				</view>
			</view>
			<view class="search" @click="searchBtn">
				<image src="../../static/images/search.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="history">
			<view v-if="historyList.length != 0">
				<view class="history-item" v-for="(item,index) in historyList" :key="index" @click="selectHistory(index)">
					<image src="../../static/images/route.png"></image>
					<view>{{item.originAddress.name}} → {{item.destinationAddress.name}}</view>
				</view>
			</view>
			<view v-if="historyList.length == 0">
				<view class="history-item">
					<image src="../../static/images/tip.png"></image>
					<view>暂无历史记录</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'

	export default {
		data() {
			return {
				historyList: [],
				originAddress: {},
				destinationAddress: {},
				deg: 0,
			};
		},

		onLoad() {
			// console.log("trip onLoad")
			this.originAddress = getApp().globalData.originAddress;
			this.destinationAddress = getApp().globalData.destinationAddress;
		},

		onShow() {
			// console.log("trip onShow");
			this.originAddress = getApp().globalData.originAddress;
			// console.log("this.originAddress:",this.originAddress);
			this.destinationAddress = getApp().globalData.destinationAddress;
			this.historyList = getApp().globalData.historySearch;
			console.log("history:", this.historyList)
		},

		methods: {
			focusInput(state) {

				uni.navigateTo({
					url: './selectPoint?state=' + state
				})
			},

			searchBtn() {
				if (this.originAddress.name == '从哪里' && this.destinationAddress.name == '去哪里') {
					uni.showModal({
						title: '提示',
						content: '请选择起点和终点',
						showCancel: false,
						confirmText: "确定"
					});
				} else if (this.originAddress.name == '从哪里') {
					uni.showModal({
						title: '提示',
						content: '请选择起点',
						showCancel: false,
						confirmText: "确定"
					});
				} else if (this.destinationAddress.name == '去哪里') {
					uni.showModal({
						title: '提示',
						content: '请选择终点',
						showCancel: false,
						confirmText: "确定"
					});
				} else {
					uni.navigateTo({
						url: 'toVehicle'
					})
				}
			},

			switchBtn() {
				console.log("~~~");
				this.deg += 180;
				if (this.deg >= 360) {
					this.deg = 0
				}
				var temp = {};
				temp = this.originAddress;
				this.originAddress = this.destinationAddress;
				this.destinationAddress = temp;
				console.log("originAddress:", this.originAddress);
				console.log("destinationAddress:", this.destinationAddress);
				getApp().globalData.originAddress = this.originAddress;
				getApp().globalData.destinationAddress = this.destinationAddress;
			},

			selectHistory(index) {
				this.originAddress = this.historyList[index].originAddress;
				this.destinationAddress = this.historyList[index].destinationAddress;
				getApp().globalData.originAddress = this.historyList[index].originAddress;
				getApp().globalData.destinationAddress = this.historyList[index].destinationAddress;
			},
		}
	}
</script>

<style scoped>
	.search-route {
		background-color: #efefef;
		width: 100%;
		height: 100vh;
	}

	.select-destination {
		height: 250upx;
		background-color: #0084ff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.switch image {
		height: 50upx;
		width: 50upx;
		margin-right: 20upx;
	}

	.search image {
		height: 50upx;
		width: 50upx;
		margin-left: 20upx;
	}

	.input-area {
		height: 230upx;
		margin: 10upx;
		/* background-color: #50ffd4; */
	}

	.input-item {
		height: 90upx;
		width: 450upx;
		margin: 15upx;
		background-color: #aaffff;
		display: flex;
		border-radius: 20upx;
	}

	.prefix {
		font-size: large;
		height: 100%;
		width: 100upx;
		color: #00b7ff;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.input-location {
		font-size: large;
		color: #808080;
		font-weight: 500;
		display: flex;
		align-items: center;
		width: 100%
	}

	.history-item {
		height: 100upx;
		margin: 20upx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		color: #6d6d6d;
		font-weight: 600
	}

	.history-item image {
		width: 36upx;
		height: 36upx;
		margin: 0 50upx;
	}

	.animation {
		transition: all 0.5s ease;
	}
</style>
