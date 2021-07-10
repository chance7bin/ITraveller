<template>
	<view>
		<!--绑定点击事件-->
		<button @click="nearby_search">搜索周边KFC</button>
		<!--地图容器-->
		<!-- <map id="myMap"
			:markers="markers"
			style="width:100%;height:300px;"
			longitude="116.313972"
			latitude="39.980014"
			scale='16'>
		</map> -->
		<map id="myMap" :markers="markers" style="width:100%;height:300px;" longitude="118.164394" latitude="24.732373" scale='14'>
		</map>
	</view>
</template>

<script>
	import QQMapWX from '../../config/qqmap-wx-jssdk.js'
	import amapFile from '../../config/amap-wx.js'

	var qqmapsdk;

	export default {
		name: 'index',
		data() {
			return {
				markers: []
			}
		},

		onLoad() {
			/* qqmapsdk = new QQMapWX({
				key: 'L3LBZ-OQGE3-F3632-Y6Y3Z-2X7NS-CUBKT'
			}) */
			var that = this;
			var myAmapFun = new amapFile.AMapWX({
				key: 'f5c3e783de04e25d5c223439afac9d3e'
			});
			myAmapFun.getPoiAround({
				success: function(data) {
					//成功回调
					console.log("success:", data);
					var mks = []
					for (var i = 0; i < data.markers.length; i++) {
						mks.push({ // 获取返回结果，放到mks数组中
							name: data.markers[i].name,
							id: data.markers[i].id,
							latitude: data.markers[i].latitude,
							longitude: data.markers[i].longitude,
							iconPath: "../../static/images/location_icon.png", //图标路径
							width: 30,
							height: 30
						})
					}
					/* _this.setData({ //设置markers属性，将搜索结果显示在地图中
					  markers: mks
					}) */
					that.markers = mks;
				},
				fail: function(info) {
					//失败回调
					console.log(info)
				}
			})
		},

		/* onShow() {
			qqmapsdk.search({
				keyword: '酒店',
				success: function(res) {
					console.log(res);
				},
				fail: function(res) {
					console.log(res);
				},
				complete: function(res) {
					console.log(res);
				}
			});
		}, */





		methods: {
			// 事件触发，调用接口
			nearby_search: function() {
				var _this = this;
				// 调用接口
				qqmapsdk.search({
					keyword: 'kfc', //搜索关键词
					location: '39.980014,116.313972', //设置周边搜索中心点
					success: function(res) { //搜索成功后的回调
						var mks = []
						for (var i = 0; i < res.data.length; i++) {
							mks.push({ // 获取返回结果，放到mks数组中
								title: res.data[i].title,
								id: res.data[i].id,
								latitude: res.data[i].location.lat,
								longitude: res.data[i].location.lng,
								iconPath: "../../static/images/location_icon.png", //图标路径
								width: 20,
								height: 20
							})
						}
						/* _this.setData({ //设置markers属性，将搜索结果显示在地图中
						  markers: mks
						}) */
						_this.markers = mks;

					},
					fail: function(res) {
						console.log(res);
					},
					complete: function(res) {
						console.log(res);
					}
				});
			}
		}
	}
</script>

<style>
</style>
