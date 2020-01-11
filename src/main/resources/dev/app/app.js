angular
    .module('taskOrganization', ['ngRoute', 'firebase', 'ngCookies', 'ui.bootstrap'])
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/listboard', {
            controller: 'listBoardCtrl',
            templateUrl: '/myapp/app/views/listBoard.html'
        })
        .otherwise({redirectTo: '/listboard'})
}

// Initialize the Firebase SDK
var config = {
    apiKey: "AIzaSyD-1SnAMXDj22lVWbYVMiRZPs_wuFI6WY8",
    authDomain: "sport-store-angular.firebaseapp.com",
    databaseURL: "https://sport-store-angular.firebaseio.com",
    projectId: "sport-store-angular",
    storageBucket: "sport-store-angular.appspot.com",
    messagingSenderId: "147126656341"
};
firebase.initializeApp(config);
