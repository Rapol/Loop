angular.module('loop.services.auth', [])
	.service('AuthService', function ($http, Session, constants) {

		this.login = function (credentials) {
			return $http
				.post(constants.url + 'login', credentials)
				.then(function (res) {
					console.log(res);
					Session.create(res.data.email, res.data.firstName, res.data.lastName);
					return res;
				});
		};

		this.signUp = function (credentials) {
			return $http
				.post(constants.url + 'signup', credentials)
				.then(function (res) {
					Session.create(res.data.email, res.data.firstName, res.data.lastName);
					return res;
				});
		};

		this.isAuthenticated = function () {
			return !!Session.email;
		};

	})
	.service('Session', function () {
		this.create = function (email, firstName, lastName) {
			this.email = email;
			this.firstName = firstName;
			this.lastName = lastName;
		};
		this.destroy = function () {
			this.email = null;
			this.firstName = null;
			this.lastName = null;
		};
	})
;