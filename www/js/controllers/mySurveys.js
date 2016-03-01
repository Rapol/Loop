var App = angular.module('loop.controllers.mySurveys', []);

App.controller('mySurveysController', ['$scope', '$ionicScrollDelegate', function($scope, $ionicScrollDelegate){
	$scope.locationTabs = [{
		url: 'views/survey/mySurveys/draftSurveys.html',
		title:'Drafts',
		numSurveys: 7
	}, {
		url: 'views/survey/mySurveys/openSurveys.html',
		title:'Open',
		numSurveys: 4
	}, {
		url: 'views/survey/mySurveys/retiredSurveys.html',
		title:'Retired',
		numSurveys: 2
	}];

	$scope.currentTab = 'views/survey/mySurveys/draftSurveys.html';

	$scope.onClickTab = function(tab) {
		$scope.currentTab = tab.url;
		$ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
	}

	$scope.isActiveTab = function(tabUrl) {
		return tabUrl == $scope.currentTab;
	}
}]);