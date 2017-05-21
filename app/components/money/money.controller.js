MyApp.controller("moneyController", function ($scope, $cookies, $http, $window) {
    $scope.title = "moneyController";
    var parameterShopping = JSON.stringify({type: "shopping", id_grupy: $cookies.get('id_grupy'),
    shoppingDateFrom: "", shoppingDateTo: "", login: ""});
    var zakupyObj;
    var sumaZakupy = 0;

    $http.post("./api/getLogins.php", parameterShopping)
	        .then(function (response) {
	        	$scope.loginsArray = response.data.records;

	            console.log("Logins " + response.data.records[0].login);

	        });

    refreshTable(parameterShopping);

    $scope.searchShopping = function() {

        var shoppingDateFrom;
        var shoppingDateTo;

        if($scope.shoppingDateFrom == null) {
            shoppingDateFrom = '0000-00-00';
        } else {
           shoppingDateFrom = toDate($scope.shoppingDateFrom); 
        }
    	
        if($scope.shoppingDateTo == null) {
            shoppingDateTo = "9999-12-31";
        } else {
           shoppingDateTo = toDate($scope.shoppingDateTo) 
        }


    	var parameterShopping = JSON.stringify({type: "shopping", id_grupy: $cookies.get('id_grupy'),
    	shoppingDateFrom: shoppingDateFrom, shoppingDateTo: shoppingDateTo, login: $scope.selectedLogin});

    	refreshTable(parameterShopping);

   		console.log(shoppingDateFrom + "  " + shoppingDateTo + " " + $scope.selectedLogin);

    }
   
    $scope.orderByMe = function(x) {
		$scope.myOrderBy = x;
	}

    $scope.slide = function() {
		$("#form").slideDown("slow");
	};

	$scope.hide = function() { 
		$("#form").slideUp("slow");
	};

	$scope.deleteShopping = function(deletingId, x) {
		console.log(deletingId);

		var parameterDeleteShopping = JSON.stringify({type: "deleteShopping", id_zakupu: deletingId});

        if ($window.confirm("Czy chcesz usunąc wybrane zakupy")) {

            $http.post("./api/deleteShopping.php", parameterDeleteShopping)
            .then(function (response) {
                console.log(response.data.records); 
              //  $('#alertDodano').show();
                refreshTable(parameterShopping);
            });
        }
	}

	$scope.addShopping = function() {

		var shoppingDate = toDate($scope.shoppingDate);
		var parameterAddShopping = JSON.stringify({type: "addShopping", id_grupy: $cookies.get('id_grupy'),
		                                          id_uzytkownika: $cookies.get('id_uzytkownika'), shoppingProduct: $scope.shoppingProduct, 
		                                          shoppingPrice: $scope.shoppingPrice, shoppingDate: shoppingDate});

		$http.post("./api/addShopping.php", parameterAddShopping)
            .then(function (response) {
                console.log(response.data.records); 
                $('#alertDodano').show();
                refreshTable(parameterShopping);
                $scope.shoppingPrice = "";
                $scope.shoppingDate = "";
                $scope.shoppingProduct = "";
            });
	}

	function toDate(date) {
		return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	}

	function refreshTable(parameterShopping) {
		console.log(parameterShopping);
		console.log($scope.shoppingDateFrom);
	    $http.post("./api/zakupy.php", parameterShopping)
	        .then(function (response) {

	        	sumaZakupy = 0;
	            console.log(response.data.records);
	            zakupyObj = response.data.records;
	            $scope.zakupy = zakupyObj;
                var ilosc = response.data.records.length;
	            for (var i = 0; i < ilosc; i++) {
	            	console.log("Koszt: " + response.data.records[i].koszt);
	            	sumaZakupy += parseFloat(response.data.records[i].koszt);
	            }
                var srednia = sumaZakupy / ilosc;
	            $scope.suma = sumaZakupy;
                $scope.srednia = srednia;
	        });
    }

  
});