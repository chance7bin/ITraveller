<template>
	<view class="topic">
		<scroll-view class="topic-scroll" scroll-x="true">
			<view v-model="currentIndexNav" v-for="(item,index) in navList" @click="changeTopic" class="nav-item" :class="[index==currentIndexNav?'active':'']"
			 :key="index" :id="index">
				{{item.text}}
			</view>
		</scroll-view>
		<view class="topic-container">
			<view v-show="currentIndexNav == 0">
				<all-type :questionInfo="questionInfo"></all-type>
			</view>
			<view v-show="currentIndexNav == 1">
				<topic-type quizType="景点" :questionInfo="questionInfo"></topic-type>
			</view>
			<view v-show="currentIndexNav == 2">
				<topic-type quizType="美食" :questionInfo="questionInfo"></topic-type>
			</view>
			<view v-show="currentIndexNav == 3">
				<topic-type quizType="路线" :questionInfo="questionInfo"></topic-type>
			</view>
			<view v-show="currentIndexNav == 4">
				<topic-type quizType="住宿" :questionInfo="questionInfo"></topic-type>
			</view>
			<view v-show="currentIndexNav == 5">
				<topic-type quizType="手信" :questionInfo="questionInfo"></topic-type>
			</view>
			<view v-show="currentIndexNav == 6">
				<topic-type quizType="其他" :questionInfo="questionInfo"></topic-type>
			</view>
		</view>
	</view>
</template>

<script>
	import topicType from "../components/topicType.vue"
	import allType from "../components/allType.vue"

	export default {
		name: 'topicComponent',
		props: {
			questionInfo: {
				type: Array,
			}
		},
		data() {
			return {
				currentIndexNav: 0,
				// "questionInfo": getApp().globalData.questionInfo,
				"navList": [{
						"text": "全部",
						"id": 0
					},
					{
						"text": "景点",
						"id": 1
					},
					{
						"text": "美食",
						"id": 2
					},
					{
						"text": "路线",
						"id": 3
					},
					{
						"text": "住宿",
						"id": 4
					},
					{
						"text": "手信",
						"id": 5
					},
					{
						"text": "其他",
						"id": 6
					}
				],

			}
		},
		components: {
			topicType,
			allType
		},

		onReady() {
			// console.log("topic onReady~~~~~~~~");
		},


		methods: {
			changeTopic(e) {
				if (this.currentIndexNav !== e.currentTarget.id) {
					this.currentIndexNav = e.currentTarget.id;
				}
			}
		}
	}
</script>

<style scoped>
	.topic {
		/* width: 100%; */
		/* background-color: #f7f6f6; */
	}

	.topic-scroll {
		padding: 10upx;
		display: flex;
		white-space: nowrap;
		border-bottom: 20upx solid #f7f6f6;
		height: 60upx;
		/* background-color: #09BB07; */
	}

	.nav-item {
		padding: 10upx 40upx;
		font-size: 30upx;
		display: inline-block;
	}

	.nav-item.active {
		color: #1584ff;
		font-weight: bold;
	}

	.topic-container {}

	.topic-list {
		padding: 20upx;
		border-bottom: 20upx solid #f7f6f6;
	}

	.user-info {
		display: flex;
	}

	.user-info-img {}

	.user-info-img image {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}

	.user-info-detail {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 20upx;
	}

	.user-info-name {
		font-size: 30upx;
	}

	.user-info-date {
		font-size: 26upx;
		color: #686868;
	}

	.topic-type {
		margin-top: 10upx;
		color: #007AFF;
	}

	.topic-text {
		margin-top: 10upx;
		font-weight: bold;
		font-size: 36upx;
	}

	.topic-img {
		margin-top: 10upx;
	}

	.topic-img image {
		width: 240upx;
		height: 180upx;
		border-radius: 20upx;
	}

	.topic-footer {
		margin-top: 10upx;
		font-size: 26upx;
		color: #9e9e9e;
	}
</style>
