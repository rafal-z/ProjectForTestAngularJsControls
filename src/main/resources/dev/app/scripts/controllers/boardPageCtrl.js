angular
    .module('taskOrganization')
    .controller('boardPageCtrl', boardPageCtrl);

// boardPageCtrl.$inject = ['$scope'];

function boardPageCtrl($scope, $routeParams, $location, $uibModal, dbService, authService) {

    initialization();
    
    function initialization() {
        if(authService.isAuthorization()) {
            $scope.tables = dbService.getFirebaseArray();
            $scope.tableIndex = $routeParams.tableID;
            $scope.ticketMenu = getTicketMenu();
        }
        else{
            $location.path('/login');
        }
    }

    $scope.saveName = function (table) {
        dbService.save(table);
    };

    $scope.getCurrentTable = function () {
        var array = $scope.tables;
        var id = $scope.tableIndex;
        if(array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i]['$id'] === id) {
                    return array[i];
                }
            }
            return null;
        }
    };

    $scope.addList = function (table) {
        if(table.lists === undefined){
            table["lists"] = [{name: 'nowa lista', tickets: [{title: ""}]}];
        }
        else {
            table.lists.push({name: 'nowa lista', tickets: [{title: ""}]});
        }
        dbService.save(table);
    };

    $scope.addTicket = function (table, index) {
        if(table.lists[index].tickets === undefined){
            table.lists[index]["tickets"] = [{title: ""}];
        }
        else {
            table.lists[index].tickets.push({title: ""});
        }
        dbService.save(table);
    };

    $scope.removeList = function (obj) {
        var tableId = $scope.tableIndex;
        var table = $scope.getCurrentTable($scope.tables, tableId);
        var index = table.lists.indexOf(obj);
        table.lists.splice(index, 1);
        dbService.save(table);
    };

    $scope.saveDragend = function (table) {
        dbService.save(table);
    };

    $scope.dropTicketCallback = function(item, indexList) {
        var obj = $scope.getCurrentTable($scope.tables, $scope.tableIndex);
        var indexTable = $scope.tables.indexOf(obj);
        var list = $scope.tables[indexTable].lists[indexList];

        if(list.tickets === undefined){
            list["tickets"] = [{}];
        }

        return item;
    };

    $scope.removeTable = function (table) {
        dbService.remove(table);
        $location.path('/listboard');
    };

    function getTicketMenu() {
        return [
            {
                label: 'Edytuj',
                onClick: openEditPopup
            },
            {
                divider: true
            },
            {
                label: 'Usuń',
                onClick: removeTicket
            }
        ]}

    function removeTicket (obj) {
        var table = obj.dataContext.table;
        var list = obj.dataContext.list;
        var indexList = table.lists.indexOf(list);
        var indexTicket = obj.dataContext.$index;
        table.lists[indexList].tickets.splice(indexTicket, 1);
        dbService.save(table);
    }

    function openEditPopup (obj) {
        var modalInstance = $uibModal.open({
            templateUrl: '/myapp/app/views/editPopup.html',
            controller: 'editPopUpCtrl',
            resolve: {
                tableParam: function () {
                    return obj.dataContext.table;
                },
                listIdx: function () {
                    return obj.dataContext.table.lists.indexOf(obj.dataContext.list);
                },
                ticketIdx: function () {
                    return obj.dataContext.$index;
                }
            }
        });
    };
};
