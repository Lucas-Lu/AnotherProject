'use strict';

var _core = require('util/core.js')
_core.doLogin(); 

var furnitureID = _core.getUrlParam("id");
if(furnitureID == "" || furnitureID == "0"){
    $(".furniture_history").hide();
}
else{
    var getFurnitureParams = {
        url : _core.serverUrl + "/furniture/getByID.do?id=" + furnitureID,
        success : function(data, msg){
            //获取列表数据
            _core.bindData($("#furniture_info"),data);
        },
        error : function(msg){
            alert(msg);
        }
    }
    _core.rquest(getFurnitureParams);
}

$(".furniture_history").click(function(){
    if(furnitureID == "" || furnitureID == "0"){
        alert("没有历史");
    }
    else{
        window.location = _core.getServerUrl('/view/furnitureHistorys.html?id=' + furnitureID);
    }
});