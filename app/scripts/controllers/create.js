'use strict';

angular.module('farnboroughyoApp')
	.controller('CreateCtrl', function ($scope, $location, $timeout, fbRequestUrl, fbURL, $anchorScroll) {
        
  		$scope.save = function() {
        if ($scope.myForm.$valid) {
          var messageListRef = new Firebase(fbURL);
          var newMessageRef = messageListRef.push();          

          $scope.place.updated = (new Date()).getTime();
          
          //$scope.place.imageData = 0;
          
          newMessageRef.set({'name': $scope.place.name, 
                             'description': $scope.place.description, 
                             'updated': $scope.place.updated});
          
          if($scope.files) {
            var f = $scope.files[0];
            var reader = new FileReader();

            reader.onload = (function(theFile) {
              return function(e) {
                var filePayload = e.target.result;
                newMessageRef.update({'file': filePayload});
              }; 
            })(f);
            reader.readAsDataURL(f);

            
          }
          $location.path('/');
        } else {
          alert("Form invalid");
          $location.hash('name');
          $anchorScroll();
        }
      };
});

