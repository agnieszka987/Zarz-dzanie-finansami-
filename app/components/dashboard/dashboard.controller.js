MyApp.controller("dashboardController", function ($scope, $cookies) {
    $scope.title = "Witaj";
    $scope.name = $cookies.get('login');;
});