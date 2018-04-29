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
            categoryItem.push(data[i]);
            $("select[data-bind='categoryid']").append("<option value='" + data[i].id +  "'>" + data[i].name +  "</option>");
        }
    }
}

_core.request(getCategoryParams);

var furnitureID = _core.getUrlParam("id");
if(furnitureID == "" || furnitureID == "0"){
    $(".furniture_history").hide();
}
else{
    var getFurnitureParams = {
        url : _core.serverUrl + "/furniture/getByID.do",
        data : {"id" : furnitureID },
        method: "post",
        success : function(data, msg){
            //获取列表数据
            _core.bindData($("#furniture_info"),data);
        },
        error : function(msg){
            alert(msg);
        }
    }
    _core.request(getFurnitureParams);
}

$("#btn_save_furnitue").click(function(){
    var furniture = _core.getData($("#furniture_info"));
    if(furniture.name == "" || furniture.categoryID == ""){
        alert("请先填写必填项");
        return;
    }
    var furnitureParams = {
        method: "post",
        success : function(data, msg){
            //获取列表数据
            alert("保存成功！")
        },
        error : function(msg){
            alert(msg);
        }
    }
    furniture.id = furnitureID;
    var userinfo = _core.getCookie("Crab_User");
    if(furniture.id > 0){
        furniture.edited = userinfo.split('@')[0];
        furnitureParams.url = _core.serverUrl + "/furniture/update.do";
    }
    else{
        furniture.created = userinfo.split('@')[0];
        furnitureParams.url = _core.serverUrl + "/furniture/add.do";
    }
    furnitureParams.data = (furniture);
    _core.request(furnitureParams);
})

$(".furniture_history").click(function(){
    if(furnitureID == "" || furnitureID == "0"){
        alert("没有历史");
    }
    else{
        window.location = _core.getServerUrl('/furnitureHistorys.html?id=' + furnitureID);
    }
});