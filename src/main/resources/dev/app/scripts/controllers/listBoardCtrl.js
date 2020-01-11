angular
    .module('taskOrganization')
    .controller('listBoardCtrl', listBoardCtrl);

function listBoardCtrl($scope, $routeParams, $location, dbService) {

    initialization();

    function initialization() {
        // $scope.tables = dbService.getFirebaseArray();
        // $scope.whichTable = $routeParams.tableID;
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