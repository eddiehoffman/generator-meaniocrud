'use strict';

angular.module('mean.<%= package_name_lower %>').controller('<%= crud_name_upper %>sController', ['$scope', '$stateParams', '$location', 'Global', '<%= crud_name_upper %>s', 'MeanUser', 'Circles',
  function($scope, $stateParams, $location, Global, <%= crud_name_upper %>s, MeanUser, Circles) {
    $scope.global = Global;

    $scope.hasAuthorization = function(<%= crud_name_lower %>) {
      if (!<%= crud_name_lower %> || !<%= crud_name_lower %>.user) return false;
      return MeanUser.isAdmin || <%= crud_name_lower %>.user._id === MeanUser.user._id;
    };

    $scope.availableCircles = [];

    Circles.mine(function(acl) {
        $scope.availableCircles = acl.allowed;
        $scope.allDescendants = acl.descendants;
    });

    $scope.showDescendants = function(permission) {
        var temp = $('.ui-select-container .btn-primary').text().split(' ');
        temp.shift(); //remove close icon
        var selected = temp.join(' ');
        $scope.descendants = $scope.allDescendants[selected];
    };

    $scope.selectPermission = function() {
        $scope.descendants = [];
    };

    $scope.create = function(isValid) {
      if (isValid) {
        // $scope.<%= crud_name_lower %>.permissions.push('test test');
        var <%= crud_name_lower %> = new <%= crud_name_upper %>($scope.<%= crud_name_lower %>);

        <%= crud_name_lower %>.$save(function(response) {
          $location.path('<%= crud_name_lower %>/' + response._id);
        });

        $scope.<%= crud_name_lower %> = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(<%= crud_name_lower %>) {
      if (<%= crud_name_lower %>) {
        <%= crud_name_lower %>.$remove(function(response) {
          for (var i in $scope.<%= crud_name_lower %>s) {
            if ($scope.<%= crud_name_lower %>s[i] === <%= crud_name_lower %>) {
              $scope.<%= crud_name_lower %>s.splice(i, 1);
            }
          }
          $location.path('<%= crud_name_lower %>s');
        });
      } else {
        $scope.<%= crud_name_lower %>.$remove(function(response) {
          $location.path('<%= crud_name_lower %>s');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var <%= crud_name_lower %> = $scope.<%= crud_name_lower %>;
        if (!<%= crud_name_lower %>.updated) {
          <%= crud_name_lower %>.updated = [];
        }
        <%= crud_name_lower %>.updated.push(new Date().getTime());

        <%= crud_name_lower %>.$update(function() {
          $location.path('<%= crud_name_lower %>s/' + <%= crud_name_lower %>._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      <%= crud_name_upper %>s.query(function(<%= crud_name_lower %>s) {
        $scope.<%= crud_name_lower %>s = <%= crud_name_lower %>s;
      });
    };

    $scope.findOne = function() {
      <%= crud_name_upper %>s.get({
        <%= crud_name_lower %>Id: $stateParams.<%= crud_name_lower %>Id
      }, function(<%= crud_name_lower %>) {
        $scope.<%= crud_name_lower %> = <%= crud_name_lower %>;
      });
    };
  }
]);
