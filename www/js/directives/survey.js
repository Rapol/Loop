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
				question: "=",
				options: "="
			},
			controller: function ($scope, $ionicPopup) {

				$scope.newChoice = {};

				$scope.moveChoice = function (choice, fromIndex, toIndex) {
					$scope.question.choices.splice(fromIndex, 1);
					$scope.question.choices.splice(toIndex, 0, choice);
				};

				$scope.onChoiceDelete = function (choice) {
					$scope.question.choices.splice($scope.question.choices.indexOf(choice), 1);
				};

				$scope.addChoice = function () {
					if ($scope.newChoice.text) {
						$scope.question.choices.push($scope.newChoice);
						$scope.newChoice = {};
					}
				};

				$scope.editItem = function (choice){
					$scope.draftChoice = {};
					$scope.draftChoice.text = choice.text;

					var editChoicePopup = $ionicPopup.show({
						template: '<textarea type="text" rows="2" ng-model="draftChoice.text"></textarea>',
						title: 'Edit Choice',
						scope: $scope,
						buttons: [
							{ text: 'Cancel' },
							{
								text: '<b>Edit</b>',
								type: 'button-positive',
								onTap: function(e) {
									if (!$scope.draftChoice.text) {
										//don't allow the user to close unless he enters wifi password
										e.preventDefault();
									} else {
										return $scope.draftChoice;
									}
								}
							}
						]
					});
					editChoicePopup.then(function(res){
						choice.text = res.text;
					});
				}
			}
		}
	}])
	.directive('editRanking', [function () {
		return {
			restrict: 'E',
			templateUrl: "views/questions/edit/ranking.html",
			scope: {
				question: "=",
				options: "="
			},
			controller: function ($scope) {

				$scope.newChoice = {};

				$scope.moveChoice = function (choice, fromIndex, toIndex) {
					$scope.question.choices.splice(fromIndex, 1);
					$scope.question.choices.splice(toIndex, 0, choice);
				};

				$scope.onChoiceDelete = function (choice) {
					$scope.question.choices.splice($scope.question.choices.indexOf(choice), 1);
				};

				$scope.addChoice = function () {
					if ($scope.newChoice.text) {
						$scope.question.choices.push($scope.newChoice);
						$scope.newChoice = {};
					}
				};

				$scope.editItem = function (choice){
					$scope.draftChoice = {};
					$scope.draftChoice.text = choice.text;

					var editChoicePopup = $ionicPopup.show({
						template: '<textarea type="text" rows="2" ng-model="draftChoice.text"></textarea>',
						title: 'Edit Choice',
						scope: $scope,
						buttons: [
							{ text: 'Cancel' },
							{
								text: '<b>Edit</b>',
								type: 'button-positive',
								onTap: function(e) {
									if (!$scope.draftChoice.text) {
										//don't allow the user to close unless he enters wifi password
										e.preventDefault();
									} else {
										return $scope.draftChoice;
									}
								}
							}
						]
					});
					editChoicePopup.then(function(res){
						choice.text = res.text;
					});
				}
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
			templateUrl: "views/createSurvey/surveyForm.html",
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

				$ionicModal.fromTemplateUrl('views/createSurvey/loopsModal.html', {
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

				$ionicModal.fromTemplateUrl('views/createSurvey/attributesModal.html', {
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
			controller: function($scope){
				$scope.question.scale.selected = Math.round($scope.question.scale.steps.length/2);

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
			controller: function($scope){
				$scope.moveChoice = function (choice, fromIndex, toIndex) {
					$scope.question.choices.splice(fromIndex, 1);
					$scope.question.choices.splice(toIndex, 0, choice);
				};
			}
		}
	}]);