"use strict";

angular.module('starter.states', [])
  .constant('loginState', 'intro')
  .constant('STATES', {

    'intro' :{
      url: '/intro',
      templateUrl: 'templates/intro.html',
      controller: 'IntroCtrl'
    },

    'app': {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    },
    'app.search': {
      url: "/search",
      views: {
        'menuContent': {
          templateUrl: "templates/search.html"
        }
      },
      authRequired: true
    },
    'app.browse': {
      url: "/browse",
      views: {
        'menuContent': {
          templateUrl: "templates/browse.html"
        }
      }
    },
    'app.playlists': {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    },
    'app.single': {
      url: "/playlists/:playlistId",
      views: {
        'menuContent': {
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    }
  })
  .config(['$stateProvider', '$urlRouterProvider', 'STATES',
    function ($stateProvider, $urlRouterProvider, STATES) {
      var applyAuthRequired = function (path, state) {
        state.resolve = state.resolve || {};
        state.resolve.user = ['Auth', function (Auth) {
          return Auth.getUser()
        }];
        $stateProvider.state(path, state);
      }

      angular.forEach(STATES, function (state, path) {
        if (state.authRequired) {
          // Add resolve
          console.log('authRequired:', path)
          applyAuthRequired(path, state);
        } else {
          // all other routes are added normally
          $stateProvider.state(path, state);
        }
      });

      // routes which are not in our map are redirected to /home
      $urlRouterProvider.otherwise('/intro');
      console.log('config: configured States')
    }
  ])

  .run(['$rootScope', '$state', 'loginState',
    function ($rootScope, $state, loginState) {

      $rootScope.$on("$stateChangeError",
        function (event, toState, toParams, fromState, fromParams, err) {
          console.log(err)

          if (angular.isObject(err)) {
            console.log('$stateChangeError', err)
            if (err.authRequired) {
              $state.go(loginState);
            }
          }
        });

    }])
