MyApp.controller("loginController", function ($scope, $http, $location, $cookies) {
    $scope.title = "loginController";

    $scope.zaloguj = function () {

        var parameter = JSON.stringify({type: "user", username: $scope.login, password: $scope.password});

            $http.post("./api/login.php", parameter)
                .then(function (response) {
                    console.log(response.data.records.length);
                    if (response.data.records.length === 1) {
 
                        $cookies.put('login', $scope.login);
                        $cookies.put('id_uzytkownika', response.data.records[0].id_uzytkownika);
                        console.log(response.data.records[0].id_grupy);

                        if (response.data.records[0].id_grupy !== "") {
                            $location.path('/home');
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