'use strict';

var _core = require('util/core.js')
_core.doLogin(); 

var userItem = new Array();

var getUsersParams = {
    url : _core.serverUrl + "/user/getAll.do",
    method: "post",
    notAsync : true,
    success : function(data, msg){
        for(var i = 0; i < data.length ; i ++){
            userItem[data[i].id] = data[i].username;
        }
    }
}

_core.request(getUsersParams);

var furnitureID = _core.getUrlParam("id");
if(furnitureID == "" || furnitureID == "0" || furnitureID == null){
    alert("没有历史");
    _core.goHome();
}
else{
    var getFurnitureHistoryParams = {
        url : _core.serverUrl + "/furniture/getHistory.do",
        method: "post",
        data : { "furnitureID" : furnitureID } ,
        success : function(data, msg){
            //获取列表数据
            if(data.length > 0){
                data.forEach(furnitureHistory => {
                    $("#historys").append("<a class='weui-cell weui-cell_access furniture_item' href='javascript:;' data-id='" + furnitureHistory.id + "'><div class='weui-cell__bd'><p>"+ "日期:" + _core.parseDate(furnitureHistory.createtime) + "  用户:" + userItem[furnitureHistory.created] + "</p></div><div class='weui-cell__ft'></div></a>");
                });
                $(".furniture_item").click(function(){
                    var id = $(this).attr('data-id');
                    window.location.href = _core.getServerUrl("/furnitureHistory.html?historyid=" + id);
                });
            }
            else{
                $("#historys").append("暂时没有历史记录");
            }
           
        },
        error : function(msg){
            alert(msg);
        }
    }
    _core.request(getFurnitureHistoryParams);
}