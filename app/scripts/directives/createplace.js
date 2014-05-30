'use strict';

angular.module('farnboroughyoApp')

	.run(['$templateCache',
		function ($templateCache) {
			$templateCache.put(
				'createplace.html',
				'<div class="animate-repeat col-md-12 card">' +
				'<div class="panel panel-default" ng-show="!createMode">' +
'<div class="panel-heading">Create/Edit</div>' +
'<div class="panel-body">' +
'<br/>' +
'<p>' +
'<form class="form-horizontal" role="form" name="myForm">' +
'<div class="form-group" ng-class="{error: myForm.name.$invalid && !myForm.name.$pristine}">'+
'<label for="inputEmail3" class="col-sm-2 control-label">Name</label>' +
'<div class="col-sm-10">' +
'<input type="text" class="form-control" id="inputEmail3" placeholder="Name" name="name" ng-model="place.name" required>' +
'<span ng-show="myForm.name.$error.required && !myForm.name.$pristine" class="help-inline">' +
'Required {{myForm.name.$pristine}}</span>' +
'</div>' +
'</div>' +
'<div class="form-group">' +
'<label for="inputPassword3" class="col-sm-2 control-label">Description</label>' +
'<div class="col-sm-10">' +
'<textarea class="form-control" rows="5" name="description" ng-model="place.description"></textarea>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<div class="col-sm-offset-2 col-sm-10">' +
              '<a href="#/" class="btn">Cancel</a>' +
              '<button ng-click="save()" ng-disabled="myForm.$invalid"' +
                  'class="btn btn-primary" class="btn btn-default">Save</button>' +
              '<button ng-click="destroy()"' +
                  'ng-show="place.$remove" class="btn btn-danger">Delete</button>' +
            '</div>'+
          '</div>'+
        '</form>' +
      '</p>' +
  '</div></div>'
  
			);
		}
	])

	.controller('CreatePlaceCtrl', function ($scope, $location, $timeout, fbRequestUrl, fbURL, $anchorScroll, Auth) {
		
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
	})


  .directive('createplace', function () {
    return {
      templateUrl: 'createplace.html',
      restrict: 'EA',
			controller: 'CreatePlaceCtrl'
    };
  });
