var MyApp = angular.module("MyApp", ['ui.router','ui.bootstrap']);

MyApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);


MyApp.config(function($stateProvider, $urlRouterProvider){
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

MyApp.controller("loginController", function ($scope, $http, $location) {
    $scope.title = "loginController";

      $scope.zaloguj = function() {

      	var parameter = JSON.stringify({type:"user", username:$scope.login, password:$scope.password});

  			  $http.post("./js/login.php", parameter)

   			 .then(function (response) {
   			 	console.log(response.data.records.length);
   			 	if (response.data.records.length == 1) {
   			 		alert("Poprawne dane!");
   			 		$location.path('/groups');

   			 	} else {
   			 		alert("Błędne hasło lub login");
   			 	}
   			 });
		} 
});

MyApp.controller("groupsNewController", function ($scope) {
    $scope.title = "groupsNewController";
});

MyApp.controller("page1Controller", function ($scope) {
    $scope.title = "page1Controller";
});

MyApp.controller("signupController", function ($scope, $http, $location) {
    $scope.title = "signupController";
    $scope.dodajUzytkownika = function() {

    	var parameterUser = JSON.stringify({type:"user", username:$scope.login, password:$scope.password, 
    	name:$scope.name, email:$scope.email, surname:$scope.surname});

    	$http.post("./js/newUser.php", parameterUser)

   			 .then(function (response) {
   			 	console.log(response.data);
   			 	if (response.data == true) {
   			 		alert("Dodano użytkwonika!");
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
    }
});

MyApp.controller("groupsController", function ($scope, $uibModal) {
    $scope.title = "groupsController";
    $scope.modalNew = function () {
		console.log('opening pop up');
		var uibModalInstance = $uibModal.open({
		templateUrl: 'templates/groups-new.html',
		scope: $scope,
		});

		$scope.dodajGrupe = function() {
		console.log("dodaj");
	}

	};
	$scope.modalJoin = function () {
		console.log('opening pop up');
		var uibModalInstanceJoin = $uibModal.open({
		templateUrl: 'templates/groups-join.html',
		});
	};

});

MyApp.controller("navbarController", function ($scope) {
    $scope.title = "navbarController";
});



