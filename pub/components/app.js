(function {
  'use strict';

  angular.module('hive', ['ui-router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'components/home/home.html',
        controller: 'HomeController',
        resolve: {
          homeForums: ['forums', function (forums) {
            return forums.getAll();
          }]
        }
      })
      .state('forum', {
        url: '/{forumId}',
        templateUrl: 'components/forum/forum.html',
        controller: 'ForumController',
        resolve: {
          forum: ['$stateParams', 'forums', function ($stateParams, forums) {
            return forum.getForum($stateParams.forumId);
          }]
        }
      })
      .state('post', {
        url: '/{postId}',
        templateUrl: 'components/post/post.html',
        controller: 'PostController',
        resolve: {
          post: ['$stateParams', 'posts', function ($stateParams, posts) {
            return posts.getPost($stateParams.postId);
          }]
        }
      })
      .state('users', {
        url: '/users/{userId}',
        templateUrl: 'components/user/user.html',
        controller: 'UserController',
        resolve: {
          user: ['$stateParams', 'users', function ($stateParams, users) {
            return users.getUser($stateParams.userId);
          }]
        }
      })
      .state('auth', {
        url: '/auth',
        template: '<ui-view></ui-view>',
        abstract: true
      })
      .state('auth.login', {
        url: '/login',
        templateUrl: 'components/auth/authLogin/authLogin.js',
        controller: 'AuthLoginController',
        onEnter: ['$state', 'auth', function ($state, auth) {
          if (auth.isLoggedIn())
            $state.go('home');
        }]
      })
      .state('auth.register', {
        url: '/register',
        templateUrl: 'components/auth/authRegister/authRegister.js',
        controller: 'AuthRegisterController',
        onEnter: ['$state', 'auth', function ($state, auth) {
          if (auth.isLoggedIn())
            $state.go('home');
        }]
      })
    ;
  }]);
})();
