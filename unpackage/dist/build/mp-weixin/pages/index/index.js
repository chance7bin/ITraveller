(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0852":function(n,t,e){"use strict";e.r(t);var o=e("4c02"),i=e("d9da");for(var u in i)"default"!==u&&function(n){e.d(t,n,function(){return i[n]})}(u);e("9276");var r,s=e("f0c5"),c=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,"ee2a024a",null,!1,o["a"],r);t["default"]=c.exports},"4c02":function(n,t,e){"use strict";var o,i=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"b",function(){return i}),e.d(t,"c",function(){return u}),e.d(t,"a",function(){return o})},"4d7a":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(e("f28b"));function i(n){return n&&n.__esModule?n:{default:n}}var u=function(){return e.e("node-modules/@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control").then(e.bind(null,"b73c"))},r=function(){return e.e("components/topicComponent").then(e.bind(null,"e664"))},s=function(){return e.e("components/recommendComponent").then(e.bind(null,"dc69"))},c=function(){return e.e("components/hotSearch").then(e.bind(null,"a6a7"))},a={components:{uniSegmentedControl:u,topicComponent:r,recommendComponent:s,hotSearch:c},data:function(){return{items:["推荐","话题"],current:0,questionInfo:[],allComments:[],recommendLists:[]}},onLoad:function(){this.questionInfo=getApp().globalData.questionInfo},onShow:function(){console.log("index onShow"),this.questionInfo=getApp().globalData.questionInfo,this.initRecommendLists()},methods:{onClickItem:function(n){this.current!==n.currentIndex&&(this.current=n.currentIndex)},bulidRecommendList:function(){this.recommendLists=[];for(var n=0;n<this.questionInfo.length;n++){for(var t=[],e=0;e<this.allComments.length;e++)if(this.allComments[e].qcno==this.questionInfo[n].qno){t=this.allComments[e];break}var o={qno:this.questionInfo[n].qno,recommendTitle:this.questionInfo[n].quizTitle,userIconSrc:t.commentUserIcon,username:t.commentUserName,recommendContent:t.commentContent,recommendImg:this.questionInfo[n].quizImg,agreeCount:t.agreeCount,commentCount:this.questionInfo[n].commentCount};this.recommendLists.push(o)}},initRecommendLists:function(){var t=this;n.request({url:o.default.reUrl+"/FuStar/QueryAllComments",data:{},success:function(n){t.allComments=n.data,t.bulidRecommendList()}})},getData:function(){var t=this;n.request({url:o.default.reUrl+"/FuStar/QueryAllQuestion",data:{},success:function(e){getApp().globalData.questionInfo=e.data,t.questionInfo=getApp().globalData.questionInfo,t.initRecommendLists(),n.stopPullDownRefresh(),n.hideNavigationBarLoading()}})}},onPullDownRefresh:function(){n.showNavigationBarLoading(),this.getData()}};t.default=a}).call(this,e("543d")["default"])},9276:function(n,t,e){"use strict";var o=e("c301"),i=e.n(o);i.a},c301:function(n,t,e){},d9da:function(n,t,e){"use strict";e.r(t);var o=e("4d7a"),i=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,function(){return o[n]})}(u);t["default"]=i.a},e287:function(n,t,e){"use strict";(function(n){e("5df2"),e("921b");o(e("66fd"));var t=o(e("0852"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])}},[["e287","common/runtime","common/vendor"]]]);