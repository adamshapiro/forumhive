(function () {
  'use strict';

  angular.module('hive').factory('auth', ['$http', '$window', function ($http, $window) {
    return {
      saveToken: function (token) {
        $window.localStorage['forum-hive-token'] = token;
      },

      getToken: function () {
        return $window.localStorage['forum-hive-token']
      },

      isLoggedIn: function () {
        var token = this.getToken();

        if (token) {
          var payload = JSON.parse($window.atob(token.split('.')[1]));

          return payload.exp > Date.now() / 1000;
        } else {
          return false;
        }
      },

      currentUser: function () {
        if (this.isLoggedIn()) {
          var token = this.getToken(),
              payload = JSON.parse($window.atob(token.split('.')[1]));

          return payload.username;
        }
      },

      register: function (user) {
        var self = this;

        return $http.post('/auth/register', user).success(function (data) {
          self.saveToken(data.token);
        });
      },

      logIn: function (user) {
        var self = this;

        return $http.post('/auth/login', user).success(function (data) {
          self.saveToken(data.token);
        });
      },

      logOut: function () {
        $window.localStorage.removeItem('forum-hive-token');
      }
    }
  }])
})();
