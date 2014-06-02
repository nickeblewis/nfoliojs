'use strict';
/*global Firebase*/
/*global Auth*/
angular.module('farnboroughyoApp')
  .controller('CreateCtrl', function ($scope, $location, $timeout, fbRequestUrl, fbURL, $anchorScroll, Auth) {
		
		$scope.place = {};
		
		
    navigator.geolocation.getCurrentPosition(
      function(position) {
        $scope.place.lat = position.coords.latitude;
        $scope.place.lng = position.coords.longitude;
      });
    
		$scope.save = function() {
        if ($scope.myForm.$valid) {
          var messageListRef = new Firebase(fbURL);
          var newMessageRef = messageListRef.push();
          $scope.place.updated = (new Date()).getTime();
          //$scope.place.imageData = 0;          
          newMessageRef.set({'name': $scope.place.name,
                             'description': $scope.place.description,
                             'lat': $scope.place.lat,
                             'lng': $scope.place.lng,
                             'updated': $scope.place.updated,
                             'userid': Auth.signedInAs().id
                            });
          
          if($scope.files) {
            var f = $scope.files[0];
            var reader = new FileReader();

            reader.onload = (function() {
              return function(e) {
                var filePayload = e.target.result;
								
								// start - Upload using S3 here
// 								var appId = '686219584770096';
//         				var roleArn = 'arn:aws:iam::931603287051:role/farnborough';
//         				var bucketName = 'farnborough';
//         				var fbUserId;
								
// 						
							AWS.config.update({accessKeyId: 'AKIAIUAB3DKYZOD3S7VQ', secretAccessKey: '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'});
								AWS.config.region = 'eu-west-1';
								
        				var bucket = new AWS.S3({params: {Bucket: 'farnborough'}});
								var params = {Key: f.name,ContentType: f.type, Body: f};
                bucket.putObject(params, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });
								// end - Upload using S3 here
								
                newMessageRef.update({'file': f.name});
              };
            })(f);
            reader.readAsDataURL(f);
          }
          $location.path('/');
        } else {
          $location.hash('name');
          $anchorScroll();
        }
      };
	});

