"use strict";

angular.module('starter.login', [])

  .controller('LoginCtrl', ['$scope', 'UIService', 'Auth', '$state',
    function ($scope, UIService, Auth, $state) {

      $scope.close = UIService.hide_modal

      // * SIGN UP * //
      $scope.signUpData = {}
      $scope.show_signup = function () {
        console.log('show signup modal')
        UIService.show_modal('scripts/login/signup.html', $scope)
      }
      $scope.doSignUp = function () {
        console.log('doSignUp')

        console.log($scope.signUpData)
        Auth.signUp($scope.signUpData).then(function (x) {
          console.log(x)
        }).then(function () {
          $scope.close()
          $state.go('app.playlists')
        }).catch(function (err) {
          console.error(err)
        })
      }

      // * LOGIN * //
      $scope.loginData = {};
      $scope.show_login = function () {
        console.log('show login modal')
        UIService.show_modal('scripts/login/login.html', $scope)
      }

      $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        Auth.login($scope.loginData.email, $scope.loginData.password)
          .then(function () {
            console.log('success')
            $scope.close()
            $state.go('app.playlists')
          })
          .catch(function (err) {
            console.error(err)
          })
      };
    }])
;

