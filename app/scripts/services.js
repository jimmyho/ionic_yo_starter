"use strict";

angular.module('starter.services', ['firebase'])
  .factory('fbUtil', ['ENV',
    function (ENV) {
      var factory = {}

      function pathRef(args) {
        // convert the list of args into firebase path with '/' as a separator
        for (var i = 0; i < args.length; i++) {
          if (angular.isArray(args[i])) {
            args[i] = pathRef(args[i]);

          } else if (typeof args[i] !== 'string') {
            throw new Error('Argument ' + i + ' to firebaseRef is not a string: ' + args[i]);
          }
        }
        return args.join('/');
      }

      function firebaseRef(path) {
        // Given a path, which can be a list of strings, or just a string, return FB ref.
        var ref = new Firebase(ENV.firebase);
        var args = Array.prototype.slice.call(arguments);
        if (args.length) {
          ref = ref.child(pathRef(args));
        }
        return ref;
      }

      // ref using vanilla firebase
      factory.ref = firebaseRef
      // ref using Fireproof
      factory.fire = function (path) {
        return new Fireproof(this.ref(path))
      }

      return factory
    }
  ])

  .factory('Auth', ['$firebaseAuth', 'fbUtil',
    function ($firebaseAuth, fbUtil) {
      var auth = $firebaseAuth(fbUtil.ref())

      var factory = {}

      // Monitor auth state changes
      var authChange = function (authData) {
        if (authData) {
          console.log("Logged in as:", authData.uid);
        } else {
          console.log("Logged out");
        }
        factory.user = auth.$getAuth()
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

      factory.logout = function () {
        return auth.$unauth();
      }

      return factory
    }

  ])
