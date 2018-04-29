'use strict';
var Hogan = require('hogan.js');
var conf = {
    serverHost : 'http://www.greenpig.site/AnotherProject/view'
}
var _core = {
    serverUrl : "http://www.greenpig.site/crabPool",
    request : function(param){
        var _this = this; 
        $.ajax({
            type : param.method || 'get',
            url : param.url || '',
            dataType : param.dataType || 'json',
            data : param.data,
            async: !param.notAsync,
            success : function(res){
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                else if(10 === res.status){
                    _this.doLogin();
                }
                else if(1 === res.status){
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
        return result ? decodeURIComponent(result[2])    : null;
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
        var userName = this.getCookie("Crab_User");
        if(userName == ""){
            window.location.href = this.getServerUrl('/login.html?redirect=' + window.location.href);
        }
        
    },
    goHome : function(){
        window.location.href = this.getServerUrl('/index.html');
    },
    getCookie: function(c_name){
        if (document.cookie.length>0)
        {
            var c_start=document.cookie.indexOf(c_name + "=");
            if (c_start!=-1)
            { 
                c_start=c_start + c_name.length+1;
                var c_end=document.cookie.indexOf(";",c_start);
                if (c_end==-1) c_end=document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end));
            } 
        }
        return "";
    },
    setCookie: function(c_name,value,expiredays){
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    },
    bindData:function($elem,data){
        if (data == null) {
            return false;
        }
        if ($elem.length == 1 && typeof data == "object") {
            var setVal = {
                checkbox: function (ele, d) { ele.attr("checked", d) },
                radio: function (ele, d) { ele.attr("checked", d) },
                p: function (ele, d) { ele.html(d); },
                span: function (ele, d) { ele.html(d); },
                text: function (ele, d) { ele.val(d); },
                a: function (ele, d) { ele.html(d); },
                label: function (ele, d) { ele.html(d); },
                input: function (ele, d) { ele.val(d); },
                date: function (ele, d) { ele.val(d); },
                number: function (ele, d) { ele.val(d); },
                select: function (ele, d) { ele.val(d); },
                password: function (ele, d) { ele.val(d); },
                textarea: function (ele, d) { ele.html(d); },
                td: function (ele, d) { ele.html(d); },
                dt: function (ele, d) { ele.html(d); },
                hidden: function (ele, d) { return ele.val(d); },
                file: function (ele, d) { return ele.val(d); },
                label: function (ele, d) { return ele.html(d); },
                div: function (ele, d) { return ele.html(d); },
            }
            var b = $elem.find("[data-bind]");
            b.each(function () {
                var _this = $(this);
                var _key = _this.attr("data-bind");
                var _type = _this.attr("type") || _this[0].tagName;
                setVal[_type.toLowerCase()](_this, data[_key]);
            })
        }
    },
    getData:function($elem){
        if ($elem != undefined && $elem.length > 0) {
            //定义返回值
            var _data = [];
            var data = {};
            var getVal = {
                checkbox: function (ele) { return ele.attr("checked") ? true : false },
                radio: function (ele) { return ele.attr("checked") ? true : false },
                p: function (ele) { return ele.html(); },
                span: function (ele) { return ele.html(); },
                text: function (ele) { return ele.val(); },
                a: function (ele) { return ele.html(); },
                label: function (ele) { return ele.html(); },
                input: function (ele) { return ele.val(); },
                number: function (ele) { return ele.val(); },
                select: function (ele) { return ele.val(); },
                hidden: function (ele) { return ele.val(); },
                password: function (ele) { return ele.val(); },
                textarea: function (ele) { return ele.val(); },
                date: function (ele) { return ele.val(); },
                td: function (ele) { return ele.html(); },
                file: function (ele) { return ele.val(); },
                img: function (ele) { return ele.val(); },
                "select-one": function (ele) { return ele.val(); }
            }
            //得到标签属性
            var parentTag = $elem.attr("type") || $elem[0].tagName;
            //是否返回的是列表json
            var IsList = $elem.length > 1 || parentTag == "table" ? true : false;
            if (IsList) {
                $elem.each(function () {
                    var _class = $elem.find("[data-bind]");
                    _class.each(function () {
                        var _this = $(this);
                        var _key = _this.attr("data-bind");
                        var _type = _this.attr("type") == null ? null : _this.attr("type").toLowerCase();
                        var sonelemt = _this.children();
                        var _tagName = this.tagName.toLowerCase();
                        if (_type != null) {
                            data[_key] = getVal[_type.toLowerCase()](_this);
                            if (data[_key] != null && !(data[_key] instanceof Object)) { data[_key] = data[_key].trim(); }
                            _data.push(data)
                        }
                        data = {};
                    })
                });
            } else {
                var _class = $elem.find("[data-bind]");
                _class.each(function () {
                    var _this = $(this);
                    var _key = _this.attr("data-bind");
                    var _type = _this.attr("type") || _this[0].tagName;
                    if (_key)
                        data[_key] = getVal[_type.toLowerCase()](_this);
                    if (data[_key] != null && !(data[_key] instanceof Object)) { data[_key] = data[_key].trim(); }
                });
            }
            return data;
        }
    },
    parseJsonString:function(JsonObject){
        return JSON.stringify(JsonObject);
    },
    parseDate:function(timestamp){
        var newDate = new Date();
        newDate.setTime(timestamp);
        return newDate.toLocaleDateString();
    }
}

module.exports = _core;