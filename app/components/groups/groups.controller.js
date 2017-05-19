MyApp.controller("groupsController", function ($scope, $uibModal, $cookies, $http, $location) {
    $scope.title = "groupsController";
    var user = $cookies.get('login');
    $scope.modalNew = function () {
		var uibModalInstance = $uibModal.open({
            templateUrl: './app/components/groups/groups-new.template.html',
            scope: $scope
		});

		$scope.dodajGrupe = function () {
		    var parameterNewGroup = JSON.stringify({type: "user", login: this.name, password: this.password, username: user});
		    console.log("hasło " + this.password);
		    
            if (this.password2 === this.password) {
		    	
                $http.post("./api/newGroup.php", parameterNewGroup)
                    .then(function (response) {
	   			 	
                        var responseObj = JSON.parse(response.data);
                        console.log(responseObj);
                        console.log("Po dodaniu" + responseObj.records[0]);
                        console.log("Po dodaniu" + responseObj.resultInsGr);
                        console.log("Po dodaniu" + responseObj.resultUpdUzy);
                        if (responseObj.resultInsGr == 1) {
                            alert("Dodano grupę!");
                            $cookies.put('id_grupy', responseObj.records[0].id_grupy);
                            $location.path('/home');
                        } else {
                            alert("Ups, wybrany login jest już zajęty..");
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
            templateUrl: './app/components/groups/groups-join.template.html',
            scope: $scope
		});

		$http.get("./api/groups.php")
            .then(function (response) {
                $scope.groupsName = response.data.records;
	   			
                $scope.dodaj = function () {
                    console.log(this.selectedGroup);

                    var parameterJoinGroup = JSON.stringify({type: "user", groupName: this.selectedGroup,
                                                             password: this.password, username: user});

                    $http.post("./api/joinGroup.php", parameterJoinGroup)
                        .then(function (response) {
                            console.log(response);
                            if (response.data === 1) {
                                alert("Dodano grupę!");
                                $location.path('/home');
                            } else if (response.data === "") {
                                alert("Błędne hasło.");
                            }
                    });

	   			}

	   		});
	};

});


MyApp.controller("groupsNewController", function ($scope, $uibModalInstance) {
    $scope.title = "groupsNewController";

    $scope.dodajGrupe = function () {
    };

});

