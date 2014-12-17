'use strict';

var app = angular.module('andpeople');

app.service('AjaxService', function ($http, $timeout, $q) {
    var that = this;

    that.host = 'http://0.0.0.0:3000';

    that.request = function (method, url, data) {
        var deferred = $q.defer();

        $http({
            method: method,
            url: that.host + url,
            data: data
        }).success(function (data, status, headers, config) {
            console.log(data);
            deferred.resolve(data);
        });

        return deferred.promise;
    };

    return that;

});