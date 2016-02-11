var App = angular.module('loop.controllers.mySurveys', []);

App.controller('mySurveysController', ['$scope', '$ionicScrollDelegate', function($scope, $ionicScrollDelegate){
	$scope.locationTabs = [{
		url: 'views/mySurveys/draftSurveys.html',
		title:'Drafts',
		numSurveys: 7
	}, {
		url: 'views/mySurveys/openSurveys.html',
		title:'Open',
		numSurveys: 4
	}, {
		url: 'views/mySurveys/retiredSurveys.html',
		title:'Retired',
		numSurveys: 2
	}];

	$scope.currentTab = 'views/mySurveys/draftSurveys.html';

	$scope.onClickTab = function(tab) {
		$scope.currentTab = tab.url;
		$ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
	}

	$scope.isActiveTab = function(tabUrl) {
		return tabUrl == $scope.currentTab;
	}
}]);