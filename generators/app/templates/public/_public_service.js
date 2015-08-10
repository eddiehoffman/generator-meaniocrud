'use strict';

//<%= crud_name_upper %>s service used for <%= crud_name_lower %>s REST endpoint
angular.module('mean.<%= package_name_lower %>').factory('<%= crud_name_upper %>s', ['$resource',
  function($resource) {
    return $resource('api/<%= crud_name_lower %>s/:<%= crud_name_lower %>Id', {
      <%= crud_name_lower %>Id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
