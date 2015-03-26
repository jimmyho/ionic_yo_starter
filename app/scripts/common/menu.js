"use strict";

angular.module('starter.common.menu', ['starter.common.auth'])
  .controller('MenuCtrl', ['$scope', 'Auth',
    function ($scope, Auth) {
      $scope.logOut = function () {
        console.log('logOut')
        Auth.logOut()
      }
    }
  ])
;

