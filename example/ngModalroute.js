"use strict";

/**
 * @ngdoc directive
 * @name ngModalroute.directive:ngModalroute
 * @description
 * # ngModalroute
 */
angular.module("ngModalroute",[]).directive("ngModalroute", function ($modal, $injector, $compile) {
    return {
      restrict: "A",
      priority:1001,
      terminal:true,
      scope: {
        modalrouteConfig: "=modalrouteConfig"
      },
      compile: function compile(element, attrs) {

        element.removeAttr("ng-modalroute");

        var templateUrl;
        var controller;
        var uistate;

        if($injector.has("$state")) {
          var $state = $injector.get("$state");
          var stateName = attrs.ngModalroute.match(/([\w|\.]*)/)[1];
          uistate = $state.get(stateName);
        }

        if(uistate !== undefined && uistate !== null ) {
          templateUrl  = uistate.templateUrl;
          controller  = uistate.controller;
          element.attr("ui-sref",attrs.ngModalroute);
        }


        return function (scope, element) {
          $compile(element)(scope);

          element.on("click", function(event) {

            if (event.ctrlKey || event.shiftKey || event.metaKey){
              return;
            }
            event.preventDefault();

            scope.modalrouteConfig = (scope.modalrouteConfig)?scope.modalrouteConfig:{};
            scope.modalrouteConfig.modalClose = (scope.modalrouteConfig.modalClose)?(scope.modalrouteConfig.modalClose):function(){};
            scope.modalrouteConfig.modalDismiss = (scope.modalrouteConfig.modalDismiss)?(scope.modalrouteConfig.modalDismiss):function(){};

            scope.modalrouteConfig.templateUrl = templateUrl;
            scope.modalrouteConfig.controller = controller;

            $modal.open(scope.modalrouteConfig).result.then(scope.modalrouteConfig.modalClose,scope.modalrouteConfig.modalDismiss);

          });
        };
      }
    };
  });
