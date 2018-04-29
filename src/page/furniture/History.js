'use strict';

var _core = require('util/core.js')
_core.doLogin(); 
var categoryItem = new Array();

var getCategoryParams = {
    url : _core.serverUrl + "/furniture/getAllCategory.do",
    method: "post",
    notAsync : true,
    success : function(data, msg){
        for(var i = 0; i < data.length ; i ++){
            categoryItem[data[i].id] = data[i].name;
        }
    }
}
_core.request(getCategoryParams);

var historyID = _core.getUrlParam("historyid");
if(historyID == "" || historyID == "0" || historyID == null){
    alert("不存在的历史版本");
    _core.goHome();
}
else{
    var getFurnitureHistoryParams = {
        url : _core.serverUrl + "/furniture/getHistoryByID.do" ,
        method: "post",
        data : { "historyID" : historyID } ,
        success : function(data, msg){
            //获取列表数据
            data.categoryName = categoryItem[data.categoryid];
            _core.bindData($("#furniture_info"),data);
        },
        error : function(msg){
            alert(msg);
        }
    }
    _core.request(getFurnitureHistoryParams);
}