// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs

//= require ztree/jquery.ztree.core-3.5.js
//= require ztree/jquery.ztree.exedit-3.5.js

//= require underscore-min
//= require backbone

//= require vendor/modernizr
//= require foundation

// Start Backbone histroy a necessary step for bookmarkable URL'S
Backbone.history.start();

// Foundation initializer
$(document).foundation();

$(function(){

  // 初始化目录树
  var $categoryTree = $("#sidebar-categiries-tree");
  var categoriesDataFilter = function(treeId, parentNode, respData) {
    return respData["categories"];
  };
  var zTreeSetting = {
    view: {
      dblClickExpand: true,
      showLine: true,
      selectedMulti: false
    },
    async: {
      enable: true,
      url: '/categories',
      type: 'get',
      dataType: 'JSON',
      autoParam: ['id=parent_id'],
      otherParams: { 'request_agent': 'jquery.zTree' },
      dataFilter: categoriesDataFilter
    }
  };

  if ($categoryTree.length > 0) {
    $.fn.zTree.init($categoryTree, zTreeSetting);
  }
});
