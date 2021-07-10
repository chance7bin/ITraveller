<template>
	<view style="display: flex; justify-content: center;">
		<view>
			<button @click="calculateButton">calculate</button>
			<view style="margin-top: 50upx;">2017年</view>
			<view>{{euHCount}} -- {{euUMCount}} -- {{euLMCount}} -- {{euLCount}} -- {{euCount}}</view>
			<view>{{subHCount}} -- {{subUMCount}} -- {{subLMCount}} -- {{subLCount}} -- {{subCount}}</view>
			<view>{{laHCount}} -- {{laUMCount}} -- {{laLMCount}} -- {{laLCount}} -- {{laCount}}</view>
			<view>{{eaHCount}} -- {{eaUMCount}} -- {{eaLMCount}} -- {{eaLCount}} -- {{eaCount}}</view>
			<view>{{midHCount}} -- {{midUMCount}} -- {{midLMCount}} -- {{midLCount}} -- {{midCount}}</view>
			<view>{{souHCount}} -- {{souUMCount}} -- {{souLMCount}} -- {{souLCount}} -- {{souCount}}</view>
			<view>{{norHCount}} -- {{norUMCount}} -- {{norLMCount}} -- {{norLCount}} -- {{norCount}}</view>
			<view>{{hCount}} -- {{umCount}} -- {{lmCount}} -- {{lCount}} -- {{sum}}</view>
		</view>
	</view>
</template>

<script>
	import idata from '@/pages/home/data.json'
	
	export default{
		data() {
			return {
				data:[],
				
				euHCount:0,
				subHCount:0,
				laHCount:0,
				eaHCount:0,
				midHCount:0,
				souHCount:0,
				norHCount:0,
				
				euUMCount:0,
				subUMCount:0,
				laUMCount:0,
				eaUMCount:0,
				midUMCount:0,
				souUMCount:0,
				norUMCount:0,
				
				euLMCount:0,
				subLMCount:0,
				laLMCount:0,
				eaLMCount:0,
				midLMCount:0,
				souLMCount:0,
				norLMCount:0,
				
				euLCount:0,
				subLCount:0,
				laLCount:0,
				eaLCount:0,
				midLCount:0,
				souLCount:0,
				norLCount:0,
				
				euCount:0,
				subCount:0,
				laCount:0,
				eaCount:0,
				midCount:0,
				souCount:0,
				norCount:0,
				
				
				hCount:0,
				umCount:0,
				lmCount:0,
				lCount:0,
				sum:0
			};
		},
		
		onShow() {
			this.data = idata;
			console.log("data:" , this.data)
		},
		
		methods: {
			calculateButton(){
				var temp = this.data;
				
				for (var i = 0; i < this.data.length; i++) {
					if(temp[i].yiqi == "H"){
						if(temp[i].Area == "Europe & Central Asia"){
							this.euHCount += 1;
						}
						if(temp[i].Area == "Sub-Saharan Africa"){
							this.subHCount += 1;
						}
						if(temp[i].Area == "Latin America & Caribbean"){
							this.laHCount += 1;
						}
						if(temp[i].Area == "East Asia & Pacific"){
							this.eaHCount += 1;
						}
						if(temp[i].Area == "Middle East & North Africa"){
							this.midHCount += 1;
						}
						if(temp[i].Area == "South Asia"){
							this.souHCount += 1;
						}
						if(temp[i].Area == "North America"){
							this.norHCount += 1;
						}
					}
					if(temp[i].yiqi == "UM"){
						if(temp[i].Area == "Europe & Central Asia"){
							this.euUMCount += 1;
						}
						if(temp[i].Area == "Sub-Saharan Africa"){
							this.subUMCount += 1;
						}
						if(temp[i].Area == "Latin America & Caribbean"){
							this.laUMCount += 1;
						}
						if(temp[i].Area == "East Asia & Pacific"){
							this.eaUMCount += 1;
						}
						if(temp[i].Area == "Middle East & North Africa"){
							this.midUMCount += 1;
						}
						if(temp[i].Area == "South Asia"){
							this.souUMCount += 1;
						}
						if(temp[i].Area == "North America"){
							this.norUMCount += 1;
						}
					}
					if(temp[i].yiqi == "LM"){
						if(temp[i].Area == "Europe & Central Asia"){
							this.euLMCount += 1;
						}
						if(temp[i].Area == "Sub-Saharan Africa"){
							this.subLMCount += 1;
						}
						if(temp[i].Area == "Latin America & Caribbean"){
							this.laLMCount += 1;
						}
						if(temp[i].Area == "East Asia & Pacific"){
							this.eaLMCount += 1;
						}
						if(temp[i].Area == "Middle East & North Africa"){
							this.midLMCount += 1;
						}
						if(temp[i].Area == "South Asia"){
							this.souLMCount += 1;
						}
						if(temp[i].Area == "North America"){
							this.norLMCount += 1;
						}
					}
					if(temp[i].yiqi == "L"){
						if(temp[i].Area == "Europe & Central Asia"){
							this.euLCount += 1;
						}
						if(temp[i].Area == "Sub-Saharan Africa"){
							this.subLCount += 1;
						}
						if(temp[i].Area == "Latin America & Caribbean"){
							this.laLCount += 1;
						}
						if(temp[i].Area == "East Asia & Pacific"){
							this.eaLCount += 1;
						}
						if(temp[i].Area == "Middle East & North Africa"){
							this.midLCount += 1;
						}
						if(temp[i].Area == "South Asia"){
							this.souLCount += 1;
						}
						if(temp[i].Area == "North America"){
							this.norLCount += 1;
						}
					}
				}
				this.euCount = this.euHCount + this.euUMCount + this.euLMCount + this.euLCount;
				this.subCount = this.subHCount + this.subUMCount + this.subLMCount + this.subLCount;
				this.laCount = this.laHCount + this.laUMCount + this.laLMCount + this.laLCount;
				this.eaCount = this.eaHCount + this.eaUMCount + this.eaLMCount + this.eaLCount;
				this.midCount = this.midHCount + this.midUMCount + this.midLMCount + this.midLCount;
				this.souCount = this.souHCount + this.souUMCount + this.souLMCount + this.souLCount;
				this.norCount = this.norHCount + this.norUMCount + this.norLMCount + this.norLCount;
				
				this.hCount = this.euHCount + this.subHCount + this.laHCount + this.eaHCount + this.midHCount + this.souHCount + this.norHCount;
				this.umCount = this.euUMCount + this.subUMCount + this.laUMCount + this.eaUMCount + this.midUMCount + this.souUMCount + this.norUMCount;
				this.lmCount = this.euLMCount + this.subLMCount + this.laLMCount + this.eaLMCount + this.midLMCount + this.souLMCount + this.norLMCount;
				this.lCount = this.euLCount + this.subLCount + this.laLCount + this.eaLCount + this.midLCount + this.souLCount + this.norLCount;
				this.sum = this.hCount + this.umCount + this.lmCount + this.lCount;
				// console.log("euHCount:",this.euHCount)
				// console.log("subHCount:",this.subHCount)
				// console.log("laHCount:",this.laHCount)
				// console.log("eaHCount:",this.eaHCount)
				// console.log("midHCount:",this.midHCount)
				// console.log("souHCount:",this.souHCount)
				// console.log("norHCount:",this.norHCount)
			}
		}
	}
</script>

<style scoped>
	
</style>
