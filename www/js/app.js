// Ionic Hangman App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'hangman' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'hangman.services' is found in services.js
// 'hangman.controllers' is found in controllers.js
var app = angular.module('hangman', ['ionic','ngCordova'])

.run(function($ionicPlatform, DatabaseService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/tabs.html",
    controller: 'AppCtrl'
  })

  // Each app has its own nav history stack:

  .state('app.setting', {
    url: '/setting',
    views: {
      'app-setting': {
        templateUrl: 'templates/tab-setting.html',
        controller: 'SettingCtrl'
      }
    }
  })

  .state('app.game', {
      url: '/game',
      views: {
        'app-game': {
          templateUrl: 'templates/tab-home.html',
          controller: 'HomeCtrl'
        }
      }
    })

  .state('app.play', {
      url: '/play',
      views: {
        'app-game': {
          templateUrl: 'templates/tab-play.html',
          controller: 'PlayCtrl'
        }
      }
   })

  .state('app.scoring', {
    url: '/scoring',
    views: {
      'app-scoring': {
        templateUrl: 'templates/tab-scoring.html',
        controller: 'ScoringCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/game');

});
