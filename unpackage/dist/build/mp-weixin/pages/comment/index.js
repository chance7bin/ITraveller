(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/comment/index"],{"086d":function(t,n,e){"use strict";e.r(n);var o=e("222d"),a=e("5410");for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);e("93cf");var c,i=e("f0c5"),s=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,"a022e092",null,!1,o["a"],c);n["default"]=s.exports},"222d":function(t,n,e){"use strict";var o,a=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",function(){return a}),e.d(n,"c",function(){return u}),e.d(n,"a",function(){return o})},"2abd":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(e("f28b"));function a(t){return t&&t.__esModule?t:{default:t}}var u={data:function(){return{detailList:[],currentNo:0,currentCommentCount:0,commentContent:"",addCommentUrl:o.default.reUrl+"/FuStar/AddComment",updateCommentCountUrl:o.default.reUrl+"/FuStar/UpdateCommentCount",isSuccess:!1}},onLoad:function(t){this.currentNo=t.qno,this.getCurrentQuestion()},onHide:function(){this.updateGlobalDataQuestionInfo()},methods:{inputListener:function(t){},submitComment:function(){var n=this,e=this,o=this.currentNo,a=getApp().globalData.userName,u=getApp().globalData.userIconImg,c=this.commentContent,i=0,s=(new Date).getMonth()+1,r=(new Date).getDate();s<10&&(s="0"+s),r<10&&(r="0"+r);var l=s+"-"+r;this.addCommentUrl;""==c?t.showModal({title:"提示",content:"请输入内容...",showCancel:!1,confirmText:"确定"}):this.isSuccess||(this.isSuccess=!0,t.request({url:this.addCommentUrl,data:{qcno:o,commentUserName:a,commentUserIcon:u,commentContent:c,agreeCount:i,commentDate:l},success:function(o){console.log("submitComment:",o.data),o.data?(e.detailList.commentCount+=1,e.updateCommentCount(e.detailList.commentCount,e.currentNo),t.navigateBack(),t.showToast({title:"评论成功啦~"})):(n.isSuccess=!1,t.showModal({title:"提示",content:"好像评论失败啦 o(╥﹏╥)o",showCancel:!1,confirmText:"确定"}))},fail:function(e){n.isSuccess=!1,t.showModal({title:"提示",content:"好像评论失败啦 o(╥﹏╥)o",showCancel:!1,confirmText:"确定"})}}))},updateCommentCount:function(n,e){this.updateCommentCountUrl;t.request({url:this.updateCommentCountUrl,data:{commentCount:n,qno:e},success:function(t){console.log("updateCommentCount:",t.data)}})},updateGlobalDataQuestionInfo:function(){console.log("updateGlobalDataQuestionInfo----"),t.request({url:o.default.reUrl+"/FuStar/QueryAllQuestion",data:{},success:function(t){getApp().globalData.questionInfo=t.data}})},getCurrentQuestion:function(){var t=getApp().globalData.questionInfo;if(null!=t)for(var n=0;n<t.length;n++)t[n].qno==this.currentNo&&(this.detailList=t[n])}}};n.default=u}).call(this,e("543d")["default"])},5410:function(t,n,e){"use strict";e.r(n);var o=e("2abd"),a=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);n["default"]=a.a},"7bab":function(t,n,e){"use strict";(function(t){e("5df2"),e("921b");o(e("66fd"));var n=o(e("086d"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"93cf":function(t,n,e){"use strict";var o=e("c2ac"),a=e.n(o);a.a},c2ac:function(t,n,e){}},[["7bab","common/runtime","common/vendor"]]]);