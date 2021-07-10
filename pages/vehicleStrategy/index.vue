<template>
	<view>
		<!--地图容器-->
		<map id="myMap" :markers="markers" style="width:100%;height:800upx;" :longitude="longitude" :latitude="latitude"
		 :scale='scale' @markertap="markerClick" :polyline="polyline" show-location>
		</map>
		<view>
			<view class="gt1--title">
				<view v-if="currentVehicle == 'driving' || currentVehicle == 'walking' || currentVehicle == 'bicycling'" @click="chooseDrivingStrategy(index)"
				 :class="currentIndex == index ? 'item active' : 'item'" v-for="(item,index) in paths" :key="index" :id="index">
					<view class="name">{{item.strategy}}</view>
					<view class="time">{{item.duration}}分钟</view>
					<view class="distance">{{item.distance}}公里</view>
				</view>
				<view v-if="currentVehicle == 'transit'" @click="chooseTransitStrategy(index)" :class="currentIndex == index ? 'item active' : 'item'"
				 v-for="(item,index) in paths" :key="index" :id="index">
					<view class="name">{{item.strategy}}</view>
					<view class="time">{{item.duration}}分钟</view>
					<view class="distance">{{item.distance}}公里</view>
				</view>
				<view v-if="paths.length == 0">
					无推荐方案
				</view>
			</view>
			<view class="route-button">
				<button class="detail-btn" @click="routeDetail">路线详情</button>
			</view>
		</view>
	</view>
</template>

<script>
	import QQMapWX from '../../config/qqmap-wx-jssdk.js'

	export default {
		data() {
			return {
				currentVehicle: '',
				currentIndex: 10,
				markers: [],
				scale: 16,
				longitude: '118.108245',
				latitude: '24.486208',
				desLng: '',
				desLat: '',
				paths: [],
				drivingPaths: [],
				transitPaths: [],
				walkingPaths: [{
					strategy: "推荐",
					duration: 0,
					distance: 0,
					steps: []
				}],
				bicyclingPaths: [{
					strategy: "推荐",
					duration: 0,
					distance: 0,
					steps: []
				}],
				polyline: []
			};
		},

		onLoad(option) {
			// console.log("vehicle onLoad~~~")
			console.log("option:", option);
			console.log("currentIndex:", this.currentIndex);
			if (option.toVehivle == 0) {
				this.latitude = getApp().globalData.currentLat;
				this.longitude = getApp().globalData.currentLng;
				getApp().globalData.originAddress.lat = this.latitude;
				getApp().globalData.originAddress.lng = this.longitude;
			} else {
				this.latitude = getApp().globalData.originAddress.lat;
				this.longitude = getApp().globalData.originAddress.lng;
			}
			this.currentVehicle = option.vehicle;
			this.desLat = getApp().globalData.destinationAddress.lat;
			this.desLng = getApp().globalData.destinationAddress.lng;
			console.log("this.latitude:", this.latitude);
			console.log("this.longitude:", this.longitude);
			console.log("this.desLat:", this.desLat);
			console.log("this.desLng:", this.desLng);
			// this.currentVehicle = 'driving';
			var tempHistory = {
				originAddress: getApp().globalData.originAddress,
				destinationAddress: getApp().globalData.destinationAddress
			};
			getApp().globalData.historySearch.unshift(tempHistory);



			this.transitStrategy(this.desLng, this.desLat, this.longitude, this.latitude)
			this.drivingStrategy(this.desLng, this.desLat, this.longitude, this.latitude)
			this.walkingStrategy(this.desLng, this.desLat, this.longitude, this.latitude)
			this.bicyclingStrategy(this.desLng, this.desLat, this.longitude, this.latitude)
			this.markers = [{
				iconPath: "../../static/images/mapicon_navi_s.png",
				id: 0,
				latitude: this.latitude,
				longitude: this.longitude,
				width: 24,
				height: 36
			}, { 
				iconPath: "../../static/images/mapicon_navi_e.png",
				id: 1,
				latitude: this.desLat,
				longitude: this.desLng,
				width: 24,
				height: 36
			}]

		},

		onShow() {
			// console.log("vehicle  onShow~~~")
			if (this.currentVehicle == 'driving') {
				this.paths = this.drivingPaths
			}
			if (this.currentVehicle == 'transit') {
				this.paths = this.transitPaths
			}
			if (this.currentVehicle == 'walking') {
				this.paths = this.walkingPaths
			}
			if (this.currentVehicle == 'bicycling') {
				this.paths = this.bicyclingPaths
			}
		},

		methods: {

			markerClick() {

			},

			//驾车方案
			drivingStrategy(desLng, desLat, originLng, originLat) {
				var that = this;
				uni.request({
					url: 'https://restapi.amap.com/v3/direction/driving',
					data: {
						key: 'cb003321f848fc897f55ca40cf0e6b01',
						origin: originLng + ',' + originLat,
						// origin:'118.108245,24.486208',
						// destination:'118.079484,24.453916',
						destination: desLng + ',' + desLat,
						strategy: 10
					},
					success: (res) => {
						// console.log(res.data);
						// getApp().globalData.routeDetail = res.data.route.paths[index].steps;
						var tempPaths = res.data.route.paths;
						// console.log("tempPaths:",tempPaths)
						if (tempPaths.length <= 3) {
							for (var i = 0; i < tempPaths.length; i++) {
								that.drivingPaths.push({
									strategy: '方案' + (i + 1),
									duration: Math.ceil(tempPaths[i].duration / 60),
									distance: (tempPaths[i].distance / 1000).toFixed(2),
									steps: tempPaths[i].steps
								})
							}
						} else {
							for (var i = 0; i < 3; i++) {
								that.drivingPaths.push({
									strategy: '方案' + (i + 1),
									duration: Math.ceil(tempPaths[i].duration / 60),
									distance: (tempPaths[i].distance / 1000).toFixed(2),
									steps: tempPaths[i].steps
								})
							}
						}

						// that.paths = that.drivingPaths;
						// console.log("drivingPaths:",that.drivingPaths[0]);

					}
				});
			},


			//公交方案
			transitStrategy(desLng, desLat, originLng, originLat) {
				var that = this;
				uni.request({
					url: 'http://api.map.baidu.com/direction/v2/transit',
					// url: 'https://restapi.amap.com/v3/direction/transit/integrated', 
					data: {
						ak: 'wRIcvin1aGUAAwXcM7tyRQwdZFyv9wnP',
						origin: originLat + ',' + originLng,
						// origin:'24.486208,118.108245',
						// destination:'24.453916,118.079484',
						destination: desLat + ',' + desLng,
						// coord_type:'wgs84'
					},
					success: (res) => {
						// console.log("transitStrategy:",res.data.result.routes);
						var tempPaths = res.data.result.routes;
						console.log("tempPaths:", tempPaths);
						if (tempPaths.length <= 3) {
							for (var i = 0; i < tempPaths.length; i++) {
								that.transitPaths.push({
									strategy: '方案' + (i + 1),
									duration: Math.ceil(tempPaths[i].duration / 60),
									distance: (tempPaths[i].distance / 1000).toFixed(2),
									steps: tempPaths[i].steps
								})
							}
						} else {
							for (var i = 0; i < 3; i++) {
								that.transitPaths.push({
									strategy: '方案' + (i + 1),
									duration: Math.ceil(tempPaths[i].duration / 60),
									distance: (tempPaths[i].distance / 1000).toFixed(2),
									steps: tempPaths[i].steps
								})
							}
						}
						// that.paths = that.transitPaths;
					}
				});
			},



			// 步行方案
			walkingStrategy(desLng, desLat, originLng, originLat) {
				var that = this;
				uni.request({
					url: 'https://restapi.amap.com/v3/direction/walking',
					data: {
						key: 'cb003321f848fc897f55ca40cf0e6b01',
						origin: originLng + ',' + originLat,
						// origin:'118.108245,24.486208',
						destination: desLng + ',' + desLat,
					},
					success: (res) => {
						console.log(res.data);
						var tempPaths = res.data.route.paths[0];
						that.walkingPaths[0].duration = Math.ceil(tempPaths.duration / 60);
						that.walkingPaths[0].distance = (tempPaths.distance / 1000).toFixed(2);
						that.walkingPaths[0].steps = tempPaths.steps;
						// that.paths = that.walkingPaths;
					}
				});
			},


			//骑行方案
			bicyclingStrategy(desLng, desLat, originLng, originLat) {
				var that = this;
				uni.request({
					url: 'https://restapi.amap.com/v4/direction/bicycling',
					data: {
						key: 'cb003321f848fc897f55ca40cf0e6b01',
						origin: originLng + ',' + originLat,
						destination: desLng + ',' + desLat,
					},
					success: (res) => {
						console.log(res.data);
						var tempPaths = res.data.data.paths[0];
						that.bicyclingPaths[0].duration = Math.ceil(tempPaths.duration / 60);
						that.bicyclingPaths[0].distance = (tempPaths.distance / 1000).toFixed(2);
						that.bicyclingPaths[0].steps = tempPaths.steps;
						// that.paths = that.bicyclingPaths;
					}
				});
			},


			//选择驾车、步行、骑行路线
			chooseDrivingStrategy(e) {
				// console.log("e:",e.currentTarget.id);
				console.log("e:", e);
				var currentId = e;
				this.currentIndex = e;
				// this.drivingStrategy(currentId);
				var points = [];
				var tempSteps = this.paths[currentId].steps;
				var detailSteps = [];
				for (var i = 0; i < tempSteps.length; i++) {
					//构建详细路线对象
					detailSteps.push({
						no: i,
						instruction: tempSteps[i].instruction
					})

					var poLen = tempSteps[i].polyline.split(';');
					for (var j = 0; j < poLen.length; j++) {
						points.push({
							longitude: parseFloat(poLen[j].split(',')[0]),
							latitude: parseFloat(poLen[j].split(',')[1])
						})
					}
				}
				getApp().globalData.routeDetail = detailSteps;
				this.polyline = [{
					points: points,
					color: "#0091ff",
					width: 6
				}]
				this.scale = 12
			},


			//选择公交路线
			chooseTransitStrategy(e) {
				var currentId = e;
				this.currentIndex = e;
				var points = [];
				var tempSteps = this.paths[currentId].steps;
				var detailSteps = [];
				var tempPolyline = '';
				for (var i = 0; i < tempSteps.length; i++) {
					//构建详细路线对象
					detailSteps.push({
						no: i,
						instruction: tempSteps[i][0].instructions
					})

					var poLen = tempSteps[i][0].path.split(';');
					for (var j = 0; j < poLen.length; j++) {
						points.push({
							longitude: parseFloat(poLen[j].split(',')[0]),
							latitude: parseFloat(poLen[j].split(',')[1])
						})
					}
				}
				getApp().globalData.routeDetail = detailSteps;

				this.polyline = [{
					points: points,
					color: "#0091ff",
					width: 6
				}]
				this.scale = 12
			},





			routeDetail() {
				if (this.paths.length == 0) {
					uni.showModal({
						title: '提示',
						content: '无路线详情',
						showCancel: false,
						confirmText: "确定"
					});
				} else if (this.paths.length != 0 && this.currentIndex == 10) {
					uni.showModal({
						title: '提示',
						content: '请选择路线方案',
						showCancel: false,
						confirmText: "确定"
					});
				} else {
					uni.navigateTo({
						url: '../route/routeDetail'
					})
				}



			},


		}
	}
</script>

<style scoped>
	/* 路线方案 */
	.gt1--title {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: center;
		height: 190upx;
		margin: 20upx;
	}

	.gt1--title .item {
		margin: 0 15upx;
		/* margin-top: 20upx; */
		width: 50%;
		height: 160upx;
		text-align: center;
		background: #f3f3f3;
		border: 1px solid #dfdfdf;
		border-radius: 5px;
		overflow: hidden;
	}

	.gt1--title .item .name {
		height: 50upx;
		line-height: 50upx;
		font-size: 28upx;
		color: #999;
		background: #dfdfdf;
		overflow: hidden;
	}

	.gt1--title .item .time {
		margin-top: 10upx;
		height: 50upx;
		line-height: 50upx;
		font-size: 30upx;
		font-weight: bold;
		color: #323232;
	}

	.gt1--title .item .distance {
		height: 40upx;
		line-height: 40upx;
		font-size: 28upx;
		color: #999;
	}

	.gt1--title .item:last-child {
		/* margin-right: 30upx; */
	}

	.gt1--title .item.active {
		background: #fff;
		border: 1px solid #4287ff;
	}

	.gt1--title .item.active .name {
		color: #fff;
		background: #4287ff;
	}

	.gt1--title .item.active .time,
	.gt1--title .item.active .distance {
		color: #4287ff;
	}

	.route-button {
		display: flex;
		justify-content: space-around;
	}

	.route-button button {
		width: 250upx;
	}

	.detail-btn {
		height: 80upx;
		line-height: 80upx;
		background-color: #00aaff;
		color: white;
	}
</style>
