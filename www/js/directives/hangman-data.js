app.directive('hangmanData', function() {
  return {
  	restrict: 'E',
  	scope: {
  		word: '=',
  		found: '='
  	},
    template: '<div class="find-word">{{word}}</div><div class="selected-letters"></div>',
    link: function(scope, element, attrs) {
    	console.log(scope);
    }
  };
});