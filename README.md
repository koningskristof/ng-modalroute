# ng-modalroute

Ng-modalroute is an AngularJS directive that links the Angular UI's modal to an anchor link with the possibity to open the modal in a new tab by holding shift, or ctrl, or alt and click on the link. Or by right-clicking top open the browser menu for the link and to click 'open in a new tab'. 
This enhances the usability of the implementation of a modal.

## Dependencies
### AngularJS
Which probably didn't suprise you.

### Angular UI
We are using the [Angular-UI](https://github.com/angular-ui/bootstrap) Modal implementation.

### UI Router
For routing and providing the templateURL and the controller for the Modal we are using the settings from the [UI Router](https://github.com/angular-ui/ui-router). We are planning to support the Angular-route in the feature.

### Angular Boostrap
For styling we are using the Angular-bootstrap port of Twitter Bootstrap.

## Getting started

### Install with Bower
```sh
$ bower install ng-modalroute
```
### Adding dependency to your project

Include the ngModalroute.js file to your index.html file and add this  `ngModalroute` module to the dependencies of your Angular project:
```sh
var app = angular.module("example", [ "ngRoute", "ui.bootstrap", "ui.router", "ngModalroute"])
```

Add a modalConfig object to your scope which is containing the properties as described in the [Angular-UI Modal documentation](http://angular-ui.github.io/bootstrap/#/modal) merged with the attributes modalClose and modalDismiss which are called after closing the modal.

```sh
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
```

Add the directive to the link with the value of the route name you want the modal to open with. Also provide the modalroute config object.

```sh
<a ng-modalroute="users.edit({userid:123})" modalroute-config="modalConfig">
```

Open the modal if state params are present.
```sh
  if ($state.params.userid !== undefined) {
      var modalInstance = $modal.open($scope.modalConfig);
      modalInstance.result.then($scope.modalConfig.modalClose, $scope.modalConfig.modalDismiss);
  }
```

## Example
This project includes an example probject in the folder 'example'. You can open this in your browser by running 'grunt example'.

## Contribution
Feel free the contribute to this small project, especially when you can add an extra use case for this directive.
