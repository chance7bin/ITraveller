<script>
	import config from "config/config.js";
	
	export default {
		onLaunch: function() {
			console.log('App Launch');
			let that = this;
			 
			
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
								        console.log("currentLocaiton",res.data.result);
										// var location = res.data.result.location;
										// getApp().globalData.currentLat = location.lat;
										// getApp().globalData.currentLng = location.lng;
										getApp().globalData.currentCity = res.data.result.ad_info.city;
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
			
			
			
			//请求用户列表
			uni.request({
				url: config.reUrl + '/FuStar/QueryUsers',
				success: (res) => {
					// console.log("userList:",res.data);
					getApp().globalData.allUsers = res.data;
				},
				fail: (res) => {
					console.log("userListGetFail");
				}
			});
			
			
			//请求所有问题 
			setTimeout(() => {
				uni.request({
					url: config.reUrl + '/FuStar/QueryAllQuestion',
					data: {
						
					},
					success: (res) => {
						// console.log("QueryAllQuestion:",res.data);
						getApp().globalData.questionInfo = res.data;
					}, 
					fail: (res) => {
						console.log("QueryAllQuestionGetFail");
					}
				});
			},1000)
			     
			
			
			
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			questionInfo:[],
			userName:"我是彭于晏",
			userIconImg:"/static/images/userIcon.png",
			commentList:[],
			qqMapAndWebAPIKey:'L3LBZ-OQGE3-F3632-Y6Y3Z-2X7NS-CUBKT',
			gdMapKey:'f5c3e783de04e25d5c223439afac9d3e',
			gdMapWebAPIKey:'cb003321f848fc897f55ca40cf0e6b01',
			bdWebAPIKey:'wRIcvin1aGUAAwXcM7tyRQwdZFyv9wnP',
			routeDetail:[],
			desPointName:'',
			originAddress:{name:'从哪里',lat:'',lng:'',address:''},
			destinationAddress:{name:'去哪里',lat:'',lng:'',address:''},
			currentLat:'26.026808',
			currentLng:'119.209310',
			currentCity:'福州市',
			historySearch:[],
			acoRoute:[],
			allUsers:[]
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "static/css/iconfont.css";
</style>
