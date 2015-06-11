
app.controller('PlayCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, DicoService) {

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
		return item.word;
	};

	$scope.nextStep = function() {
		if($scope.game.currentStep != $scope.game.nbStep) {
			$scope.game.currentStep++;
		} else {
			$scope.game.currentStep = 0;
		}
	};

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
						$scope.game.word = $scope.random(DicoService);
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
			 	console.log('Le mot choisit est : ' + $scope.game.word);
			 });
		}, 1000);
	});
});