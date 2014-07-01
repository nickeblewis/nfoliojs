'use strict';
angular.module('nfolio')
.controller('PhotoCtrl', function ($scope, $location, Photo) {
  if ($location.path() === '/') {
    $scope.photos = Photo.all;
  }

  // TODO: This will change having done the VIEW
  $scope.photo = {'title': '', description: '', image: ''};

  $scope.submitPhoto = function () {
    Photo.create($scope.photo).then(function () {
      // TODO: This will change having done the VIEW
      $scope.photo = {'title': '', description: '', image: ''};
    });
  };

  $scope.deletePhoto = function (photoId) {
    Photo.delete(photoId);
  };
});
