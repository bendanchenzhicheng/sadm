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
  var zTree, rightMenu;
  var $categoryTree = $("#sidebar-categiries-tree");
  var categoriesDataFilter = function(treeId, parentNode, respData) {
    return respData["categories"];
  }
  var onBodyMouseDown = function(e) {
    if (!(e.target.id == 'tree-right-menu' || $(e.target).parents('#tree-right-menu').length > 0)) {
      rightMenu.css({visibility: 'hidden'});
      return true;
    }
  }
  var showRightMenu = function(event, treeId, treeNode) {
    if (!treeNode) {
      zTree.cancelSelectedNode();
    } else {
      zTree.selectNode(treeNode);

      var rootPos = $("#sidebar-categiries-tree").offset();
      var pos = $(event.target).offset();
      var top  = pos.top - rootPos.top;
      var left = pos.left - rootPos.left;

      rightMenu.css({top: top + 'px', left: left + 'px', visibility: 'visible'});
    }

    $('body').bind('mousedown', onBodyMouseDown);
  }
  var hideRightMenu = function() {
    if (rightMenu) { rightMenu.css({visibility: 'hidden'}); }
    $('body').unbind('mousedown', onBodyMouseDown);
  }
  var addTreeNode = function() {
    hideRightMenu();

    var category = new App.Models.Category();
    var selectedNode = zTree.getSelectedNodes()[0];

    if (selectedNode) {
      category.save({ancestry: selectedNode.id}, {
        success: function(model, resp, options) {
          zTree.addNodes(selectedNode, model.toJSON());
        }
      });
    } else {
      category.save({}, {
        success: function(model, resp, options) {
          zTree.addNodes(null, model.toJSON());
        }
      });
    }
  }
  var delTreeNode = function() {
    hideRightMenu();

    var selectedNode = zTree.getSelectedNodes()[0];

    if (!selectedNode) {
      console.error('没有选中结点！');
      return false;
    }

    if (selectedNode.isParent) {
      alert('有子目录，不能删除！');
      return false;
    }

    if (confirm('确定要删除?') == true) {
      var category = new App.Models.Category({
        id: selectedNode.id,
        name: selectedNode.name
      });

      category.destroy({
        success: function(model, resp) {
          zTree.removeNode(selectedNode);
        },
        error: function(model, resp) {
          alert('删除结点失败');
          console.dir(resp);
        }
      });
    }
  }
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
      dataFilter: categoriesDataFilter
    },
    callback: {
      onRightClick: showRightMenu
    }
  };

  if ($categoryTree.length > 0) {
    $.fn.zTree.init($categoryTree, zTreeSetting);

    zTree = $.fn.zTree.getZTreeObj("sidebar-categiries-tree");
    rightMenu = $("#tree-right-menu");

    $("#tree-add-node").on('click', function(e){ addTreeNode(); });
    $("#tree-del-node").on('click', function(e){ delTreeNode(); });
  }
});
