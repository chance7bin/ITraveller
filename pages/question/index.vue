<template>
	<view>
		<uni-drawer :visible="drawerVisible" @close="closeDrawer">
			<view style="padding:40upx;" class="drawer-info">
				<view class="drawer-info-top">
					<image :src="userIconImg"></image>
					<text>{{userName}}</text>
				</view>
				<button @click="logOut">登出</button>
			</view>
		</uni-drawer> 

		<prompt ref="prompt" @onConfirm="onConfirm" @onCancel="onCancel" title="用户名" :isHidden="ishidden"></prompt>

		<view class="ask-question">
			<view class="user-img" @click="updateInfo">
				<image :src="userIconImg"></image>
				<!-- <image src="/static/images/tempFileImg/pyy.png"></image> -->
				<!-- <image src="http://store/wxbe9e98bda9215e59.o6zAJs6kNvrvY3D7jier3Mc9am1I.ZlKmdJnaZz7Ebb4249094fe0e318446aef9fea23c412.png"></image> -->
			</view>
			<navigator url="quiz" class="input">
				<text>分享新鲜事...</text>
			</navigator>
		</view>
		
		<view class="noTopic" v-if="quizList.length == 0">
			<image src="../../static/images/noTopicTip.png"></image>
			<view style="text-align: center;">还没有话题哦，快去发表一个吧~</view>
		</view>
		
		<view class="quiz-container" v-if="quizList.length != 0">
			<navigator v-for="(item,index) in quizList" :url="'../../pages/detail/index?qno=' + item.qno" :key="index">
				<view class="quiz">
					<view class="user-info">
						<view class="user-info-img">
							<!-- <image src="/static/images/face.jpg"></image> -->
							<image :src="userIconImg"></image> 
						</view>
						<view class="user-info-detail">
							<view class="user-info-name">
								<text>{{userName}}</text>
							</view>
							<view class="user-info-date">
								<text>{{item.quizDate}}</text>
							</view>
						</view>
					</view>
					<view class="quiz-type">
						<text>#{{item.quizType}}#</text>
					</view>
					<view class="quiz-text">
						<text>{{item.quizTitle}}</text>
					</view>
					<view class="quiz-img" v-if="item.quizImg != ''">
						<image :src="item.quizImg" mode="widthFix"></image>
					</view>
					<view class="quiz-footer">
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
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import prompt from '../../components/prompt.vue';
	import config from "config/config.js";

	export default {
		data() {
			return {
				userName: '',
				userIconImg: '',
				quizList: [],
				blank: " ",
				drawerVisible: false,
				ishidden: true,
				allUsers: [],
			}
		},
		components: {
			uniDrawer,
			prompt
		},

		onLoad() {
			let that = this;
		},
		onShow() {
			this.getData();
			this.allUsers = getApp().globalData.allUsers;
		},

		// 下拉刷新
		onPullDownRefresh() {
			// console.log('refresh');
			uni.showNavigationBarLoading();
			this.getData();
		},

		methods: {

			updateInfo() {
				this.drawerVisible = true;
			},

			closeDrawer() {
				this.drawerVisible = false
			},

			modifyIcon() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						console.log("chooseImage---res:", res);
						console.log("chooseImage:", res.tempFilePaths[0]);
						that.userIconImg = res.tempFilePaths[0];
					}
				});
			},

			modifyName() {
				this.ishidden = false;
			},

			logOut() {
				uni.reLaunch({
					url: '../login/index'
				})
			},

			//提示框
			prompt: function() {
				this.$refs.prompt.show();
			},
			onConfirm: function(e) {
				console.log(e);
				let _cost = e;
				var nameRE = /^[\u4e00-\u9fa5_A-Za-z0-9]{3,8}$/;
				var norepeat = true;
				var nameFlag = nameRE.test(_cost);
				for (var i = 0; i < this.allUsers.length; i++) {
					if (_cost == this.allUsers[i].uname) {
						norepeat = false;
						break;
					}
				}
				if (_cost == '') {
					uni.showModal({
						title: '提示',
						content: '您还未输入',
						showCancel: false,
						confirmText: "确定"
					});
				} else if (!nameFlag) {
					uni.showModal({
						title: '提示',
						content: '用户名不符合规范',
						showCancel: false,
						confirmText: "确定"
					});
				} else if (!norepeat) {
					uni.showModal({
						title: '提示',
						content: '用户名重复，请重新输入',
						showCancel: false,
						confirmText: "确定"
					});
				} else {
					// this.$refs.prompt.hide();
					this.ishidden = true;
					uni.showModal({
						title: '提示',
						content: '你输入的是:' + _cost,
						showCancel: false,
						confirmText: "确定"
					});
					this.userName = _cost;
				}
			},
			onCancel: function() {
				// this.$refs.prompt.hide();
				this.ishidden = true;
				this.$refs.prompt.cost = '';
			},


			getData() {
				this.userName = getApp().globalData.userName;
				this.userIconImg = getApp().globalData.userIconImg;
				let that = this;
				uni.request({
					url: config.reUrl + '/FuStar/QueryAllQuestion',
					data: {

					},
					success: (res) => {
						// console.log("QueryAllQuestion:", res.data);
						getApp().globalData.questionInfo = res.data;
						// console.log("addQuestion -- global -- questionInfo:", getApp().globalData.questionInfo);
						that.quizList = [];
						if (res.data != null) {
							for (let i = 0; i < res.data.length; i++) {
								if (res.data[i].quizUserName == that.userName) {
									that.quizList.push(res.data[i]);
								}
							}
						}
						// that.quizList.reverse();
						uni.stopPullDownRefresh();
						uni.hideNavigationBarLoading()
					}
				});
			}
		}

	}
</script>

<style scoped>
	.noTopic {
		margin-top: 50upx;
		color: #999999;
		font-size: 36upx;
		/* text-align: center; */
	}
	
	.drawer-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between; 
		height: 80%;   
	}

	.drawer-info-top {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.drawer-info image {
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
	}

	.drawer-info text {
		color: #1584ff;
		font-size: 40upx;
		font-weight: bold;
		margin-top: 30upx;
	}

	.drawer-info button {
		width: 150upx;
		height: 60upx;
		line-height: 60upx;
		background-color: #00aaff;
		color: white;

	}

	.ask-question {
		height: 100upx;
		padding: 30upx;
		/* background-color: #007AFF; */
		display: flex;
		align-items: center;
		border-bottom: 20upx solid #f6f7fa;
	}

	.user-img {
		flex: 1;
	}

	.user-img image {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}

	.input {
		display: flex;
		background-color: #f6f7fa;
		flex: 5;
		height: 75%;
		border-radius: 40upx;
		align-items: center;
		padding-left: 40upx;
		color: grey;
		font-size: 28upx;
	}

	.quiz {
		padding: 30upx;
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
		color: #1584ff;
		font-weight: bold;
	}

	.user-info-date {
		font-size: 26upx;
		color: #686868;
	}

	.quiz-type {
		margin-top: 10upx;
		color: #007AFF;
	}

	.quiz-text {
		margin-top: 10upx;
		font-weight: bold;
		font-size: 36upx;
	}

	.quiz-img {
		margin-top: 10upx;
	}

	.quiz-img image {
		width: 240upx;
		/* height: 180upx; */
		border-radius: 20upx;
	}

	.quiz-footer {
		margin-top: 10upx;
		font-size: 30upx;
		color: #9e9e9e;
	}

	.quiz-footer text {
		margin-right: 40upx;
	}
</style>
