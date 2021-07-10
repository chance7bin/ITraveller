<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<view class="avator">
							<img :src="userIconImg">
						</view>
						<view class="phone-number">{{userName}}</view>
					</view>
					<view class="box-bd">
						<view class="item">
							<view class="icon"><img src="../../static/images/message.png"></view>
							<view class="text">我的动态</view>
						</view>
						<view class="item">
							<view class="icon"><img src="../../static/images/favorite.png"></view>
							<view class="text">修改信息</view>
						</view>
						<view class="item">
							<view class="icon"><img src="../../static/images/service.png"></view>
							<view class="text">联系星星</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userName: '',
				userIconImg: ''
			};
		},
		onShow() {
			console.log("onShow~~~~~");
			this.userName = getApp().globalData.userName;
			this.userIconImg = getApp().globalData.userIconImg;
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f1f1f1;
		font-size: 30upx;
	}

	.header {
		// background: #fff;
		height: 290upx;

		// padding-bottom: 110upx;
		.bg {
			width: 100%;
			height: 200upx;
			padding-top: 100upx;
			background-color: #1584ff;
		}
	}

	.box {
		width: 600upx;
		height: 900upx;
		border-radius: 20upx;
		margin: 0 auto;
		background: #fff;
		box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2);

		.box-hd {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;

			.avator {
				width: 160upx;
				height: 160upx;
				background: #fff;
				border: 5upx solid #fff;
				border-radius: 50%;
				margin-top: -80upx;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.phone-number {
				margin-top: 20upx;
				width: 100%;
				text-align: center;
				font-weight: bold;
				color: #1584ff;
				font-size: 40upx;
			}
		}

		.box-bd {
			display: flex;
			// flex-wrap: nowrap;
			flex-direction: column;
			justify-content: center;
			margin-top: 100upx;

			.item {
				flex: 1 1 auto;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: center;
				border-right: 1px solid #f1f1f1;
				margin: 15upx 0;

				&:last-child {
					border: none;
				}

				.icon {
					width: 60upx;
					height: 60upx;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.text {
					width: 100%;
					text-align: center;
					margin-top: 10upx;
				}
			}
		}
	}
</style>
