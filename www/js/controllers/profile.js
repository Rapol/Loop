var App = angular.module('loop.controllers.profile', []);

App.controller('profileController', ['$scope', '$ionicScrollDelegate','Survey', 'Loop', function($scope, $ionicScrollDelegate, Survey, Loop) {

	$scope.tabs = [{
		title: "Surveys Sent",
		content: Survey.market
	}, {
		title: "Surveys Received",
		content: Survey.friends
	}, {
		title: "Loops Subscribed",
		content: Loop.publicLoops
	}];

	$scope.currentTab = $scope.tabs[0];
}]);