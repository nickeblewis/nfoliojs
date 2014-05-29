'use strict';
/*global Firebase*/
/*global Auth*/
angular.module('farnboroughyoApp')
  .controller('CreateCtrl', function ($scope, $location, $timeout, fbRequestUrl, fbURL, $anchorScroll) {
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
                             'lat': $scope.lat,
                             'lng': $scope.lng,
                             'updated': $scope.place.updated,
                             'userid': Auth.signedInAs().id
                            });
          
          if($scope.files) {
            var f = $scope.files[0];
            var reader = new FileReader();

            reader.onload = (function() {
              return function(e) {
                var filePayload = e.target.result;
                newMessageRef.update({'file': filePayload});
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

