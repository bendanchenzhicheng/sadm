var App = window.App || {};

var App.Views.CategoryTreeView = Backbone.View.extend({
  el: "sidebar-categiries-tree",

  initialize: function() {
    // 请求数据
    // 渲染目录树
  },


  zTreeSettings: {
    view: {
      dblClickExpand: false,
      showLine: true,
      selectedMulti: false
    },

    data: {
      simpleData: {
        enable: true,
        idKey: 'id',
        pIdKey: 'pId',
        rootPid: ''
      }
    },

    callback: {
      beforeClick: function(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("tree");

        if (treeNode.isParent) {
          zTree.expandNode(treeNode);
          return false;
        } else {
        }
      }
    }
  }

});
