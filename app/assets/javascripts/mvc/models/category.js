var App = window.App || {};

App.Models.Category = Backbone.Model.extend({
  urlRoot: '/categories',

  defaults: {
    name: 'new category'
  },

  initialize: function() {
  }

});
