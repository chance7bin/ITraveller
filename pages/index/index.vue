<template>
	<view class="container">
		<view class="top-nav">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#1584ff">
			</uni-segmented-control>
		</view>
		<view class="changeTheme">
			<view v-show="current === 0">
				<recommend-component :recommendLists="recommendLists"></recommend-component>
			</view>
			<view v-show="current === 1">
				<topic-component :questionInfo="questionInfo"></topic-component>
			</view>
			<!-- <view v-show="current === 2">
				<hot-search></hot-search>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {
		uniSegmentedControl
	} from "@dcloudio/uni-ui";
	import topicComponent from "../../components/topicComponent.vue";
	import recommendComponent from "../../components/recommendComponent.vue"
	import hotSearch from "../../components/hotSearch.vue"
	import config from "config/config.js";

	export default {
		components: {
			uniSegmentedControl,
			topicComponent,
			recommendComponent,
			hotSearch
		},
		data() {
			return {
				items: ['推荐', '话题'],
				current: 0,
				questionInfo: [],
				// 推荐列表
				allComments: [],
				recommendLists: [],
			}
		},

		onLoad() {
			// console.log("onLoad————");
			this.questionInfo = getApp().globalData.questionInfo;
			// this.changeUserImg();
			// console.log("changeUserImg————",this.questionInfo);
			// this.initRecommendLists();
		},

		onShow() {
			console.log("index onShow")
			this.questionInfo = getApp().globalData.questionInfo;
			this.initRecommendLists();
		},



		methods: {
			onClickItem(index) {
				if (this.current !== index.currentIndex) {
					this.current = index.currentIndex;
				}
			},

			// 构造推荐列表
			bulidRecommendList() {
				this.recommendLists = [];
				for (let i = 0; i < this.questionInfo.length; i++) {
					let thisComment = [];
					for (let j = 0; j < this.allComments.length; j++) {
						if (this.allComments[j].qcno == this.questionInfo[i].qno) {
							thisComment = this.allComments[j];
							break;
						}
					}
					// console.log("thisComment:",thisComment);
					let recommendList = {
						qno: this.questionInfo[i].qno,
						recommendTitle: this.questionInfo[i].quizTitle,
						userIconSrc: thisComment.commentUserIcon,
						username: thisComment.commentUserName,
						recommendContent: thisComment.commentContent,
						recommendImg: this.questionInfo[i].quizImg,
						agreeCount: thisComment.agreeCount,
						commentCount: this.questionInfo[i].commentCount
					}
					this.recommendLists.push(recommendList);
				}
				// console.log("recommendLists:",this.recommendLists);
			},

			// 初始化推荐列表
			initRecommendLists() {
				// console.log("initRecommendLists:",this.questionInfo);
				let that = this;
				uni.request({
					url: config.reUrl + '/FuStar/QueryAllComments',
					data: {

					},
					success: (res) => {
						that.allComments = res.data;
						that.bulidRecommendList();
						// uni.stopPullDownRefresh();
						// uni.hideNavigationBarLoading();
					}
				});
			},
			
			//刷新数据
			getData() {
				// let that = this;
				uni.request({
					url: config.reUrl + '/FuStar/QueryAllQuestion',
					data: {
			
					},
					success: (res) => {
						getApp().globalData.questionInfo = res.data;
						// console.log("this:",this);
						this.questionInfo = getApp().globalData.questionInfo;
						this.initRecommendLists()
						// this.changeUserImg();
						uni.stopPullDownRefresh();
						uni.hideNavigationBarLoading();
					}
				});
			}
			

		},

		onPullDownRefresh() {
			// console.log('refresh');
			uni.showNavigationBarLoading();
			this.getData();
			// setTimeout(() => {
			// 	this.questionInfo = getApp().globalData.questionInfo;
			// 	this.initRecommendLists()
			// 	// this.changeUserImg();
			// 	uni.stopPullDownRefresh();
			// 	uni.hideNavigationBarLoading();
			// }, 2000)
		}


	}
</script>

<style scoped>
	.container {}

	.top-nav {
		width: 100%;
		background-color: #ffffff;
	}

	.changeTheme {}
</style>
