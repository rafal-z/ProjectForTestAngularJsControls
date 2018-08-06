angular
    .module('taskOrganization')
    .controller('editPopUpCtrl',function ($scope, $uibModalInstance, dbService, tableParam, listIdx, ticketIdx) {
        var vm = $scope;
        vm.table = tableParam;
        vm.listIndex = listIdx;
        vm.ticketIndex = ticketIdx;
        vm.titleTicket = vm.table.lists[vm.listIndex].tickets[vm.ticketIndex].title;
        vm.prevDescription = vm.table.lists[vm.listIndex].tickets[vm.ticketIndex].description;

        vm.close = function () {
            vm.table.lists[vm.listIndex].tickets[vm.ticketIndex].description = vm.prevDescription;
            $uibModalInstance.dismiss('cancel');
        };

        vm.submit = function () {
            dbService.save(vm.table);
            $uibModalInstance.dismiss('success');
        }
    });