"use strict";

angular.module('starter.controllers', ['starter.common.menu'])
  .controller('AppCtrl', ['$scope', '$controller',
    function ($scope, $controller) {
      $controller('MenuCtrl', {
        $scope: $scope
      });
    }])
;

