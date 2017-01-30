/// <reference path="../angular.js" /> 

/// <reference path="../angular.min.js" />  

/// <reference path="../angular-animate.js" />  

/// <reference path="../angular-animate.min.js" />  

/// <reference path="Modules.js" />  


app.service("lineWCFService", function ($http) {

  
    this.GetCustomers = function () {
        return $http.get("http://localhost:56317/service1.svc/GetCustomers/");
    };


    this.AddCustomer = function (name) {
        var request = $http({
            method: "get",
            url: "http://localhost:56317/Service1.svc/AddCustomer",
            params:{ "Name": name },
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
        return request;
    };

    this.UdpateCustomer = function (Customers) {
        var request = $http({
            method: "post",
            url: "http://localhost:56317/Service1.svc/UpdateCustomer",
            data: JSON.stringify(Customers),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
        return request;
    };

});     