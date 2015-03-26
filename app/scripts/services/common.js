"use strict";

angular.module('starter.services.common', ['firebase', 'starter.states'])
  .factory('UIService', ['$rootScope', '$ionicModal', '$ionicLoading',
    function ($rootScope, $ionicModal, $ionicLoading) {

      var factory = {};

      // Loading Spinner
      factory.show_loading = function (msg) {
        $ionicLoading.show({
          template: '<ion-spinner></ion-spinner><br>' + msg,
          backdrop: true,
          hideOnStateChange: true
        });
      }

      factory.hide_loading = function () {
        $ionicLoading.hide();
      }

      // Modal
      factory.modals = [];

      factory.show_modal = function (template_file, scope) {
        $ionicModal.fromTemplateUrl(template_file, {
          animation: 'slide-in-up',
          focusFirstInput: true,
          scope: scope
        }).then(function (modal) {
          factory.modals.push(modal);
          return modal.show();
        });
      }

      factory.hide_modal = function () {
        var modal = factory.modals.pop();
        modal.hide();
      }
      factory.remove_modal = function () {
        var modal = factory.modals.pop();
        modal.remove();
      }

      return factory
    }
  ]);
