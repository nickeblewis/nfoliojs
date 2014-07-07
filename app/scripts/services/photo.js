'use strict';
angular.module('nfolio')
   .factory('Photo',
      function ($firebase, User, FIREBASE_URL) {

         var ref = new Firebase(FIREBASE_URL + 'photos');

         var photos = $firebase(ref);

         var Photo = {
            all: photos,
            create: function (photo, files) {
             if (User.signedIn()) {
               var user = User.getCurrent();
               photo.owner = user.username;
               return photos.$add(photo).then(function (ref) {
                 var photoId = ref.name();
                 if(files) {
                   var userFolder = user.username,
                       imageFolder = (new Date()).getTime();
                   var f = files[0];
                   var reader = new FileReader();
                   reader.onload = function(e) {
                     var img = new Image();
                     img.onload=function() {
                       resizeUpload(this,700, 'medium', userFolder + '/' + imageFolder + '/medium/' + f.name, ref);
                     };
                     var img2 = new Image();
                     img2.onload=function(){
                       resizeUpload(this,300, 'thumb', userFolder + '/' + imageFolder + '/thumb/' + f.name, ref);
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

            edit: function(photo, photoId) {
               // TODO: commented this out, it is buggerry pooped
               if (User.signedIn()) {
                  var photo = Photo.find(photoId);
                  photo.$on('loaded', function () {
//                     var user = User.findByUsername(photo.owner);
                     photos.$update(photo);
                  });
               }
            },

            addComment: function (photoId, comment) {
             if (User.signedIn()) {
               var user = User.getCurrent();
               comment.username = user.username;
               comment.photoId = photoId;
                comment.updated = (new Date()).getTime();
                // TODO: Change updated date against photo?
               photos.$child(photoId).$child('comments').$add(comment).then(function (ref) {
                 user.$child('comments').$child(ref.name()).$set({id: ref.name(), photoId: photoId});
               });
             }
            },

// TODO: User should be able to edit their comments
//            editComment: function(photo, photoId) {
//
//            },

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

  function resizeUpload(image,maxwidthheight,type,filename,newMessageRef) {
    var r,w,h,c,c,c;

     r=maxwidthheight/Math.max(image.width,image.height);
     w=Math.round(image.width*r);
     h=Math.round(image.height*r);
     c=document.createElement("canvas");
     c.width=w;c.height=h;

     if (type === 'thumb') {
        w = maxwidthheight;
        h = maxwidthheight;
        c.width=w;c.height=h;
     }

     c.getContext("2d").drawImage(image,0,0,w,h);

    var thumbImage = {
      fileName: filename,
      bucket: 'nfolio',
      dataURL: c.toDataURL(),
      fileType: 'image/jpeg'
    };
                
    var message = '';

    if (type === 'thumb') {
        message = {'fileThumb': filename};
    } else {
        message = {'fileMedium': filename};
    }
                
    sendS3(thumbImage, message,newMessageRef);
  }

  function sendS3(s3Pkg,message,ref) {  
    var blobData = dataURLtoBlob(s3Pkg.dataURL);

    // TODO: Amazon emailed me about this security hole - not safe to store this key in this way
    AWS.config.update({accessKeyId: 'AKIAIUAB3DKYZOD3S7VQ', secretAccessKey: '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'});
    AWS.config.region = 'eu-west-1';

    var bucket = new AWS.S3({params: {Bucket: s3Pkg.bucket}});

    var params = {
      Key: s3Pkg.fileName,
      ContentType: s3Pkg.fileType, 
      Body: blobData
    };

    bucket.putObject(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(s3Pkg.fileName);
        console.log(data);
        ref.update(message);
      }
    });  
  }

   function dataURLtoBlob(dataURL) {
      var BASE64_MARKER = ';base64,';

      var parts, contentType, raw;

      if (dataURL.indexOf(BASE64_MARKER) == -1) {
        parts = dataURL.split(',');
        contentType = parts[0].split(':')[1];
        raw = parts[1];
        return new Blob([raw], {type: contentType});
      }

      parts = dataURL.split(BASE64_MARKER);
      contentType = parts[0].split(':')[1];
      raw = window.atob(parts[1]);

      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], {type: contentType});
  }