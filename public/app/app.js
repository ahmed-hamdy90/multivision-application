/**
 * multiVision Module
 * @author ahmed hamdy <ahmedhamdy20@gmail.com>
 */
angular.module('multiVisionApp', [$ngResource, $ngRoute])
    /**
     * multiVision app configuration function
     * @param  {$routeProvider} $routeProvider       inject route provider object by dependeny injection
     * @param  {$locationProvider} $locationProvider inject location provider object by dependeny injection
     */
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider
          .when("/", {
              templateUrl : "/partials/main",
              controller : "MainCtrl"
          });

    }])
    /**
     * Main Controller
     * @param  {$rootScopeProvider} $scope inject scope provider object by dependeny injection
     */
    .controller('MainCtrl', ['$$scope', function ($scope) {

        /**
         * hello veriable
         * @type {String}
         */
        $scope.hello = "Hello Angular";

    }]);
