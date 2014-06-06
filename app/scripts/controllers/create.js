'use strict';
/*global Firebase*/
/*global Auth*/
angular.module('nfolio')
  .controller('CreateCtrl', ['$scope', '$location', '$timeout', 'fbRequestUrl', 'fbURL', '$anchorScroll', 'Auth', '$upload', function ($scope, $location, $timeout, fbRequestUrl, fbURL, $anchorScroll, Auth, $upload) {
    $scope.place = {};
    $scope.logIn = function() {
          $scope.isAuthorised = true;
          $scope.authmessage = 'You have successfully logged in';
        };
    
        $scope.signedIn = function() {
          return Auth.signedIn();
        };

        $scope.logOut = function() {
          return Auth.logout();
        };
    $scope.save = function() {

      if ($scope.myForm.$valid) {
        var messageListRef = new Firebase(fbURL);
        var newMessageRef = messageListRef.push();

        $scope.place.updated = (new Date()).getTime();
   
        newMessageRef.set({
          'name': $scope.place.name,
          'description': $scope.place.description,
          'updated': $scope.place.updated,
          'userid': Auth.signedInAs().id
        });
          
        if($scope.files) {
        
          var userFolder = 'user' + Auth.signedInAs().id,
              imageFolder = 'image' + (new Date()).getTime();;
        
          var f = $scope.files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
            // return function(e) {

            var img = new Image();
              img.onload=function(){
                var MAXWidthHeight = 700;
                var r=MAXWidthHeight/Math.max(this.width,this.height),
                    w=Math.round(this.width*r),
                    h=Math.round(this.height*r),
                    c=document.createElement("canvas");

              c.width=w;c.height=h;
              c.getContext("2d").drawImage(this,0,0,w,h);
                  
              var mediumImage = {
                fileName: userFolder + '/' + imageFolder + '/medium/' + f.name,
                bucket: 'nfolio',
                dataURL: c.toDataURL(),
                fileType: 'image/jpeg'
              }

              var message = {
                'fileMedium': userFolder + '/' + imageFolder + '/medium/' + f.name
              };  
              
              sendS3(mediumImage, message,newMessageRef);              
           }
            
            var img2 = new Image();
            
            img2.onload=function(){
              var MAXWidthHeight = 332;
              var r=MAXWidthHeight/Math.max(this.width,this.height),
                  w=Math.round(this.width*r),
                  h=Math.round(this.height*r),
                  c=document.createElement("canvas");
                  
              c.width=w;c.height=h;
              
              c.getContext("2d").drawImage(this,0,0,w,h);
                  
              var thumbImage = {
                fileName: userFolder + '/' + imageFolder + '/thumb/' + f.name,
                bucket: 'nfolio',
                dataURL: c.toDataURL(),
                fileType: 'image/jpeg'
              }
              
              var message = {
                'fileThumb': userFolder + '/' + imageFolder + '/thumb/' + f.name
              };  
              
              sendS3(thumbImage, message,newMessageRef);                
            }
            
            img.src=e.target.result;
            img2.src=e.target.result;                
          }

        
          reader.readAsDataURL(f);
        }
        $location.path('/');
      } else {
        $location.hash('name');
        $anchorScroll();
      }
    };
    
    $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: 'server/upload/url', //upload.php script, node.js route, or servlet url
        // method: 'POST' or 'PUT',
        // headers: {'header-key': 'header-value'},
        // withCredentials: true,
        data: {myObj: $scope.myModelObj},
        file: file, // or list of files: $files for html5 only
        /* set the file formData name ('Content-Desposition'). Default is 'file' */
        //fileFormDataName: myFile, //or a list of names for multiple files (html5).
        /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
        //formDataAppender: function(formData, key, val){}
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      });
      //.error(...)
      //.then(success, error, progress); 
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
    }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  };
  }]);

function sendS3(s3Pkg,message,ref) {  
  var blobData = dataURLtoBlob(s3Pkg.dataURL);
  AWS.config.update({accessKeyId: 'AKIAIUAB3DKYZOD3S7VQ', secretAccessKey: 'pXgpeXOHVYZZkRYC/3UhedZw6rJ8q7XJwKa6eZ4V'});
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
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = parts[1];

      return new Blob([raw], {type: contentType});
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
}
