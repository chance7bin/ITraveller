<template>
	<view>
		<map id="myMap" :markers="markers" style="width:100%;height:850upx;" :longitude="longitude" :latitude="latitude"
		 :scale='scale' @markertap="markerClick" show-location  show-compass enable-traffic>
		</map>
		<!-- 搜索类型 -->
		<view class="circleList" v-if="optionsPage">
			<view @click="nearby_search(item.keyword)" class="circleList--item" v-for="(item,index) in circlelist" :key="index">
				<view class="circleList--item--circle">
					<image class="circleList--item--circle__image" mode="aspectFill" :src="'/static/images/' + item.src"></image>
				</view>
				<view class="circleList--item--text">
					<text>{{item.keyword}}</text>
				</view>
			</view>
			<view @click="more" class="circleList--item">
				<view class="circleList--item--circle">
					<image class="circleList--item--circle__image" mode="aspectFill" src="/static/images/more.png"></image>
				</view>
				<view class="circleList--item--text">
					<text>更多</text>
				</view>
			</view>
		</view>
		<!-- 更多按钮提示输入框 -->
		<prompt ref="prompt" @onConfirm="onConfirm" @onCancel="onCancel" title="关键词" :isHidden="ishidden"></prompt>
		<!-- 出行方式组件 -->
		<view class="vehicle" v-if="vehiclePage">
			<view class="top-item">
				<view class="point-name" @click="showAddress"><text>{{thisPoint}}</text></view>
				<button class="return-btn-item prompt-cancel-btn contentFontColor return-to-options" @click="returnToOptions">返回</button>
			</view>
			<view class="vehicle-type">
				<navigator :url="'../vehicleStrategy/index?vehicle=' + item.keyword + '&toVehivle=0'" v-for="(item,index) in vehicleList"
				 :key="index">
					<button class="btn-item prompt-certain-btn">{{item.vehicle}}</button>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import QQMapWX from '../../config/qqmap-wx-jssdk.js'
	import amapFile from '../../config/amap-wx.js'
	import prompt from '../../components/prompt.vue';

	var qqmapsdk;
	var myAmapFun

	export default {

		components: {
			prompt,
		},

		data() {
			return {
				markers: [],
				scale: 16,
				thisPoint: '',
				address: '',
				longitude: '118.108245',
				latitude: '24.486208',
				ishidden: true,
				// 控制页面切换属性
				optionsPage: true,
				vehiclePage: false,
				desLon: '',
				desLat: '',
				currentCity: '',
				circlelist: [{
						keyword: "美食",
						src: "food.png"
					},
					{
						keyword: "公交站",
						src: "bus.png"
					},
					{
						keyword: "景点",
						src: "scenery.png"
					}, {
						keyword: "厕所",
						src: "toilet.png"
					},
				],
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
			};
		},



		onLoad() {
			console.log("nearby onLoad~~")
			qqmapsdk = new QQMapWX({
				key: 'L3LBZ-OQGE3-F3632-Y6Y3Z-2X7NS-CUBKT'
			})
			myAmapFun = new amapFile.AMapWX({
				key: 'f5c3e783de04e25d5c223439afac9d3e'
			});

			this.latitude = getApp().globalData.currentLat;
			this.longitude = getApp().globalData.currentLng;
			this.currentCity = getApp().globalData.currentCity;
		},

		onShow() {

		},


		methods: {

			nearby_search: function(tpye) {
				var _this = this;
				// 调用接口
				qqmapsdk.search({
					keyword: tpye, //搜索关键词
					// location: '24.486208,118.108245',  //设置周边搜索中心点  
					location: this.latitude + ',' + this.longitude, //设置周边搜索中心点  
					page_size: 20,
					success: function(res) { //搜索成功后的回调
						var mks = []
						for (var i = 0; i < res.data.length; i++) {
							mks.push({ // 获取返回结果，放到mks数组中
								title: res.data[i].title,
								address: res.data[i].address,
								id: res.data[i].id,
								latitude: res.data[i].location.lat,
								longitude: res.data[i].location.lng,
								iconPath: "../../static/images/location.png", //图标路径
								width: 30,
								height: 30,
								callout: {
									content: res.data[i].title,
									color: '#ffffff',
									bgColor: '#aa0000',
									borderRadius: 8,
									padding: 8,
									fontSize: 12
								}
							})
						}
						_this.markers = mks;
						_this.scale = 14;
						console.log("mks:", mks);
					},
					fail: function(res) {
						console.log(res);
					},
					complete: function(res) {
						// console.log(res);
					}
				});
			},

			markerClick(e) {
				// console.log("markerClick:",e);
				for (var i = 0; i < this.markers.length; i++) {
					// console.log("this.markers[i].id:" + this.markers[i].id + "-----e.detail.markerId:" + e.detail.markerId);
					this.markers[i].iconPath = "../../static/images/location.png";

					if (this.markers[i].id == e.markerId) {
						this.thisPoint = this.markers[i].title;
						console.log("this.markers[i]:", this.markers[i]);
						getApp().globalData.destinationAddress.name = this.markers[i].title;
						getApp().globalData.originAddress.name = '我的位置';
						getApp().globalData.destinationAddress.address = this.markers[i].address;
						getApp().globalData.originAddress.address = '我的位置';
						// console.log("this.markers[i]:",this.markers[i]);
						var arr = this.markers[i].address.split(this.currentCity);
						// console.log("arr[0]:",arr[0]);
						// console.log("arr[1]:",arr[1]);
						this.address = arr[1];
						this.longitude = this.markers[i].longitude;
						this.latitude = this.markers[i].latitude;
						this.markers[i].iconPath = "../../static/images/location_active.png";
						this.desLat = this.markers[i].latitude;
						this.desLon = this.markers[i].longitude;
						getApp().globalData.destinationAddress.lat = this.markers[i].latitude;
						getApp().globalData.destinationAddress.lng = this.markers[i].longitude;
						// console.log("thisPoint:",this.thisPoint);
						this.markers[i].callout.content = this.markers[i].title;
					}
				}
				// console.log("thisPoint:",this.thisPoint);
				// console.log("address:",this.address);
				this.optionsPage = false;
				this.vehiclePage = true;
			},

			more() {
				console.log("more");
				this.ishidden = false
			},


			//提示框
			prompt: function() {
				this.$refs.prompt.show();
			},
			onConfirm: function(e) {
				console.log(e);
				let _cost = e;
				if (_cost == '') {
					console.log('你还未输入');
					return;
				} else {
					// this.$refs.prompt.hide();
					this.ishidden = true;
					uni.showModal({
						title: '提示',
						content: '你输入的是:' + _cost,
						showCancel: false,
						confirmText: "确定"
					});
					this.nearby_search(_cost)
				}
			},
			onCancel: function() {
				// this.$refs.prompt.hide();
				this.ishidden = true;
				this.$refs.prompt.cost = '';
			},


			returnToOptions() {
				this.optionsPage = true;
				this.vehiclePage = false;
			},


			showAddress() {
				uni.showModal({
					title: '详细地址',
					content: this.address,
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
		justify-content: space-between;
		align-items: center;
		/* margin: 10upx; */
	}

	.point-name {
		margin: 0 20upx;
		font-size: large;
		font-weight: bold;
		color: #6b6b6b;
		/* flex: 3; */
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

	/* POI */
	.circleList {
		position: relative;
		padding-top: 60upx;
		padding-bottom: 10upx;
		background: #fff;
	}

	.circleList--item {
		float: left;
		width: 150upx;
		height: 170upx;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
	}

	.circleList--item:active {
		opacity: 0.6;
		transition: opacity ease 0.1s;
	}

	.circleList--item--circle {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		width: 100upx;
		height: 100upx;
		color: #fff;
		border-radius: 100%;
		background: #0f83ff;
	}

	.circleList--item--circle__image {
		width: 60upx;
		height: 60upx;
	}

	.circleList--item--text {
		margin: 10upx 0 30upx 0;
		height: 30upx;
		line-height: 30upx;
		font-size: 30upx;
	}

	/* 按钮样式 */
	.btn-item {
		width: 30%;
		height: 80upx;
		line-height: 80upx;
		background-color: white;
	}

	.return-btn-item {
		height: 70upx;
		line-height: 70upx;
		background-color: white;
	}

	.prompt-certain-btn {
		color: white;
		background-color: #00aaff;
	}

	.prompt-cancel-btn {
		border: 1px solid #00aaff;
	}

	.contentFontColor {
		color: #868686;
	}
</style>
