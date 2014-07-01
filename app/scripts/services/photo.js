'use strict';
angular.module('nfolio')
.factory('Photo',
  function ($firebase, User, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'photos');

    var photos = $firebase(ref);

    var Photo = {
      all: photos,
      create: function (photo) {
        if (User.signedIn()) {
          var user = User.getCurrent();

          photo.owner = user.username;

          return photos.$add(photo).then(function (ref) {
            var photoId = ref.name();

            if(photo.files) {
              var userFolder = 'user' + user,
                  imageFolder = 'image' + (new Date()).getTime();
            
              var f = $scope.files[0];
            
              var reader = new FileReader();
              
              reader.onload = function(e) {
                // return function(e) {
              
                var img = new Image();
                img.onload=function() {
                  resizeUpload(this,700, 'medium', userFolder + '/' + imageFolder + '/medium/' + f.name, newMessageRef);
                };
                
                var img2 = new Image();
                img2.onload=function(){
                  resizeUpload(this,332, 'thumb', userFolder + '/' + imageFolder + '/thumb/' + f.name, newMessageRef);
                };
                
                img.src=e.target.result;
                img2.src=e.target.result;
              };
              reader.readAsDataURL(f);
            }

            user.$child('photos').$child(photoId).$set(photoId);

            return photoId;
          });
        }
      },
      find: function (photoId) {
        return photos.$child(photoId);
      },
      delete: function (photoId) {
        if (User.signedIn()) {
          var photo = Photo.find(photoId);

          photo.$on('loaded', function () {
            var user = User.findByUsername(photo.owner);

            photos.$remove(photoId).then(function () {
              user.$child('photos').$remove(photoId);
            });
          });
        }
      },
      addComment: function (photoId, comment) {
        if (User.signedIn()) {
          var user = User.getCurrent();

          comment.username = user.username;
          comment.photoId = photoId;

          photos.$child(photoId).$child('comments').$add(comment).then(function (ref) {
            user.$child('comments').$child(ref.name()).$set({id: ref.name(), photoId: photoId});
          });
        }
      },
      deleteComment: function (photo, comment, commentId) {
        if (User.signedIn()) {
          var user = User.findByUsername(comment.username);

          photo.$child('comments').$remove(commentId).then(function () {
            user.$child('comments').$remove(commentId);
          });
        }
      }
    };

    return Photo;
  });
