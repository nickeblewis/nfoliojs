'use strict';
/*global Firebase*/
/*global Auth*/
angular.module('farnboroughyoApp')
  .controller('CreateCtrl', function ($scope, $location, $timeout, fbRequestUrl, fbURL, $anchorScroll, Auth) {
		
		$scope.place = {};
		
		// Grab the current GPS location - not too sure how FG will use this at the moment but lets just take it anyway
    navigator.geolocation.getCurrentPosition(
      function(position) {
        $scope.place.lat = position.coords.latitude;
        $scope.place.lng = position.coords.longitude;
      });
    
		// User has clicked save on the form
		$scope.save = function() {
			
			// Proceed only if the form has passed validation
			if ($scope.myForm.$valid) {
				
					// Create a reference to Firebase - this should be moved to data services ideally as implementation should not be a concern of the controller
          var messageListRef = new Firebase(fbURL);
          var newMessageRef = messageListRef.push();
				
					// Record the current timestamp as this is used to give users an indication of the age of this item
          $scope.place.updated = (new Date()).getTime();
   
					// Item is added to firebase without image at this point (if there was one of course)
          newMessageRef.set({'name': $scope.place.name,
                             'description': $scope.place.description,
                             'lat': $scope.place.lat,
                             'lng': $scope.place.lng,
                             'updated': $scope.place.updated,
                             'userid': Auth.signedInAs().id
                            });
          
					// Now for the image processing part.... if there are images to process otherwise it doesn't worry about it
          if($scope.files) {
						// Currently onle single files are supported
						// TODO: Implement a drag-and-drop to upload multiple files (maybe)
            var f = $scope.files[0];
            var reader = new FileReader();

						// TODO: Using the canvas object resize the image in various ways 
						// http://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
            reader.onload = (function() {
              return function(e) {

								// Read in the file data object
                var filePayload = e.target.result;

								// Hard coded authentication 
								// TODO: Make this more secure after reading up on this more
								AWS.config.update({accessKeyId: 'AKIAIUAB3DKYZOD3S7VQ', secretAccessKey: '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'});
								AWS.config.region = 'eu-west-1';
								
								// Reference the S3 bucket object
        				var bucket = new AWS.S3({params: {Bucket: 'farnborough'}});
								var params = {Key: f.name,ContentType: f.type, Body: f};
                bucket.putObject(params, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });

								// Write the filename to Firebase
								// TODO: This would be better being a complete S3 reference and even better if the filename was randomised to avoid duplication of names
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

