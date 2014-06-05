'use strict';
/*global Firebase*/
/*global Auth*/
angular.module('nfolio')
  .controller('CreateCtrl', ['$scope', '$location', '$timeout', 'fbRequestUrl', 'fbURL', '$anchorScroll', 'Auth', function ($scope, $location, $timeout, fbRequestUrl, fbURL, $anchorScroll, Auth) {
    $scope.place = {};

//     navigator.geolocation.getCurrentPosition(function(position) {
//       $scope.place.lat = position.coords.latitude;
//       $scope.place.lng = position.coords.longitude;
//     });
    
    $scope.save = function() {

    if ($scope.myForm.$valid) {
      var messageListRef = new Firebase(fbURL);
      var newMessageRef = messageListRef.push();

      $scope.place.updated = (new Date()).getTime();
   
      newMessageRef.set({
        'name': $scope.place.name,
        'description': $scope.place.description,
//         'lat': $scope.place.lat,
//         'lng': $scope.place.lng,
        'updated': $scope.place.updated,
        'userid': Auth.signedInAs().id
      });
          
      if($scope.files) {
        
        var userFolder = 'user' + Auth.signedInAs().id,
            imageFolder = 'image' + (new Date()).getTime();;
        
        var f = $scope.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
//           return function(e) {
            
            var img = new Image();
            img.onload=function(){
              var MAXWidthHeight = 700;
              var r=MAXWidthHeight/Math.max(this.width,this.height),
                  w=Math.round(this.width*r),
                  h=Math.round(this.height*r),
                  c=document.createElement("canvas");
                  
              c.width=w;c.height=h;
              
              // context.drawImage(img,x,y,width,height);
              // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
              c.getContext("2d").drawImage(this,0,0,w,h);
//               c.getContext("2d").drawImage(this,0,0,w,100,0,0,w,h);
//               c.getContext("2d").drawImage(img,90,130,50,60,10,10,50,60);
              
              //this.src=c.toDataURL();
              //cument.body.appendChild(this);
                  
              var mediumImage = {
                fileName: userFolder + '/' + imageFolder + '/medium/' + f.name,
                bucket: 'nfolio',
                dataURL: c.toDataURL(),
                fileType: 'image/jpeg'
              }
              console.log('calling s3send for medimages...');
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
              
              // context.drawImage(img,x,y,width,height);
              // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
              c.getContext("2d").drawImage(this,0,0,w,h);
//               c.getContext("2d").drawImage(this,0,0,w,100,0,0,w,h);
//               c.getContext("2d").drawImage(img,90,130,50,60,10,10,50,60);
              
              //this.src=c.toDataURL();
              //cument.body.appendChild(this);
                  
              var thumbImage = {
                fileName: userFolder + '/' + imageFolder + '/thumb/' + f.name,
                bucket: 'nfolio',
                dataURL: c.toDataURL(),
                fileType: 'image/jpeg'
              }
              console.log('calling s3send for thumbimages...');
              var message = {
                'fileThumb': userFolder + '/' + imageFolder + '/thumb/' + f.name
              };  
              sendS3(thumbImage, message,newMessageRef);  
              
           }

//             var imgMedium = new Image();
//             imgMedium.onload=function(){
//               var MAXWidthHeight = 700;
//               var r=MAXWidthHeight/Math.max(this.width,this.height),
//               w=Math.round(this.width*r),
//               h=Math.round(this.height*r),
//               c=document.createElement("canvas");
//               c.width=w;c.height=h;
//               c.getContext("2d").drawImage(this,0,0,w,h);
//               this.src=c.toDataURL();
//               //cument.body.appendChild(this);
                  
//               var mediumImage = {
//                 fileName: userFolder + '/' + imageFolder + '/medium/' + f.name,
//                 bucket: 'nfolio',
//                 dataURL: c.toDataURL(),
//                 fileType: 'image/jpeg'
//               }
//             sendS3(mediumImage);              
//            }
            
             img.src=e.target.result;
             img2.src=e.target.result;
                
            //var filePayload = e.target.result;
            //img.src = e.target.result;

//             var fullsizeImage = {
//               fileName: userFolder + '/' + imageFolder + '/original/' + f.name,
//               bucket: 'nfolio',
//               dataURL: filePayload,
//               fileType: 'image/jpeg'
//             }
            
//             sendS3(fullsizeImage);

                            
//             newMessageRef.update({
// //               'fileOriginal': userFolder + '/' + imageFolder + '/original/' + f.name,
//               'fileThumb': userFolder + '/' + imageFolder + '/thumb/' + f.name,
//               'fileMedium': userFolder + '/' + imageFolder + '/medium/' + f.name
//             });
          }
//         })(f);
        
        reader.readAsDataURL(f);
      }
        $location.path('/');
      } else {
        $location.hash('name');
        $anchorScroll();
      }
    };
  }]);

function sendS3(s3Pkg,message,ref) {
//   var img = new Image();
//   img.onload=function(){
//     var MAXWidthHeight = 700;
//     var r=MAXWidthHeight/Math.max(this.width,this.height),
//     w=Math.round(this.width*r),
//     h=Math.round(this.height*r),
//     c=document.createElement("canvas");                  
//     c.width=w;c.height=h;
//     c.getContext("2d").drawImage(this,0,0,w,h);
//     this.src=c.toDataURL();
//   }
  
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
