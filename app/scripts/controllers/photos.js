'use strict';
angular.module('nfolio')
   .controller('PhotoUploadCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Photo',
      function($scope, $rootScope, $routeParams, $location, Photo) {

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
              Photo.create($scope.photo);
//                  .then(function () {
//                  $scope.photo = {
//                      'title': '',
//                      description: '',
//                      image: '',
//                      updated: (new Date()).getTime()
//                  };
//              });
          };

          $scope.deletePhoto = function (photoId) {
              Photo.remove(photoId);
          };

          $scope.editPhoto = function (photoId) {
              Photo.edit(photoId);
          };

          $scope.updateTitle = function(){
            var uploadParams = $scope.widget.fileupload('option', 'formData');
            uploadParams["context"] = "photo=" + $scope.title;
            $scope.widget.fileupload('option', 'formData', uploadParams);
         };

         $scope.widget = $(".cloudinary_fileupload")
            .unsigned_cloudinary_upload($.cloudinary.config().upload_preset, {tags: 'nfolio', context:'photo='}, {
               // Uncomment the following lines to enable client side image resizing and valiation.
               // Make sure cloudinary/processing is included the js file
               //disableImageResize: false,
               //imageMaxWidth: 800,
               //imageMaxHeight: 600,
               //acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp|ico)$/i,
               //maxFileSize: 20000000, // 20MB
               dropZone: "#direct_upload",
               start: function (e) {
                  $scope.status = "Starting upload...";
                  $scope.$apply();
               },
               fail: function (e, data) {
                  $scope.status = "Upload failed";
                  $scope.$apply();
               }
            })
            .on("cloudinaryprogressall", function (e, data) {
               $scope.progress = Math.round((data.loaded * 100.0) / data.total);
               $scope.status = "Uploading... " + $scope.progress + "%";
               $scope.$apply();
            })
            .on("cloudinarydone", function (e, data) {
               $rootScope.photos = $rootScope.photos || [];
               data.result.context = {custom: {photo: $scope.title}};
               $scope.result = data.result;
               $rootScope.photos.push(data.result);
               $scope.$apply();
            });
      }])
.controller('PhotoCtrl', function ($rootScope, $scope, $location, Photo) {
        $scope.updateTitle = function(){
            var uploadParams = $scope.widget.fileupload('option', 'formData');
            uploadParams["context"] = "photo=" + $scope.title;
            $scope.widget.fileupload('option', 'formData', uploadParams);
        };

        $scope.widget = $(".cloudinary_fileupload")
            .unsigned_cloudinary_upload($.cloudinary.config().upload_preset, {tags: 'myphotoalbum', context:'photo='}, {
                // Uncomment the following lines to enable client side image resizing and valiation.
                // Make sure cloudinary/processing is included the js file
                //disableImageResize: false,
                //imageMaxWidth: 800,
                //imageMaxHeight: 600,
                //acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp|ico)$/i,
                //maxFileSize: 20000000, // 20MB
                dropZone: "#direct_upload",
                start: function (e) {
                    $scope.status = "Starting upload...";
                    $scope.$apply();
                },
                fail: function (e, data) {
                    $scope.status = "Upload failed";
                    $scope.$apply();
                }
            })
            .on("cloudinaryprogressall", function (e, data) {
                $scope.progress = Math.round((data.loaded * 100.0) / data.total);
                $scope.status = "Uploading... " + $scope.progress + "%";
                $scope.$apply();
            })
            .on("cloudinarydone", function (e, data) {
                $rootScope.photos = $rootScope.photos || [];
                data.result.context = {custom: {photo: $scope.title}};
                $scope.result = data.result;
                $rootScope.photos.push(data.result);
                $scope.$apply();
            });
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
      Photo.remove(photoId);
   };

   $scope.editPhoto = function (photoId) {
      Photo.edit(photoId);
   };



//      $scope.upVotePost = function (postId, upVoted) {
//         if (upVoted) {
//            Post.clearVote(postId, upVoted);
//         } else {
//            Post.upVote(postId);
//         }
//      };
//
//      $scope.downVotePost = function (postId, downVoted) {
//         if (downVoted) {
//            Post.clearVote(postId, !downVoted);
//         } else {
//            Post.downVote(postId);
//         }
//      };
//
//      $scope.upVoted = function (post) {
//         return Post.upVoted(post);
//      };
//
//      $scope.downVoted = function (post) {
//         return Post.downVoted(post);
//      };
});