<template>
	<view class="content">
		<view class="logodiv">
			<view class="logo" @click="changeIcon">
				<image class="imglogo" :src="userIconImg"></image>
				<view style="padding-top: 5upx;">点此修改头像</view>
			</view>
		</view>
		<view class="form">
			<view class="form-div">
				<input class="form-input" type="text" v-model="username" placeholder="请输入用户名(3-8位字符)" />
			</view>
			<view class="form-div">
				<input class="form-input" type="password" v-model="password" placeholder="请输入密码(6-8位数字)" />
			</view>
			<view class="form-div">
				<input class="form-input" type="password" v-model="passwordup" placeholder="请再次输入密码" />
			</view>
			<view class="registBtn" hover-class="registBtnhover" @click="loginrequest">
				<text class="btnvalue">注册</text>
			</view>
			<view class="loginBtn">
				<navigator url="./index" class="login" open-type="redirect">返回登陆</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "config/config.js";

	export default {
		data() {
			return {
				username: '',
				password: '',
				passwordup: '',
				allUsers: [],
				userIconImg: '/static/images/dog.jpeg'
			}
		},

		onLoad() {
			console.log("regist  onload");
			this.allUsers = getApp().globalData.allUsers;
			this.userIconImg = getApp().globalData.userIconImg;
		},

		onShow() {

		},

		methods: {

			changeIcon(){ 
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: config.reUrl + '/FuStar/RequestImgPath',
				            filePath: tempFilePaths[0],
				            name: 'file',
				            success: (uploadFileRes) => {
				                console.log(uploadFileRes.data);
								this.userIconImg = config.reUrl + '/uploadFile' + uploadFileRes.data;
								getApp().globalData.userIconImg = config.reUrl + '/uploadFile' + uploadFileRes.data;
							}
				        });
				    }
				});
			},

			loginrequest() {
				var nameRE = /^[\u4e00-\u9fa5_A-Za-z0-9]{3,8}$/;
				var pwdRE = /^[0-9]{6,8}$/;
				var nameFlag = nameRE.test(this.username);
				var pwdFlag = pwdRE.test(this.password);
				var norepeat = true;
				for (var i = 0; i < this.allUsers.length; i++) {
					if (this.username == this.allUsers[i].uname) {
						norepeat = false;
						break;
					}
				}
				if (this.username == '') {
					uni.showModal({
						title: '提示',
						content: '请输入用户名',
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
				} else if (this.password == '' || this.passwordup == '') {
					uni.showModal({
						title: '提示',
						content: '请输入密码',
						showCancel: false,
						confirmText: "确定"
					});
				} else if (this.password !== this.passwordup) {
					uni.showModal({
						title: '提示',
						content: '两次输入的密码不一致',
						showCancel: false,
						confirmText: "确定"
					});
				} else if (!pwdFlag) {
					uni.showModal({
						title: '提示',
						content: '密码不符合规范',
						showCancel: false,
						confirmText: "确定"
					});
				} else {
					console.log("success");
					uni.request({
						url: config.reUrl + '/FuStar/AddNewUser',
						data: {
							uname: this.username,
							upwd: this.password,
							uicon: getApp().globalData.userIconImg
						},
						success: (res) => {
							console.log("AddNewUser:", res.data);
							// console.log("typeof :" , typeof res.data);
							if (res.data) {
								uni.redirectTo({
									url: 'index'
								});
								uni.showToast({
									title: '注册成功'
								});
							} else {
								uni.showModal({
									title: '提示',
									content: '注册失败，请重新注册',
									showCancel: false,
									confirmText: "确定"
								});
							}
						}
					});
				}

			}
		}
	}
</script>

<style scoped>
	.content {
		background: #3F536E;
		width: 100vw;
		height: 100vh;
	}

	.logodiv {
		width: 100vw;
		height: 30vh;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.logo {
		width: 200upx;
		height: 200upx;
		/* overflow: hidden; */
		color: #b6b6b6;
		font-size: small;
		text-align: center;

	}

	.logo .imglogo {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.form {
		padding: 0 100upx;
		margin-top: 50upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.form-div {
		width: 80%;
		height: 60upx;
		background: white;
		border-radius: 50upx;
		box-sizing: border-box;
		padding: 0 20upx;
		margin-top: 30upx;
	}

	.form-div .form-input {
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 25upx;
	}

	.registBtn {
		width: 50%;
		height: 60upx;
		background: #007cb1;
		border-radius: 50upx;
		margin-top: 50upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.registBtn .btnvalue {
		color: white;
	}

	.loginBtn {
		text-align: center;
		color: #007cb1;
		font-size: 25upx;
		margin-top: 20upx;
	}

	.registBtnhover {
		position: relative;
		top: 3rpx;
		left: 3rpx;
		box-shadow: 0px 0px 8px rgba(0, 0, 0, .1) inset;
	}
</style>
