app.directive('hangmanStep', function() {
  return {
  	restrict: 'E',
  	scope: {
  		index: '='
  	},
    template: '<img ng-src="img/step{{index}}.png" alt="step" />',
  };
});