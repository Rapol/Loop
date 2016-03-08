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
			},
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
	}

	return self;
});

App.service('CreateSurveyService', function ($ionicActionSheet, $state) {
	var _questions = [];
	var _surveyName = "";
	var _description = "";
	var _loopsAssign = [];
	var _attributesAssign = [];

	this.newQuestionType = "";

	this.getSurveyInfo = function () {
		return {
			surveyName: _surveyName,
			description: _description,
			loopsAssign: _loopsAssign,
			attributesAssign: _attributesAssign
		}
	};

	this.setSurveyInfo = function (surveyInfo) {
		_surveyName = surveyInfo.surveyName;
		_description = surveyInfo.description;
		_loopsAssign = surveyInfo.loopsAssign;
		_attributesAssign = surveyInfo.attributesAssign;
	};

	this.getSurvey = function(){
		return {
			surveyName: _surveyName,
			description: _description,
			loopsAssign: _loopsAssign,
			attributesAssign: _attributesAssign,
			questions: _questions
		}
	}

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

	this.getQuestions = function () {
		return _questions;
	};

	this.deleteQuestions = function () {
		_questions = [];
	}

	this.countCheckedChoices = function(array) {
		var checkedCounter = 0;
		angular.forEach(array, function (value, key) {
			if (value.checked)
				checkedCounter++;
		});
		return checkedCounter;
	}

	this.saveSurvey = function(surveyInfo){
		surveyInfo.loopsAssign = getCheckedItems(surveyInfo.loopsAssign);
		surveyInfo.attributesAssign = getCheckedItems(surveyInfo.attributesAssign);
		this.setSurveyInfo(surveyInfo);
	};

	this.resetSurvey = resetSurvey;

	this.exitSurveyPopup = function(){
		$ionicActionSheet.show({
			buttons: [
				{text: 'Save'},
			],
			cancelText: 'Cancel',
			cancel: function() {
				return true;
			},
			titleText: 'Exiting Survey',
			destructiveText: 'Delete',
			destructiveButtonClicked: function () {
				resetSurvey();
				$state.go("app.home");
				return true;
			},
			buttonClicked: function(index){
				switch (index){
					case 0:
					resetSurvey();
					$state.go('app.mySurveys');
				}
			}
		});
	};

	function resetSurvey(){
		_questions = [];
		_surveyName = "";
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
		else if(questionType == "multipleChoice"){
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

		this.validateQuestion = function(){
			if (!this.title)
				return "Please fill out the question field";
			if (this.choices.length <= 1)
				return "Must have 2 or more choices";
			if(!validTextChoices(this.choices))
				return "Choices can't be blank";
		}
	};

	var MultipleChoice = function () {
		this.questionType = "multipleChoice";
		this.title = "";
		this.choices = [];

		this.validateQuestion = function(){
			if (!this.title)
				return "Please fill out the question field";
			if (this.choices.length <= 1)
				return "Must have 2 or more choices";
			if(!validTextChoices(this.choices))
				return "Choices can't be blank";
		}
	};

	var TextBox = function () {
		this.questionType = "textBox";
		this.title = "";
		this.text = "";
		this.minChars = 0;
		this.maxChars = 140;

		this.validateQuestion = function(){
			if (!this.title)
				return "Please fill out the question field";
			if(!isInt(this.minChars) || !isInt(this.maxChars))
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
		this.maxNumber = 140;

		this.validateQuestion = function(){
			if (!this.title)
				return "Please fill out the question field";
			if(!isInt(this.minNumber) || !isInt(this.maxNumber))
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

		this.validateQuestion = function(){
			if (!this.title)
				return "Please fill out the question field";
			if (!this.scale.name) {
				return "Please select a scale";
			}
		}
	};

	function isInt(value) {
		return !isNaN(value) &&
			parseInt(Number(value)) == value &&
			!isNaN(parseInt(value, 10));
	}

	function validTextChoices(choices){
		for(var i = 0; i < choices.length; i++){
			if(!choices[i].text)
				return false
		}
		return true;
	}

	return {
		Question: QuestionFactory
	};
});