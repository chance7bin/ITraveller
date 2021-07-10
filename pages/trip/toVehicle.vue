<template>
	<view>
		<map id="myMap" :markers="markers" style="width:100%;height:850upx;" :longitude="longitude" :latitude="latitude"
		 :scale='scale' @markertap="markerClick" show-location>
		</map>
		<!-- 出行方式组件 -->
		<view class="vehicle">
			<view class="top-item">
				<view class="point-name" @click="showAddress(originAddress.address)">
					<image src="../../static/images/route_start.png"></image>
					<text>{{originAddress.name}}</text>
				</view>
				<view class="point-name" @click="showAddress(destinationAddress.address)">
					<image src="../../static/images/route_end.png"></image>
					<text>{{destinationAddress.name}}</text>
				</view>
			</view>
			<view class="vehicle-type">
				<navigator :url="'../vehicleStrategy/index?vehicle=' + item.keyword + '&toVehivle=1'" v-for="(item,index) in vehicleList"
				 :key="index">
					<button class="btn-item prompt-certain-btn">{{item.vehicle}}</button>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				markers: [],
				scale: 16,
				longitude: '118.108245',
				latitude: '24.486208',
				currentCity: '',
				thisPoint: '体育中心',
				address: '体育中心育秀里',
				vehicleList: [{
						vehicle: "驾车",
						keyword: 'driving'
					},
					{
						vehicle: "公交",
						keyword: 'transit'
					},
					{
						vehicle: "步行",
						keyword: 'walking'
					},
					{
						vehicle: "骑行",
						keyword: 'bicycling'
					},
				],
				originAddress: {},
				destinationAddress: {}
			};
		},

		onLoad() {
			this.latitude = getApp().globalData.currentLat;
			this.longitude = getApp().globalData.currentLng;
			this.currentCity = getApp().globalData.currentCity;
			this.originAddress = getApp().globalData.originAddress
			this.destinationAddress = getApp().globalData.destinationAddress
		},


		methods: {

			showAddress(address) {
				uni.showModal({
					title: '详细地址',
					content: address,
					showCancel: false,
					confirmText: "确定"
				});
			},

		}
	}
</script>

<style scoped>
	.top-item {
		margin: 20upx;
		display: flex;
		height: 100upx;
		justify-content: space-around;
		align-items: center;
		/* margin: 10upx; */
	}

	.point-name {
		margin: 20upx;
		font-size: large;
		font-weight: bold;
		color: #6b6b6b;
		display: flex;
		align-items: center;
		/* flex: 3; */
	}

	.point-name image {
		width: 50upx;
		height: 50upx;
	}

	.point-name text {
		margin-left: 30upx;
	}

	.return-to-options {
		margin: 0 20upx;
	}

	.vehicle-type {
		display: flex;
		justify-content: space-around;
	}

	.vehicle-type button {
		width: 150upx;
	}

	/* 按钮样式 */
	.btn-item {
		height: 80upx;
		line-height: 80upx;
		background-color: white;
	}

	.prompt-certain-btn {
		color: white;
		background-color: #00aaff;
	}
</style>
