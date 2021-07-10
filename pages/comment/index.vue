<template>
	<view class="container">
		<view class="comment-top">
			<text>{{detailList.quizTitle}}</text>
		</view>
		<view class="comment-detail">
			<textarea @input="inputListener" maxlength="-1" auto-height placeholder="快来发表你的看法呀~" v-model="commentContent" focus="true" />
			</view>
		<view class="submit-comment">
			<button type="primary" plain="true" size="mini" @click="submitComment">发表</button>
		</view>
	</view>
</template>

<script>
	import config from "config/config.js";
	
	export default{
		data(){
			return{
				detailList:[],
				currentNo:0,
				currentCommentCount:0,
				commentContent:'',
				addCommentUrl:config.reUrl + "/FuStar/AddComment",
				updateCommentCountUrl:config.reUrl + "/FuStar/UpdateCommentCount",
				isSuccess:false
			}
		},
		
		onLoad(e) {
			// console.log("e:", e);
			this.currentNo = e.qno;
			this.getCurrentQuestion();
			// console.log("detailList:",this.detailList);
		},
		
		onHide() {
			this.updateGlobalDataQuestionInfo()
		},
		
		methods:{
			inputListener(e){
				// console.log(e);
			},
			
			submitComment(){
				let that = this;
				// console.log("commentContent:",this.commentContent);
				var qcno = this.currentNo;
				var commentUserName = getApp().globalData.userName;
				var commentUserIcon = getApp().globalData.userIconImg;
				var commentContent = this.commentContent;
				var agreeCount = 0;
				var month=new Date().getMonth() + 1;
				var day=new Date().getDate();
				if(month < 10){
					month = "0" + month;
				}
				if(day < 10){
					day = "0" + day;
				}
				var commentDate = month + "-" + day;
				var addRequestUrl = this.addCommentUrl + "?qcno=" + qcno + "&commentUserName=" + commentUserName + "&commentUserIcon=" + commentUserIcon + "&commentContent=" + commentContent + "&agreeCount=" + agreeCount + "&commentDate=" + commentDate;
				// console.log("addRequestUrl:",addRequestUrl);  
				if (commentContent == '') {
					uni.showModal({
						title: '提示',
						content: '请输入内容...',
						showCancel: false,
						confirmText: "确定"
					});
				} else if (!this.isSuccess) {
					this.isSuccess = true;
					uni.request({
					    url: this.addCommentUrl, 
					    data: {
					        qcno: qcno,
							commentUserName: commentUserName,
							commentUserIcon: commentUserIcon,
							commentContent: commentContent,
							agreeCount: agreeCount,
							commentDate: commentDate
					    },
					    success: (res) => {
					        console.log("submitComment:",res.data);
							if (res.data) {
								that.detailList.commentCount += 1;
								that.updateCommentCount(that.detailList.commentCount,that.currentNo);
								// that.updateGlobalDataQuestionInfo();
								uni.navigateBack();
								uni.showToast({
								    title: '评论成功啦~'
								});
							} else{
								this.isSuccess = false;
								uni.showModal({
									title: '提示',
									content: '好像评论失败啦 o(╥﹏╥)o',
									showCancel: false,
									confirmText: "确定"
								});
							}
					    },
						fail: (res) => {
							this.isSuccess = false;
							uni.showModal({
								title: '提示',
								content: '好像评论失败啦 o(╥﹏╥)o',
								showCancel: false,
								confirmText: "确定"
							});
						}
					});
				}
			},
			
			// 更新评论数
			updateCommentCount(count,qno){
				var updateRequestUrl = this.updateCommentCountUrl + "?commentCount=" + count + "&qno=" + qno;
				uni.request({
				    url: this.updateCommentCountUrl, 
				    data: {
						commentCount:count,
						qno:qno
				    },
				    success: (res) => {
				        console.log("updateCommentCount:",res.data);
				    }
				});
			},
			
			// 更新globalData中的questionInfo
			updateGlobalDataQuestionInfo(){
				console.log("updateGlobalDataQuestionInfo----")
				uni.request({
				    url: config.reUrl + '/FuStar/QueryAllQuestion', 
				    data: {
				        
				    },
				    success: (res) => {
						// console.log("updateGlobalDataQuestionInfo:",res,data)
						getApp().globalData.questionInfo = res.data;
						// console.log("addQuestion -- global -- questionInfo:",getApp().globalData.questionInfo);
				    }  
				});
			},
			
			// 获取当前问题的数组
			getCurrentQuestion(){
				var questionInfo = getApp().globalData.questionInfo;
				if(questionInfo!=null){
					for (var i = 0; i < questionInfo.length; i++) {
						if (questionInfo[i].qno == this.currentNo) {
							this.detailList = questionInfo[i];
						}
					}
				}
				
			}
			
			
		}
		
	}
</script>

<style scoped>
	.container{
		
	}
	.comment-top{
		padding: 30upx;
		font-size: 40upx;
		font-weight: bold;
		border-bottom: 20upx solid #f7f6f6;
		
	}
	.comment-detail{
		padding: 30upx;
	}
	.submit-comment button{
		text-align: center;
		margin-top: 50upx;
		width: 150upx;
		font-size: 30upx;
		display: flex;
		justify-content: flex-end;
		color: #1584FF;
		border: 1upx solid #1584FF;
	}
</style>
