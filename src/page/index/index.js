'use strict';
require('./index.css') 
require('../weui/weui.min.css')
var _core = require('util/core.js')
 

_core.require({
    url:'./test.do',
    success:function(res){
        console.log(res)
    }
})