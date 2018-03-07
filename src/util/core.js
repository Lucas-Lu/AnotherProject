'use strict';
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
    doLogin : function(){
        window.location.href = './login.html?redirect=' + window.location.href;
    }
}