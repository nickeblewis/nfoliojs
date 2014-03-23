'use strict';

angular.module('farnboroughyoApp')
  .directive('grid', function () {
    return {
      template: '<div class="col-md-12 place-card element general">' +
								'<div class="isotope" isotope-container  iso-use-init-event="true" iso-method-subscribe="my-iso-method" ng-cloak>' +
								'<div class="repeat-item col-md-3 col-sm-6 element place-card general" ng-repeat="place in places | orderByPriority | filter:search | orderBy:updated:reverse=true" isotope-item>' +
								'<div class="hover_img {{place.class}}">' +
'<h2><a data-ng-href="#/show/{{place.$id}}">{{place.name}}</a></h2>' +
'</div>' +
'<div class="item_description">' +
'<img src="http://placehold.it/150x150" ng-if="place.pic != null" />' +
'<p class="content" ng-show="isAuthorised" editable-textarea="place.description" e-cols="17" e-rows="6" e-style="width: 100%; font-size: 14px;" onaftersave="save()">' +
'{{place.description || "empty"}}         ' +
'</p>' +
'<p class="content" ng-show="!isAuthorised">' +
'{{place.description || "empty"}}         ' +
'</p>' +
'<p class="meta">' +
'Updated {{timeAgo(place.updated)}}' +
'</p>' +
'</div>' +
'</div>' +
'</div>' +
'</div>',
      restrict: 'E',
      replace: true
    };
  });


