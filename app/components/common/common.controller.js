MyApp.controller("commonController", function ($scope, $uibModal, $cookies, $http, $window) {
    $scope.title = "commonController";
    
    var parameterCommonCosts = JSON.stringify({type: "commonCosts", id_grupy: $cookies.get('id_grupy')});
    getUsers();
    getCommonCosts();
    getCommonsName();
    
    $scope.orderByMe = function(x) {
		$scope.myOrderBy = x;
	}
    
    $scope.slide = function() {
		$("#form").slideDown("slow");
	};

	$scope.hide = function() { 
		$("#form").slideUp("slow");
	};
    
    function toDate(date) {
		return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	};    
    
    $scope.addCost = function() {

		var startingDate = toDate($scope.startDate);
        var endingDate = toDate($scope.endDate);
		var parameterAddCost = JSON.stringify({type: "addCost", id_grupy: $cookies.get('id_grupy'),
		                                          id_koszt_wsp_typ: $scope.selectedCommon, data_od: startingDate,
		                                          data_do: endingDate, koszt: $scope.commonPrice});

		$http.post("./api/addCost.php", parameterAddCost)
            .then(function (response) {
                $('#alertDodano').show();
                getCommonCosts();
                $scope.selectedCommon = "";
                $scope.startDate = "";
                $scope.endDate = "";
                $scope.commonPrice = "";
            });
	};
    
    
    function getCommonCosts() {
        
        $http.post("./api/getCommons.php", parameterCommonCosts)
	        .then(function (response) {
	            var commonList = response.data.records;
	            $scope.commonList = commonList;
	        });
    };
    
    
    function getCommonsName() {
	    $http.post("./api/getCommonsName.php", parameterCommonCosts)
	        .then(function (response) {
	            var commonsName = response.data.records;
	            $scope.costsNames = commonsName;
	        });
    };
    
    $scope.modalAddCommon = function () {
		var uibModalInstance = $uibModal.open({
            templateUrl: './app/components/common/common-add.template.html',
            scope: $scope
		});
        
            $scope.addCommon = function(nazwaKosztu) {
                var parameterAddCommon = JSON.stringify({type: "addCommon", nazwaKosztu: nazwaKosztu, id_grupy: $cookies.get('id_grupy')});

                $http.post("./api/addCommon.php", parameterAddCommon)
                    .then(function (response) {
                        uibModalInstance.close();
                        getCommonsName();
                    });
            };
	};
    
    function getUsers() {
	    $http.post("./api/users.php", parameterCommonCosts)
	        .then(function (response) {
                var numberOfUsers = response.data.records.length;
                $scope.ilosc = numberOfUsers;
	        });
    };
    
    $scope.deleteCommon = function(deletingId) {

		var parameterDeleteCommon = JSON.stringify({type: "deleteCommon", id_koszt_wsp: deletingId});

        if ($window.confirm("Czy chcesz usunąc wybraną pozycję?")) {

            $http.post("./api/deleteCommon.php", parameterDeleteCommon)
            .then(function (response) {
                getCommonCosts();
            });
        }
	};
    
});