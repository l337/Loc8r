angular.module('loc8rApp', []);
var locationListCtrl = function($scope) {
	$scope.data = {
		locations: [{
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
		}]
	};
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
	.directive('ratingStars', ratingStars);