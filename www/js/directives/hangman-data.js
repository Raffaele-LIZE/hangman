app.directive('hangmanData', function() {
  return {
    restrict : 'E',
    templateUrl : 'templates/hangman-data.html',
    replace : false,
    scope :  {
      word : '=',
      found : '='
    },
    link : function(scope, element, attrs) {

      scope.$watch('word', function(newValue, oldValue) {

        // Init letters game array
        scope.letters = [];

        // On range la première lettre du mot dans le tableau
        if(scope.word && scope.word != undefined) {
          var first = scope.word.charAt(0);

          for(var i = 0 ; i < scope.word.length ; i++) {

            if(scope.word.charAt(i) == first) {
              scope.letters.push(first);
            } else {
              scope.letters.push('_');
            }
          }
        }
      });

      scope.$watchCollection('found', function(newValue, oldValue) {

        if(scope.word && scope.word != undefined) {

          for(var i = 0 ; i < scope.word.length ; i++) {

            var l = scope.word.charAt(i);

            if(_.indexOf(scope.found, l) != -1) {
              scope.letters[i] = l;
            }
          }

          console.log(scope.letters);
        }
      });
    }
  }
});