/**
 * Created by lewisn2 on 03/07/2014.
 */
angular.module('nfolio')
.directive("imageResize", [
   "$parse", function($parse) {
      return {
         link: function(scope, elm, attrs) {
            var imagePercent;
            imagePercent = $parse(attrs.imagePercent)(scope);
            elm.bind("load", function(e) {
               elm.unbind("load"); //Hack to ensure load is called only once
               var canvas, ctx, neededHeight, neededWidth;
               neededHeight = elm[0].naturalHeight * imagePercent / 100;
               neededWidth = elm[0].naturalWidth * imagePercent / 100;
               canvas = document.createElement("canvas");
               canvas.width = neededWidth;
               canvas.height = neededHeight;
               ctx = canvas.getContext("2d");
               ctx.drawImage(elm[0], 0, 0, neededWidth, neededHeight);
               elm.attr('src', canvas.toDataURL("image/jpeg"));
            });
         }
      };
   }
]);
