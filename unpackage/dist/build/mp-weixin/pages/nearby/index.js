(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/nearby/index"],{"2e11":function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"b",function(){return a}),i.d(e,"c",function(){return s}),i.d(e,"a",function(){return n})},4785:function(t,e,i){"use strict";(function(t){i("5df2"),i("921b");n(i("66fd"));var e=n(i("49c5"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},"49c5":function(t,e,i){"use strict";i.r(e);var n=i("2e11"),a=i("be5d");for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);i("e891");var o,r=i("f0c5"),d=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"deddaff8",null,!1,n["a"],o);e["default"]=d.exports},"4d27":function(t,e,i){},"5a09":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(i("a49d")),a=s(i("5360"));function s(t){return t&&t.__esModule?t:{default:t}}var o,r=function(){return i.e("components/prompt").then(i.bind(null,"7006"))},d={components:{prompt:r},data:function(){return{markers:[],scale:16,thisPoint:"",address:"",longitude:"118.108245",latitude:"24.486208",ishidden:!0,optionsPage:!0,vehiclePage:!1,desLon:"",desLat:"",currentCity:"",circlelist:[{keyword:"美食",src:"food.png"},{keyword:"公交站",src:"bus.png"},{keyword:"景点",src:"scenery.png"},{keyword:"厕所",src:"toilet.png"}],vehicleList:[{vehicle:"驾车",keyword:"driving"},{vehicle:"公交",keyword:"transit"},{vehicle:"步行",keyword:"walking"},{vehicle:"骑行",keyword:"bicycling"}]}},onLoad:function(){console.log("nearby onLoad~~"),o=new n.default({key:"L3LBZ-OQGE3-F3632-Y6Y3Z-2X7NS-CUBKT"}),new a.default.AMapWX({key:"f5c3e783de04e25d5c223439afac9d3e"}),this.latitude=getApp().globalData.currentLat,this.longitude=getApp().globalData.currentLng,this.currentCity=getApp().globalData.currentCity},onShow:function(){},methods:{nearby_search:function(t){var e=this;o.search({keyword:t,location:this.latitude+","+this.longitude,page_size:20,success:function(t){for(var i=[],n=0;n<t.data.length;n++)i.push({title:t.data[n].title,address:t.data[n].address,id:t.data[n].id,latitude:t.data[n].location.lat,longitude:t.data[n].location.lng,iconPath:"../../static/images/location.png",width:30,height:30,callout:{content:t.data[n].title,color:"#ffffff",bgColor:"#aa0000",borderRadius:8,padding:8,fontSize:12}});e.markers=i,e.scale=14,console.log("mks:",i)},fail:function(t){console.log(t)},complete:function(t){}})},markerClick:function(t){for(var e=0;e<this.markers.length;e++)if(this.markers[e].iconPath="../../static/images/location.png",this.markers[e].id==t.markerId){this.thisPoint=this.markers[e].title,console.log("this.markers[i]:",this.markers[e]),getApp().globalData.destinationAddress.name=this.markers[e].title,getApp().globalData.originAddress.name="我的位置",getApp().globalData.destinationAddress.address=this.markers[e].address,getApp().globalData.originAddress.address="我的位置";var i=this.markers[e].address.split(this.currentCity);this.address=i[1],this.longitude=this.markers[e].longitude,this.latitude=this.markers[e].latitude,this.markers[e].iconPath="../../static/images/location_active.png",this.desLat=this.markers[e].latitude,this.desLon=this.markers[e].longitude,getApp().globalData.destinationAddress.lat=this.markers[e].latitude,getApp().globalData.destinationAddress.lng=this.markers[e].longitude,this.markers[e].callout.content=this.markers[e].title}this.optionsPage=!1,this.vehiclePage=!0},more:function(){console.log("more"),this.ishidden=!1},prompt:function(){this.$refs.prompt.show()},onConfirm:function(e){console.log(e);var i=e;""!=i?(this.ishidden=!0,t.showModal({title:"提示",content:"你输入的是:"+i,showCancel:!1,confirmText:"确定"}),this.nearby_search(i)):console.log("你还未输入")},onCancel:function(){this.ishidden=!0,this.$refs.prompt.cost=""},returnToOptions:function(){this.optionsPage=!0,this.vehiclePage=!1},showAddress:function(){t.showModal({title:"详细地址",content:this.address,showCancel:!1,confirmText:"确定"})}}};e.default=d}).call(this,i("543d")["default"])},be5d:function(t,e,i){"use strict";i.r(e);var n=i("5a09"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);e["default"]=a.a},e891:function(t,e,i){"use strict";var n=i("4d27"),a=i.n(n);a.a}},[["4785","common/runtime","common/vendor"]]]);