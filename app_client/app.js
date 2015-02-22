angular.module('loc8rApp', ['ngRoute']);

function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html'
		})
		.otherwise({redirectTo: '/'});
}

angular
	.module('loc8rApp')
	.config(['$routeProvider', config]);