//Controllers for Authentication
var App = angular.module('loop.controllers.authentication', []);

App.controller('loginController', ['$scope', '$http', '$state', '$window', '$ionicViewSwitcher', '$ionicPopup', 'constants', function($scope, $http, $state, $window, $ionicViewSwitcher, $ionicPopup, constants){
	$scope.user = {};
	var message = '';

	$scope.login = function () {
		if (!$scope.user.email) {
			$ionicPopup.alert({
				title: 'Login credentials',
				template: 'Email cannot be blank'
			});
			return;
		}

		if (!$scope.user.password) {
			$ionicPopup.alert({
				title: 'Login credentials',
				template: 'Password cannot be blank'
			});
			return;
		}

		$http.post(constants.url + 'login', $scope.user).then(
			function (result) {
				$window.sessionStorage.email = result.data.email;
				$window.sessionStorage.firstName = result.data.first_name;
				$window.sessionStorage.lastName = result.data.last_name;
				$ionicViewSwitcher.nextDirection('forward');
				$state.go('app.home');
			},
			function (err) {
				console.log(err);
				if (err.status == 401)
					message = 'Username or password incorrect.';
				else
					message = 'Unexpected error please try again.';

				$ionicPopup.alert({
					title: 'Login error',
					template: message
				});
			});
	}
}]);

App.controller('signupController', ['$scope', '$http', '$state', '$ionicViewSwitcher', 'constants', function($scope, $http, $state, $ionicViewSwitcher, constants){

	$scope.user = {};
	$scope.error = false;
	$scope.message = '';

	$scope.signup = function () {
		$http.post(constants.url + 'signup', $scope.user).then(
			function (result) {
				$window.sessionStorage.email = $scope.user.email;
				$window.sessionStorage.firstName = $scope.user.first_name;
				$window.sessionStorage.lastName = $scope.user.last_name;
				$ionicViewSwitcher.nextDirection('forward');
				$state.go('app.home');
			},
			function (err) {
				$scope.error = true;
				console.log(err);
				if (err.status == 400)
					$scope.message = 'Bad request please try again.';
				else if (err.status == 409)
					$scope.message = 'Email is already being used.';
				else
					$scope.message = 'Unexpected error please try again.';
			});
	}
}]);