require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages_admin/pages/shops/edit"],{"35ce":function(n,e,t){},"5f0a":function(n,e,t){"use strict";(function(n){var e=t("4ea4");t("1fb8"),t("a9ff");e(t("66fd"));var i=e(t("a7dd"));wx.__webpack_require_UNI_MP_PLUGIN__=t,n(i.default)}).call(this,t("543d")["createPage"])},a7dd:function(n,e,t){"use strict";t.r(e);var i=t("b6a5"),o=t("e444");for(var r in o)["default"].indexOf(r)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(r);t("c641");var u=t("f0c5"),a=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);e["default"]=a.exports},b556:function(n,e,t){"use strict";(function(n,i){var o=t("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(t("9523")),u=t("142b");function a(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,i)}return t}function s(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?a(Object(t),!0).forEach((function(e){(0,r.default)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var c=n.database();function f(n){var e={};for(var t in u.validator)n.indexOf(t)>-1&&(e[t]=u.validator[t]);return e}var l={data:function(){var n={s_name:"",s_telephone:null,s_address:"",s_level:null,s_hours:null,s_category:"",s_img:null};return{formData:n,formOptions:{},rules:s({},f(Object.keys(n)))}},onLoad:function(n){if(n.id){var e=n.id;this.formDataId=e,this.getDetail(e)}},onReady:function(){this.$refs.form.setRules(this.rules)},methods:{submit:function(){var n=this;i.showLoading({mask:!0}),this.$refs.form.validate().then((function(e){return n.submitForm(e)})).catch((function(){})).finally((function(){i.hideLoading()}))},submitForm:function(n){var e=this;return c.collection("shops").doc(this.formDataId).update(n).then((function(n){i.showToast({icon:"none",title:"修改成功"}),e.getOpenerEventChannel().emit("refreshData"),setTimeout((function(){return i.navigateBack()}),500)})).catch((function(n){i.showModal({content:n.message||"请求服务失败",showCancel:!1})}))},getDetail:function(n){var e=this;i.showLoading({mask:!0}),c.collection("shops").doc(n).field("s_name,s_telephone,s_address,s_level,s_hours,s_category,s_img").get().then((function(n){var t=n.result.data[0];t&&(e.formData=t)})).catch((function(n){i.showModal({content:n.message||"请求服务失败",showCancel:!1})})).finally((function(){i.hideLoading()}))}}};e.default=l}).call(this,t("a9ff")["default"],t("543d")["default"])},b6a5:function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return r})),t.d(e,"a",(function(){return i}));var i={uniForms:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(t.bind(null,"390f"))},uniFormsItem:function(){return t.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item").then(t.bind(null,"a11d"))},uniEasyinput:function(){return t.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(t.bind(null,"7bdd"))},uniDatetimePicker:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker")]).then(t.bind(null,"0d5f"))},uniFilePicker:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker")]).then(t.bind(null,"ae7b"))}},o=function(){var n=this.$createElement;this._self._c},r=[]},c641:function(n,e,t){"use strict";var i=t("35ce"),o=t.n(i);o.a},e444:function(n,e,t){"use strict";t.r(e);var i=t("b556"),o=t.n(i);for(var r in i)["default"].indexOf(r)<0&&function(n){t.d(e,n,(function(){return i[n]}))}(r);e["default"]=o.a}},[["5f0a","common/runtime","common/vendor","pages_admin/common/vendor"]]]);