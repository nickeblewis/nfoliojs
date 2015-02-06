'use strict';
/*global AWS*/
angular.module('nfolio')
  .factory('album', ['$rootScope', '$resource',
    function($rootScope, $resource) {
      var url = $.cloudinary.url('nfolio', {
        format: 'json',
        type: 'list'
      });
      //cache bust
      url = url + "?" + Math.ceil(new Date().getTime() / 1000);
      return $resource(url, {}, {
        photos: {
          method: 'GET',
          isArray: false
        }
      });
    }
  ])
  .factory('Photo', ['$firebase', 'User', 'FIREBASE_URL', 'Auth',
    function($firebase, User, FIREBASE_URL, Auth) {

      var ref = new Firebase(FIREBASE_URL + 'photos');

      var photos = $firebase(ref.limitToLast(500));
      var photosLatest = $firebase(ref.limitToLast(1));

      var Photo = {
        all: photos.$asArray(),
        //            featured: photos.$child('featured'),
        limit: function(n) {
          var data = {};
          //          var postsQuery = ref.startAt(null, '-JSyC-fIzHSBkaQWtNw-').limit(n);
          var postsQuery = ref.limitToFirst(n);

          postsQuery.on('child_added', function(snapshot) {
            var p = snapshot.val();
            // var photoId = snapshot.key();
            // data[photoId] = Photo.find(photoId);
            //            console.log(p)
            return p.$asArray();

          });
          return data;
        },
        top: photosLatest.$asArray(),
        create: function(photo) {

          //if (User.signedIn()) {
          // var user = User.getCurrent();
          //photo.owner = $scope.user.facebook.displayName;
          return photos.$push(photo).then(function(ref) {
            var photoId = ref.name();
            return photoId;
          });
          //}
        },

        find: function(photoId) {
          // return photos.$child(photoId);
          // return photos.$asObject(photoId);


          var photo = $firebase(ref.child(photoId));
          return photo.$asObject();
        },

        remove: function(photoId) {
          if (User.signedIn()) {
            var photo = Photo.find(photoId);
            photo.$on('loaded', function() {
              var user = User.findByUsername(photo.owner);
              photos.$remove(photoId).then(function() {
                user.$child('photos').$remove(photoId);
              });
            });
          }
        },

        edit: function(photo, photoId) {
          // TODO: commented this out, it is buggerry pooped
          //               if (User.signedIn()) {
          //                  var photo = Photo.find(photoId);
          //                  photo.$on('loaded', function () {
          //                     var user = User.findByUsername(photo.owner);
          //                     photos.$update(photo);
          //                  });
          //               }
        },

        addComment: function(photoId, comment) {
          if (User.signedIn()) {
            var user = User.getCurrent();
            comment.username = user.username;
            comment.photoId = photoId;
            comment.updated = (new Date()).getTime();
            photos.child(photoId).$child('comments').$add(comment).then(function(ref) {
              user.$child('comments').$child(ref.name()).$set({
                id: ref.name(),
                photoId: photoId
              });
            });
          }
        },

        // TODO: User should be able to edit their comments
        // editComment: function(photo, photoId) {
        //
        // },

        deleteComment: function(photo, comment, commentId) {
          if (User.signedIn()) {
            var user = User.findByUsername(comment.username);
            photo.$child('comments').$remove(commentId).then(function() {
              user.$child('comments').$remove(commentId);
            });
          }
        }
      };

      return Photo;
    }
  ]);
