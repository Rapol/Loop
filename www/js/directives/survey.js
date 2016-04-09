angular.module('loop.directives.survey', [])
	.directive('editTextBox', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/edit/textBox.html",
			scope: {
				question: "=",
			}
		}
	}])
	.directive('editNumberBox', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/edit/numberBox.html",
			scope: {
				question: "=",
			}
		}
	}])
	.directive('editSliderScale', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/edit/sliderScale.html",
			scope: {
				question: "=",
			},
			controller: function ($scope) {
				$scope.scales = [
					{
						name: "Opinion",
						steps: [
							"Awful",
							"Poor",
							"Neutral",
							"Great",
							"Amazing"
						]
					},
					{
						name: "Frequency",
						steps: [
							"Never",
							"Seldom",
							"Sometimes",
							"Often",
							"Always"
						]
					},
					{
						name: "Agreement",
						steps: [
							"Strongly Disagree",
							"Disagree",
							"Neither Agree or Disagree",
							"Agree",
							"Strongly Agree",
						]
					}
				];
			}
		}
	}])
	.directive('editMultipleChoice', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/edit/multipleChoice.html",
			scope: {
				question: "="
			},
			controller: function ($scope) {

				$scope.moveChoice = function (choice, fromIndex, toIndex) {
					$scope.question.choices.splice(fromIndex, 1);
					$scope.question.choices.splice(toIndex, 0, choice);
				};

				$scope.onChoiceDelete = function (choice) {
					$scope.question.choices.splice($scope.question.choices.indexOf(choice), 1);
				};

				$scope.addChoice = function () {
					$scope.question.choices.push({
						text: ""
					});
				};

				if ($scope.question.choices.length == 0)
					$scope.addChoice();

			}
		}
	}])
	.directive('editRanking', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/edit/ranking.html",
			scope: {
				question: "="
			},
			controller: function ($scope) {

				$scope.moveChoice = function (choice, fromIndex, toIndex) {
					$scope.question.choices.splice(fromIndex, 1);
					$scope.question.choices.splice(toIndex, 0, choice);
				};

				$scope.onChoiceDelete = function (choice) {
					$scope.question.choices.splice($scope.question.choices.indexOf(choice), 1);
				};

				$scope.addChoice = function () {
					$scope.question.choices.push({
						text: ""
					});
				};

				if ($scope.question.choices.length == 0)
					$scope.addChoice();
			}
		}
	}])
	.directive('reviewTextBox', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/review/textBox.html",
			scope: {
				question: "="
			}
		}
	}])
	.directive('reviewNumberBox', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/review/numberBox.html",
			scope: {
				question: "="
			}
		}
	}])
	.directive('reviewMultipleChoice', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/review/multipleChoice.html",
			scope: {
				question: "="
			}
		}
	}])
	.directive('reviewSliderScale', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/review/sliderScale.html",
			scope: {
				question: "="
			}
		}
	}])
	.directive('reviewRanking', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/review/ranking.html",
			scope: {
				question: "="
			}
		}
	}])
	.directive('createSurveyForm', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/survey/createSurvey/surveyForm.html",
			scope: {
				surveyInfo: "="
			},
			controller: function ($scope, $ionicModal, $ionicPopup, CreateSurveyService) {
				$scope.loopsAssignCopy = [];

				$scope.attributesAssignCopy = [];

				$scope.saveAttributeAssign = function () {
					angular.copy($scope.attributesAssignCopy, $scope.surveyInfo.attributesAssign);
					$scope.closeAttributesModal();
				}

				$scope.uncheckedAttribute = function (index) {
					$scope.surveyInfo.attributesAssign[index].checked = false;
				};

				$scope.uncheckedLoop = function (index) {
					if (isLoopsAssignUncheckedValid($scope.surveyInfo.loopsAssign))
						$scope.surveyInfo.loopsAssign[index].checked = false;
				};

				$scope.saveLoopsAssign = function () {
					if (isLoopsAssignPopupValid($scope.loopsAssignCopy)) {
						angular.copy($scope.loopsAssignCopy, $scope.surveyInfo.loopsAssign);
						$scope.closeLoopModal();
					}
				};

				function isLoopsAssignUncheckedValid(array) {
					var checkedCounter = CreateSurveyService.countCheckedChoices(array);
					if (checkedCounter == 1) {
						$ionicPopup.alert({
							title: 'Alert',
							template: 'Must post the survey to at least one loop or make it public.'
						});
						return false;
					}
					return true;
				}

				function isLoopsAssignPopupValid(array) {
					var checkedCounter = CreateSurveyService.countCheckedChoices(array);
					if (checkedCounter == 0) {
						$ionicPopup.alert({
							title: 'Alert',
							template: 'Must post the survey to at least one loop or make it public.'
						});
						return false;
					}
					return true;
				}

				$ionicModal.fromTemplateUrl('views/survey/createSurvey/loopsModal.html', {
					scope: $scope,
					animation: 'slide-in-up'
				}).then(function (modal) {
					$scope.loopModal = modal;
				});

				$scope.openLoopModal = function () {
					angular.copy($scope.surveyInfo.loopsAssign, $scope.loopsAssignCopy);
					$scope.loopModal.show();
				};

				$scope.closeLoopModal = function () {
					$scope.loopModal.hide();
				};

				$ionicModal.fromTemplateUrl('views/survey/createSurvey/attributesModal.html', {
					scope: $scope,
					animation: 'slide-in-up'
				}).then(function (modal) {
					$scope.attributesModal = modal;
				});

				$scope.openAttributesModal = function () {
					angular.copy($scope.surveyInfo.attributesAssign, $scope.attributesAssignCopy);
					$scope.attributesModal.show();
				};

				$scope.closeAttributesModal = function () {
					$scope.attributesModal.hide();
				};
			}
		}
	}])
	.directive('answerTextBox', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/answer/textBox.html",
			scope: {
				question: "="
			}
		}
	}])
	.directive('answerNumberBox', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/answer/numberBox.html",
			scope: {
				question: "="
			}
		}
	}])
	.directive('answerMultipleChoice', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/answer/multipleChoice.html",
			scope: {
				question: "="
			},
			controller: function ($scope) {
				if ($scope.question.randomize && !$scope.question.isRandomized) {
					$scope.question.choices = shuffle($scope.question.choices);
					$scope.question.isRandomized = true;
				}
				var lastChoice = {checked: false};
				$scope.checkMultipleSelection = function (choice) {
					if (lastChoice.checked) {
						if (!$scope.question.multipleSelections && lastChoice.checked) {
							lastChoice.checked = false;
						}
					}
					lastChoice = choice;
				};
			}
		}
	}])
	.directive('answerSliderScale', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/answer/sliderScale.html",
			scope: {
				question: "="
			},
			controller: function ($scope) {
				$scope.question.scale.selected = Math.round($scope.question.scale.steps.length / 2);

			}
		}
	}])
	.directive('answerRanking', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/answer/ranking.html",
			scope: {
				question: "="
			},
			controller: function ($scope) {
				if ($scope.question.randomize && !$scope.question.isRandomized) {
					$scope.question.choices = shuffle($scope.question.choices);
					$scope.question.isRandomized = true;
				}
				$scope.moveChoice = function (choice, fromIndex, toIndex) {
					$scope.question.choices.splice(fromIndex, 1);
					$scope.question.choices.splice(toIndex, 0, choice);
				};
			}
		}
	}])
	.directive('surveyList', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/survey/surveyList.html",
			scope: {
				surveys: "="
			}
		}
	}])
	.directive('draftSurveyItem', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/survey/mySurveys/draftSurveyItem.html"
		}
	}])
	.directive('completedSurveyItem', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/survey/mySurveys/completedSurveyItem.html"
		}
	}])
	.directive('openSurveyItem', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/survey/mySurveys/openSurveyItem.html"
		}
	}])
	.directive('surveyEdit', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/survey/createSurvey/surveyEdit.html",
			scope: {
				survey: "="
			},
			controller: function ($scope) {
				$scope.moveQuestion = function (question, fromIndex, toIndex) {
					$scope.survey.questions.splice(fromIndex, 1);
					$scope.survey.questions.splice(toIndex, 0, question);
				};
				$scope.onQuestionDelete = function (choice) {
					$scope.survey.questions.splice($scope.survey.questions.indexOf(choice), 1);
				};
			}
		}
	}]);

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