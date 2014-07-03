'use strict';
angular.module('nfolio')
   .controller('PhotoViewCtrl', function ($scope, $routeParams, Photo) {

      $scope.photo = Photo.find($routeParams.photoId);

      $scope.addComment = function () {
         Photo.addComment($routeParams.photoId, $scope.comment);
         $scope.comment = '';
      };

      $scope.removeComment = function (comment, commentId) {
         Photo.deleteComment($scope.photo, comment, commentId);
      };

      // TODO: At some point I may add a "like" feature to Nfolio, so hanging onto the code below for the moment
      // $scope.upVotePhoto = function (upVoted) {
      //   if (upVoted) {
      //     Photo.clearVote($routeParams.photoId, true);
      //   } else {
      //     Photo.upVote($routeParams.photoId);
      //   }
      // };

      // $scope.downVotePhoto = function (downVoted) {
      //   if (downVoted) {
      //     Photo.clearVote($routeParams.photoId, false);
      //   } else {
      //     Photo.downVote($routeParams.photoId);
      //   }
      // };

      // $scope.upVoted = function () {
      //   return Photo.upVoted($scope.photo);
      // };

      // $scope.downVoted = function () {
      //   return Photo.downVoted($scope.photo);
      // };

      });
