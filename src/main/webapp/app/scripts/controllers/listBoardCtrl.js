angular
    .module('taskOrganization')
    .controller('listBoardCtrl', listBoardCtrl);

function listBoardCtrl($scope, $routeParams, $location, dbService, authService) {

    initialization();

    function initialization() {
        if(authService.isAuthorization()) {
            $scope.tables = dbService.getFirebaseArray();
            $scope.whichTable = $routeParams.tableID;
        }
        else{
            $location.path('/login');
        }
    }

    $scope.goToTable = function (id) {
        $location.path('/board/' + id);
    };

    $scope.addTable = function () {
        dbService.add(
            {
                name: "nowa tablica",
                lists: [
                    {
                        name: "nowa lista",
                        tickets : [ {
                            title: "nowe zadanie"
                        }]
                    }
                ]});
    };

}