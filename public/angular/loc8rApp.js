angular.module('loc8rApp', []);
var locationListCtrl = function($scope, loc8rData, geolocation) {
	$scope.message = "Checking your location";
	$scope.getData = function(position) {
		$scope.message = "Searching for nearby places";
		loc8rData.success(function(data) {
			$scope.message = data.length > 0 ? "" : "No locations found";
			$scope.data = { locations: data };
		}).error(function(e) {
			$scope.message = "Sorry, something's gone wrong.";
		});
	};

	$scope.showError = function(error) {
		$scope.$apply(function() {
			$scope.message = error.message;
		});
	};

	$scope.noGeo = function() {
		$scope.$apply(function() {
			$scope.message = "Geolocation not supported by this browser.";
		});
	};
	geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};

var loc8rData = function($http) {
	return $http.get('/api/locations?lng=-118.328661&lat=34.092809&maxDistance=20');
	/*return [{
		name: 'Jack in the Box',
		address: '6407 W Sunset Blvd Los Angeles, CA',
		rating: 3,
		facilities: ['Hot drinks', 'Food', 'Premium wifi'],
		distance: '0.7865456',
		_id: '5370a35f2536f6785f8dfb6a'
	}, {
		name: 'Taco Bell',
		address: '6254 Lexington Avenue Los Angeles, CA',
		rating: 4,
		facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
		distance: '0.296456',
		_id: '5370a35f2536f6785f8dfb7a'
	}, {
		name: 'Chipotle Mexican Grill',
		address: '1460 Vine St Los Angeles, CA',
		rating: 5,
		facilities: ['Chips', 'Food', 'Beer'],
		distance: '0.896456',
		_id: '5370a35f2536f6785f8dfb8a'
	}, {
		name: 'Tender Greens',
		address: '6290 Sunset Blvd Hollywood, CA',
		rating: 5,
		facilities: ['Salad', 'Lunch', 'Lemonade'],
		distance: '0.996456',
		_id: '5370a35f2536f6785f8dfb9a'
	}, {
		name: 'Kabuki Japanese ',
		address: '1545 Vine St Los Angeles, CA',
		rating: 5,
		facilities: ['Sushi', 'Saki', 'Fish'],
		distance: '0.999999',
		_id: '5370a35f2536f6785f8dfb5a'
	}];*/
};

var _isNumeric = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

var formatDistance = function() {
	return function (distance) {
		var numDistance, unit;
		if(distance && _isNumeric(distance)) {
			if(distance > 1) {
				numDistance = parseFloat(distance).toFixed(1);
				unit = 'km';
			} else {
				numDistance = parseInt(distance * 1000, 10);
				unit = 'm';
			}
			return numDistance + unit;
		} else {
			return '?';
		}
	};
};

var geolocation = function() {
	var getPosition = function(cbSuccess, cbError, cbNoGeo) {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
		} else {
			cbNoGeo();
		}
	};
	return {
		getPosition: getPosition
	};
};

var ratingStars = function() {
	return {
		scope: {
			thisRating: '=rating'
		},
		templateUrl: '/angular/rating-stars.html'
	};
};

angular
	.module('loc8rApp')
	.controller('locationListCtrl', locationListCtrl)
	.filter('formatDistance', formatDistance)
	.directive('ratingStars', ratingStars)
	.service('loc8rData', loc8rData)
	.service('geolocation', geolocation);