MyApp.controller("signupController", function ($scope, $http, $location, $cookies) {
    $scope.title = "signupController";
    $scope.dodajUzytkownika = function () {

        var parameterUser = JSON.stringify({type: "user", username: $scope.login, password: $scope.password,
                                            name: $scope.name, email: $scope.email, surname: $scope.surname});

        $http.post("./api/newUser.php", parameterUser)
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
                    alert("Ups, wybrany login jest już zajęty..");
                }
            });
    };
});