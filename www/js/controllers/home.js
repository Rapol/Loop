var App = angular.module('loop.controllers.home', []);

App.controller('sidebarController', ['$scope', '$window', '$state', '$ionicSideMenuDelegate', '$ionicViewSwitcher', '$ionicPlatform', '$cordovaBarcodeScanner', function($scope, $window, $state, $ionicSideMenuDelegate, $ionicViewSwitcher, $ionicPlatform, $cordovaBarcodeScanner){
	$scope.user = {};

	$scope.searchResults = [
		{
			"name": "Xoggle's Survey",
			"loop": "Xoggle"
		},
		{
			"name": "Eventix's Survey",
			"loop": "Eventix"
		},
		{
			"name": "Kog's Survey",
			"loop": "Kog"
		},
		{
			"name": "Furnitech's Survey",
			"loop": "Furnitech"
		},
		{
			"name": "Kiosk's Survey",
			"loop": "Kiosk"
		},
		{
			"name": "Minga's Survey",
			"loop": "Minga"
		},
		{
			"name": "Xplor's Survey",
			"loop": "Xplor"
		},
		{
			"name": "Aeora's Survey",
			"loop": "Aeora"
		},
		{
			"name": "Pharmacon's Survey",
			"loop": "Pharmacon"
		},
		{
			"name": "Icology's Survey",
			"loop": "Icology"
		}
	];

	$scope.$on('$ionicView.enter', function () {
		$scope.user.firstName = $window.sessionStorage.firstName;
		$scope.user.lastName = $window.sessionStorage.lastName;
	});

	$scope.signOut = function () {
		$window.sessionStorage.email = '';
		$window.sessionStorage.firstName = '';
		$window.sessionStorage.lastName = '';
		$ionicSideMenuDelegate.toggleLeft();
		$ionicViewSwitcher.nextDirection('back');
		$state.go('splashScreen');
	};

	$scope.qrScan = function () {
		$ionicPlatform.ready(function () {
			$cordovaBarcodeScanner
				.scan()
				.then(function (result) {
					//if(!result.cancelled)
					//{
					//	alert("Barcode type is: " + result.format);
					//	alert("Decoded text is: " + result.text);
					//}
					//else
					//{
					//	alert("You have cancelled scan");
					//}
				}, function (error) {
					// An error occurred
				});
		});
	}
}]);

App.controller('homeController', ['$scope', 'Survey', function ($scope, Survey) {

	$scope.createdSurveys = Survey.createdSurveys;

	$scope.surveys = Survey.market.concat(Survey.friends);

	$scope.type = Survey.type;
	$scope.typeIndex = 0;

	$scope.location = Survey.location;
	$scope.locationIndex = 0;

	$scope.popularity = Survey.popularity;
	$scope.popularityIndex = 0;

	$scope.locationButton = function () {
		if ($scope.locationIndex == 0) {
			$scope.locationIndex++;
			$scope.surveys = Survey.local;
			$scope.createdSurveys = Survey.createdSurveys;
			console.log("Change Global to Local");
		}
		else if ($scope.locationIndex == 1) {
			$scope.locationIndex = 0;
			$scope.surveys = Survey.global;
			$scope.createdSurveys = [];
			console.log("Change Local to Global");
		}
	};

	$scope.popularityButton = function () {
		if ($scope.popularityIndex == 0) {
			$scope.popularityIndex++;
			$scope.surveys = Survey.newest;
			$scope.createdSurveys = Survey.createdSurveys;
			console.log("Change Hot to Newest");
		}
		else if ($scope.popularityIndex == 1) {
			$scope.popularityIndex = 0;
			$scope.surveys = Survey.hot;
			$scope.createdSurveys = [];
			console.log("Change Newest to Hot");
		}
	};

	$scope.typeButton = function () {
		if ($scope.typeIndex == 0) {
			$scope.typeIndex++;
			$scope.surveys = Survey.friends;
			$scope.createdSurveys = [];
			console.log("Change All to Friends");
		}
		else if ($scope.typeIndex == 1) {
			$scope.typeIndex++;
			$scope.surveys = Survey.market;
			$scope.createdSurveys = Survey.createdSurveys;
			console.log("Change Friends to Market");
		}
		else {
			$scope.typeIndex = 0;
			$scope.surveys = shuffle(Survey.market.concat(Survey.friends));
			console.log("Change Friends to Market");
		}
	}

	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
}]);