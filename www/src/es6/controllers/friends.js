//Controllers for friends page
var App = angular.module('loop.controllers.friends', []);

App.controller('friendsController', ['$scope', 'friendsService', function ($scope, friendsService) {

	$scope.friends = friendsService.getFriends();

	$scope.friendFilters = "";

	$scope.topFriends = friendsService.getTopFriends();
}]);
