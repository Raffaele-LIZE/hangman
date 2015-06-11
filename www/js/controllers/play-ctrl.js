
app.controller('PlayCtrl', function($scope, $ionicModal, $ionicPopup, $timeout) {

	$scope.word = '';

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
			$ionicPopup.prompt({
			   title: 'Choose a word between 3 and 10',
			   template: 'Enter the word here',
			   cancelText: 'Random',
			   cancelType: 'button-energized',
			   inputType: 'text',
			   inputPlaceholder: 'Efreitech'
			 }).then(function(res) {
			 	if(res !== undefined) {
			 		if(res.length >= 3 && res.length <= 10) {
			 			$scope.word = res;
			 			console.log($scope.word);
			 		} else {
						console.log('Incorrect word');
			 		}
			 	} else {
			 		// get Service RandomWord
			 		// $scope.word = ...RandomWord;
			 	}
			 });
		}, 1000);
	});
});