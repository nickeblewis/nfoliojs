'use strict';
/*global Firebase*/
/*global FirebaseSimpleLogin*/
/*global moment*/
angular.module('farnboroughyoApp')
  .controller('MainCtrl', function ($scope, $timeout, fbRequestUrl, fbEvents, fbAUTH, fbURL, Auth) {
//     $scope.postsuccess = false;
    // TODO: a lot of the code below is now crap because I have added a service
    var isAuthorised = false;
    $scope.canbetested = true;
		//$scope.place.feed.post = '';
    var ref = new Firebase(fbAUTH);
    new FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        // an error ocurred during login
        console.log(error);
      } else if (user) {
        // You are logged in
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
        isAuthorised = true;
      } else {
        // User has logged out
        console.log('User has logged out');
      }
    });
    $scope.isAuthorised = false;
    $scope.authmessage = '';
    $scope.status = 'Loading...';
    $scope.places = fbRequestUrl;

    $scope.$watch('places', function() {
      console.log('Places has updated ');
      // if($scope.loaded === 1)
      //   $('.isotope').isotope();
    });

    $scope.places.$on('loaded', function() {
      $scope.status = 'Watch this spot for live updates across the site!';
      $scope.loaded = true;
    });

    fbEvents.on('child_changed', function(snapshot) {
      var placeName = snapshot.val().name;
      $scope.status = placeName + ' has been updated';
      console.log('child_changed');
    });

    fbEvents.on('child_added', function(snapshot) {
      var placeName = snapshot.val().name;
      $scope.status = placeName + ' has been added';
    });

    fbEvents.on('child_removed', function(snapshot) {
      var placeName = snapshot.val().name;
      $scope.status = placeName + ' has been removed';
    });

    $scope.modalShown = false;
 
    $scope.toggleModal = function() {
      $scope.modalShown = !$scope.modalShown;
    };
  

    $scope.save = function() {
      $scope.places.$save();
    };

    $scope.timeAgo = function(ms) {
      return moment(ms).fromNow();
    };
		
		$scope.postStatus = function(placeId) {
			var messageListRef = new Firebase(fbURL + placeId + '/feed');
			var newMessageRef = messageListRef.push();          
			newMessageRef.set({
				'message': $scope.post,
				'updated': (new Date()).getTime()
			});			
// 			$scope.postsuccess = true;
		};
    
  });
