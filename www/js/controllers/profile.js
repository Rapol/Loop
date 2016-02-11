var App = angular.module('loop.controllers.profile', []);

App.controller('profileController', ['$scope', '$ionicScrollDelegate','Survey', function($scope, $ionicScrollDelegate, Survey) {

	$scope.Survey = Survey;

	$scope.surveys = Survey.market;

	$scope.profileInfo = [{
		title: "surveysSent",
		url: 'views/profile/surveyList.html'
	}, {
		title: "surveysReceived",
		url: 'views/profile/surveyList.html'
	}, {
		title: "loopsSubscribed",
		url: 'views/profile/loopsSubscribedList.html'
	}];

	$scope.currentList = {};
	$scope.currentList.title = $scope.profileInfo[0].title;
	$scope.currentList.url = $scope.profileInfo[0].url;

	$scope.onClickTab = function(tab) {
		$scope.currentList = tab;
		if(tab.title == $scope.profileInfo[0].title){
			$scope.surveys = Survey.market;
		}
		else if(tab.title == $scope.profileInfo[1].title){
			$scope.surveys = Survey.friends;
		}
		$ionicScrollDelegate.$getByHandle('mainScroll').scrollTop(true);
	}

	$scope.isActiveTab = function(title) {
		return $scope.currentList.title == title;
	}
}]);