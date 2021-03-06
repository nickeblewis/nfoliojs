'use strict';
angular.module('nfolio')
  .controller('PhotoUploadCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Photo', 'Auth',
    function($scope, $rootScope, $routeParams, $location, Photo, Auth) {
      $scope.auth = Auth;
      $scope.user = Auth.getAuth();

      // TODO: Double check the owner field is being updated all of the time, as on occasions it may not be
      $scope.photo = {
        'title': '',
        description: '',
        image: '',
        file: '',
        updated: (new Date()).getTime(),
        owner: $scope.user.google.displayName
      };

      $scope.timeAgo = function(ms) {
        return moment(ms).fromNow();
      };

      $scope.submitPhoto = function() {
        Photo
          .create($scope.photo)
          .then(function() {
            $scope.photo = {
              'title': '',
              description: '',
              image: '',
              file: '',
              updated: (new Date()).getTime()
            };
          });
      };

      $scope.deletePhoto = function(photoId) {
        Photo.remove(photoId);
      };

      $scope.editPhoto = function(photoId) {
        Photo.edit(photoId);
      };

      $scope.widget = $(".cloudinary_fileupload")
        .unsigned_cloudinary_upload($.cloudinary.config().upload_preset, {
          tags: 'nfolio',
          context: 'photo='
        }, {
          dropZone: "#direct_upload",
          start: function(e) {
            $scope.status = "Starting upload...";
            $scope.$apply();
          },
          fail: function(e, data) {
            $scope.status = "Upload failed";
            $scope.$apply();
          }
        })
        .on("cloudinaryprogressall", function(e, data) {
          $scope.progress = Math.round((data.loaded * 100.0) / data.total);
          $scope.status = "" + $scope.progress + "%";
          $scope.$apply();
        })
        .on("cloudinarydone", function(e, data) {
          $rootScope.photos = $rootScope.photos || [];
          data.result.context = {
            custom: {
              photo: $scope.title
            }
          };
          $scope.photo.file = data.result.path;

          $scope.photo.metadata = data.result.image_metadata;
          //          $scope.result = data.result;
          $scope.status = '';

          $scope.photo.title = $scope.photo.metadata.Title;
          $scope.photo.description = $scope.photo.metadata.Description;

          $rootScope.photos.push(data.result);
          $scope.$apply();
        });
    }
  ])

.controller('PhotoCtrl', ['$routeParams', '$scope', '$location', 'Photo',
  function($routeParams, $scope, $location, Photo) {

    $scope.loading = true;

    if ($location.path() === '/') {
      $scope.photos = Photo.all;
      $scope.sphoto = Photo.find("-JgE-B47p390Ip_DnBTy");
      //$scope.sphoto = Photo.top;

      // $scope.photos = Photo.limit(100);
      $scope.loading = false;
    }

    $scope.photo = {
      'title': '',
      description: '',
      image: '',
      updated: (new Date()).getTime()
    };

    $scope.showChosenPhoto = function(photoId) {
      $scope.sphoto = $scope.photos.$getRecord(photoId);
    };

    $scope.timeAgo = function(ms) {
      return moment(ms).fromNow();
    };

    $scope.addComment = function(photoId) {
      Photo.addComment(photoId, $scope.comment);
      $scope.comment = '';
    };

    $scope.submitPhoto = function() {
      Photo.create($scope.photo, $scope.files).then(function() {
        $scope.photo = {
          'title': '',
          description: '',
          image: '',
          updated: (new Date()).getTime()
        };
      });
    };

    $scope.deletePhoto = function(photoId) {
      Photo.remove(photoId);
    };

    $scope.editPhoto = function(photoId) {
      Photo.edit(photoId);
    };
  }
]);
