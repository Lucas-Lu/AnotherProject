'use strict';

var _core = require('util/core.js')
_core.doLogin(); 

var furnitureID = _core.getQueryString("id");
if(furnitureID == "" || furnitureID == "0"){
    
}
else{
    var getFurnitureParams = {
        url : _core.serverUrl + "/furniture/getByID.do?id=" + furnitureID,
        success : function(data, msg){
            //获取列表数据
            
           
        },
        error : function(msg){
            alert(msg);
        }
    }
    _core.require(getFurnitureParams);
}