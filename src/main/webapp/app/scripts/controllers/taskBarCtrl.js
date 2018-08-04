angular
    .module('taskOrganization')
    .controller('taskBarCtrl', taskBarCtrl);

function taskBarCtrl($scope, $location, dbService, authService) {

    $scope.logout = function () {
        dbService.destroyFirebaseArray();
        authService.logout();
    };

    $scope.isAuthorization = function () {
        return authService.isAuthorization();
    };

    $scope.goToListBoard = function () {
        $location.path('/listboard');
    };
}