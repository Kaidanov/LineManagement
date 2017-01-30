(function () {

    "use strict";
    angular.module('lineManagement')
        .controller('LineController',
        ['$scope', '$http', 'lineWCFService', 'myDateFormatFilter',  '$filter', LineController]);

    function LineController($scope, $http, lineWCFService, myDateFormatFilter,  $filter) {

        $scope.ForUpdate = [];
        GetCustomers();


        function removeHandledFromLine() {
            var index = $scope.customersList.indexOf($scope.nextToHandle);
            $scope.customersList.splice(index, 1);
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
        function handleChosenNext() {
            var newTemp = $filter("filter")($scope.customersList, { Status: '1' });
            if (newTemp != null) {
                $scope.nextToHandle = newTemp[0];
                removeHandledFromLine();
            }
        }

        function GetCustomers() {
            var promiseGet = lineWCFService.GetCustomers();

            promiseGet.then(
                function (pl) {
                    $scope.customersList = pl.data;
                    handleChosenNext()                    
                }, function (errorPl) { } );
        }

        $scope.UpdateCustomer = function (customer) {
            var promiseGet = lineWCFService.UdpateCustomer(customer);

            promiseGet.then(
                function (pl) {
                    if (pl.data) {
                        $scope.ForUpdate = [];
                        GetCustomers();                                             
                    }
                }, function (errorPl) {   });
        }

        $scope.AddCustomer = function () {
            var promiseGet = lineWCFService.AddCustomer($scope.newCustomerName);
            promiseGet.then(
               function (pl) {
                   if (pl.data) {
                       $scope.msg = "Added Customer" + $scope.newCustomerName;
                       GetCustomers();
                       $scope.newCustomerName = null;
                   }

               }, function (errorPl) {      } );
        }


        function getNextToTheLine() {
            if ($scope.customersList.length > 0) {
                $scope.nextToHandle = $scope.customersList[0];
                $scope.nextToHandle.Status = 1;
                $scope.ForUpdate.push($scope.nextToHandle);
                removeHandledFromLine();
            }
            else {
                $scope.msg = "No more customers for now."
            }
        }

        function updateWaitingList() {
            if ($scope.nextToHandle != null) {
                var index = $scope.customersList.indexOf($scope.nextToHandle);
                $scope.customersList.splice(index, 1);
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }
        }


        $scope.GetNextToLine = function () {
            if ($scope.nextToHandle != null) {
                $scope.nextToHandle.Status = 2;
                $scope.ForUpdate.push($scope.nextToHandle);
            }
            getNextToTheLine();
            $scope.UpdateCustomer($scope.ForUpdate);

        }


    }


})();