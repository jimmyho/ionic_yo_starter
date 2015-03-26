"use strict";

angular.module('starter.common.auth', ['firebase', 'starter.states'])
  .factory('Auth', ['$firebaseAuth', 'fbUtil', '$q', '$state', '$rootScope', 'loginRedirect',
    function ($firebaseAuth, fbUtil, $q, $state, $rootScope, loginRedirect) {
      var auth = $firebaseAuth(fbUtil.ref())

      var factory = {}

      // Monitor login state changes
      var authChange = function (authData) {

        if (authData) {
          console.log("Logged in as:", authData.uid);
          console.log(authData)
        } else {
          console.log("Logged out");
          $state.go(loginRedirect)
        }
        $rootScope.authData = auth.$getAuth()

      }
      auth.$onAuth(authChange)

      // promise used for router
      factory.getUser = function () {
        return auth.$waitForAuth()
          .then(function (user) {
            if (user) {
              console.log('Currently logged on as:', user.uid)
              return $q.when(user)
            } else {
              return $q.reject({authRequired: true})
            }
          })
      }

      // Simple login to Firebase
      factory.login = function (email, password) {
        console.log('log in attempt')
        return auth.$authWithPassword({
            email: email,
            password: password
          }, {remember: true}
        )
      }

      factory.signUp = function (params) {
        return auth.$createUser({email: params.email, password: params.password})
          .then(function () {
            // authenticate so we have permission to write to Firebase
            return factory.login(params.email, params.password);
          })
      }

      factory.logOut = function () {
        return auth.$unauth();
      }
      return factory
    }
  ])
;
