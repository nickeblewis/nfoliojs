/**
 * Created by lewisn2 on 04/07/2014.
 */

angular.module('nfolio')
   .factory('Tag',
   function ($firebase, User, FIREBASE_URL) {

      var ref = new Firebase(FIREBASE_URL + 'tags');

      var tags = $firebase(ref);

      var Tag = {
         all: tags,
         create: function (tag) {
            return tags.$add(tag).then(function (ref) {
               var tagId = ref.name();

               // TODO: maybe we should nest tags????
               // user.$child('tags').$child(tagId).$set(tagId);

               return tagId;
            });
         },

         find: function (tagId) {
            return tags.$child(tagId);
         },

         remove: function (tagId) {
//            if (User.signedIn()) {
//               var tag = Tag.find(tagId);
//               tag.$on('loaded', function () {
//                  var user = User.findByUsername(tag.owner);
                  tags.$remove(tagId).then(function () {
                     user.$child('tags').$remove(tagId);
                  });
//               });
//            }
         },

         edit: function(tag, tagId) {
            // TODO: Users can darn well edit their tags you know
         }         
      };

      return Tag;
   });