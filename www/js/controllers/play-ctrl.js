
app.controller('PlayCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, DicoService) {

	var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	
	$scope.game = {
		word: undefined,
		found: [],
		currentStep: 0,
		nbStep: 10,
		isFinished: false,
		currentPlayer: 'user',
	}

	$scope.random = function(tab) {
		item = tab[Math.floor(Math.random()*tab.length)];
		return item;
	};

	$scope.nextStep = function() {

		var letter = $scope.random(alphabet);
		console.log(letter);

		if($scope.game.word.indexOf(letter) != -1) {
			$scope.game.found.push(letter);
		} else {
			$scope.game.currentStep++;
			if($scope.game.currentStep == 10) {
				alert('NOOBY ! =)');
			}
		}
	};

	// Init modal
	$ionicModal.fromTemplateUrl('my-modal.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openModal = function() {
		$scope.modal.show();
	};
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});
	// Execute action on hide modal
	$scope.$on('modal.hidden', function() {
	// Execute action
	});
	// Execute action on remove modal
	$scope.$on('modal.removed', function() {
	// Execute action
	});
	$scope.$on('modal.shown', function() {
		$timeout(function() {
			// Init popup
			$ionicPopup.show({
			   title: 'Choose a word between 3 and 10',
			   template: '<input type="text" ng-model="game.word">',
			   inputPlaceholder: 'Efreitech',
			   scope: $scope,
			   buttons: [
		      	{ 
			      	text: 'Random',
			      	type: 'button-energized',
					onTap: function(e) {
						e.preventDefault();
						$scope.game.word = $scope.random(DicoService).word;
						// return implicite car le mot est déjà stock dans le scope gràace au ng-model du input
					}	
		  		},
				{
					text: '<b>Ok</b>',
					type: 'button-positive',
					onTap: function(e) {
						if (!$scope.game.word || $scope.game.word.length < 3 || $scope.game.word.length > 10) {
							//don't allow the user to close unless he enters wifi password
							e.preventDefault();
						} 
					}
				}
			   ]
			 }).then(function(res) {
			 	// console.log('Le mot choisit est : ' + $scope.game.word);
			 	$scope.game.found.push($scope.game.word.charAt(0));
			 });
		}, 1000);
	});
});