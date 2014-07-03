'use strict';
angular.module('nfolio')
.controller('PhotoCtrl', function ($scope, $location, Photo) {
  if ($location.path() === '/') {
    $scope.photos = Photo.all;
  }

  $scope.photo = {
    'title': '',
    description: '',
    image: '',
    updated: (new Date()).getTime()
  };
      $scope.timeAgo = function(ms) {
         return moment(ms).fromNow();
      };

  $scope.submitPhoto = function () {
    Photo.create($scope.photo, $scope.files).then(function () {
      $scope.photo = {
        'title': '',
        description: '',
        image: '',
        updated: (new Date()).getTime()
      };
    });
  };

  $scope.deletePhoto = function (photoId) {
    Photo.delete(photoId);
  };
});