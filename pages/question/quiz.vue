<template>
	<view class="container">
		<form @submit="formSubmit" @reset="formReset">
			<view class="">
				<view class="input-title">
					<input name="inputTitle" placeholder="来给分享的内容起个名字吧~~~" placeholder-style="font-size: 40upx;font-weight: bold;"
					 maxlength="30" focus="true" />
				</view>
				<view class="input-content">
					<textarea auto-height maxlength="-1" placeholder="分享新鲜事..." name="inputContent" />
					</view>
				<view class="choose-img"  @click="chooseImg" v-if="addImg===''">
					<view class="img-icon">
						<uni-icons type="image" size="60" color="#989eb4"></uni-icons>
					</view>
					<view class="img-text">
						<text>照片</text>
					</view>
				</view>
				<view class="add-img" v-if="addImg!==''">
					<image :src="addImg" mode="aspectFit"></image>
				</view>
				<view class="choose-topic">
					<picker @change="bindPickerChange" :value="index" :range="topicArray" name="topic">
						<view class="picker-content">
							<view class="picker-text"><text>+话题 (默认为景点)</text></view>
							<view class="uni-input picker-input" v-show="showRadio">{{topicArray[index]}}</view>
						</view>
					</picker>
				</view>
            </view>
            <view class="button">
                <view class="reset">
					<button type="primary" plain="true" form-type="reset" size="mini">清空</button>
				</view>
				<view>
					<button type="primary" plain="true" form-type="submit" size="mini">发布</button>
				</view>
            </view>
        </form>
    </view>
</template>
<script>
	import {uniIcons,uniPopup} from "@dcloudio/uni-ui";
	import config from "config/config.js";
	
    export default {
        data() {
            return {
				current: 0,
				showRadio: false,
				title: 'picker',
				topicArray: ['景点', '美食', '路线', '住宿','手信','其他'],
				index: 0,
				addImg:'',
				newQuizList:[],
				currentDate:'',
				addQuestionUrl:config.reUrl + "/FuStar/AddQuestion",
				isSuccess:false
            }
        },
		components:{
			uniIcons,
			uniPopup
		},
		onShow() { 
			let that = this;
			var month=new Date().getMonth() + 1;
			var day=new Date().getDate();
			if(month < 10){
				month = "0" + month;
			}
			if(day < 10){
				day = "0" + day;
			}
			this.currentDate = month + "-" + day;
			console.log("currentDate:",this.currentDate);
		},
        methods: {
			 bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value;
				this.showRadio = true;
			},
			chooseImg(){
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
								this.addImg = config.reUrl + '/uploadFile' + uploadFileRes.data
				            }
				        });   
				    }
				});
			},
			formSubmit: function(e) {
				// console.log("e:",e);
                // console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                // var formdata = e.detail.value;
				var quizUserName = getApp().globalData.userName;
				var quizUserIcon = getApp().globalData.userIconImg;
				var quizDate = this.currentDate;
				var quizType = this.topicArray[e.detail.value.topic];
				var quizTitle = e.detail.value.inputTitle;
				var quizDescription = e.detail.value.inputContent;
				console.log("quizType:",quizType);
				console.log("quizTitle:",quizTitle);
				console.log("quizDescription:",quizDescription);
				var quizImg = this.addImg;
				var browseCount = 0;
				var commentCount = 0;
				var requestUrl = this.addQuestionUrl + "?quizUserName=" + quizUserName + "&quizUserIcon=" + quizUserIcon + "&quizDate=" + quizDate + "&quizType=" + quizType + "&quizTitle=" + quizTitle + "&quizDescription=" + quizDescription + "&quizImg=" + quizImg + "&browseCount=" + browseCount + "&commentCount=" + commentCount;
				// console.log("addQuestionUrl:",requestUrl);
				if (quizTitle == '') {
					uni.showModal({
						title: '提示',
						content: '请将发布的内容补充完整...',
						showCancel: false,
						confirmText: "确定"
					});
				} else if (!this.isSuccess) {
					uni.request({
					    url: this.addQuestionUrl, 
					    data: {
					        quizUserName: quizUserName,
							quizUserIcon: quizUserIcon,
							quizDate: quizDate,
							quizType: quizType,
							quizTitle: quizTitle,
							quizDescription: quizDescription,
							quizImg: quizImg,
							browseCount: browseCount,
							commentCount: commentCount
					    },
					    success: (res) => {
							this.isSuccess = true;
					        console.log("addQuestion",res.data);
							if (res.data) {
								uni.showToast({
								    title: '发布成功啦~'
								});
								uni.navigateBack();
							} else{
								this.isSuccess = false;
								uni.showModal({
									title: '提示',
									content: '好像失败了~',
									showCancel: false,
									confirmText: "确定"
								});
							} 
					    },
						fail: (res) => {
							this.isSuccess = false;
							uni.showModal({
								title: '提示',
								content: '好像失败了~',
								showCancel: false,
								confirmText: "确定"
							});
						}
					});
				}
            },
            formReset: function(e) {
                console.log('清空数据')
            }
        }
    }
</script>

<style scoped>
	.container{
		padding: 30upx;
	}
    .input-title{
		display: flex;
		align-items: center;
		height: 80upx;
		/* background-color: #0081FF; */
		font-size: 40upx;
		font-weight: bold;
	}
	.input-content{
		padding-top: 20upx;
		
	}
	.choose-img{
		margin-top: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 220upx;
		width: 220upx;
		background-color: #f4f5f9;
	}
	.button{
		margin-top: 50upx;
		display: flex;
		justify-content: flex-end;
	}
	.button button{
		color: #1584FF;
		border: 1upx solid #1584FF;
	}
	.reset{
		margin-right: 50upx;
	}
	.img-text{
		color: #989eb4;
		font-size: 26upx;
		font-weight: bold;
	}
	.choose-topic{
		margin-top: 20upx;
	}
	.picker-content{
		display: flex;
		align-items: center;
		/* background-color: #09BB07; */
		height: 70upx;
	}
	.picker-text{
		color: #1584ff;
	}
	.picker-input{
		margin-left: 20upx;
		width: 100upx;
		background-color: #ebf5ff;
		color: #1584ff;
		text-align: center;
		border-radius: 20upx;
	}
	.add-img{
		margin-top: 30upx;
		height: 250upx;
		width: 250upx;
		/* background-color: #f4f5f9; */
	}
	.add-img image{
		height: 250upx;
		width: 250upx;
	}
</style>
