app.directive('hangmanData', function() {
  return {
  	restrict: 'E',
  	scope: {
  		word: '=',
  		found: '='
  	},
    templateUrl: 'templates/data-word.html',
    link: function(scope, element, attrs) {
      
      scope.letters = [];

      scope.$watch(function(scope) {
        
      });

      var s = scope.word;

      if(s && s != undefined) {
        for (var i = 0; i < s.length; i++) {
            scope.letters[i] = { char: s.charAt(i), display: false };
        }
        console.log(scope.letters);

      } else {
        console.log('word undefined');
      }   
    }
  };
});