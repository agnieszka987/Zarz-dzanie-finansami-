var MyApp = angular.module("MyApp", ['ui.router', 'ui.bootstrap', 'ngCookies', 'ngMessages']);

MyApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);


MyApp.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
        .state('index', {
            url: "",
            views: {
                'header': {
                    templateUrl: "app/components/navbar/navbar.template.html",
                    controller: 'navbarController'
                },
                'content': {
                    templateUrl: "index.html"
                }
            }
        })
        .state('home', {
            url: "/home",
            views: {
                'header': {
                    templateUrl: "app/components/navbar/navbar.template.html",
                    controller: 'navbarController'
                },
                'content': {
                    templateUrl: "app/components/dashboard/dashboard.template.html",
                    controller: 'dashboardController'
                }
            }
        })
        .state('login', {
            url: "/login",
            views: {
                'header': {
                    templateUrl: "app/components/login/login.template.html",
                    controller: 'loginController'
                }
            }
        })
        .state('signup', {
            views: {
                'header': {
                    url: "/signup",
                    templateUrl: "app/components/signup/signup.template.html",
                    controller: 'signupController'
                }
            }
        })
        .state('groups', {
            url: "/groups",
            views: {
                'header': {
                    templateUrl: "app/components/groups/groups.template.html",
                    controller: 'groupsController'
                }
            }
        })
        .state('money', {
            url: "/money",
            views: {
                'header': {
                    templateUrl: "app/components/navbar/navbar.template.html",
                    controller: 'navbarController'
                },
                'content': {
                    templateUrl: "app/components/money/money.template.html",
                    controller: 'moneyController'
                }
            }
        })
        .state('duties', {
            url: "/duties",
            views: {
                'header': {
                    templateUrl: "app/components/navbar/navbar.template.html",
                    controller: 'navbarController'
                },
                'content': {
                    templateUrl: "app/components/duties/duties.template.html",
                    controller: 'dutiesController'
                }
            }
        })
    /*	.state('groupsNew', {
            url: "/groupsNew",
            views: {
                'header': {
                    templateUrl: "groups-new.html",
                    controller: 'groupsNewController'
                }
            }
        }) */
        .state('/', {
            url: "/home",
            views: {
                'header': {
                    templateUrl: "app/components/login/login.template.html",
                    controller: 'loginController'
                }
            }
        });
});