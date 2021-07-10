<template>
	<view>
		<navigator :url="'../../pages/detail/index?qno=' + item.qno" v-for="(item,index) in questionInfo" v-show="item.quizType == quizType"
		 :key="index">
			<view class="topic-list">
				<view class="user-info">
					<view class="user-info-img">
						<image :src="item.quizUserIcon"></image>
					</view>
					<view class="user-info-detail">
						<view class="user-info-name">
							<text>{{item.quizUserName}}</text>
						</view>
						<view class="user-info-date">
							<text>{{item.quizDate}}</text>
						</view>
					</view>
				</view>
				<view class="topic-type">
					<text>#{{item.quizType}}#</text>
				</view>
				<view class="topic-text">
					<text>{{item.quizTitle}}</text>
				</view>
				<view class="topic-img" v-if="item.quizImg != ''">
					<image :src="item.quizImg" mode="widthFix"></image>
				</view>
				<view class="topic-footer">
					<text class="iconfont icon-liulan">
						{{blank}}{{item.browseCount}}
					</text>
					<text class="iconfont icon-huifu">
						{{blank}}{{item.commentCount}}
					</text>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		name: 'topicType',
		props: {
			quizType: {
				type: String,
			},
			questionInfo: {
				type: Array
			}

		},
		data() {
			return {
				// questionInfo:[]
				blank: " "
			}
		},
		onReady() {

		},
	}
</script>

<style scoped>
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
		margin: 10upx 0;
		font-weight: bold;
		font-size: 36upx;
	}

	.topic-img {
		margin-top: 10upx;
	}

	.topic-img image {
		width: 240upx;
		border-radius: 20upx;
	}

	.topic-footer {
		margin-top: 10upx;
		font-size: 26upx;
		color: #9e9e9e;
	}

	.topic-footer text {
		margin-left: 20upx;
	}
</style>
