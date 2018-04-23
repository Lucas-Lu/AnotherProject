'use strict';

var _core = require('util/core.js')
_core.doLogin(); 

var historyID = _core.getUrlParam("historyid");
if(historyID == "" || historyID == "0"){
    alert("不存在的历史版本");
    _core.goHome();
}
else{
    var getFurnitureHistoryParams = {
        url : _core.serverUrl + "/furniture/getHistoryByID.do" ,
        data : { "furnitureID" : furnitureID } ,
        success : function(data, msg){
            //获取列表数据
            _core.bindData($("#furniture_info"),data);
        },
        error : function(msg){
            alert(msg);
        }
    }
    _core.rquest(getFurnitureHistoryParams);
}