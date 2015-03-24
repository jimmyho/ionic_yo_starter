"use strict";

angular.module('starter.states', [])
  .constant('STATES', {
    'app':{
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    },
    'app.search':{
      url: "/search",
      views: {
        'menuContent': {
          templateUrl: "templates/search.html"
        }
      }
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

      angular.forEach(STATES, function (state, path) {
        if (state.customerRequired) {
          // Add resolve
          $stateProvider.whenCustomerAuth(path, state);
        } else {
          // all other routes are added normally
          $stateProvider.state(path, state);
        }
      });

      // routes which are not in our map are redirected to /home
      $urlRouterProvider.otherwise('/app/playlists');
      console.log('config: configured States')
    }
  ])
//.directive('example', function () {
//
//})
