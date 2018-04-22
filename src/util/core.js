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
    bindData:function($elems,data){
        for(var _key in data){
            var $databind = $elems.find("[data-bind='" + _key + "']");
            if($databind.length > 0){
                $elems.find("[data-bind='" + _key + "']").val(data[_key]);
            }
        }
    },
    getData:function($elems){
        var thisObj = new Object();
        $elems.find("[data-bind='*']").each(function(){
            thisObj[$(this).attr('data-bind')] == $(this).val(); 
        });
        return thisObj;
    },
    parseJsonString:function(JsonObject){
        return JSON.stringify(JsonObject);
    }
}

module.exports = _core;