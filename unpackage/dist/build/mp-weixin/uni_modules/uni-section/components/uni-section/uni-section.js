(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-section/components/uni-section/uni-section"],{"00ea":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){}));var i=function(){var t=this.$createElement;this._self._c},u=[]},"292b":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"UniSection",emits:["click"],props:{type:{type:String,default:""},title:{type:String,required:!0,default:""},titleFontSize:{type:String,default:"14px"},titleColor:{type:String,default:"#333"},subTitle:{type:String,default:""},subTitleFontSize:{type:String,default:"12px"},subTitleColor:{type:String,default:"#999"},padding:{type:[Boolean,String],default:!1}},computed:{_padding:function(){return"string"===typeof this.padding?this.padding:this.padding?"10px":""}},watch:{title:function(e){t.report&&""!==e&&t.report("title",e)}},methods:{onClick:function(){this.$emit("click")}}};e.default=n}).call(this,n("543d")["default"])},"29a1":function(t,e,n){"use strict";var i=n("3e51"),u=n.n(i);u.a},"2a9a":function(t,e,n){"use strict";n.r(e);var i=n("00ea"),u=n("424e");for(var a in u)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return u[t]}))}(a);n("29a1");var o=n("f0c5"),r=Object(o["a"])(u["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);e["default"]=r.exports},"3e51":function(t,e,n){},"424e":function(t,e,n){"use strict";n.r(e);var i=n("292b"),u=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-section/components/uni-section/uni-section-create-component',
    {
        'uni_modules/uni-section/components/uni-section/uni-section-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("2a9a"))
        })
    },
    [['uni_modules/uni-section/components/uni-section/uni-section-create-component']]
]);
