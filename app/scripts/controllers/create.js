'use strict';

angular.module('farnboroughyoApp')
	.controller('CreateCtrl', function ($scope, $location, $timeout, fbRequestUrl, fbURL) {
  		$scope.save = function() {
        var messageListRef = new Firebase(fbURL);
        var newMessageRef = messageListRef.push();
        //newMessageRef.set({'user_id': 'fred', 'text': 'Yabba Dabba Doo!'});
        
    	  $scope.place.updated = (new Date()).getTime();
			  $scope.place.imageData = 0;
	  	  var f = $scope.files[0];
	  	  var reader = new FileReader();
	  
	  	  reader.onload = (function(theFile) {
			    return function(e) {
            var filePayload = e.target.result;
				
				    // Note that this will take time to upload, so have to fill some details in later
				    // So using the spinner may be a good idea
			 	    //var f = new Firebase(fbURL + 'pano' + '/filePayload');
            newMessageRef.set({'name': $scope.place.name, 'description': $scope.place.description, 'file': filePayload});
      			//newMessageRef.set(filePayload, function() {         			
        			// Once uploaded, anything you's like to do, do it here        
      			//});
    		}; 
	  	})(f);
	  	reader.readAsDataURL(f);
			
      
        
    	//var newitem = fbRequestUrl.$add($scope.place, function() {
      //		$timeout(function() { $location.path('/'); });
    	//});
        
    	$location.path('/');
  	};
});

