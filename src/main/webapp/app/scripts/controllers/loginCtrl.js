angular
    .module('taskOrganization')
    .controller('loginCtrl', loginCtrl);

function loginCtrl($scope, $location, authService) {
    if(authService.isAuthorization()){
        $location.path('/listboard');
    }

    $scope.login = function () {
        if($scope.loginform.$valid) {
            var username = $scope.user.email;
            var password = $scope.user.password;
            $scope.errorMessage = authService.login(username, password);
        }
    };

    $scope.logout = function () {
        authService.logout();
    };
}