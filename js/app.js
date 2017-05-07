var MyApp = angular.module("MyApp", ['ui.router', 'ui.bootstrap', 'ngCookies']);

MyApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);


MyApp.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
        .state('main', {
            url: "",
            views: {
                'header': {
                    templateUrl: "templates/navbar.html",
                    controller: 'navbarController'
                },
                'content': {
                    templateUrl: "main.html",
                    controller: 'page1Controller'
                }
            }
        })
        .state('home', {
            url: "/home",
            views: {
                'header': {
                    templateUrl: "templates/navbar.html",
                    controller: 'navbarController'
                },
                'content': {
                    templateUrl: "templates/page0.html",
                    controller: 'page0Controller'
                }
            }
        })
        .state('page1', {
            url: "/page1",
            views: {
                'header': {
                    templateUrl: "templates/navbar.html",
                    controller: 'navbarController'
                },
                'content': {
                    templateUrl: "templates/page1.html",
                    controller: 'page1Controller'
                }
            }
        })
        .state('login', {
            url: "/login",
            views: {
                'header': {
                    templateUrl: "templates/login.html",
                    controller: 'loginController'
                }
            }
        })
        .state('signup', {
            views: {
                'header': {
                    url: "/signup",
                    templateUrl: "templates/signup.html",
                    controller: 'signupController'
                }
            }
        })
        .state('groups', {
            url: "/groups",
            views: {
                'header': {
                    templateUrl: "templates/groups.html",
                    controller: 'groupsController'
                }
            }
        })
        .state('money', {
            url: "/money",
            views: {
                'header': {
                    templateUrl: "templates/navbar.html",
                    controller: 'navbarController'
                },
                'content': {
                    templateUrl: "templates/money.html",
                    controller: 'moneyController'
                }
            }
        })
        .state('duties', {
            url: "/duties",
            views: {
                'header': {
                    templateUrl: "templates/navbar.html",
                    controller: 'navbarController'
                },
                'content': {
                    templateUrl: "templates/duties.html",
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
                    templateUrl: "templates/login.html",
                    controller: 'loginController'
                }
            }
        });
});

MyApp.controller("page0Controller", function ($scope) {
    $scope.title = "page0Controller";
});

MyApp.controller("moneyController", function ($scope, $cookies, $http) {
    $scope.title = "moneyController";
    
    $scope.orderByMe = function(x) {
		$scope.myOrderBy = x;
	}

	function refreshTable() {
	    $http.post("./js/zakupy.php", parameterShopping)
	        .then(function (response) {
	            console.log(response.data.records);
	            var zakupyObj = response.data.records;
	            $scope.zakupy = zakupyObj;
	        });
    }

    var parameterShopping = JSON.stringify({type: "shopping", id_grupy: $cookies.get('id_grupy')});
    refreshTable();

    $scope.slide = function() {
		$("#form").slideDown("slow");
	};

	$scope.hide = function() { 
		$("#form").slideUp("slow");
	};

	$scope.addShopping = function() {
		alert("dodaj klienta");

		var parameterAddShopping = JSON.stringify({type: "addShopping", id_grupy: $cookies.get('id_grupy'),
		                                          id_uzytkownika: $cookies.get('id_uzytkownika'), shoppingProduct: $scope.shoppingProduct, 
		                                          shoppingPrice: $scope.shoppingPrice, shoppingDate: $scope.shoppingDate});

		$http.post("./js/addShopping.php", parameterAddShopping)
            .then(function (response) {
                console.log(response.data.records); 
                $('#alertDodano').show();
                refreshTable();
                $scope.shoppingPrice = "";
                $scope.shoppingDate = "";
                $scope.shoppingProduct = "";
            });
	}
});

MyApp.controller("dutiesController", function ($scope, $http) {
    $scope.title = "dutiesController";
    
    var date = new Date();
    
    // ilość tygodni w miesiącu
    var firstOfMonthJS = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastOfMonthJS = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var firstWeek = moment(firstOfMonthJS).format('W');
    var lastWeek = moment(lastOfMonthJS).format('W');
    var numberOfWeeks = lastWeek - firstWeek + 1;
    if (numberOfWeeks < 0) { firstWeek = 0; }
    numberOfWeeks = lastWeek - firstWeek + 1;
    console.log("tygodni w miesiącu: " + numberOfWeeks);
    
    // podział miesiąca na tygodnie
    function sameMonth (a, b, other) {
        if (a.month() !== b.month()) {
            return other;
        }
        return a.date();
    }

    function weeks (m) {
        var lastOfMonth     = m.clone().endOf('month'),
            lastOfMonthDate = lastOfMonth.date(),
            firstOfMonth    = m.clone().startOf('month'),
            currentWeek     = firstOfMonth.clone().weekday(0),
            output          = [],
            startOfWeek,
            endOfWeek;

        while (currentWeek < lastOfMonth) {
            startOfWeek = sameMonth(currentWeek.clone().weekday(0), firstOfMonth, 1);
            endOfWeek = sameMonth(currentWeek.clone().weekday(6), firstOfMonth, lastOfMonthDate);

            output.push(startOfWeek + ' - ' + endOfWeek);
            currentWeek.add(7, 'd');
        }

        return output;
    };
    var dd = moment().set('date', 1).format("YYYY-MM-DD");
    $scope.okresy = weeks(moment(dd, 'YYYY-MM-DD', 'pl'));
    console.log($scope.okresy.join(' , ') + " *** " + $scope.okresy.length);
    
    
    
    var arr = [];
    for (var i = 0; i < numberOfWeeks; i++) {
        arr.push({ title: 'Tydzień ' + (i + 1), content: 'Tydzień ' + (i + 1) });
    };
    
    $scope.tabs = arr;
    console.log($scope.tabs);
    
    function showDuties() {
	    $http.get("./js/duties.php")
	        .then(function (response) {
	            console.log(response.data.records);
	            var dutiesObj = response.data.records;
	            $scope.duties = dutiesObj;
	        });
    };
    
    showDuties();
    
    $scope.slide = function() {
		$("#form").slideDown("slow");
	};

	$scope.hide = function() { 
		$("#form").slideUp("slow");
	};
    
    $scope.addDuty = function() {
//		alert("dodaj klienta");

		var parameterAddDuty = JSON.stringify({type: "addDuty", dutyName: $scope.dutyName});

		$http.post("./js/addDuty.php", parameterAddDuty)
            .then(function (response) {
                console.log(response.data.records); 
                $('#alertDodano').show();
                showDuties();
                $scope.dutyName = "";
            });
	};
    
});

MyApp.controller("loginController", function ($scope, $http, $location, $cookies) {
    $scope.title = "loginController";

    $scope.zaloguj = function () {

        var parameter = JSON.stringify({type: "user", username: $scope.login, password: $scope.password});

            $http.post("./js/login.php", parameter)
                .then(function (response) {
                    console.log(response.data.records.length);
                    if (response.data.records.length === 1) {
                        alert("Poprawne dane!");
                        $cookies.put('login', $scope.login);
                        $cookies.put('id_uzytkownika', response.data.records[0].id_uzytkownika);
                        console.log(response.data.records[0].id_grupy);

                        if (response.data.records[0].id_grupy !== "") {
                            $location.path('/money');
                            $cookies.put('id_grupy', response.data.records[0].id_grupy);
                        } else if (response.data.records[0].id_grupy === "") {
                            $location.path('/groups');
                        }

                    } else {
                        alert("Błędne login lub hasło");
                    }
                 });
		};
});

MyApp.controller("groupsNewController", function ($scope, $uibModalInstance) {
    $scope.title = "groupsNewController";

    $scope.dodajGrupe = function () {
	};

});

MyApp.controller("page1Controller", function ($scope) {
    $scope.title = "page1Controller";
});

MyApp.controller("signupController", function ($scope, $http, $location, $cookies) {
    $scope.title = "signupController";
    $scope.dodajUzytkownika = function () {

        var parameterUser = JSON.stringify({type: "user", username: $scope.login, password: $scope.password,
                                            name: $scope.name, email: $scope.email, surname: $scope.surname});

        $http.post("./js/newUser.php", parameterUser)
            .then(function (response) {

                console.log(response.data);
                if (response.data === true) {
                    alert("Dodano użytkownika!");
                    $cookies.put('login', $scope.login);
                    $scope.login = "";
                    $scope.name = "";
                    $scope.surname = "";
                    $scope.password = "";
                    $scope.email = "";
                    $location.path('/groups');
                } else {
                    alert("Ups, coś poszło nie tak..");
                }
            });
    };
});

MyApp.controller("groupsController", function ($scope, $uibModal, $cookies, $http, $location) {
    $scope.title = "groupsController";
    var user = $cookies.get('login');
    $scope.modalNew = function () {
		var uibModalInstance = $uibModal.open({
            templateUrl: 'templates/groups-new.html',
            scope: $scope
		});

		$scope.dodajGrupe = function () {
		    var parameterNewGroup = JSON.stringify({type: "user", login: this.name, password: this.password, username: user});
		    console.log("hasło " + this.password);
		    
            if (this.password2 === this.password) {
		    	
                $http.post("./js/newGroup.php", parameterNewGroup)
                    .then(function (response) {
	   			 	
                        var responseObj = JSON.parse(response.data);
                        console.log(responseObj);

                        if (responseObj.resultInsGr === true) {
                            alert("Dodano grupę!");
                            $cookies.put('id_grupy', responseObj.records[0].id_grupy);
                            $location.path('/money');
                        } else {
                            alert("Ups, coś poszło nie tak..");
                        }
                    });
		    } else {
                alert("Podane hasła są różne");
		    }
		};

	};
	$scope.modalJoin = function () {
		console.log('opening pop up');
		var uibModalInstanceJoin = $uibModal.open({
            templateUrl: 'templates/groups-join.html',
            scope: $scope
		});

		$http.get("./js/groups.php")
            .then(function (response) {
                $scope.groupsName = response.data.records;
	   			
                $scope.dodaj = function () {
                    console.log(this.selectedGroup);

                    var parameterJoinGroup = JSON.stringify({type: "user", groupName: this.selectedGroup,
                                                             password: this.password, username: user});

                    $http.post("./js/joinGroup.php", parameterJoinGroup)
                        .then(function (response) {
                            console.log(response);
                            if (response.data === 1) {
                                alert("Dodano grupę!");
                                $location.path('/money');
                            } else if (response.data === "") {
                                alert("Błędne hasło.");
                            }
                    });

	   			}

	   		});
	};

});

MyApp.controller("navbarController", function ($scope, $cookies, $location, $http) {

    var parameterGroupName = JSON.stringify({type:"groupName", id_grupy:$cookies.get('id_grupy')});

	$http.post("./js/getGroupName.php", parameterGroupName)
	    .then(function (response) {
	   		$cookies.put('nazwa_grupy', response.data.records[0].login);
		});
    
    $scope.username = $cookies.get('login');
    $scope.groupName = $cookies.get('nazwa_grupy');

    $scope.logout = function() {
    	$cookies.put('login', "");
    	$cookies.put('id_grupy', "");
    	$cookies.put('nazwa_grupy', "");
    	$location.path('/login');
    //	$route.reload();
    }
});



