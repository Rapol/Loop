var App = angular.module('loop.controllers.survey', []);

App.controller('surveyFlowController', ['$scope', '$stateParams', '$ionicHistory', '$ionicPopup', 'CreateSurveyService', 'Survey',
	function ($scope, $stateParams, $ionicHistory, $ionicPopup, CreateSurveyService, Survey) {
		var surveyId = parseInt($stateParams.surveyId);
		if (surveyId != -1) {
			$scope.questions = Survey.createdSurveys[surveyId].questions;
		}
		else {
			$scope.questions = [
				{
					"questionType": "ranking",
					"title": "How would you rate your overall satisfaction with us?",
					"choices": [
						{
							"text": "hello"
						},
						{
							"text": "hi"
						},
						{
							"text": "yo"
						}
					]
				},
				{
					"questionType": "numberBox",
					"title": "How many times have you fallen out of your bed?",
					"minNumber": 0,
					"maxNumber": 140
				},
				{
					"questionType": "textBox",
					"title": "How likely is it that you would recommend us to a friend/colleague?",
					"minChars": 0,
					"maxChars": 140
				},
				{
					"questionType": "sliderScale",
					"title": "Would you go again sky diving?",
					"scale": {
						"name": "Agreement",
						"steps": [
							"Strongly Disagree",
							"Disagree",
							"Neither Agree or Disagree",
							"Agree",
							"Strongly Agree"
						]
					}
				},
				{
					"questionType": "multipleChoice",
					"title": "What's your favorite pet?",
					"choices": [
						{
							"text": "hello"
						},
						{
							"text": "hi"
						},
						{
							"text": "yo"
						}
					]
				}
			];
		}

		$scope.currentIndex = 0;
		$scope.numOfQuestions = $scope.questions.length;
		$scope.question = $scope.questions[$scope.currentIndex];


		$scope.goRight = function () {
			if ($scope.currentIndex < $scope.questions.length - 1) {
				$scope.question = $scope.questions[++$scope.currentIndex];
			}
		};

		$scope.goLeft = function () {
			if ($scope.currentIndex > 0) {
				$scope.question = $scope.questions[--$scope.currentIndex];
			}
		};
	}]);

App.controller('surveyStatsController', ['$scope', '$stateParams', '$ionicHistory', '$ionicPopup', 'CreateSurveyService', 'Survey',
	function ($scope, $stateParams, $ionicHistory, $ionicPopup, CreateSurveyService, Survey) {
		$scope.options = {
			barStrokeWidth: 1,
			scaleShowVerticalLines: false,
			barValueSpacing: 13,
		};
		$scope.labels = ['Basketball', 'Paintball', 'Hockey', 'Esport', 'Cricket'];
		$scope.series = ['Series A'];

		$scope.data = [
			[65, 59, 80, 81, 56]
		];

		$scope.labels2 = ['Unhappy', 'SoSo', 'Okay', 'Happy', 'Very Happy'];
		$scope.series2 = ['Series A'];

		$scope.data2 = [
			[10, 20, 25, 40, 5]
		];
	}]);