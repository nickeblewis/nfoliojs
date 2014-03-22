'use strict';

angular.module('farnboroughyoApp')
  .controller('MainCtrl', function ($scope, $timeout, fbRequestUrl, fbEvents, fbAUTH) {
    var isAuthorised = false;

  var ref = new Firebase(fbAUTH);
  var auth = new FirebaseSimpleLogin(ref, function(error, user) {
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
  $scope.authmessage = "";
  $scope.status = "Loading...";
  $scope.places = fbRequestUrl;

  $scope.$watch('places', function() {
    console.log('Places has updated ');
    // if($scope.loaded === 1)
    //   $('.isotope').isotope();
  });

  $scope.places.$on("loaded", function() {
      $scope.status = "Watch this spot for live updates across the site!";
      $scope.loaded = 1;
      $scope.$emit('iso-init');
  });

  fbEvents.on("child_changed", function(snapshot) {    
    var placeName = snapshot.val().name;
    $scope.status = placeName + " has been updated";    
    console.log('FB has updated ');
    // if($scope.loaded === 1)
    //   $('.isotope').isotope('reloadItems').isotope();
    // $scope.$emit('iso-init');
    $timeout(function() {
      $scope.$emit('my-iso-method', {name:'orderBy', params:null});
    });
  });

  fbEvents.on("child_added", function(snapshot) {    
      var placeName = snapshot.val().name;
      $scope.status = placeName + " has been added";
      //$scope.$emit('iso-updated');
  });

  fbEvents.on("child_removed", function(snapshot) {    
      var placeName = snapshot.val().name;
      $scope.status = placeName + " has been removed";
      // $scope.$emit('iso-init');
  });

  $scope.modalShown = false;
 
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
  
  $scope.logOut = function() {
    $scope.isAuthorised = false;
    $scope.authmessage = "You have successfully logged out";
    //auth.logout();
  };

  $scope.logIn = function() {
    $scope.isAuthorised = true;
    $scope.authmessage = "You have successfully logged in";
  };

  $scope.save = function() {
    $scope.places.$save();
  };

  $scope.timeAgo = function(ms) {
    return moment(ms).fromNow();
  };
  });
