'use strict';
angular.module('nfolio')
.controller('ProfileCtrl',
   function ($scope, $routeParams, Photo, User) {
      $scope.user = User.findByUsername($routeParams.username);
      $scope.commentedPhotos = {};

      $scope.user.$on('loaded', function () {
         populatePhotos();
         populateComments();
      });

      function populatePhotos () {
         $scope.photos = {};

         angular.forEach($scope.user.photos, function(photoId) {
            $scope.photos[photoId] = Photo.find(photoId);
         });
      }

      function populateComments () {
         $scope.comments = {};

         angular.forEach($scope.user.comments, function(comment) {
            var photo = Photo.find(comment.photoId);

            photo.$on('loaded', function() {
               $scope.comments[comment.id] = photo.$child('comments').$child(comment.id);

               $scope.commentedPhotos[comment.photoId] = photo;
            });
         });
      }
   });
