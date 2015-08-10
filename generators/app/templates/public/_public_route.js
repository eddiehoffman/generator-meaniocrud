'use strict';

//Setting up route
angular.module('mean.<%= package_name_lower %>').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('all <%= crud_name_lower %>s', {
        url: '/<%= crud_name_lower %>s',
        templateUrl: '/<%= crud_name_lower %>s/views/list.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('create <%= crud_name_lower %>', {
        url: '/<%= crud_name_lower %>s/create',
        templateUrl: '/<%= crud_name_lower %>s/views/create.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('edit <%= crud_name_lower %>', {
        url: '/<%= crud_name_lower %>s/:<%= crud_name_lower %>Id/edit',
        templateUrl: '/<%= crud_name_lower %>s/views/edit.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('<%= crud_name_lower %> by id', {
        url: '/<%= crud_name_lower %>s/:<%= crud_name_lower %>Id',
        templateUrl: '/<%= crud_name_lower %>s/views/view.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      });
  }
]);
