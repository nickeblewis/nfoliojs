/**
 * Created by lewisn2 on 04/07/2014.
 */
'use strict';
angular.module('nfolio')
   .controller('PhotoEditCtrl', function ($scope, $routeParams, Photo) {

      $scope.photo = Photo.find($routeParams.photoId);

      $scope.editPhoto = function () {
         Photo.edit($scope.photo, $routeParams.photoId);
      };

//      $scope.addComment = function () {
//         Photo.addComment($routeParams.photoId, $scope.comment);
//         $scope.comment = '';
//      };
//
//      $scope.removeComment = function (comment, commentId) {
//         Photo.deleteComment($scope.photo, comment, commentId);
//      };

   });

