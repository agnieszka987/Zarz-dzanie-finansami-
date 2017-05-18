MyApp.controller("navbarController", function ($scope, $cookies, $location, $http) {

    var parameterGroupName = JSON.stringify({type:"groupName", id_grupy:$cookies.get('id_grupy')});

	$http.post("./api/getGroupName.php", parameterGroupName)
	    .then(function (response) {
	   		$cookies.put('nazwa_grupy', response.data.records[0].login);
	   		$scope.groupName = response.data.records[0].login;
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