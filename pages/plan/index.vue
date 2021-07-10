<template>
	<view>
		<view class="input-sights">
			<uni-search-bar :radius="100" placeholder="请输入感兴趣的地点...(各地点请用空格隔开)" :bgColor="bgColor" @input="listenInput"></uni-search-bar>
		</view>
		<view class="aco-btn">
			<button @click="showRoute">路线图</button>
			<button @click="calculateRoute">智能推荐</button>
		</view> 
		<view class="in-param">
			<view class="in-param-input">蚂蚁数量 : <input type="text" v-model="antNum" /></view>
			<!-- <view class="in-param-input">迭代次数 : <input type="text" v-model="generation" /></view> -->
			<view class="in-param-input">Alpha : <input type="text" v-model="Alpha" /></view>
			<view class="in-param-input">Beta : <input type="text" v-model="Beta" /></view>
			<view class="in-param-input">Rho : <input type="text" v-model="Rho" /></view>
			<view class="in-param-input">Q : <input type="text" v-model="phe" /></view>
			<view class="in-param-input">信息素增量模型 : <input type="text" v-model="deltaType" /></view>
		</view>
		<!-- <view>
			{{displayString}}
		</view> -->
		<view>
			<view @click="selectItem(item)" class="route-list" v-for="(item,index) in routeArr" :key="index" v-if="isSuccess">
				<image src="../../static/images/acoRoute.png"></image>
				<view>{{item.origin.name}}</view>
				<view> → </view>
				<view>{{item.destination.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import config from "config/config.js";

	export default {
		name: "index",
		data() {
			return {
				selectedSight: [],
				sightData: [],
				distanceMatrix: [],
				tempDistance: 0,
				tempData: [],
				tempSight: [],
				sightObj: {},
				currentLocation: {},
				currentCity: '福州市',
				bgColor: "#f5f6f7",
				inputValue: '',
				displayString: '',
				bestRoute: [],
				routeArr: [], 
				isSuccess: false,
				currentLat:'123',
				// 输入参数
				antNum: 50,
				generation: 100,
				Alpha: 2,
				Beta: 5,
				Rho: 0.3,
				phe: 100,
				deltaType: 1,
				// 返回参数
				bestRouteDis: 0,
				useTime: 0
			}
		},

		components: {
			uniSearchBar
		},

		onLoad() {
			
		},
 
		onShow() {
			this.getCurrentLocation(); 
			// this.currentCity = getApp().globalData.currentCity;
			console.log("currentLocation",this.currentLocation);   
		}, 

		// 下拉刷新
		/* onPullDownRefresh() {
			uni.showNavigationBarLoading();
			uni.authorize({
				scope: 'scope.userLocation',
				success() {		// 允许授权
					uni.getLocation({
					    type: 'gcj02',
					    success: function (res) {
					        console.log('当前位置的经度：' + res.longitude);
					        console.log('当前位置的纬度：' + res.latitude);
							getApp().globalData.currentLat = res.latitude;
							getApp().globalData.currentLng = res.longitude;
							//请求当前城市
							setTimeout(() =>{
								uni.request({
								    url: 'https://apis.map.qq.com/ws/geocoder/v1', 
								    data: {
								        key:'L3LBZ-OQGE3-F3632-Y6Y3Z-2X7NS-CUBKT',
										location:res.latitude + ',' + res.longitude
								    },
								    success: (res) => {
								        // console.log("currentLocaiton",res.data.result);
										// var location = res.data.result.location;
										// getApp().globalData.currentLat = location.lat;
										// getApp().globalData.currentLng = location.lng;
										getApp().globalData.currentCity = res.data.result.ad_info.city;
										uni.stopPullDownRefresh();
										uni.hideNavigationBarLoading();
								    },
									
								});
							},500)
					    } ,
						fail:function(){
							console.log('request fail');
						}
					}); 
				},
				fail(){		// 拒绝授权
					console.log("你拒绝了授权，无法获得周边信息")
				}
			})
			this.getCurrentLocation();
			this.currentLat = this.currentLocation.lat;
		}, */

		methods: {

			// 厦门大学 集美大学 中山路 同安影视城 

			// 监听输入框
			listenInput(e) {
				console.log(e);
				this.inputValue = e.value;
			},

			// 展示路线图
			showRoute() {
				if (this.routeArr.length == 0) {
					uni.showModal({
						title: '提示',
						content: '暂无结果',
						showCancel: false,
						confirmText: "确定"
					});
				} else {
					getApp().globalData.acoRoute = this.routeArr;
					uni.navigateTo({
						url: 'showRoute'
					})
				}

			},

			selectItem(item) {
				// console.log("item:", item);
				getApp().globalData.originAddress = item.origin;
				getApp().globalData.destinationAddress = item.destination;
				uni.navigateTo({
					url: "../trip/toVehicle"
				})
			},


			// 获取两地之间的距离 
			getDistance(origin, destination) {
				var tempi = origin.no;    
				// console.log("tempi:",tempi)
				var tempj = destination.no;
				// console.log("origin:",origin)
				// console.log("destination:",destination)
				uni.request({
					url: 'https://restapi.amap.com/v3/direction/driving',
					data: {
						key: 'cb003321f848fc897f55ca40cf0e6b01',
						origin: origin.lng + ',' + origin.lat,
						destination: destination.lng + ',' + destination.lat,
						strategy: 0
					},
					success: (res) => {
						// console.log(res.data); 
						var distance = res.data.route.paths[0].distance;
						// this.tempDistance = distance;
						this.distanceMatrix[tempi][tempj] = distance;
						// callback(this.tempDistance, tempi, tempj)
					}
				});

			},

			// 获取距离矩阵
			getDistanceMatrix() {
				var that = this;
				this.distanceMatrix = [];
				console.log("getDistanceMatrix");
				var arrayLength = this.sightData.length;
				// this.distanceMatrix[0][0] = 0;
				for (var i = 0; i < arrayLength; i++) {
					this.distanceMatrix[i] = [];
				}
				for (var i = 0; i < arrayLength; i++) {
					for (var j = 0; j < arrayLength; j++) {
						this.getDistance(this.sightData[i], this.sightData[j]);
					}
				}
				// console.log("matrix:" , this.distanceMatrix)
				// })
			},

			// 获取景点信息
			getSightLocation(queryPlace, region, i) {
				// console.log("getSightLocation", queryPlace);
				// console.log("queryPlace:",queryPlace);
				uni.request({
					url: 'http://api.map.baidu.com/place/v2/search', //仅为示例，并非真实接口地址。
					data: {
						query: queryPlace,
						region: region,
						ak: 'wRIcvin1aGUAAwXcM7tyRQwdZFyv9wnP',
						output: 'json'
					},
					success: (res) => {
						// console.log(res.data);
						const result = res.data.results[0];
						// console.log("res:", res);
						this.sightObj = {
							'no': i + 1,
							'name': result.name,
							'lat': result.location.lat,
							'lng': result.location.lng,
							'address': result.address
						};
						this.tempSight[i + 1] = this.sightObj;
					}
				});
			},

			// 构建景点数据数组
			buildSightData() {
				var that = this;
				console.log("buildSightData");
				this.tempSight = [];
				var myLocation = {
					'no': 0,
					'name': '我的位置',
					'lat': this.currentLocation.lat,
					'lng': this.currentLocation.lng,
					'address': '我的位置'
				}
				this.tempSight[0] = myLocation
				for (var i = 0; i < this.selectedSight.length; i++) {
					this.getSightLocation(this.selectedSight[i], this.currentCity, i)
				}
				// console.log("buildSightData:" , this.tempSight);
				this.sightData = this.tempSight;
				console.log("sightData:", this.sightData);
			},

			// 请求最佳路径
			getBestRoute() {
				this.isSuccess = false;
				var that = this;
				if (this.distanceMatrix.length != this.sightData.length) {
					uni.showModal({
						title: '提示',
						content: '请求失败...请再试一次...',
						showCancel: false,
						confirmText: "确定"
					});
					uni.hideLoading();
				} else {
					// console.log("test:",this.phe);
					// console.log("test:",this.deltaType);
					uni.request({
						url: config.reUrl + '/Aco/CalculateBestRoute', //仅为示例，并非真实接口地址。
						data: {
							no: 77,
							name: "app",
							array: this.distanceMatrix,
							arrLen: this.distanceMatrix.length,
							antNum: this.distanceMatrix.length,
							// generation: this.generation,
							Alpha: this.Alpha,
							Beta: this.Beta,
							Rho: this.Rho,
							phe: this.phe,
							deltaType: this.deltaType
						}, 
						success: (res) => {
							console.log("get route res:",res.data);
							that.isSuccess = true;
							that.bestRouteDis = res.data.bestRouteDis;
							that.useTime = parseFloat(res.data.useTime).toFixed(3);
							console.log("平均值:",res.data.avgRouteDis);
							console.log("最小值:",that.bestRouteDis);
							console.log("最大值:",res.data.maxRouteDis);
							console.log("算法运行时间:",that.useTime);
							var resData = res.data.result;
							if (res.data != 404) {
								uni.showToast({
									title: '加载成功',
								});
								// 把我的位置放在第一个
								var tempRoute = [];
								for (var i = 0; i < resData.length - 1; i++) {
									tempRoute.push(resData[i])
								}
								var tempIndex = 0;
								for (var i = 0; i < tempRoute.length; i++) {
									if (tempRoute[i] == 1) {
										tempIndex = i
									}
								}
								var sortedRoute = [];
								for (var i = tempIndex; i < tempRoute.length; i++) {
									sortedRoute.push(tempRoute[i])
								}
								for (var i = 0; i < tempIndex; i++) {
									sortedRoute.push(tempRoute[i])
								}

								that.bestRoute = sortedRoute;
								// console.log("bestRoute:", that.bestRoute);
								uni.hideLoading();
							} else {
								that.isSuccess = false;
								uni.hideLoading();
								uni.showModal({
									title: '提示',
									content: '加载失败...请再试一次...',
									showCancel: false,
									confirmText: "确定"
								});
							}
						}
					});
				}

			},
  
 
			// 路线展示
			displayResult() {
				this.routeArr = [];
				var tempArr = {};
				for (var i = 0; i < this.bestRoute.length - 1; i++) {
					tempArr = {
						origin: this.sightData[this.bestRoute[i] - 1],
						destination: this.sightData[this.bestRoute[i + 1] - 1]
					}
					this.routeArr.push(tempArr)
				}
				tempArr = {
					origin: this.sightData[this.bestRoute[this.bestRoute.length - 1] - 1],
					destination: this.sightData[this.bestRoute[0] - 1]
				}
				this.routeArr.push(tempArr);
				// console.log("routeArr:", this.routeArr)
				uni.showModal({
				    title: '提示',
				    content: '最短距离:' + this.bestRouteDis + '米 -- 用时:' + this.useTime + '秒',
					showCancel: false
				});
			},

			// 路径计算
			calculateRoute() {
				this.selectedSight = this.inputValue.split(" ");
				// console.log("selectedSight:", this.selectedSight);
				if (this.inputValue == '') {
					uni.showModal({
						title: '提示',
						content: '请输入感兴趣的兴趣点',
						showCancel: false,
						confirmText: "确定"
					});
				} else {
					uni.showLoading({
						title: '加载中...'
					});
					console.log("calculateRoute");
					this.buildSightData();
					// console.log("date1:",new Date());
					setTimeout(() => {
						// console.log("date2:",new Date());
						this.getDistanceMatrix();
						// console.log(C this.getDistanceMatrix())
						setTimeout(() => { 
							// console.log(this.distanceMatrix)
							console.log("matrix:" , this.distanceMatrix);
							this.getBestRoute()
							setTimeout(() => {
								this.displayResult()
							}, 2000)
						}, 7000)
					}, 2000);
				}
			},


			// 请求当前所在位置
			getCurrentLocation() {
				// var that = this;
				this.currentLocation = {
					lat: getApp().globalData.currentLat,
					lng: getApp().globalData.currentLng
				}
				this.currentCity = getApp().globalData.currentCity;
				this.currentLat = this.currentLocation.lat;
			},

		},

	}
</script>

<style scoped>
	.input-sights {
		margin-bottom: 10upx;
	}

	.aco-btn {
		display: flex;
		justify-content: space-around;
		padding-bottom: 30upx;
		border-bottom: 2upx solid #b1b1b1;
	}

	.aco-btn button {
		width: 200upx;
		height: 80upx;
		line-height: 80upx;
		background-color: #00aaff;
		color: white;
	}

	.route-list {
		color: #6c6c6c;
		font-size: large;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30upx 0;
		border-bottom: 1upx solid #cdcdcd;
	}

	.route-list view {
		margin: 0 20upx;
	}

	.route-list image {
		width: 50upx;
		height: 50upx;
		margin: 0 20upx;
	}
	
	.in-param{
		padding: 20upx;
	}
	
	.in-param-input{
		display: flex;
		margin: 10upx 0;
	}
	
	.in-param-input input{
		border: 1upx #007AFF solid;
		width: 30%;
		margin-left: 15upx;
		
	}
</style>
