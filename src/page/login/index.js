'use strict';
console.log('hello login');
var _core = require('util/core.js')
var serverUrl = "http://www.greenpig.site/crabPool"
$("#btn_login").click(function(){
    var userName = $("#userName").val();
    var password = $("#password").val();
    if(userName.length == 0 || password == 0){
        alert("输入账号和密码");
        return;
    }
    var loginParams = {
        method :"post",
        url : serverUrl + "/user/login.do",
        data: {"userName": userName,"password": password },
        success : function(data, msg){
            //存入登录状态
            _core.setCookie('Crab_User', data.id + '@' + data.username , 7);
            _core.goHome();
        },
        error : function(msg){
            alert(msg);
        }
    }
    _core.request(loginParams);
});