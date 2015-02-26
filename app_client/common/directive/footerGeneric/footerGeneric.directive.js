(function() {
	angular
		.module('loc8rapp')
		.directive('footerGeneric', footerGeneric);

	function footerGeneric() {
		return {
			restrict: 'EA',
			templateUrl: '/common/directive/footerGeneric/footerGeneric.template.html'
		};
	}
})();