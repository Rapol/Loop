//Controllers for create survey section
var App = angular.module('loop.controllers.createSurvey', []);

App.controller('createSurveyController', ['$scope', '$ionicPopup', '$state', '$ionicActionSheet', 'CreateSurveyService',
	function ($scope, $ionicPopup, $state, $ionicActionSheet, CreateSurveyService) {

		$scope.surveyInfo = {
			surveyName: "",
			description: "",
			loopsAssign: [],
			attributesAssign: []
		};

		$scope.surveyInfo.loopsAssign = getLoops();
		// Default Public to checked
		$scope.surveyInfo.loopsAssign[0].checked = true;

		$scope.surveyInfo.attributesAssign = getAttributes();

		$scope.startSurvey = function () {
			if ($scope.surveyInfo.surveyName == "") {
				$ionicPopup.alert({
					title: 'Alert',
					template: 'Please fill out the survey name.'
				});
				return;
			}
			showActionSheet($ionicActionSheet, clickActionButtonConfig);
		};

		function clickActionButtonConfig(index) {
			setQuestionType(index, CreateSurveyService);
			// Save general info, loops, and attributes
			CreateSurveyService.saveSurvey($scope.surveyInfo);
			$state.go("createSurveyFlow");
			return true;
		}
	}]);

App.controller('createSurveyFlowController', ['$scope', '$state', '$ionicActionSheet', '$timeout', '$ionicPopup', '$ionicPlatform', 'CreateSurveyService', 'QuestionFactory',
	function ($scope, $state, $ionicActionSheet, $timeout, $ionicPopup, $ionicPlatform, CreateSurveyService, QuestionFactory) {

		// Create a new question
		$scope.question = new QuestionFactory.Question(CreateSurveyService.newQuestionType);

		CreateSurveyService.addQuestion($scope.question);
		$scope.questionNumber = CreateSurveyService.getQuestionsLength();

		// For animation
		$scope.next = false;
		$scope.back = false;

		$scope.exitSurvey = function () {
			CreateSurveyService.exitSurveyPopup();
		};

		$scope.addQuestion = function () {
			// Validate question
			var result = $scope.question.validateQuestion();
			if (result)
				$ionicPopup.alert({
					title: 'Question Invalid',
					template: result
				});
			else {
				showActionSheet($ionicActionSheet, clickActionButtonConfig);
			}
		};

		$scope.deleteQuestion = function () {
			$scope.back = true;
			// Simulate animation
			$timeout(function () {
				CreateSurveyService.popQuestion();
				$scope.questionNumber = CreateSurveyService.getQuestionsLength();
				$scope.question = CreateSurveyService.getQuestion($scope.questionNumber - 1);
			}, 375);
			$timeout(function () {
				$scope.back = false;
			}, 750);
		};

		$scope.done = function () {
			var result = $scope.question.validateQuestion();
			if (result)
				$ionicPopup.alert({
					title: 'Question Invalid',
					template: result
				});
			else {
				$state.go("reviewSurvey");
			}
		};

		function clickActionButtonConfig(index) {
			setQuestionType(index, CreateSurveyService);
			$scope.next = true;
			$timeout(function () {
				$scope.question = new QuestionFactory.Question(CreateSurveyService.newQuestionType);
				CreateSurveyService.addQuestion($scope.question);
				$scope.questionNumber = CreateSurveyService.getQuestionsLength();
			}, 375);
			$timeout(function () {
				$scope.next = false;
			}, 750);
			return true;
		}

		$ionicPlatform.registerBackButtonAction(function (event) {
			CreateSurveyService.exitSurveyPopup();
		}, 100);
	}]);

App.controller('reviewSurveyController', ['$scope', '$state', '$ionicActionSheet', '$ionicPlatform', '$ionicLoading', '$timeout', '$ionicPopup', 'CreateSurveyService', 'Survey',
	function ($scope, $state, $ionicActionSheet, $ionicPlatform, $ionicLoading, $timeout, $ionicPopup, CreateSurveyService, Survey) {

		$scope.questions = CreateSurveyService.getQuestions();
		$scope.surveyInfo = CreateSurveyService.getSurveyInfo();

		$scope.addQuestion = function () {
			showActionSheet($ionicActionSheet, clickActionButtonConfig);
		};

		$scope.exitSurvey = function () {
			CreateSurveyService.exitSurveyPopup();
		};

		$scope.moveQuestion = function (question, fromIndex, toIndex) {
			$scope.questions.splice(fromIndex, 1);
			$scope.questions.splice(toIndex, 0, question);
		};

		$scope.onQuestionDelete = function (choice) {
			$scope.questions.splice($scope.questions.indexOf(choice), 1);
		};

		$scope.createSurvey = function () {
			$ionicLoading.show({
				template: '<ion-spinner icon="crescent"></ion-spinner>Creating survey...'
			});

			Survey.createdSurveys.push(CreateSurveyService.getSurvey());

			CreateSurveyService.resetSurvey();

			$timeout(function () {
					$ionicLoading.hide();
					$ionicPopup.show({
						template: '<div class="survey-created"><i class="icon ion-checkmark-circled"></i></div>',
						title: 'Survey Created',
						buttons: [
							{
								text: 'Share',
								type: 'button-energized',
								onTap: function (e) {
									e.preventDefault()
								}
							},
							{
								text: 'My Surveys',
								type: 'button-calm',
								onTap: function (e) {
									$state.go('app.mySurveys');
								}
							}
						]
					});
				},
				2000);
		};

		function clickActionButtonConfig(index) {
			setQuestionType(index, CreateSurveyService);
			$state.go("addQuestion");
			return true;
		}

		$ionicPlatform.registerBackButtonAction(function (event) {
			CreateSurveyService.exitSurveyPopup();
		}, 100);
	}]);

App.controller('surveyCreatedController', ['$scope', '$state', '$timeout',
	function ($scope, $state, $timeout) {
		$timeout(function () {
				$state.go("app.home");
			},
			2000);
	}
]);

App.controller('editSurveyInfoController', ['$scope', '$ionicHistory', 'CreateSurveyService',
	function ($scope, $ionicHistory, CreateSurveyService) {
		$scope.surveyInfo = {};
		angular.copy(CreateSurveyService.getSurveyInfo(), $scope.surveyInfo);

		$scope.surveyInfo.loopsAssign = mergeLoops();
		$scope.surveyInfo.attributesAssign = mergeAttributes();


		$scope.saveSurvey = function () {
			CreateSurveyService.saveSurvey($scope.surveyInfo);
			$ionicHistory.goBack();
		};

		function mergeLoops() {
			var loops = getLoops();
			angular.forEach(loops, function (item, key) {

					angular.forEach($scope.surveyInfo.loopsAssign, function (checkedItem, key) {
						if (checkedItem.name == item.name)
							item.checked = true;
					});

				}
			);
			return loops;
		}

		function mergeAttributes() {
			var attributes = getAttributes();
			angular.forEach(attributes, function (item, key) {

					angular.forEach($scope.surveyInfo.attributesAssign, function (checkedItem, key) {
						if (checkedItem.name == item.name) {
							item.checked = true;
							item.required = checkedItem.required;
						}
					});

				}
			);
			return attributes;
		}
	}]);

App.controller('addQuestionController', ['$scope', '$ionicHistory', '$ionicPopup', 'CreateSurveyService', 'QuestionFactory',
	function ($scope, $ionicHistory, $ionicPopup, CreateSurveyService, QuestionFactory) {
		$scope.question = new QuestionFactory.Question(CreateSurveyService.newQuestionType);

		$scope.questionNumber = CreateSurveyService.getQuestionsLength();

		$scope.addQuestion = function () {
			var result = $scope.question.validateQuestion();
			if (result)
				$ionicPopup.alert({
					title: 'Question Invalid',
					template: result
				});
			else {
				CreateSurveyService.addQuestion($scope.question);
				$ionicHistory.goBack();
			}
		};
	}]);

App.controller('editQuestionController', ['$scope', '$ionicHistory', '$ionicPopup', '$stateParams', 'CreateSurveyService', 'QuestionFactory',
	function ($scope, $ionicHistory, $ionicPopup, $stateParams, CreateSurveyService) {

		$scope.questionNumber = parseInt($stateParams.questionNumber);

		$scope.question = {};

		angular.copy(CreateSurveyService.getQuestion($scope.questionNumber), $scope.question);

		$scope.saveQuestion = function () {
			var result = $scope.question.validateQuestion();
			if (result)
				$ionicPopup.alert({
					title: 'Question Invalid',
					template: result
				});
			else {
				CreateSurveyService.editQuestion($scope.question, $scope.questionNumber);
				$ionicHistory.goBack();
			}
		};
	}]);

function getLoops() {
	return [
		{
			name: "Public",
			checked: false
		},
		{
			name: "Fight Club",
			checked: false
		},
		{
			name: "Poker Society",
			checked: false
		},
		{
			name: "Neighbors",
			checked: false
		}
	];
}

function getAttributes() {
	return [
		{
			name: "Gender",
			checked: false,
			required: false
		},
		{
			name: "Age",
			checked: false,
			required: false
		}
	];
}

function showActionSheet($ionicActionSheet, click) {
	$ionicActionSheet.show({
		buttons: [
			{text: 'Multiple Choice'},
			{text: 'Text Box'},
			{text: 'Slider Scale'},
			{text: 'Ranking'},
			{text: 'Number Box'}
		],
		titleText: 'Choose Question',
		destructiveText: 'Cancel',
		destructiveButtonClicked: function () {
			return true;
		},
		buttonClicked: click
	});
}

function setQuestionType(index, CreateSurveyService) {
	switch (index) {
		case 0:
			CreateSurveyService.newQuestionType = "multipleChoice";
			break;
		case 1:
			CreateSurveyService.newQuestionType = "textBox";
			break;
		case 2:
			CreateSurveyService.newQuestionType = "sliderScale";
			break;
		case 3:
			CreateSurveyService.newQuestionType = "ranking";
			break;
		case 4:
			CreateSurveyService.newQuestionType = "numberBox";
			break;
	}
}