/**
 * Created by Jatin Bhatia on 12/16/2015.
 */

var App = angular.module('loop.controllers.loops', []);

App.controller('myLoopsController', ['$scope', '$ionicScrollDelegate', function($scope, $ionicScrollDelegate){
    $scope.locationTabs = [{
        url: 'views/loops/privateLoops.html',
        title:'Public'
    }, {
        url: 'views/loops/publicLoops.html',
        title:'Private'
    }, ];

    $scope.currentTab = 'views/loops/privateLoops.html';

    $scope.onClickTab = function(tab) {
        $scope.currentTab = tab.url;
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
}]);