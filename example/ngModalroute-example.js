var app = angular.module("example", [ "ngRoute", "ui.bootstrap", "ui.router", "ngModalroute"])
  .config(["$stateProvider", "$urlRouterProvider",  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/users");

    $stateProvider
      .state("users", {
        url:"/users",
        templateUrl: "users/list.html",
        controller: "UsersCtrl"
      })
      .state("users.edit", {
        url:"/:userid/edit",
        templateUrl: "users/edit.html",
        controller: "UsersEditCtrl"
      });

  }]).run(["$rootScope", "$state", "$modal", function($rootScope, $state, $modal) {
  
}]);


angular.module("example").controller("UsersCtrl", ["$scope", "$state", "$modal", function($scope, $state, $modal) {

    $scope.users = [
    {
      "id": 0,
      "username": "Mirte Vanstrepele",
      "roles": ["admin"],
      "lastLogin": "12/07/2015",
      "email":"mirte.vanstrepele@koningskristof.be",
      "login": "userid@rarid"
    },
    {
      "id": 1,
      "username": "Herman Loesen",
      "roles": ["support","tech"],
      "lastLogin": "01/07/2015",
      "email":"herman.loesen@koningskristof.be",
      "login": "userid@rarid"
    },
    {
      "id": 4,
      "username": "Johan Vandepitte",
      "roles": ["tech"],
      "lastLogin": "01/07/2015",
      "email":"johan.vandepitten@koningskristof.be",
      "login": "userid@rarid"
    },
    {
      "id": 2,
      "username": "Kristof Konings",
      "roles": ["tech"],
      "lastLogin": "01/07/2015",
      "email":"kristof.konings@koningskristof.be",
      "login": "userid@rarid"
    },
    {
      "id": 3,
      "username": "Pieter Heylen",
      "roles": ["info","tech","finance"],
      "lastLogin": "01/07/2015",
      "email":"pieter.heylen@koningskristof.be",
      "login": "userid@rarid"
    }
  ];


  $scope.modalConfig = {
    animation: true,
    templateUrl: 'users/edit.html',
    controller: 'UsersEditCtrl',
    modalClose: function (selectedItem) {
      console.log(selectedItem);
    },
    modalDismiss: function () {
      console.log('Modal dismissed at: ' + new Date());
    },
  };


  if ($state.params.userid !== undefined) {
      var modalInstance = $modal.open($scope.modalConfig);
      modalInstance.result.then($scope.modalConfig.modalClose, $scope.modalConfig.modalDismiss);
  }

  $scope.deleteUser = function() {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: "users/delete.html",
      controller: "DeleteUserModalCtrl"
    });

    modalInstance.result.then(function (selectedItem) {
      console.log(selectedItem);
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };


}]);





angular.module("example").controller("UsersEditCtrl", [ "$scope", "$modalInstance", "$state", function ($scope, $modalInstance, $state) {

  $scope.ok = function () {
    $modalInstance.close("ok");
  };

  $scope.cancel = function () {
    $modalInstance.dismiss("cancel");
  };


}]);




angular.module("example").controller("DeleteUserModalCtrl", [ "$scope", "$modalInstance", "$state", function ($scope, $modalInstance, $state) {

  $scope.ok = function () {
    $modalInstance.close("ok");
  };

  $scope.cancel = function () {
    $modalInstance.dismiss("cancel");
  };


}]);