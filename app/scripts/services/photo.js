'use strict';
/*global AWS*/
angular.module('nfolio')
   .factory('album', ['$rootScope', '$resource',
      function($rootScope, $resource){
         var url = $.cloudinary.url('nfolio', {format: 'json', type: 'list'});
         //cache bust
         url = url + "?" + Math.ceil(new Date().getTime()/1000);
         return $resource(url, {}, {
            photos: {method:'GET', isArray:false}
         });
      }])
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
//                 if(files) {
//                   var userFolder = user.username,
//                       imageFolder = (new Date()).getTime();
//                   var f = files[0];
//                   var reader = new FileReader();
//                   reader.onload = function(e) {
//                     var img = new Image();
//                     img.onload=function() {
//                       resizeUpload(this,1080, 'medium', userFolder + '/' + imageFolder + '/medium/' + f.name, ref);
//                     };
//                     var img2 = new Image();
//                     img2.onload=function(){
//                       resizeUpload(this,300, 'thumb', userFolder + '/' + imageFolder + '/thumb/' + f.name, ref);
//                     };
//                     img.src=e.target.result;
//                     img2.src=e.target.result;
//                   };
//                   reader.readAsDataURL(f);
//                 }
                 user.$child('photos').$child(photoId).$set(photoId);

                 return photoId;
               });
             }
            },

            find: function (photoId) {
             return photos.$child(photoId);
            },

            remove: function (photoId) {
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
//               if (User.signedIn()) {
//                  var photo = Photo.find(photoId);
//                  photo.$on('loaded', function () {
//                     var user = User.findByUsername(photo.owner);
//                     photos.$update(photo);
//                  });
//               }
            },

            addComment: function (photoId, comment) {
             if (User.signedIn()) {
               var user = User.getCurrent();
               comment.username = user.username;
               comment.photoId = photoId;
                comment.updated = (new Date()).getTime();
               photos.$child(photoId).$child('comments').$add(comment).then(function (ref) {
                 user.$child('comments').$child(ref.name()).$set({id: ref.name(), photoId: photoId});
               });
             }
            },

            // TODO: User should be able to edit their comments
            // editComment: function(photo, photoId) {
            //
            // },

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

      if (type === 'thumb') {
         c=document.createElement("canvas");

         // Calculate thumbnail photo dimensions

         // I want to bring the image away from the side a little bit, so padding of 10 seems quite good
         var pad = 10;

         // Next calculate the area into which the photo will be scaled into
         var mwh = maxwidthheight - (pad * 2);

         // Calculate the scaling ratio based on original height and width of the photo
         var tr = mwh/Math.max(image.width,image.height);

         // Calculate the new width of the image based on the ratio
         var tw = Math.round(image.width*tr);

         // Calculate the new height od the image based on ratio
         var th = Math.round(image.height*tr);

         var tx, ty;

         // Set the overall canvas area to being square
         c.width = maxwidthheight;
         c.height = maxwidthheight;

         // Get context of the canvas
         var ctx = c.getContext("2d");

         // Draw a light grey 300x300 square that forms the frame for the thumbnail
         ctx.fillStyle = 'rgb(200,200,200)';
         ctx.fillRect(0,0,maxwidthheight,maxwidthheight);

         // The containing rectangle for the image is a darker grey
         // ctx.fillStyle = 'rgb(100,100,100)'

         // CALCULATE IF PHOTO IS LANDSCAPE OR PORTRAIT ORIENTATION
         if (image.height > image.width) {
            // PORTRAIT photos
            // 75 is 150 divided by 2
            // 10 for a little bit of padding
            // 150 for half of 300
            // 280 because padding of 10 both ends 10 x 2 take that off 300, you get 280!! :-)

            // ctx.fillRect(75,10,150,280);

            // We subtract the width of the new image from the canvas width, divide by 2 to get the x co-ordinates
            tx = (c.width - tw) / 2;

            // The y co-ordinates is simply same as padding
            ty = pad;

            // Scale and draw the image
            ctx.drawImage(image,tx,ty,tw,th);

         } else {
            // LANDSCAPE PHOTOS (and this will also capture square cropped images)
            // 10 is edge padding
            // 75 is height - photo height divided by 2
            // 280 is width less padding of 10 both ends
            // 150 is half the height of the frame
            // ctx.fillRect(10,75,280,150);

            // Similar to above but we flip it around onto the Y axis
            ty = (c.height - th) / 2;

            // x co-ords are based on the padding
            tx = pad;

            ctx.drawImage(image,tx,ty,tw,th);
         }
      } else {
         // MEDIUM
         var r = maxwidthheight/Math.max(image.width,image.height);
         var w = Math.round(image.width*r);
         var h = Math.round(image.height*r);
         var c = document.createElement("canvas");

         c.width = w;
         c.height = h;

         c.getContext("2d").drawImage(image,0,0,w,h);
      }

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