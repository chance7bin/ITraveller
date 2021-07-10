(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/topicComponent"],{"528e":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=function(){return e.e("components/topicType").then(e.bind(null,"1fb2"))},c=function(){return e.e("components/allType").then(e.bind(null,"7eb0"))},u={name:"topicComponent",props:{questionInfo:{type:Array}},data:function(){return{currentIndexNav:0,navList:[{text:"全部",id:0},{text:"景点",id:1},{text:"美食",id:2},{text:"路线",id:3},{text:"住宿",id:4},{text:"手信",id:5},{text:"其他",id:6}]}},components:{topicType:r,allType:c},onReady:function(){},methods:{changeTopic:function(t){this.currentIndexNav!==t.currentTarget.id&&(this.currentIndexNav=t.currentTarget.id)}}};n.default=u},"6f6f":function(t,n,e){"use strict";var r=e("c220"),c=e.n(r);c.a},"996d":function(t,n,e){"use strict";e.r(n);var r=e("528e"),c=e.n(r);for(var u in r)"default"!==u&&function(t){e.d(n,t,function(){return r[t]})}(u);n["default"]=c.a},"9c37":function(t,n,e){"use strict";var r,c=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",function(){return c}),e.d(n,"c",function(){return u}),e.d(n,"a",function(){return r})},c220:function(t,n,e){},e664:function(t,n,e){"use strict";e.r(n);var r=e("9c37"),c=e("996d");for(var u in c)"default"!==u&&function(t){e.d(n,t,function(){return c[t]})}(u);e("6f6f");var o,i=e("f0c5"),a=Object(i["a"])(c["default"],r["b"],r["c"],!1,null,"6213ad02",null,!1,r["a"],o);n["default"]=a.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/topicComponent-create-component',
    {
        'components/topicComponent-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e664"))
        })
    },
    [['components/topicComponent-create-component']]
]);
