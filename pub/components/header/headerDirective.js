(function () {
  'use strict';

  angular.module('hive').directive('ghHeader', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/header/header.html',
      scope: true,
      controller: ['$scope', 'user', 'auth', function ($scope, user, auth) {
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.user = user.user;
      }]
    }
  })
})();
