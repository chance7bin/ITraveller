<template>
	<view>
		<view class="detail-top">
			<view class="top-title">
				<text>
					{{detailList.quizTitle}}
					<text class="topic-type">{{detailList.quizType}}</text>
				</text> 
			</view>
			<view class="top-info"> 
				<text>{{detailList.quizDescription}}</text>
			</view>
			<view class="top-img" v-if="detailList.quizImg != ''" @click="previewImg(detailList.quizImg)">
				<image mode="widthFix" :src="detailList.quizImg" :class="isZoomIn ? 'zoom-in' : 'zoom-out'"></image>
			</view>
			<view class="top-footer">
				<text class="iconfont icon-liulan">
					{{blank}}{{detailList.browseCount}}
				</text>
				<text class="iconfont icon-huifu">
					{{blank}}{{detailList.commentCount}}
				</text>
			</view>
		</view>

		<view class="detail-container">
			<view class="container-top">
				<text>回复 {{detailList.commentCount}}</text>
				<view class="comment-button">
					<text class="iconfont icon-comment-copy" style="font-size: 30upx;"></text>
					<button type="primary" plain="true" @click="addComment">点此回复</button>
				</view>
			</view>
			<view v-if="detailList.commentCount==0" class="no-comment">
				<image src="../../static/images/noComment.jpg"></image>
			</view>
			<view class="comment-list" v-for="(item,index) in commentList" v-if="detailList.commentCount!=0" :key="index">
				<view class="user-info">
					<view class="user-img">
						<image :src="item.commentUserIcon"></image>
					</view>
					<view class="user-name">
						<text>{{item.commentUserName}}</text>
					</view>
				</view>
				<view class="comment-content">
					<text>{{item.commentContent}}</text>
				</view>
				<view class="comment-footer">
					<text>{{item.agreeCount}} 赞同 · {{item.commentDate}}</text>
					<view><button type="primary" plain="true" @click="changeAgreeCount(index)" class="iconfont icon-zan" style="font-size: 26upx;"></button></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "config/config.js";

	export default {
		data() {
			return {
				detailList: [],
				commentList: [],
				currentNo: 0,
				updateAgreeCountUrl: config.reUrl + "/FuStar/UpdateAgreeCount",
				updateBrowseCountUrl: config.reUrl + "/FuStar/UpdateBrowseCount",
				blank: " ",
				isZoomIn: false
			}
		},

		onLoad(e) {
			// console.log("e:", e); 
			this.currentNo = e.qno;
			this.getCurrentQuestion();
			this.detailList.browseCount += 1;
			// console.log(changeBrowseCount);
			this.updateBrowseCount(this.detailList.browseCount, this.currentNo);
			this.getCommentList(this.currentNo);
		},


		onShow() {
			console.log("onShow()----this.currentNo:", this.currentNo);
			this.getCurrentQuestion();
			this.getCommentList(this.currentNo);
		},

		// 下拉刷新
		onPullDownRefresh() {
			// console.log('refresh');
			// console.log("onPullDownRefresh()----this.currentNo:", this.currentNo);
			this.getCurrentQuestion();
			uni.showNavigationBarLoading();
			this.getCommentList(this.currentNo);
		},

		methods: {

			previewImg(url) {
				this.isZoomIn = !this.isZoomIn;
			},


			// 获取评论详情
			getCommentList(currentNo) {
				let that = this;
				// console.log("getCommentList(currentNo):",currentNo);
				uni.request({
					url: config.reUrl + '/FuStar/QueryComments',
					data: {
						qcno: currentNo
					},
					success: (res) => {
						that.commentList = res.data;
						// if(that.commentList!=null){
						// 	that.commentList = that.commentList.reverse();
						// }
						uni.stopPullDownRefresh();
						uni.hideNavigationBarLoading();
					}
				});
			},

			// 点赞
			changeAgreeCount(e) {
				// console.log("e:", e);
				var cno = this.commentList[e].cno;
				this.commentList[e].agreeCount += 1;
				var updateAgreeCount = this.commentList[e].agreeCount;
				this.updateAgreeCount(updateAgreeCount, cno);

			},

			// 跳转到评论界面
			addComment() {
				var addCommentUrl = "../comment/index?qno=" + this.currentNo;
				uni.navigateTo({
					url: addCommentUrl
				});
			},

			// 更新点赞数
			updateAgreeCount(count, cno) {
				var requestAgreeUrl = this.updateAgreeCountUrl + "?agreeCount=" + count + "&cno=" + cno;
				uni.request({
					url: this.updateAgreeCountUrl,
					data: {
						agreeCount: count,
						cno: cno
					},
					success: (res) => {
						console.log("updateAgreeCount:", res.data);
						if (res.data) {
							uni.showToast({
								title: '已点赞~~'
							});
						} else {
							uni.showModal({
								title: '提示',
								content: '再点一次试试？',
								showCancel: false,
								confirmText: "确定"
							});
						}
					},
					fail: (res) => {
						console.log("updateAgreeCount:", res.data);
						uni.showModal({
							title: '提示',
							content: '再点一次试试？',
							showCancel: false,
							confirmText: "确定"
						});
					}
				});
			},

			// 获取当前问题的数组
			getCurrentQuestion() {
				var questionInfo = getApp().globalData.questionInfo;
				if (questionInfo != null) {
					for (var i = 0; i < questionInfo.length; i++) {
						if (questionInfo[i].qno == this.currentNo) {
							this.detailList = questionInfo[i];
						}
					}
				}
				// console.log("this.detailList:",this.detailList);
			},

			// 更新浏览量
			updateBrowseCount(count, qno) {
				var requestBrowseUrl = this.updateBrowseCountUrl + "?browseCount=" + count + "&qno=" + qno;
				// console.log("requestBrowseUrl:", requestBrowseUrl);
				uni.request({
					url: this.updateBrowseCountUrl,
					data: {
						browseCount: count,
						qno: qno
					},
					success: (res) => {
						console.log("updateBrowseCount:", res.data);
					},
					fail: (res) => {
						console.log("updateBrowseCount:", res.data);
					}
				});
			}

		}
	}
</script>

<style scoped>
	.detail-top {
		padding: 20upx;
		border-bottom: 20upx solid #f7f6f6;
	}

	.top-title {
		font-size: 40upx;
		font-weight: bold;
	}

	.top-info {
		margin-top: 30upx;
		font-size: 30upx;
		color: #3B4144;
	}

	.top-img {
		margin-top: 10upx;
	}

	/* .top-img image {
		width: 240upx;
		height: 180upx;
		border-radius: 20upx;
	} */
	.zoom-in {
		width: 100%;
		/* height: 360upx; */
	}

	.zoom-out {
		width: 320upx;
		/* height: 180upx; */
	}

	.top-footer {
		margin-top: 30upx;
		font-size: 30upx;
		color: #686868;

	}

	.top-footer text {
		margin-right: 40upx;
	}

	.topic-type {
		font-size: 30upx;
		background-color: #f7f6f6;
		color: #686868;
		padding: 5upx 20upx;
		margin-left: 20upx;
		font-weight: normal;
		border-radius: 10upx;
	}

	.container-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30upx 20upx;
		font-weight: bold;
		border-bottom: 5upx solid #f7f6f6;
	}

	.container-top button {
		background-color: #ffffff;
		/* height: 60upx; */
		width: 180upx;
		font-size: 30upx;
		font-weight: bold;
		color: #9e9e9e;
		border: 1upx solid #ffffff;
	}

	.comment-button {
		display: flex;
		align-items: center;
	}

	.comment-list {
		padding: 20upx;
		border-bottom: 10upx solid #f7f6f6;
	}

	.user-info {
		display: flex;
		align-items: center;
	}

	.user-img image {
		width: 50upx;
		height: 50upx;
		border-radius: 50%;
	}

	.user-name {
		margin-left: 10upx;
		color: #686868;
		font-size: 28upx;
	}

	.comment-content {
		margin-top: 20upx;
		font-size: 30upx;
		color: #4f4f4f;
	}

	.comment-footer {
		margin-top: 20upx;
		color: #686868;
		font-size: 28upx;
		display: flex;
		justify-content: space-between;
	}

	.comment-footer button {
		background-color: #ffffff;
		height: 50upx;
		width: 100upx;
		/* font-size: 20upx; */
		font-weight: bold;
		color: #9e9e9e;
		border: 1upx solid #ffffff;
	}

	.no-comment image {
		width: 100%;
	}
</style>
