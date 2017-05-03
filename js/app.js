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

MyApp.controller("loginController", function ($scope, $http) {
    $scope.title = "loginController";

      $scope.zaloguj = function() {
      	console.log("zaloguj..");

      	var parameter = JSON.stringify({type:"user", username:$scope.login, password:$scope.password});

  			  $http.post("./js/login.php", parameter)

   			 .then(function (response) {
   			 	console.log(response.data.records.length);
   			 	if (response.data.records.length == 1) {
   			 		alert("Poprawne dane!");
   			 	} else {
   			 		alert("Błędne hasło lub login");
   			 	}
   			 });

/*

$http.get("./js/login.php")
   			 .then(function (response) {
   			 	console.log(response.data.records);
   			 	console.log("success");
   			 });




      //	console.log('Login: ' + $scope.login + " hasło: " + $scope.password);
    //	 $http.push('./js/login.php').then(successCallback, errorCallback);
  /*  var user_data='user_login=' +$scope.login +'&user_haslo='+$scope.password;

			$http({
				method: 'POST',
				url: './js/login.php',
				data: user_data,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.then(successCallback,errorCallback);


			function successCallback(response){
			    alert("Zalogowano!");
		        console.log(response);
		        console.log("dane");
			}
			function errorCallback(error){
			    console.log("blad");
			} 
			console.log('Login: ' + $scope.login + " hasło: " + $scope.password);
		/*	var user_data='user_login=' +$scope.login +'&user_haslo='+$scope.password;
 
			$http({
				method: 'POST',
				url: './js/login.php',
				data: user_data,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.then(function(data) {
       		 console.log(data);
				if ( data.trim() === 'correct') {
					console.log('correct');
				} else {
					console.log('correct');
					//$scope.errorMsg = "Invalid Email and Password";
				}
			} 
		})*/




		} 
});

MyApp.controller("groupsNewController", function ($scope) {
    $scope.title = "groupsNewController";
});

MyApp.controller("page1Controller", function ($scope) {
    $scope.title = "page1Controller";
});

MyApp.controller("signupController", function ($scope) {
    $scope.title = "signupController";
});

MyApp.controller("groupsController", function ($scope, $uibModal) {
    $scope.title = "groupsController";
    $scope.modalNew = function () {
		console.log('opening pop up');
		var uibModalInstance = $uibModal.open({
		templateUrl: 'templates/groups-new.html',
		});
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



