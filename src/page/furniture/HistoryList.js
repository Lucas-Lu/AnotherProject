'use strict';

var _core = require('util/core.js')
_core.doLogin(); 

var furnitureID = _core.getUrlParam("id");
if(furnitureID == "" || furnitureID == "0"){
    alert("没有历史");
    _core.goHome();
}
else{
    var getFurnitureHistoryParams = {
        url : _core.serverUrl + "/furniture/getHistory.do",
        data : { "furnitureID" : furnitureID } ,
        success : function(data, msg){
            //获取列表数据
            data.forEach(furnitureHistory => {
                $("#historys").append("<a class='weui-cell weui-cell_access furniture_item' href='javascript:;' data-id='" + furnitureHistory.id + "'><div class='weui-cell__bd'><p>"+ "date:" + furnitureHistory.edit + "  user:" + furnitureHistory.editperson + "</p></div><div class='weui-cell__ft'></div></a>");
            });
            $(".furniture_item").click(function(){
                var id = $(this).attr('data-id');
                window.location.href = _core.getServerUrl("/view/furnitureVersions.html?id=" + id);
            });
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
        window.location = _core.getServerUrl('/view/furnitureHistory.html?historyid=' + furnitureID);
    }
});