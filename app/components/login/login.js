"use strict";

angular.module('starter.login', [])

  .controller('LoginCtrl', ['$scope', 'UIService', 'Auth', '$state', '$mixpanel',
    function ($scope, UIService, Auth, $state, $mixpanel) {

      $scope.close = UIService.hide_modal

      // * SIGN UP * //
      $scope.signUpData = {}
      $scope.show_signup = function () {
        console.log('show signup modal')
        UIService.show_modal('components/login/signup.html', $scope)
      }
      $scope.doSignUp = function () {
        UIService.show_loading('Signing Up...')

        console.log('doSignUp')

        console.log($scope.signUpData)
        Auth.signUp($scope.signUpData)
          .then(function () {
            $scope.close()
            $state.go('app.playlists')
          })
          .catch(function (err) {
            console.error(err)
          })
          .finally(function (err) {
            UIService.hide_loading()
          })
      }

      // * LOGIN * //
      $scope.loginData = {};
      $scope.show_login = function () {
        console.log('show login modal')
        UIService.show_modal('components/login/login.html', $scope)
      }

      $scope.doLogin = function () {
        UIService.show_loading('Logging In...')
        console.log('Doing login', $scope.loginData);
        Auth.login($scope.loginData.email, $scope.loginData.password)
          .then(function () {
            console.log('success')
            $scope.close()
            //$state.go('app.playlists')
          })
          .catch(function (err) {
            console.error(err)
          })
          .finally(function (err) {
            UIService.hide_loading()
          })
      };
    }])
;

