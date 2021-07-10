<template>
	<view>
		<!--地图容器-->
		<map id="myMap" :markers="markers" style="width:100%;height:1100upx;" :longitude="longitude" :latitude="latitude"
		 :scale='scale' :polyline="polyline" show-location>
		</map>
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
				polyline: [],
				acoRoute: [],
				wayPoints: [],
				wayLines: []
			};
		},

		onLoad() {
			this.longitude = getApp().globalData.acoRoute[0].origin.lng;
			this.latitude = getApp().globalData.acoRoute[0].origin.lat;
			this.acoRoute = getApp().globalData.acoRoute;
		},

		onShow() {
			this.forEachRoute()
		},

		methods: {


			// 遍历路线
			forEachRoute() {
				this.wayPoints = [];
				var desLng = '';
				var desLat = '';
				var originLng = '';
				var originLat = '';
				for (var i = 0; i < this.acoRoute.length; i++) {
					desLng = this.acoRoute[i].destination.lng;
					desLat = this.acoRoute[i].destination.lat;
					originLng = this.acoRoute[i].origin.lng;
					originLat = this.acoRoute[i].origin.lat;
					this.getRoute(desLng, desLat, originLng, originLat, i)
				}
				setTimeout(() => {
					this.displayRoute()
				}, 1000);
			},

			// 请求路线
			getRoute(desLng, desLat, originLng, originLat, i) {
				var that = this;
				uni.request({
					url: 'https://restapi.amap.com/v3/direction/driving',
					data: {
						key: 'cb003321f848fc897f55ca40cf0e6b01',
						origin: originLng + ',' + originLat,
						destination: desLng + ',' + desLat,
						strategy: 0
					},
					success: (res) => {
						// console.log(res.data);
						var steps = res.data.route.paths[0].steps;
						that.wayLines[i] = steps;
					}
				});
			},

			displayRoute() {
				for (var k = 0; k < this.wayLines.length; k++) {
					var steps = this.wayLines[k];
					for (var i = 0; i < steps.length; i++) {
						var poLen = steps[i].polyline.split(';');
						for (var j = 0; j < poLen.length; j++) {
							this.wayPoints.push({
								longitude: parseFloat(poLen[j].split(',')[0]),
								latitude: parseFloat(poLen[j].split(',')[1])
							})
						}
					}
				}
				this.polyline = [{
					points: this.wayPoints,
					color: "#22dc1f",
					width: 6
				}]
				this.markers = [{
					iconPath: "../../static/images/myLocation.png",
					id: 0,
					latitude: this.acoRoute[0].origin.lat,
					longitude: this.acoRoute[0].origin.lng,
					width: 30,
					height: 30,
					callout: {
						content: this.acoRoute[0].origin.name,
						color: '#ffffff',
						bgColor: '#0055ff',
						borderRadius: 8,
						padding: 8,
						fontSize: 12
					}
				}]
				for (var i = 1; i < this.acoRoute.length; i++) {
					var tempMarkers = {
						iconPath: "../../static/images/passby.png",
						id: i,
						latitude: this.acoRoute[i].origin.lat,
						longitude: this.acoRoute[i].origin.lng,
						width: 30,
						height: 30,
						callout: {
							content: this.acoRoute[i].origin.name,
							color: '#ffffff',
							bgColor: '#0055ff',
							borderRadius: 8,
							padding: 8,
							fontSize: 12
						}
					}
					this.markers.push(tempMarkers)
				}
				this.scale = 12
			}



		}
	}
</script>

<style scoped>

</style>
