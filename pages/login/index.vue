<template>
	<view class="content">
		<view class="logodiv">
			<view class="logo">
				<image class="imglogo" src="../../static/images/dogclaw.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="form"> 
			<view class="form-div">
				<input class="form-input" type="text" v-model="username" placeholder="请输入用户名" />
			</view>
			<view class="form-div">
				<input class="form-input" type="password" v-model="password" placeholder="请输入密码" />
			</view>
			<view class="loginBtn" hover-class="loginBtnhover" @click="loginrequest">
				<text class="btnvalue">登录</text>
			</view>
			<view class="registBtn">
				<text class="regist" @click="gotoregist">注册用户</text>
			</view>
			<view class="agreement">
				<checkbox-group @change="agreementBtn">
					<checkbox value="cb" style="transform:scale(0.6)" />
					<text>阅读并同意协议</text>
					<text @click="toAgreement" style="color: #00c7c7;margin-left: 10upx;">{{agreement}}</text>
				</checkbox-group>
			</view>
			<!-- <view class="tips">该小程序为测试版本，不作为商业用途</view> -->
			<!-- <view class="tips">开发者有权对用户的信息进行修改</view> --> 
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
				flag:false,
				agreement:'<<服务协议>>'
			}
		},
		methods: {
			
			toAgreement(){
				uni.navigateTo({
					url:'agreement'
				})
			},
			
			
			agreementBtn(e){
				var temp = e.detail.value;
				if(temp.length != 0){
					this.flag = true;
					console.log("flag:",this.flag)
				}
				else{
					this.flag = false
					console.log("flag:",this.flag)
				}
				
			},
			
			gotoregist() {
				uni.navigateTo({
					url: "./regist"
				})
			},
			loginrequest() {
				var that = this;

				if (this.username == '' || this.password == '') {
					uni.showModal({
						title: '提示',
						content: '请输入用户名或密码',
						showCancel: false,
						confirmText: "确定"
					});
				} 
				else if (!this.flag) {
					uni.showModal({
						title: '提示',
						content: '请阅读并同意以下协议',
						showCancel: false,
						confirmText: "确定"
					});
				}
				else {
					uni.request({
						url: config.reUrl + '/FuStar/LoginVerify',
						data: {
							uname: this.username,
							upwd: this.password,
						},
						success: (res) => {
							console.log("LoginVerify", res.data);
							// console.log("typeof :" , typeof res.data);
							if (res.data) {
								getApp().globalData.userName = that.username;
								var allUsers = getApp().globalData.allUsers;
								for (var i = 0; i < allUsers.length; i++) {
									if (allUsers[i].uname == that.username) {
										getApp().globalData.userIconImg = allUsers[i].uicon;
									}
								}
								uni.showToast({
									title: '登入成功'
								});
								uni.switchTab({
									url: '../nearby/index'
								})

							} else {
								uni.showModal({
									title: '提示',
									content: '用户名或密码错误，请重新输入',
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
		width: 250upx;
		/* height: 200upx; */
		/* overflow: hidden; */
	}

	.logo .imglogo {
		width: 100%;
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

	.loginBtn {
		width: 50%;
		height: 60upx;
		background: #007cb1;
		border-radius: 50upx;
		margin-top: 50upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loginBtn .btnvalue {
		color: white;
	}

	.registBtn {
		text-align: center;
		color: #007cb1;
		font-size: 25upx;
		margin-top: 20upx;
	}

	.loginBtnhover {
		background: #3e3e5d;
	}
	
	.agreement{
		margin-top: 20upx;
		color: #b6b6b6;
		font-size: small;
	}
	.tips{
		color: #b6b6b6;
		font-size: small;
	}
</style>
