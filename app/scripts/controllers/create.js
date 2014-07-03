// TODO: This code has been superceded by new code, so maybe this can be deleted???
'use strict';
/*global Firebase*/
/*global Auth*/
/*global AWS*/
/*global require */
angular.module('nfolio')
  .controller('CreateCtrl', ['$rootScope', '$scope', '$location', '$timeout', 'fbRequestUrl', 'fbURL', '$anchorScroll', function ($rootScope, $scope, $location, $timeout, fbRequestUrl, fbURL, $anchorScroll) {
    $scope.place = {};
//     $scope.signedIn = function() {
//       return Auth.signedIn();
//     };
//     $scope.signedInAs = function() {
//       return $rootScope.signedInAs;
//     };
//     $scope.logOut = function() {
//       return Auth.logout();
//     };
    $scope.save = function () {
      if ($scope.myForm.$valid) {
        var messageListRef = new Firebase(fbURL);
        var newMessageRef = messageListRef.push();

        $scope.place.updated = (new Date()).getTime();
        newMessageRef.set({
          'name': $scope.place.name,
          'description': $scope.place.description,
          'updated': $scope.place.updated,
          'userid': $scope.currentUser
        });
        
        if($scope.files) {
          var userFolder = 'user' + $scope.currentUser,
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
        $location.path('/');
      } else {
        $location.hash('name');
        $anchorScroll();
      }
    };
    
//    $scope.onFileSelect = function($files) {
//      for (var i = 0; i < $files.length; i++) {
//        var file = $files[i];
//        $scope.upload = $upload.upload({
//          url: 'server/upload/url', //upload.php script, node.js route, or servlet url
//          data: {myObj: $scope.myModelObj},
//          file: file // or list of files: $files for html5 only
//        }).progress(function(evt) {
//          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
//        }).success(function(data, status, headers, config) {
//          console.log(data);
//        });
//      }
//    };
   }]);

function resizeUpload(image,maxwidthheight,type,filename,newMessageRef) {
  var r=maxwidthheight/Math.max(image.width,image.height),
      w=Math.round(image.width*r),
      h=Math.round(image.height*r),
      c=document.createElement("canvas");
      c.width=w;c.height=h;
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
   var parts, contentType, raw, rawLength, uInt8Array;

   if (dataURL.indexOf(BASE64_MARKER) == -1) {
      parts = dataURL.split(',');
      contentType = parts[0].split(':')[1];
      raw = parts[1];

      return new Blob([raw], {type: contentType});
   }

   parts = dataURL.split(BASE64_MARKER);
   contentType = parts[0].split(':')[1];
   raw = window.atob(parts[1]);
    rawLength = raw.length;

    uInt8Array = new Uint8Array(rawLength);

   for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
   }

   return new Blob([uInt8Array], {type: contentType});
}
