"use strict";

angular.module('starter.intro', ['starter.login'])

  .controller('IntroCtrl', ['$scope', '$controller',
    function ($scope, $controller) {
      $controller('LoginCtrl', {
        $scope: $scope
      });
    }])
;

