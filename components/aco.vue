<template>
	<view>
		<button @click="calculateRoute(selectedSight)">click me</button>
	</view>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        selectedSight:['厦门大学','同安影视城','集美大学','方特','中山路'],
        sightData:[],
        distanceMatrix:[],
        tempDistance:0,
        tempData:[],
        tempSight:[],
        sightObj:{},
        currentLocation:{},
      }
    },
	
	onLoad() {
		 this.getCurrentLocation();
	},
	
    methods: {
		
      // 获取两地之间的距离
      getDistance(origin,destination,callback){
		  var tempi = origin.no;
		  // console.log("tempi:",tempi)
		  var tempj = destination.no;
		  // console.log("origin:",origin)
		  // console.log("destination:",destination)
		uni.request({
		    url: 'https://restapi.amap.com/v3/direction/driving', 
		    data: {
		       key: 'cb003321f848fc897f55ca40cf0e6b01',
				origin:origin.lng + ',' + origin.lat,
				destination:destination.lng + ',' + destination.lat,
				strategy:0
		    },
		    success: (res) => {
		        // console.log(res.data); 
				var distance = res.data.route.paths[0].distance;
				this.tempDistance = distance;
				callback(this.tempDistance,tempi,tempj)
		    }
		});	
        
      },

      // 获取距离矩阵
      getDistanceMatrix(){
		var that = this;
        this.distanceMatrix = [];
        console.log("getDistanceMatrix");
        var arrayLength = this.sightData.length;
        // this.distanceMatrix[0][0] = 0;
        for (var i = 0; i < arrayLength; i++ ){
          this.distanceMatrix[i] = [];
        }
        for (var i = 0; i < arrayLength; i++ ){
          for (var j = 0; j < arrayLength; j++ ){
            this.getDistance(this.sightData[i],this.sightData[j],function(value,tempi,tempj){
				that.distanceMatrix[tempi][tempj] = value
				// console.log("value:",value)
			});
          }
        }
        // console.log("matrix:" , this.distanceMatrix)
		// })
      },

      // 获取景点信息
      getSightLocation(queryPlace,region,i,callback){
        console.log("getSightLocation");
		uni.request({
		    url: 'http://api.map.baidu.com/place/v2/search', //仅为示例，并非真实接口地址。
		    data: {
				query:queryPlace,
				region:region,
				ak:'wRIcvin1aGUAAwXcM7tyRQwdZFyv9wnP',
				output:'json'
		    },
		    success: (res) => {
		        // console.log(res.data);
				const result = res.data.results[0];
				// console.log("res:", result);
				this.sightObj = {
				  'no': i+1,
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
      buildSightData(selectedSight){
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
        for (let i = 0; i < selectedSight.length; i++ ){
          this.getSightLocation(selectedSight[i],"厦门",i,function(value){
			  that.tempSight.push(value) 
		  })
        }
        // console.log("buildSightData:" , this.tempSight);
        this.sightData = this.tempSight;
        console.log("sightData:",this.sightData); 
      },

      // 路径计算
      calculateRoute(selectedSight){
        console.log("calculateRoute");
        this.buildSightData(selectedSight);
        // console.log("date1:",new Date());
        setTimeout(() =>{
          // console.log("date2:",new Date());
          this.getDistanceMatrix();
		  // console.log(C this.getDistanceMatrix())
		  setTimeout(() =>{
			  console.log(this.distanceMatrix)
			  // for (var i = 0; i < this.distanceMatrix.length; i++) {
			  // 	for (var j = 0; j < this.distanceMatrix.length; j++) {
			  // 		console.log("eeee:",this.distanceMatrix[i][j]);
			  // 	}    
			  // }
		  },5000)
        },500);
      },


      // 请求当前所在位置
      getCurrentLocation(){
		  // var that = this;
		  uni.request({
			  url: 'https://apis.map.qq.com/ws/location/v1/ip?key=L3LBZ-OQGE3-F3632-Y6Y3Z-2X7NS-CUBKT', //仅为示例，并非真实接口地址。
			  data: {
				  text: 'uni.request'
			  },
			  success: (res) => {
				  console.log(res.data);
				  this.currentLocation = res.data.result.location;
				  console.log("currentLocation:",this.currentLocation);
			  }
		  });
      },

    },
   
  }
</script>

<style scoped>
	
</style>
