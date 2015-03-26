"use strict";

angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, Auth) {
    // Form data for the login modal
    //$scope.loginData = {};
    //
    //// Create the login modal that we will use later
    //$ionicModal.fromTemplateUrl('templates/login.html', {
    //  scope: $scope
    //}).then(function(modal) {
    //  $scope.modal = modal;
    //});
    //
    //// Triggered in the login modal to close it
    //$scope.closeLogin = function() {
    //  $scope.modal.hide();
    //};
    //
    //// Open the login modal
    //$scope.login = function() {
    //  $scope.modal.show();
    //};
    //
    //// Perform the login action when the user submits the login form
    //$scope.doLogin = function() {
    //  console.log('Doing login', $scope.loginData);
    //  Auth.login($scope.loginData.username, $scope.loginData.password)
    //    .then(function(){
    //      console.log('success')
    //    })
    //    .catch(function(err){
    //      console.error(err)
    //    })
    //    .finally(function(){
    //      $scope.closeLogin();
    //    })
    //};
  })

  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      {title: 'Reggae', id: 1},
      {title: 'Chill', id: 2},
      {title: 'Dubstep', id: 3},
      {title: 'Indie', id: 4},
      {title: 'Rap', id: 5},
      {title: 'Cowbell', id: 6}
    ];
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  })

  .controller('IntroCtrl', ['$scope', 'UIService', 'Auth', '$state',
    function ($scope, UIService, Auth, $state) {

      $scope.close = UIService.hide_modal

      // * SIGN UP * //
      $scope.signUpData = {}
      $scope.show_signup = function () {
        console.log('show signup modal')
        UIService.show_modal('templates/signup.html', $scope)
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
        UIService.show_modal('templates/login.html', $scope)
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

