app.directive('hangmanStep', function() {
  return {
  	restrict: 'E',
  	scope: {
  		index: '='
  	},
    template: '<img src="img/step{{index}}.png" alt="step" />',
  };
});