"use strict";

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ngCordova',
  'firebase',
  'angular.filter',
  //'angulartics.mixpanel',
  'analytics.mixpanel',

  // * MY APP * //
  'config',
  'starter.common.directives',
  'starter.common.filters',
  'starter.common.services',
  'starter.common.menu',
  'starter.common.auth',
  'starter.common.fbUtil',

  'starter.controllers',


  'starter.intro',
  'starter.login',
  'starter.playlist',

  'starter.states',
])


  .run(function ($ionicPlatform, ENV, $cordovaStatusbar) {
    $ionicPlatform.ready(function () {
      console.log('$ionicPlatform.ready')
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required

        $cordovaStatusbar.overlaysWebView(false);

        // styles: Default : 0, LightContent: 1, BlackTranslucent: 2, BlackOpaque: 3
        //$cordovaStatusbar.style(1);

        // supported names: black, darkGray, lightGray, white, gray, red, green,
        // blue, cyan, yellow, magenta, orange, purple, brown
        $cordovaStatusbar.styleColor('purple');
        //$cordovaStatusbar.styleHex('#000');
      }

      //console.log('Environment:', ENV)

    });
  })
  .config(['$mixpanelProvider', 'ENV',
    function ($mixpanelProvider, ENV) {
      console.log('init mixpanel', ENV.mixpanelAPI)
      $mixpanelProvider.apiKey(ENV.mixpanelAPI);
    }
  ])
;
