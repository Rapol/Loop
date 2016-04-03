angular.module('loop.controllers.authentication', [])
	.controller('loginController', ['$scope', '$http', '$state', '$ionicViewSwitcher', '$ionicPopup', 'AuthService', function ($scope, $http, $state, $ionicViewSwitcher, $ionicPopup, AuthService) {
		$scope.user = {};
		var message = '';

		$scope.login = function (userForm) {
			if (!userForm.$valid)
				return;
			AuthService.login($scope.user).then(function (res) {
					$ionicViewSwitcher.nextDirection('forward');
					$state.go('app.home');
				}
			).catch(function (err) {
					console.log(err);
					if (err.status == 401)
						message = 'Username or password is incorrect.';
					else
						message = 'Unexpected error please try again.';

					$ionicPopup.alert({
						title: 'Login error',
						template: message
					});
				});
		}
	}])
	.controller('signupController', ['$scope', '$http', '$state', '$ionicViewSwitcher', '$ionicPopup', 'AuthService', function ($scope, $http, $state, $ionicViewSwitcher, $ionicPopup, AuthService) {

		$scope.user = {};
		var message = '';
		$scope.passwordMatch = false;

		$scope.signUp = function (signUpForm) {
			$scope.passwordMatch = ($scope.user.password == $scope.user.confirmedPassword) && $scope.user.password.length != 0;

			if (!signUpForm.$valid)
				return;
			if (!$scope.passwordMatch)
				return;

			AuthService.signUp($scope.user).then(function (res) {
					$ionicViewSwitcher.nextDirection('forward');
					$state.go('app.home');
				}
			).catch(function (err) {
					console.log(err);
					if (err.status == 400)
						message = 'Bad request please try again.';
					else if (err.status == 409)
						message = 'Account already exists with the same email.';
					else
						message = 'Unexpected error please try again.';
					$ionicPopup.alert({
						title: 'Signup error',
						template: message
					});
				});
		};
	}]);