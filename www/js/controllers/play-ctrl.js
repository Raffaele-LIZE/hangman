
app.controller('PlayCtrl', function($scope, $rootScope, $ionicModal, $ionicPopup, $timeout, DicoService, $state) {

	var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	
	// Init game object
	$scope.game = {
		word: undefined,
		found: [],
		currentStep: 0,
		nbStep: 10,
		is_finished: false,
		currentPlayer: 'computer',
	}

	$scope.$watch('game.is_finished', function(newValue, oldValue) {
		if($scope.game.is_finished == true) {
			$scope.$broadcast('game::end');
		}
	});

	$scope.random = function(tab) {
		item = tab[Math.floor(Math.random()*tab.length)];
		return item;
	};

	// Init $broadcast Game Next
	$scope.$on('game::next', function() {
		$scope.interval = setInterval(function() {
			$scope.nextStepComputer();
			// Force the update of variable changed in setInterval
			$scope.$apply();
		}, 1000);
	});

	// Init $broadcast Game End
	$scope.$on('game::end', function() {
		// Force to stop the setInterval of the Game Next $broadcast
		clearInterval($scope.interval);

		var my_title, my_template;

		if($scope.game.is_finished == true) {
			my_title = 'Bravo !';
			my_template = 'T\'es trop chaud mec !';
		} else {
			my_title = 'Oh mother f**k !';
			my_template = 'Mais noooonnnnnn';
		}

		$ionicPopup.alert({
			title : my_title,
			template : my_template 
		}).then(function() {
			// Reset attributes in game object
			$scope.game.word = undefined;
			$scope.game.found = [];
			$scope.game.currentStep = 0;
			$scope.game.is_finished = false;

		});
	});

	$scope.nextStepComputer = function() {
		var letter = $scope.random(alphabet);
		console.log('Letter selected : ',letter);

		if($scope.game.word.indexOf(letter) != -1) {
			$scope.game.found.push(letter);
		} else {
			$scope.game.currentStep++;

			// If computer lose
			if($scope.game.currentStep == 10) {
				$scope.$broadcast('game::end');
			}
		}			
	};

	// $broadcast Computer Play

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
			 	// Call $broadcast computer play
			 	$scope.$broadcast('game::next');
			 });
		}, 1000);
	});
});