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

//= require mvc/app

// Start Backbone histroy a necessary step for bookmarkable URL'S
Backbone.history.start();

// Foundation initializer
$(document).foundation();

$(function(){

  // 初始化目录树
  var zTree;
  var $categoryTree = $("#sidebar-categiries-tree");
  var categoriesDataFilter = function(treeId, parentNode, respData) {
    return respData["categories"];
  }
  var addHoverDom = function(treeId, treeNode) {
    if ($('#addBtn_' + treeNode.tId).length > 0) { return; }

    var sObj = $("#" + treeNode.tId + "_span");
    sObj.after("<span class='button add' id='addBtn_" + treeNode.tId + "' title='add node' onfocus='this.blur();'></span>");

    var $addBtn = $("#addBtn_" + treeNode.tId);

    $addBtn.bind('click', function(e){
      var category = new App.Models.Category();

      category.save({ancestry: treeNode.id}, {
        success: function(model, resp, options) { zTree.addNodes(treeNode, model.toJSON()); },
        error: function(model, resp, options) { alert('添加子目录失败！'); console.dir(resp); }
      });

    });
  }
  var removeHoverDom = function(treeId, treeNode) {
    $("#addBtn_" + treeNode.tId).unbind().remove();
  }
  var showRemoveBtn = function(treeId, treeNode) { return !treeNode.isParent; };
  var beforeEditNode = function(treeId, treeNode) { zTree.selectNode(treeNode); return true; }
  var beforeRemoveNode = function(treeId, treeNode){
    if (treeNode.isParent) { alert('有子目录，不能删除！'); return false; }
    if (confirm('确定要删除【' + treeNode.name + '】吗？') == true) {
      var category = new App.Models.Category({id: treeNode.id, name: treeNode.name});
      category.destroy({
        wait: true,
        success: function(model, resp) { return true; },
        error: function(model, resp) { alert('删除结点失败'); console.dir(resp); return false; }
      });
    } else {
      return false;
    }
  }
  var onUpdateNode = function(e, treeId, treeNode, isCancel) {
    var category = new App.Models.Category({id: treeNode.id, ancestor: treeNode.ancestor});
    category.save({name: treeNode.name}, {
      success: function(model, resp) { console.log('更新结点成功！'); },
      error: function(model, resp) { console.log('更新结点失败！'); console.dir(resp); }
    });
  }
  var zTreeSetting = {
    view: {
      dblClickExpand: true,
      showLine: true,
      selectedMulti: false,
      addHoverDom: addHoverDom,
      removeHoverDom: removeHoverDom
    },
    edit: {
      enable: true,
      showRemoveBtn: showRemoveBtn
    },
    data: {
      simpleData: {
        enable: true
      }
    },
    async: {
      enable: true,
      url: '/categories',
      type: 'get',
      dataType: 'JSON',
      autoParam: ['id=parent_id'],
      dataFilter: categoriesDataFilter
    },
    callback: {
      beforeEditName: beforeEditNode,
      beforeRemove: beforeRemoveNode,  // 直接提交到后台服务器
      onRename: onUpdateNode           // 提交到后台服务器
    }
  };

  if ($categoryTree.length > 0) {
    $.fn.zTree.init($categoryTree, zTreeSetting);
    zTree = $.fn.zTree.getZTreeObj("sidebar-categiries-tree");
  }
});
