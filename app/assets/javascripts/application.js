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
//= require ztree/jquery.ztree.exhide-3.5.js

//= require underscore-min
//= require backbone

//= require vendor/modernizr
//= require foundation

// Start Backbone histroy a necessary step for bookmarkable URL'S
Backbone.history.start();

// Foundation initializer
$(document).foundation();

$(function(){
})
