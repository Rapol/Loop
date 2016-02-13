angular.module('App',
	[
		'ionic',
		'ngCordova',
		'chart.js',
		'loop.controllers',
		'loop.services',
		'loop.directives',
		'loop.filters'
	])

	.run(function ($ionicPlatform, $rootScope) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.disableScroll(false);
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				// Set the statusbar to use the default style, tweak this to
				// remove the status bar on iOS or change it to use white instead of dark colors.
				StatusBar.styleDefault();
			}

			// Global variable for platform
			$rootScope.platform = ionic.Platform.platform();
		});
	})
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: function () {
					if (ionic.Platform.isAndroid()) {
						return 'views/home/sidebarAndroid.html';
					}
					return 'views/home/sidebarIOS.html';
				},
				controller: 'sidebarController'
			})
			.state('app.home', {
				url: '/home',
				templateUrl: 'views/home/home.html',
				controller: 'homeController'
			})
			.state('app.search', {
				url: '/search',
				templateUrl: 'views/search/search.html'
			})
			.state('app.surveys', {
				url: '/surveys',
				templateUrl: 'views/mySurveys/surveysTab.html',
				controller: 'mySurveysController'
			})
			.state('app.surveyStats', {
				url: '/surveyStats',
				templateUrl: 'views/survey/surveyStats.html',
				controller: 'surveyStatsController'
			})
			.state('app.loops', {
				url: '/loops',
				templateUrl: 'views/loops/loops.html',
				controller: 'myLoopsController'
			})
			.state('app.createLoop', {
				url: '/createLoop',
				templateUrl: 'views/loops/createLoop.html'
			})
			.state('app.createSurvey', {
				url: '/createSurvey',
				cache: false,
				templateUrl: 'views/createSurvey/createSurvey.html',
				controller: 'createSurveyController'
			})
			.state('createSurveyFlow', {
				url: '/createSurveyFlow',
				cache: false,
				templateUrl: 'views/createSurvey/createSurveyFlow.html',
				controller: 'createSurveyFlowController'
			})
			.state('reviewSurvey', {
				url: '/reviewSurvey',
				cache: false,
				templateUrl: 'views/createSurvey/reviewSurvey.html',
				controller: 'reviewSurveyController'
			})
			.state('editSurveyInfo', {
				url: '/editSurveyInfo',
				cache: false,
				templateUrl: 'views/createSurvey/editSurveyInfo.html',
				controller: 'editSurveyInfoController'
			})
			.state('addQuestion', {
				url: '/addQuestion',
				cache: false,
				templateUrl: 'views/createSurvey/addQuestion.html',
				controller: 'addQuestionController'
			})
			.state('editQuestion', {
				url: '/editQuestion/:questionNumber',
				cache: false,
				templateUrl: 'views/createSurvey/editQuestion.html',
				controller: 'editQuestionController'
			})
			.state('surveyFlow', {
				url: '/surveyFlow/:surveyId',
				cache: false,
				templateUrl: 'views/survey/surveyFlow.html',
				controller: 'surveyFlowController'
			})
			.state('app.profile', {
				url: '/profile',
				templateUrl: 'views/profile/profile.html',
				controller: 'profileController'
			})
			.state('app.friends', {
				url: '/friends',
				templateUrl: 'views/friend/friends.html',
				controller: 'friendsController'
			})
			.state('app.addFriend', {
				url: '/addFriend',
				templateUrl: 'views/friend/addFriend.html'
			})
			.state('splashScreen', {
				url: '/splashScreen',
				templateUrl: 'views/login/login.html',
				controller: 'loginController'
			})
			.state('signup', {
				url: '/signup',
				templateUrl: 'views/login/signup.html',
				controller: 'signupController'
			});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/home');
	})
	.config(function($ionicConfigProvider, ChartJsProvider){
		$ionicConfigProvider.navBar.alignTitle('center');
		ChartJsProvider.setOptions({
			colours: ['#FF5252', '#FF8A80'],
			responsive: false
		});
	})
	.constant("constants", {
		"url": "http://rapol.xyz/loop/",
		"port": "5000"
	});