angular.module('loop.controllers.survey', [])
	.controller('surveyFlowController', ['$scope', '$stateParams', '$ionicHistory', '$ionicPopup', '$ionicLoading', '$timeout', '$state', '$ionicModal', '$ionicHistory', 'CreateSurveyService', 'Survey', 'SurveyTakingService', 'SharedSurvey',
		function ($scope, $stateParams, $ionicHistory, $ionicPopup, $ionicLoading, $timeout, $state, $ionicModal, $ionicHistory, CreateSurveyService, Survey, SurveyTakingService, SharedSurvey) {
			var surveyId = parseInt($stateParams.surveyId);
			if (surveyId != -1) {
				$scope.questions = Survey.createdSurveys[surveyId].questions;
			}
			else {
				$scope.questions = SharedSurvey.getSurvey().questions;
			}

			$scope.currentIndex = 0;
			$scope.numOfQuestions = $scope.questions.length;
			$scope.question = $scope.questions[$scope.currentIndex];


			$scope.goRight = function () {
				var result = SurveyTakingService.validateAnswer($scope.question);
				if (result) {
					$ionicPopup.alert({
						title: 'Answer Invalid',
						template: result
					});
				}
				else {
					$scope.question = $scope.questions[++$scope.currentIndex];
				}
			};

			$scope.goLeft = function () {
				if ($scope.currentIndex > 0) {
					$scope.question = $scope.questions[--$scope.currentIndex];
				}
			};

			$scope.submitSurvey = function () {
				var result = SurveyTakingService.validateAnswer($scope.question);
				if (result) {
					$ionicPopup.alert({
						title: 'Answer Invalid',
						template: result
					});
				}
				else {
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
										onTap: function (e) {
											e.preventDefault()
										}
									},
									{
										text: 'Home',
										type: 'button-calm',
										onTap: function (e) {
											$state.go('app.home');
										}
									}
								]
							});
						},
						2000);
				}
			};

			$scope.showSurveyInfo = function () {
				$ionicModal.fromTemplateUrl('views/survey/surveyInfoModal.html', {
					scope: $scope,
					animation: 'slide-in-up'
				}).then(function (modal) {
					$scope.surveyInfoModal = modal;
					$scope.surveyInfoModal.show();
				});
			};

			$scope.closeSurveyInfoModal = function () {
				$scope.surveyInfoModal.hide();
			};

			$scope.goBack = function () {
				$ionicHistory.goBack();
			};
		}])
	.controller('surveyStatsController', ['$scope', '$stateParams', '$ionicHistory', '$ionicPopup', 'CreateSurveyService', 'Survey',
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
		}])
	.controller('mySurveysController', ['$scope', '$ionicScrollDelegate', '$ionicPopover', '$state', 'SharedSurvey', 'CreateSurveyService', function ($scope, $ionicScrollDelegate, $ionicPopover, $state, SharedSurvey, CreateSurveyService) {

		$scope.surveyTypes = [
			{
				name: "Made",
				icon: "ion-arrow-right-c"
			},
			{
				name: "Taken",
				icon: "ion-arrow-left-c"
			}
		];

		$scope.surveyStatus = [
			{
				name: "All",
				icon: "ion-android-funnel"
			},
			{
				name: "Draft",
				icon: "ion-edit"
			},
			{
				name: "Open",
				icon: "ion-android-radio-button-off"
			},
			{
				name: "Completed",
				icon: "ion-android-done"
			}
		];

		$scope.surveys = [
			{
				status: "completed"
			},
			{
				status: "draft"
			},
			{
				status: "open"
			}
		];

		$scope.typeIndex = 0;
		$scope.statusIndex = 0;

		$scope.editSurvey = function (survey){
			survey = SharedSurvey.getSurvey();
			CreateSurveyService.saveSurvey(survey);
			$state.go("editMySurveys");
		};

		$ionicPopover.fromTemplateUrl('views/survey/mySurveys/surveyTypePopover.html', {
			scope: $scope
		}).then(function(popover) {
			$scope.typePopover = popover;
		});

		$ionicPopover.fromTemplateUrl('views/survey/mySurveys/surveyStatusPopover.html', {
			scope: $scope
		}).then(function(popover) {
			$scope.statusPopover = popover;
		});

		$scope.openTypePopover = function ($event) {
			$scope.typePopover.show($event);
		};

		$scope.openStatusPopover = function ($event) {
			$scope.statusPopover.show($event);
		};

		$scope.changeType = function(index){
			$scope.typeIndex = index;
			$scope.typePopover.hide();
		};

		$scope.changeStatus = function(index){
			$scope.statusIndex = index;
			$scope.statusPopover.hide();
		};

	}]);