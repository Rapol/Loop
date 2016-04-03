var App = angular.module('loop.controllers.survey', []);

App.controller('surveyFlowController', ['$scope', '$stateParams', '$ionicHistory', '$ionicPopup', '$ionicLoading', '$timeout', '$state', '$ionicModal', '$ionicHistory', 'CreateSurveyService', 'Survey', 'SurveyTakingService',
	function ($scope, $stateParams, $ionicHistory, $ionicPopup, $ionicLoading, $timeout, $state, $ionicModal, $ionicHistory, CreateSurveyService, Survey, SurveyTakingService) {
		var surveyId = parseInt($stateParams.surveyId);
		if (surveyId != -1) {
			$scope.questions = Survey.createdSurveys[surveyId].questions;
		}
		else {
			$scope.questions = [
				{
					"questionType": "ranking",
					"title": "How would you rate your overall satisfaction with us?",
					"required": true,
					"randomize": true,
					"choices": [
						{
							"text": "1"
						},
						{
							"text": "2"
						},
						{
							"text": "3"
						}
					]
				},
				{
					"questionType": "numberBox",
					"title": "How many times have you fallen out of your bed?",
					"required": true,
					"minNumber": 0,
					"maxNumber": 140
				},
				{
					"questionType": "textBox",
					"title": "How likely is it that you would recommend us to a friend/colleague?",
					"required": true,
					"minChars": 0,
					"maxChars": 140
				},
				{
					"questionType": "sliderScale",
					"title": "Would you go again sky diving?",
					"required": true,
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
					"required": true,
					"multipleSelections": false,
					"randomize": true,
					"choices": [
						{
							"text": "1"
						},
						{
							"text": "2"
						},
						{
							"text": "3"
						}
					]
				}
			];
		}

		$scope.currentIndex = 0;
		$scope.numOfQuestions = $scope.questions.length;
		$scope.question = $scope.questions[$scope.currentIndex];


		$scope.goRight = function () {
			var result = SurveyTakingService.validateAnswer($scope.question);
			if(result){
				$ionicPopup.alert({
					title: 'Answer Invalid',
					template: result
				});
			}
			else{
				$scope.question = $scope.questions[++$scope.currentIndex];
			}
		};

		$scope.goLeft = function () {
			if ($scope.currentIndex > 0) {
				$scope.question = $scope.questions[--$scope.currentIndex];
			}
		};

		$scope.submitSurvey = function(){
			var result = SurveyTakingService.validateAnswer($scope.question);
			if(result){
				$ionicPopup.alert({
					title: 'Answer Invalid',
					template: result
				});
			}
			else{
				$ionicLoading.show({
					template: '<ion-spinner icon="crescent"></ion-spinner>Submiting survey...'
				});
				$timeout(function () {
						$ionicLoading.hide();
						$ionicPopup.show({
							template: '<div class="survey-created"><h3>Thank you!</h3></div>',
							title: 'Survey Submitted',
							buttons: [
								{
									text: 'Share',
									type: 'button-energized',
									onTap: function(e) {
										e.preventDefault()
									}
								},
								{
									text: 'Home',
									type: 'button-calm',
									onTap: function(e) {
										$state.go('app.home');
									}
								}
							]
						});
					},
					2000);
			}
		};

		$scope.showSurveyInfo = function (){
			$ionicModal.fromTemplateUrl('views/survey/surveyInfoModal.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function (modal) {
				$scope.surveyInfoModal = modal;
				$scope.surveyInfoModal.show();
			});
		};

		$scope.closeSurveyInfoModal = function(){
			$scope.surveyInfoModal.hide();
		};

		$scope.goBack = function(){
			$ionicHistory.goBack();
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