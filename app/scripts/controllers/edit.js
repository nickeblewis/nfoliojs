'use strict';

/*global Firebase*/
angular.module('nfolio')
  .controller('EditCtrl', ['$scope', '$location', '$routeParams', '$firebase', 'fbURL', 'Auth', function ($scope, $location, $routeParams, $firebase, fbURL, Auth) {
    var placeUrl = fbURL + $routeParams.placeId;
    $scope.place = $firebase(new Firebase(placeUrl));
    $scope.place.userid = Auth.signedInAs().id;
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
    $scope.destroy = function() {
      var s3 = new AWS.S3();
      AWS.config.update({accessKeyId: 'AKIAIUAB3DKYZOD3S7VQ', secretAccessKey: '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'});
      AWS.config.region = 'eu-west-1';
      var params = {
        Bucket: 'nfolio', // required
        Delete: {
          Objects: [
            {
              Key: $scope.place.fileThumb
            },
            {
              Key: $scope.place.fileMedium
            }
          ],
          
        }
      };
      
      s3.deleteObjects(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log('DONE' + data);           // successful response
      });
      $scope.place.$remove();
      $location.path('/');
    };

    $scope.save = function() {
      // NOTE: I felt that if people edit or post en-masse the homepage order would go crazy, so for now, commented this line out 
      //$scope.place.updated = (new Date()).getTime();
      $scope.place.$save();
      $location.path('/');
    };
  }]);
