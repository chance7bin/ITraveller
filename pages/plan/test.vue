<template>
	<view>
		<button @click="calculateRoute(selectedSight)">click me</button>
	</view>
</template>

<script>
	// import BMap from 'BMap'
	// import axios from 'axios'
	import qs from 'qs'

	const xmSight = ["鼓浪屿", "厦门大学", "厦门园林植物园", "集美学村", "中山街", "普陀寺", "白鹭洲公园", "白城沙滩", "日月谷温泉", "厦门方特梦幻王国", "铁路文化公园",
		"厦门园林博览苑", "灵玲马戏城", "老院子景区", "天竺山森林公园", "厦门科技馆"
	];
	const fzSight = ["三坊七巷", "西湖公园", "鼓山", "于山", "国家森林公园", "平潭岛", "福州云顶", "贵安欢乐世界", "福州鼓岭", "上下杭", "罗源湾海洋世界", "石竹山", "西禅寺",
		"温泉公园", "罗星塔", "泛船浦天主教堂", "海峡熊猫世界", "中国船政文化博物馆"
	];
	const provinceData = ['厦门', '福州'];
	const cityData = {
		'厦门': ["鼓浪屿", "厦门大学", "厦门园林植物园", "集美学村", "中山街", "普陀寺", "白鹭洲公园", "白城沙滩", "日月谷温泉", "厦门方特梦幻王国", "铁路文化公园", "厦门园林博览苑",
			"灵玲马戏城", "老院子景区", "天竺山森林公园", "厦门科技馆"
		],
		'福州': ["三坊七巷", "西湖公园", "鼓山", "于山", "国家森林公园", "福州云顶", "贵安欢乐世界", "福州鼓岭", "上下杭", "罗源湾海洋世界", "石竹山", "西禅寺", "温泉公园", "罗星塔",
			"泛船浦天主教堂", "海峡熊猫世界", "中国船政文化博物馆"
		],
	};

	const key = 'updatable';


	export default {
		name: "index",
		data() {
			return {
				// 地图组件
				center: {
					lng: 0,
					lat: 0
				},
				zoom: 3,
				swz: true,
				start: {
					lng: 0,
					lat: 0
				},
				end: {
					lng: 0,
					lat: 0
				},
				waypoints: [],
				// 选择框联动
				provinceData,
				cityData,
				cities: cityData[provinceData[0]],
				secondCity: cityData[provinceData[0]][0],
				selectedSight: ['厦门大学', '同安影视城', '集美大学', '方特', '中山路'],
				selectedProvince: '厦门',
				// aco组件
				message: 'hello',
				distance: 0,
				sightData: [],
				distanceMatrix: [],
				bestRoute: [{
					name: '我的位置'
				}],
				displayString: '暂无推荐结果',
				tempDistance: 0,
				tempData: [],
				tempSight: [],
				sightObj: {},
				xmSight,
				fzSight,
				drivingOn: false,
				drivingOff: true,
				drivingDetail: [],
				busRoute: [],
				visible: false,
				mapVisible: false,
				routeDetail: {
					'no': 0,
					'start': '',
					'end': '',
					'distance': 0,
					'duration': 0,
					'step': [
						[{
							instructions: ''
						}]
					]
				},
				loadingState: false,
				currentLocation: {},
				modelWidth: 1000
			}
		},

		onLoad() {
			this.getCurrentLocation();
			// var a = '[1,2,3,4,5,6]'
			// a = a.replace("[", "");
			// a = a.replace("]", "");
			// var temp = [];
			// temp = a.split(',')
			// console.log("replaceA:",temp); 
		},

		methods: {

			// 请求最佳路径
			getBestRoute() {
				console.log("getBestRoute");
				/* var that = this;
		for (var i = 0; i < this.distanceMatrix.length; i++) {
			for (var j = 0; j < this.distanceMatrix.length; j++) {
				console.log("eeee:",this.distanceMatrix[i][j]);
			}
		} */
				var tempString = '';
				console.log("tempString:", this.distanceMatrix.toString());

				uni.request({
					url: 'http://localhost:8081/Aco/CalculateBestRoute', //仅为示例，并非真实接口地址。
					data: {
						no: 77,
						name: "bin",
						array: this.distanceMatrix,
						arrLen: this.distanceMatrix.length
					},
					success: (res) => {
						console.log(res.data);
					}
				});

				axios.get('/localhostApi/Aco/CalculateBestRoute', {
						params: {
							no: 77,
							name: "bin",
							array: this.distanceMatrix,
							arrLen: this.distanceMatrix.length
						},
						paramsSerializer: params => {
							return qs.stringify(params, {
								indices: false
							})
						}
					})
					.then(function(response) {
						console.log("getBestRoute():", response.data);
						var resData = response.data;
						if (response.data != 404) {
							that.displayString = '';

							that.$success({
								title: '提示',
								content: '加载成功...',
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
							that.loadingState = false;
						} else {
							that.displayString = '加载失败';
							that.loadingState = false;
							that.$error({
								title: '提示',
								content: '加载失败...请再试一次...',
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},


			// 展示最佳路径
			/* displayResult(selectedSight){
			  // this.displayString = '';
			  if (selectedSight.length == 0) {
			     this.$message.warning('请输入感兴趣的兴趣点');
			  } else {
			    this.loadingState = true;
			    console.log("displayResult");
			    this.calculateRoute(selectedSight);
			  }

			}, */

			// 获取两地之间的距离
			getDistance(origin, destination, callback) {
				var tempi = origin.no;
				console.log("tempi:", tempi)
				var tempj = destination.no;
				// console.log("origin:",origin)
				// console.log("destination:",destination)
				uni.request({
					url: 'http://api.map.baidu.com/direction/v2/driving', //仅为示例，并非真实接口地址。
					data: {
						ak: 'wRIcvin1aGUAAwXcM7tyRQwdZFyv9wnP',
						origin: origin.lat + ',' + origin.lng,
						destination: destination.lat + ',' + destination.lng
					},
					success: (res) => {
						// console.log(res.data); 
						this.tempData = res.data;
						var distance = this.tempData.result.routes[0].distance;
						this.tempDistance = distance;
						callback(this.tempDistance, tempi, tempj)
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
						this.getDistance(this.sightData[i], this.sightData[j], function(value, tempi, tempj) {
							that.distanceMatrix[tempi][tempj] = value
							// console.log("value:",value)
						});
					}
				}
				// for (var i = 0; i < sightData.length; i++ ){
				//   console.log("distanceMatrix[0][" + i + "]:" + this.distanceMatrix[0][i])
				// }
				console.log("matrix:", this.distanceMatrix)
			},

			// 获取景点信息
			getSightLocation(queryPlace, region, i, callback) {
				console.log("getSightLocation");
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
						// console.log("res:", result);
						this.sightObj = {
							'no': i + 1,
							'name': result.name,
							'lat': result.location.lat,
							'lng': result.location.lng,
							'address': result.address
						};
						callback(this.sightObj);
					}
				});
			},

			// 构建景点数据数组
			buildSightData(selectedSight) {
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
				this.tempSight.push(myLocation)
				for (let i = 0; i < selectedSight.length; i++) {
					this.getSightLocation(selectedSight[i], "厦门", i, function(value) {
						that.tempSight.push(value)
					})
				}
				// console.log("buildSightData:" , this.tempSight);
				this.sightData = this.tempSight;
				console.log("sightData:", this.sightData);
			},

			// 路径计算
			calculateRoute(selectedSight) {
				console.log("calculateRoute");
				this.buildSightData(selectedSight);
				// console.log("date1:",new Date());
				setTimeout(() => {
					// console.log("date2:",new Date());
					this.getDistanceMatrix();
					setTimeout(() => {
						// console.log("date3:",new Date());
						this.getBestRoute();
						/* setTimeout(() => {
						  // 展示路径
						  this.waypoints = [];
						  console.log("displayResult:",this.bestRoute);
						  this.displayString += this.sightData[this.bestRoute[0] - 1].name + ' > ';
						  for (var i = 1; i < this.bestRoute.length; i++){
						    var temp = this.bestRoute[i] - 1;
						    // console.log("temp:",this.sightData[temp]);
						    var tempWaypoints = {};
						    tempWaypoints = {
						      lng: this.sightData[temp].lng, 
						      lat: this.sightData[temp].lat
						    }
						    this.waypoints.push(tempWaypoints);
						    this.displayString += (this.sightData[temp].name + ' > ')
						  }
						  this.displayString += this.sightData[this.bestRoute[0] - 1].name
						},500) */
					}, 1000);
				}, 500);
			},

			// 得到路线详情
			/*      async getDrivingDetail(bestRoute){
			        var tempDrivingDetail = [];
			        var tempBus = [];
			        var dtl = {};
			        var busdtl = {};
			        this.bestRoute.push(this.bestRoute[0]);
			        console.log("getDrivingDetail:",this.bestRoute)
			        for (var i = 0; i < bestRoute.length - 1; i++){
			          var url = '/mapApi/direction/v2/driving?ak=wRIcvin1aGUAAwXcM7tyRQwdZFyv9wnP&origin=' + this.sightData[bestRoute[i]-1].lat + ',' + this.sightData[bestRoute[i]-1].lng + '&destination=' + this.sightData[bestRoute[i+1]-1].lat + ',' + this.sightData[bestRoute[i+1]-1].lng  ;
			          const res = await axios.get(url);
			          // console.log("res:",res);
			         dtl = {
			            'no': i,
			            'start': this.sightData[bestRoute[i]-1].name,
			            'end': this.sightData[bestRoute[i+1]-1].name,
			            'distance': (res.data.result.routes[0].distance / 1000).toFixed(1),
			            'duration': (res.data.result.routes[0].duration / 60).toFixed()
			          };
			          tempDrivingDetail.push(dtl)
			        }
			        for (var i = 0; i < bestRoute.length - 1; i++){
			          var url = '/mapApi/direction/v2/transit?ak=wRIcvin1aGUAAwXcM7tyRQwdZFyv9wnP&origin=' + this.sightData[bestRoute[i]-1].lat + ',' + this.sightData[bestRoute[i]-1].lng + '&destination=' + this.sightData[bestRoute[i+1]-1].lat + ',' + this.sightData[bestRoute[i+1]-1].lng  ;
			          const res = await axios.get(url);
			          // console.log("busres:",res);
			          busdtl = {
			            'no': i,
			            'start': this.sightData[bestRoute[i]-1].name,
			            'end': this.sightData[bestRoute[i+1]-1].name,
			            'distance': (res.data.result.routes[0].distance / 1000).toFixed(1),
			            'duration': (res.data.result.routes[0].duration / 60).toFixed(),
			            'step': res.data.result.routes[0].steps
			          };
			          tempBus.push(busdtl)
			        }
			        this.drivingDetail = tempDrivingDetail;
			        this.busRoute = tempBus;
			      },
			 */

			// 路线详情按钮
			/* detailBtn(){
			   if (this.displayString == '暂无推荐结果' || this.displayString == '加载失败') {
			     this.$message.warning('暂无路线详情');
			   } 
			   else if (this.drivingDetail.length == 0) {
			     this.$message.warning('路线加载中...请稍后...');
			   }
			   else {
			     this.drivingOff = false;
			     this.drivingOn = true;
			     this.$message.success('路线详情加载成功');
			   }
			  
			 }, */


			// 路线展示按钮
			/*  displayBtn(){
			    this.mapVisible = true;
			  },
			  mapHandleOk(){
			    this.mapVisible = false;
			  },

			  returnPage(){
			    this.drivingOff = true;
			    this.drivingOn = false;
			  },

			  busRouteBtn(e){
			    console.log("e:",e);
			    this.routeDetail = e;
			    this.visible = true;
			  }, */


			// 请求当前所在位置
			getCurrentLocation() {
				// var that = this;
				uni.request({
					url: 'https://apis.map.qq.com/ws/location/v1/ip?key=L3LBZ-OQGE3-F3632-Y6Y3Z-2X7NS-CUBKT', //仅为示例，并非真实接口地址。
					data: {
						text: 'uni.request'
					},
					success: (res) => {
						console.log(res.data);
						this.currentLocation = res.data.result.location;
						console.log("currentLocation:", this.currentLocation);
					}
				});
				// console.log("getCurrentLocation:",res.data.result.location);
				// this.currentLocation = res.data.result.location;
			},

		},

	}
</script>

<style scoped>

</style>
