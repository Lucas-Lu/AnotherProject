webpackJsonp([0],{

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(27);


/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(28) 
__webpack_require__(29)
var _core = __webpack_require__(30)
 

_core.require({
    url:'./test.do',
    success:function(res){
        console.log(res)
    }
})

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Hogan = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"hogan\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var conf = {
    serverHost : ''
}
var _core = {
    request : function(param){
        var _this = this; 
        $.ajax({
            type : param.method || 'get',
            url : param.url || '',
            dataType : param.dataType || 'json',
            data : param.data,
            success : function(res){
                if(0 === res.Status){
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                else if(10 === res.Status){
                    _this.doLogin();
                }
                else if(1 === res.Status){
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error : function(err){
                typeof param.error === 'function' && param.error(err.statusText)
            } 
        })
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam : function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)' );
        var result = window.location.search.substr(1).match(reg);
        return reuslt ? decodeURIComponent(reuslt[2])    : null;
    },
    //渲染模版
    renderHtml : function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate);
        var result = template.render(template);
        return result;
    },
    //成功提示
    successTips : function(msg){
        alert(msg | '操作成功！')
    },
    //失败提示
    errorTips : function(msg){
        alert(msg | '哪里出错了')
    },
    //验证逻辑，非空、手机号、邮箱验证
    validate : function(value, type){
        var value = $.trim(value);
        //非空
        if('require' === type){
            return !!value;
        }
        //手机号
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if('email' === type){
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value);
        }
    } ,
    //统一登陆提示
    doLogin : function(){
        window.location.href = './login.html?redirect=' + window.location.href;
    },
    goHome : function(){
        window.location.href = './index.html';
    }
}

module.exports = _core;

/***/ })

},[26]);