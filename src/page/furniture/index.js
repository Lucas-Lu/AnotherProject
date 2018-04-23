'use strict';

var _core = require('util/core.js')
_core.doLogin(); 
var categoryItems = ["唯一且垄断","唯一且必须","可选"];

var furnitureID = _core.getUrlParam("id");
if(furnitureID == "" || furnitureID == "0"){
    $(".furniture_history").hide();
}
else{
    var getFurnitureParams = {
        url : _core.serverUrl + "/furniture/getByID.do?id=" + furnitureID,
        success : function(data, msg){
            //获取列表数据
            data.categoryName = categoryItems[data.categoryID];
            _core.bindData($("#furniture_info"),data);
        },
        error : function(msg){
            alert(msg);
        }
    }
    _core.rquest(getFurnitureParams);
}

$("#btn_save_furnitue").click(function(){
    var furniture = _core.GetData($("#furniture_info"));
    if(furniture.name == "" || furniture.categoryID == ""){
        alert("请先填写必填项");
        return;
    }
    var furnitureParams = {
        url : _core.serverUrl + "/furniture/save.do",
        data: _core.parseJsonString(furniture),
        success : function(data, msg){
            //获取列表数据
            _core.bindData($("#furniture_info"),data);
        },
        error : function(msg){
            alert(msg);
        }
    }
})

$(".furniture_history").click(function(){
    if(furnitureID == "" || furnitureID == "0"){
        alert("没有历史");
    }
    else{
        window.location = _core.getServerUrl('/view/furnitureHistorys.html?id=' + furnitureID);
    }
});