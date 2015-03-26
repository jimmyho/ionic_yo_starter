"use strict";

angular.module('starter.common.fbUtil', ['firebase', 'starter.states'])
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

