<template>
	<view>
		<map :markers="markers" style="width:100%;height:1070upx;" :longitude="longitude" :latitude="latitude" scale=16 @tap="tapClick"
		 show-location  show-compass>
		</map>
		<view class="bottom-info">
			<view class="info">{{selectedAddress}}</view>
			<button class="confirm-button" @click="confirm">确定</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: '118.108245',
				latitude: '24.486208',
				selectedAddress: '',
				markers: [],
				currentCity: '',
				state: 2

			};
		},

		// onShow() {
		// 	console.log("map onShow")
		// },

		onLoad(option) {
			// console.log("map onLoad")
			this.state = option.state;
			this.longitude = getApp().globalData.currentLng;
			this.latitude = getApp().globalData.currentLat;
			this.currentCity = getApp().globalData.currentCity;
			// this.longitude = 118.15207;
			// this.latitude = 24.72286;
			// this.currentCity = '厦门市';
			this.markers = [{
				iconPath: "../../static/images/mapPoint.png",
				id: 0,
				latitude: this.latitude,
				longitude: this.longitude,
				width: 40,
				height: 40
			}]
		},

		onShow() {
			var that = this;
			var tempLocation = this.longitude + ',' + this.latitude;
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
					that.selectedAddress = tempArray[1];
				},
			});
		},

		methods: {
			
			tapClick(e) {
				var that = this;
				// console.log(e.detail);
				var coordinate = e.detail;
				this.latitude = coordinate.latitude;
				this.longitude = coordinate.longitude;
				this.markers = [{
					iconPath: "../../static/images/mapPoint.png",
					id: 0,
					latitude: this.latitude,
					longitude: this.longitude,
					width: 40,
					height: 40
				}]
				// console.log("tempLocation:",tempLocation);
				var tempLocation = this.longitude + ',' + this.latitude;
				uni.request({
					url: 'https://restapi.amap.com/v3/geocode/regeo',
					data: {
						key: 'cb003321f848fc897f55ca40cf0e6b01',
						location: tempLocation
					},
					success: (res) => {
						console.log(res);
						var resAddress = res.data.regeocode.formatted_address;
						var tempArray = resAddress.split(that.currentCity)
						console.log("resAddress:", resAddress);
						that.selectedAddress = tempArray[1];
					},
				});
			},

			confirm() {
				var tempAddress = {
					name: '地图选点',
					lat: this.latitude,
					lng: this.longitude,
					address: this.selectedAddress
				}
				if (this.state == 0) {
					getApp().globalData.originAddress = tempAddress;
				} else {
					getApp().globalData.destinationAddress = tempAddress;
				}
				uni.switchTab({
					url: './index'
				})
			},

		}
	}
</script>

<style scoped>
	.bottom-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* margin-top: 10upx; */
		padding: 10upx 20upx;
		height: 100upx;
	}

	.confirm-button {
		height: 80upx;
		line-height: 80upx;
		/* width: 160upx; */
		background-color: #00aaff;
		color: white;
	}

	.info {
		/* flex: 7; */
		width: 75%;
	}

	.confirm-button {
		/* flex: 3; */

	}
</style>
