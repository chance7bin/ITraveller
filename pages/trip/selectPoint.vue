<template>
	<view>
		<view class="search-view">
			<uni-search-bar :radius="100" placeholder="请输入起点..." :bgColor="bgColor" @input="searchInput"></uni-search-bar>
		</view>
		<view class="select-option">
			<view class="select-item" style="border-right: 2upx solid #c6c6c6;" @click="getMyLocation">
				<image src="../../static/images/myLocaiton.png"></image>
				<text>我的位置</text>
			</view>
			<view class="select-item" @click="toMap">
				<image src="../../static/images/toMap.png"></image>
				<text>地图选点</text>
			</view>
		</view>
		<view class="reminder-list" v-for="(item,index) in reminderList" :key="index" @click="selectItem(index)">
			<image src="../../static/images/locationItem.png"></image>
			<view>
				<view class="item-title">{{item.title}}</view>
				<view class="item-address">{{item.address}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'

	export default {
		data() {
			return {
				bgColor: "#f5f6f7",
				reminderList: [],
				state: 2,
				currentCity: '',
				longitude: '',
				latitude: '',
				myLocaitonAddress: ''
			};
		},

		components: {
			uniSearchBar
		},

		// onShow() {
		// 	console.log("select onShow")
		// },

		onLoad(option) {
			console.log("option:", option)
			this.state = option.state;
			this.longitude = getApp().globalData.currentLng;
			this.latitude = getApp().globalData.currentLat;
			this.currentCity = getApp().globalData.currentCity;

		},

		methods: {
			toMap() {
				uni.navigateTo({
					url: './mapPage?state=' + this.state
				})
			},

			getMyLocation() {
				var that = this;
				var tempLocation = this.longitude + ',' + this.latitude;
				var address = {
					name: '我的位置',
					lat: this.latitude,
					lng: this.longitude,
					address: ''
				}
				uni.request({
					url: 'https://restapi.amap.com/v3/geocode/regeo',
					data: {
						key: 'cb003321f848fc897f55ca40cf0e6b01',
						location: tempLocation
					},
					success: (res) => {
						// console.log(res);
						var resAddress = res.data.regeocode.formatted_address;
						var tempArray = resAddress.split(that.currentCity)
						console.log("resAddress:", resAddress);
						address.address = tempArray[1];
						console.log("address:", address);
					},
				});

				console.log("myLocaitonAddress:", this.myLocaitonAddress);


				if (this.state == 0) {
					getApp().globalData.originAddress = address;
				} else {
					getApp().globalData.destinationAddress = address;
				}
				uni.switchTab({
					url: './index'
				})
			},

			searchInput(e) {
				console.log(e);
				console.log("latitude:", this.latitude);
				console.log("longitude:", this.longitude);
				var that = this;
				uni.request({
					url: 'https://apis.map.qq.com/ws/place/v1/suggestion',
					data: {
						key: 'L3LBZ-OQGE3-F3632-Y6Y3Z-2X7NS-CUBKT',
						keyword: e,
						location: this.latitude + ',' + this.longitude,
						region: this.currentCity
					},
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						console.log("res:", res.data);
						that.reminderList = res.data.data;
					},
				});
			},

			selectItem(index) {
				console.log("index:", index);
				var address = {
					name: this.reminderList[index].title,
					lat: this.reminderList[index].location.lat,
					lng: this.reminderList[index].location.lng,
					address: this.reminderList[index].address
				}
				console.log("address:", address);
				if (this.state == 0) {
					getApp().globalData.originAddress = address;
				} else {
					getApp().globalData.destinationAddress = address;
				}
				uni.switchTab({
					url: './index'
				})
			},

		}
	}
</script>

<style scoped>
	.select-option {
		display: flex;

	}

	.select-option image {
		width: 36upx;
		height: 36upx;
		margin: 0 20upx;
	}

	.select-item {
		color: #555555;
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		height: 80upx;
		border-bottom: 2upx solid #c6c6c6;
		border-top: 2upx solid #c6c6c6;
	}

	.reminder-list {
		padding: 30upx 20upx;
		display: flex;
		align-items: center;
		border-bottom: 1upx solid #ececec;
	}

	.reminder-list image {
		margin: 0 20upx;
		width: 34upx;
		height: 34upx;
	}

	.item-address {
		color: #adadad;
		font-size: small;
		margin-top: 10upx;
	}
</style>
