var App = angular.module('loop.services.survey', []);

App.service('Survey', function () {
	var self = {
		createdSurveys: [],
		friends: [
			{
				"questionCount": 1,
				"description": "Vote for the candidate you want to be our new president",
				"answeredCount": 47,
				"user": "Nicholas cage",
				"img": "img/sig%20Ep.jpg",
				"loopName": "Sig Ep",
				"title": "Sig Ep president elections"
			},
			{
				"questionCount": 14,
				"description": "Where should we go for long weekend?",
				"answeredCount": 5,
				"user": "Planner friend",
				"img": "img/longWeekend.png",
				"loopName": "Long weekend plans",
				"title": "Away with the peasantry"
			},
			{
				"questionCount": 2,
				"description": "Who killed the Lord commander of the night's watch",
				"answeredCount": 10,
				"user": "Ollie",
				"img": "img/jon_snow.jpg",
				"loopName": "Watchers of the wall",
				"title": "WHY JON SNOW , ANSWER ME RRM"
			}
		],
		market: [
			{
				"questionCount": 18,
				"description": "Q1. How would you rate your last McDonald's visit?",
				"answeredCount": 1213,
				"user": "MCD Admin",
				"img": "img/mcdonalds.jpg",
				"loopName": "McDonald",
				"title": "Win a free McChicken"
			},
			{
				"questionCount": 18,
				"description": "To spell your name right, ain't in my job description?",
				"answeredCount": 8747,
				"user": "Can't Spell my name",
				"img": "img/starbucks.jpg",
				"loopName": "Spelling bee champ",
				"title": "Them:Your name please, me: it's Jatin, Then: sorry? me: it's Justin"
			},
			{
				"questionCount": 14,
				"description": "Ask Cesar about our latest specials like $4 meals",
				"answeredCount": 97,
				"user": "FOODIE......NOT",
				"img": "img/wendys.png",
				"loopName": "Wendy's ",
				"title": "You think people only want our frosty"
			},
			{
				"questionCount": 10,
				"description": "Ya think we can't get away with a fraud?",
				"answeredCount": 9851,
				"user": "Kenneth Lay",
				"img": "img/enron.jpg",
				"loopName": "How not to fraud 101",
				"title": "Oops they found out"
			},
			{
				"questionCount": 5,
				"description": "How do you like TGS with Tracy Jordan",
				"answeredCount": 1007,
				"user": "Kenneth Parcel",
				"img": "img/30rock.jpg",
				"loopName": "30 Rock",
				"title": "Viewer survey"
			},
			{
				"questionCount": 18,
				"description": "enim laborum aute quis elit veniam qui fugiat sunt commodo",
				"answeredCount": 12963,
				"user": "Morse Mendoza",
				"img": "img/falcons.png",
				"loopName": "Atomica",
				"title": "Aquacine Survey"
			}
		],
		hot: [
			{
				"questionCount": 14,
				"description": "anim laboris reprehenderit enim sint veniam do Lorem do dolore",
				"answeredCount": 9754,
				"user": "Odessa House",
				"img": "img/falcons.png",
				"loopName": "Makingway",
				"title": "Medalert Survey"
			},
			{
				"questionCount": 10,
				"description": "in velit consequat consectetur proident sint in ad ipsum duis",
				"answeredCount": 9851,
				"user": "Juliette Jensen",
				"img": "img/falcons.png",
				"loopName": "Vendblend",
				"title": "Katakana Survey"
			},
			{
				"questionCount": 5,
				"description": "culpa pariatur aliqua culpa est veniam ipsum esse dolore pariatur",
				"answeredCount": 1007,
				"user": "Monroe Cole",
				"img": "img/falcons.png",
				"loopName": "Colaire",
				"title": "Automon Survey"
			},
			{
				"questionCount": 18,
				"description": "enim laborum aute quis elit veniam qui fugiat sunt commodo",
				"answeredCount": 12963,
				"user": "Morse Mendoza",
				"img": "img/falcons.png",
				"loopName": "Atomica",
				"title": "Aquacine Survey"
			}
		],
		newest: [
			{
				"questionCount": 18,
				"description": "enim laborum aute quis elit veniam qui fugiat sunt commodo",
				"answeredCount": 12963,
				"user": "Morse Mendoza",
				"img": "img/falcons.png",
				"loopName": "Atomica",
				"title": "Aquacine Survey"
			}
		],
		global: [
			{
				"questionCount": 18,
				"description": "enim laborum aute quis elit veniam qui fugiat sunt commodo",
				"answeredCount": 12963,
				"user": "Morse Mendoza",
				"img": "img/falcons.png",
				"loopName": "Atomica",
				"title": "Aquacine Survey"
			}
		],
		local: [
			{
				"questionCount": 18,
				"description": "enim laborum aute quis elit veniam qui fugiat sunt commodo",
				"answeredCount": 12963,
				"user": "Morse Mendoza",
				"img": "img/falcons.png",
				"loopName": "Atomica",
				"title": "Aquacine Survey"
			},
			{
				"questionCount": 18,
				"description": "enim laborum aute quis elit veniam qui fugiat sunt commodo",
				"answeredCount": 12963,
				"user": "Morse Mendoza",
				"img": "img/falcons.png",
				"loopName": "Atomica",
				"title": "Aquacine Survey"
			}
		],
		type: [
			{
				name: 'All',
				icon: 'ion-android-funnel'
			},
			{
				name: 'Friends',
				icon: 'ion-android-people'
			},
			{
				name: 'Market',
				icon: 'ion-stats-bars'
			}
		],
		location: [
			{
				name: 'Global',
				icon: 'ion-earth'
			},
			{
				name: 'Local',
				icon: 'ion-location'
			}
		],
		popularity: [
			{
				name: 'Hot',
				icon: 'ion-fireball'
			},
			{
				name: 'New',
				icon: 'ion-arrow-up-c'
			}
		]
	};

	return self;
});

App.service('CreateSurveyService', function ($ionicActionSheet, $state) {
	var _questions = [];
	var _name = "";
	var _description = "";
	var _loopsAssign = [];
	var _attributesAssign = [];

	this.newQuestionType = "";

	this.getSurveyInfo = function () {
		return {
			name: _name,
			description: _description,
			loopsAssign: _loopsAssign,
			attributesAssign: _attributesAssign
		}
	};

	this.setSurveyInfo = function (surveyInfo) {
		_name = surveyInfo.name;
		_description = surveyInfo.description;
		_loopsAssign = surveyInfo.loopsAssign;
		_attributesAssign = surveyInfo.attributesAssign;
	};

	this.getSurvey = function () {
		return {
			name: _name,
			description: _description,
			loopsAssign: _loopsAssign,
			attributesAssign: _attributesAssign,
			questions: _questions
		}
	};

	this.getQuestion = function (index) {
		if (index >= _questions.length || index < 0)
			return -1;
		return _questions[index];
	};

	this.addQuestion = function (question) {
		_questions.push(question);
	};

	this.editQuestion = function (question, index) {
		_questions[index] = question;
	};

	this.deleteQuestion = function (index) {
		_questions.splice(index, 1);
	};

	this.popQuestion = function () {
		return _questions.pop();
	};

	this.getQuestionsLength = function () {
		return _questions.length;
	};

	this.countCheckedChoices = countCheckedChoices;

	this.saveSurveyInfo = function (surveyInfo) {
		surveyInfo.loopsAssign = getCheckedItems(surveyInfo.loopsAssign);
		surveyInfo.attributesAssign = getCheckedItems(surveyInfo.attributesAssign);
		this.setSurveyInfo(surveyInfo);
	};

	this.saveSurvey = function(survey){
		_name = survey.name;
		_description = survey.description;
		_loopsAssign = survey.loopsAssign;
		_attributesAssign = survey.attributesAssign;
		_questions = survey.questions;
	};

	this.resetSurvey = resetSurvey;

	this.exitSurveyPopup = function () {
		$ionicActionSheet.show({
			buttons: [
				{text: 'Save'},
			],
			cancelText: 'Cancel',
			cancel: function () {
				return true;
			},
			titleText: 'Exiting Survey',
			destructiveText: 'Delete',
			destructiveButtonClicked: function () {
				resetSurvey();
				$state.go("app.home");
				return true;
			},
			buttonClicked: function (index) {
				switch (index) {
					case 0:
						resetSurvey();
						$state.go('app.mySurveys');
				}
			}
		});
	};

	function resetSurvey() {
		_questions = [];
		_name = "";
		_description = "";
		_loopsAssign = [];
		_attributesAssign = [];

		this.newQuestionType = "";
	}

	function getCheckedItems(items) {
		var result = [];
		angular.forEach(items, function (item, key) {
			if (item.checked)
				result.push(item);
		});
		return result;
	}
});

App.factory('QuestionFactory', function () {

	var QuestionFactory = function (questionType) {
		if (questionType == "ranking") {
			return new Ranking();
		}
		else if (questionType == "multipleChoice") {
			return new MultipleChoice();
		}
		else if (questionType == "textBox") {
			return new TextBox();
		}
		else if (questionType == "numberBox") {
			return new NumberBox();
		}
		else if (questionType == "sliderScale") {
			return new SliderScale();
		}
	};

	var Ranking = function () {
		this.questionType = "ranking";
		this.title = "";
		this.choices = [];
		this.required = true;
		this.randomize = false;

		this.validateQuestion = function () {
			if (!this.title)
				return "Please fill out the question field";
			if (this.choices.length <= 1)
				return "Must have 2 or more choices";
			if (!validTextChoices(this.choices))
				return "Choices can't be blank";
		}
	};

	var MultipleChoice = function () {
		this.questionType = "multipleChoice";
		this.title = "";
		this.choices = [];
		this.required = true;
		this.randomize = false;
		this.multipleSelections = false;

		this.validateQuestion = function () {
			if (!this.title)
				return "Please fill out the question field";
			if (this.choices.length <= 1)
				return "Must have 2 or more choices";
			if (!validTextChoices(this.choices))
				return "Choices can't be blank";
		}
	};

	var TextBox = function () {
		this.questionType = "textBox";
		this.title = "";
		this.text = "";
		this.minChars = 0;
		this.maxChars = 140;
		this.required = true;

		this.validateQuestion = function () {
			if (!this.title)
				return "Please fill out the question field";
			if (!isInt(this.minChars) || !isInt(this.maxChars))
				return "Please enter valid integers in the fields";

			this.minChars = parseInt(this.minChars);
			this.maxChars = parseInt(this.maxChars);

			if (this.minChars < 0) {
				return "Minimum characters can't be negative"
			}
			if (this.maxChars <= 0) {
				return "Max characters can't be less than or equal to zero"
			}
			if (this.minChars >= this.maxChars) {
				return "Minimum characters must be less than max characters"
			}
		}
	};

	var NumberBox = function () {
		this.questionType = "numberBox";
		this.title = "";
		this.number = null;
		this.minNumber = 0;
		this.maxNumber = 256;
		this.required = true;

		this.validateQuestion = function () {
			if (!this.title)
				return "Please fill out the question field";
			if (!isInt(this.minNumber) || !isInt(this.maxNumber))
				return "Please enter valid integers in the fields";

			this.minNumber = parseInt(this.minNumber);
			this.maxNumber = parseInt(this.maxNumber);

			if (this.minNumber >= this.maxNumber) {
				return "Minimum number cannot be larger or equal to maximum number";
			}
		}
	};

	var SliderScale = function () {
		this.questionType = "sliderScale";
		this.title = "";
		this.scale = {};
		this.required = true;

		this.validateQuestion = function () {
			if (!this.title)
				return "Please fill out the question field";
			if (!this.scale.name) {
				return "Please select a scale";
			}
		}
	};

	function validTextChoices(choices) {
		for (var i = 0; i < choices.length; i++) {
			if (!choices[i].text)
				return false
		}
		return true;
	}

	return {
		Question: QuestionFactory
	};
});

App.service('SurveyTakingService', function () {

	this.validateAnswer = function (question) {
		switch (question.questionType) {
			case "ranking":
				break;
			case "multipleChoice":
				var checkedCounter = countCheckedChoices(question.choices);
				if (checkedCounter == 0 && question.required)
					return "Question is required";
				if (checkedCounter > 1 && !question.multipleSelections)
					return "Please select only one choice";
				break;
			case "textBox":
				if (!question.text && question.required)
					return "Question is required";
				if (question.text.length > question.maxChars)
					return "Answer's length must be less than or equal to " + question.maxChars + " characters";
				if (question.text.length < question.minChars)
					return "Answer must be at least " + question.minChars + " characters long";
				break;
			case "numberBox":
				if (!question.number && question.required)
					return "Question is required";
				if (!isInt(question.number))
					return "Please enter a valid integer";
				question.number = parseInt(question.number);
				if (question.number < question.minNumber)
					return "Answer must be larger than or equal to " + question.minNumber;
				if (question.number > question.maxNumber)
					return "Answer must be less than or equal to " + question.maxNumber;
				break;
			case "scale":
				break;

		}
	}
});

App.service('SharedSurvey', function () {
	var survey = {
		questions: [
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
		],
		name: "Survey 1",
		description: "Big description",
		loopsAssign: [{name:"Public"}],
		attributesAssign: []
	};

	return {
		getSurvey: function () {
			return survey;
		},
		setSurvey: function (value) {
			survey = value;
		}
	};
});

function countCheckedChoices(array) {
	var checkedCounter = 0;
	angular.forEach(array, function (value, key) {
		if (value.checked)
			checkedCounter++;
	});
	return checkedCounter;
}

function isInt(value) {
	return !isNaN(value) &&
		parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}