'use strict';
// Taken from http://stackoverflow.com/questions/16579427/html5-file-upload-with-angularjs
// Take a look at the Plunkr for more in-depth look at extracting images, creating thumbs etc
angular.module('farnboroughyoApp')
	.directive('filelistBind', function() {
	  return function( scope, elm, attrs ) {
			elm.bind('change', function( evt ) {
				scope.$apply(function() {
					scope[ attrs.name ] = evt.target.files;
					console.log( scope[ attrs.name ] );
				});
			});
		};
	});