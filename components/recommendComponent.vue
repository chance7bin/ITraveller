<template>
	<view>
		<navigator v-for="(item,index) in recommendLists" :key="index" :url="'../../pages/detail/index?qno=' + item.qno">
			<view class="recommend-main">
				<view style="padding: 20upx;">
					<view class="recommend-title">
						<text>{{item.recommendTitle}}</text>
					</view>
					<view class="recommend-container" v-if="item.commentCount!=0">
						<view class="recommend-container-content">
							<view class="recommend-user">
								<view class="recommend-userImg">
									<image :src="item.userIconSrc"></image>
								</view>
								<view class="recommend-userName">
									<text>{{item.username}}</text>
								</view>
							</view>
							<view class="recommend-text">
								<text>{{item.recommendContent}}</text>
							</view>
						</view>
						<!-- <view class="recommend-container-img">
							<image :src="item.recommendImg"></image>
						</view> -->
					</view>
					<view class="recommend-footer" v-if="item.commentCount!=0">
						<view><text class="iconfont icon-zan">{{blank}}{{item.agreeCount}}</text></view>
						<!-- <view><button type="primary" plain="true">· · ·</button></view> -->
					</view>
					<view v-if="item.commentCount==0" class="no-comment">
						<text>还没有人评论，快来评论一下吧~~</text>
					</view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		name: 'recommendComponent',
		props: {
			recommendLists: {
				type: Array,
			}
		},
		data() {
			return {
				// questionInfo:getApp().globalData.questionInfo,
				// allComments: [],
				// recommendLists: [],
				blank: " "
			}
		},

		onReady() {
			console.log("recommend onReady~~~~~~~~");
			// this.initRecommendLists();
		},

		methods: {

		}
	}
</script>

<style scoped>
	.recommend-main {
		border-bottom: 20upx solid #f7f6f6;
	}

	.recommend-title {
		/* height: 60upx; */
		/* background-color: #0A98D5; */
		font-size: 36upx;
		font-weight: bold;
	}

	.recommend-container {
		/* height: 150upx; */
		/* background-color: #09BB07; */
		display: flex;
	}

	.recommend-container-content {
		flex: 3;
		/* background-color: #6699FF; */
	}

	.recommend-container-img {
		flex: 1;
		display: flex;
		align-items: center;
		/* background-color: #E80080; */
	}

	.recommend-user {
		margin-top: 10upx;
		display: flex;
		align-items: center;
	}

	.recommend-userImg image {
		height: 50upx;
		width: 50upx;
		border-radius: 50%;
	}

	.recommend-userName {
		margin-left: 10upx;
		font-size: 28upx;
		color: #686868;
	}

	.recommend-container-img image {
		height: 70%;
		width: 100%;
		border-radius: 20upx;
	}

	.recommend-user {
		display: flex;
	}

	.recommend-text {
		/* padding-right: 20upx; */
		margin: 20upx 20upx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #4f4f4f;
	}

	.recommend-footer {
		margin-left: 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60upx;
	}

	.recommend-footer text {
		font-size: 26upx;
		color: #9e9e9e;
	}

	/* .recommend-footer button{
		background-color: #ffffff;
		height: 50upx;
		width: 100upx;
		font-size: 20upx;
		font-weight: bold;
		color: #9e9e9e;
		border: 1upx solid #ffffff;
	} */
	.no-comment {
		padding: 30upx;
	}
</style>
