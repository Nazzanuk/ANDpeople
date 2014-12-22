'use strict';

var app = angular.module('andpeople');

app.controller('peopleCtrl', function ($scope, $timeout, AjaxService, $q) {

    $scope.newPerson = false;
    $scope.currentPerson = 0;
    $scope.currentTab = 'skills';
    $scope.skillRange = [0, 1, 2, 3, 4, 5];

    $scope.person = {};
    $scope.people = [];
    $scope.skills = [];
    $scope.skill = {};

    $scope.fields = [
        {
            key: '_id',
            title: 'ID',
            disabled: true
        },
        {
            key: 'firstName',
            title: 'First Name'
        },
        {
            key: 'lastName',
            title: 'Last Name'
        },
        {
            key: 'role',
            title: 'Role'
        },
        {
            key: 'squad',
            title: 'Squad'
        },
        {
            key: 'team',
            title: 'Team'
        },
        {
            key: 'client',
            title: 'Client'
        },
        {
            key: 'bio',
            title: 'Bio'
        },
        {
            key: 'mobile',
            title: 'Mobile'
        }
    ];

    $scope.setTab = function (tab) {
        if ($scope.currentTab == tab) {
            $scope.currentTab = "";
        } else {
            $scope.currentTab = tab;
        }

    };

    $scope.leftScrollHeight = function (tab) {
        return ($(window).height() - 214) + 'px';
    };

    $scope.skillsScrollHeight = function (tab) {
        return ($(window).height() - 355) + 'px';
    };

    $scope.setSkillValue = function ( skillID, value) {
        if ($scope.people[$scope.currentPerson].skills == undefined) {
            $scope.people[$scope.currentPerson].skills = {};
        }
        $scope.people[$scope.currentPerson].skills[skillID] = value;
        $scope.save();
    };

    $scope.setPerson = function (index) {
        $scope.newPerson = false;
        $scope.currentPerson = index;
    };

    $scope.getPeople = function () {
        AjaxService.request('get', '/people').then(function (data) {
            $scope.people = _.sortBy(data, function(o) { return o.firstName; });
        });
    };

    $scope.getSkills = function () {
        AjaxService.request('get', '/skills').then(function (data) {
            $scope.skills = data;
        });
    };

    $scope.submit = function () {
        AjaxService.request('post', '/people', $scope.person).then(function () {
            $scope.setPerson($scope.people.length);
            $scope.getPeople();
        });
    };

    $scope.save = function () {
        AjaxService.request('put', '/people', $scope.people[$scope.currentPerson]).then(function () {
            $scope.getPeople();
        });
    };

    $scope.init = function () {
        $scope.getPeople();
        $scope.getSkills();
    };
    $scope.init();
});