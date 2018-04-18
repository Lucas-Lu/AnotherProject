'use strict';

require('../weui/weui.css')
var _core = require('util/core.js')
_core.doLogin(); 

var getCategoryParams = {
    url : _core.serverUrl + "/furniture/getAllCategory.do",
    method: "post",
    notAsync : true,
    success : function(data, msg){
        //获取列表数据
        var html = "";
        var getByCategoryParams = {
            url : _core.serverUrl + "/furniture/getByCategory.do",
            method: "post",
            notAsync : true,
            success : function(furnitures, msg){
                for(var j = 0; j < furnitures.length ; j ++){
                    html += (+ " <a class='weui-cell weui-cell_access furniture_item' href='javascript:;' data-id='" + furnitures[j].id + "'><div class='weui-cell__bd'><p>" + furnitures[j].name + "</p></div><div class='weui-cell__ft'></div></a>");
                }
            } 
        }
        for(var i = 0; i < data.length ; i ++){
            html += ("<div class='weui-cells__title'>" + data[i].name + "</div><div class='weui-cells'>");
            getByCategoryParams.data = {'categoryID': data[i].id };
            _core.request(getByCategoryParams);
            html += "</div></div>";
        }
        $(".page__bd").html(html);

        $(".page__bd").append("<a href='javascript:;' class='weui-btn weui-btn_primary furniture_item' data-id='0'>添加</a>");
        $(".furniture_item").click(function(){
            var id = $(this).attr('data-id');
            window.location.href = _core.getServerUrl("/view/furniture.html?id=" + id);
        });

    },
    error : function(msg){
        alert(msg);
    }
}
_core.request(getCategoryParams);
