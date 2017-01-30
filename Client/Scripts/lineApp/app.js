/// <reference path="../angular.js" />

/// <reference path="../angular.min.js" />  

/// <reference path="../angular-animate.js" />  

/// <reference path="../angular-animate.min.js" />  

/// <reference path="../angular-file-upload.js" />  

/// <reference path="../angular-file-upload.min.js" />  
var app;

(function () {

    app = angular.module("lineManagement", []);

    angular.module('lineManagement')
        .filter('myDateFormat', function myDateFormat($filter) {
            return function (text) {
                if (text != null)
                    return $filter('date')(new Date(parseInt(text.substr(6))), "HH:mm:ss");
            }
        });
      
})();