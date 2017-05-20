MyApp.controller("dutiesController", function ($scope, $uibModal, $cookies, $http) {
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
    };

    function weeks (m) {
        var lastOfMonth     = m.clone().endOf('month'),
            lastOfMonthDate = lastOfMonth.date(),
            firstOfMonth    = m.clone().startOf('month'),
            currentWeek     = firstOfMonth.clone().weekday(0),
            month           = m.format('MM'),
            year            = m.year(),
            output          = [],
            startOfWeek,
            endOfWeek,
            startOfWeekPom,
            endOfWeekPom;

        while (currentWeek < lastOfMonth) {
            startOfWeek = sameMonth(currentWeek.clone().weekday(0), firstOfMonth, 1);
            endOfWeek = sameMonth(currentWeek.clone().weekday(6), firstOfMonth, lastOfMonthDate);
            startOfWeekPom = startOfWeek;
            endOfWeekPom = endOfWeek;

            if (String(startOfWeekPom).length < 2)
                startOfWeekPom = '0' + startOfWeekPom;
            if (String(endOfWeekPom).length < 2)
                endOfWeekPom = '0' + endOfWeekPom;

            output.push({
                str:        startOfWeek + ' - ' + endOfWeek,
                dateStart:  year + '-' + month + '-' + startOfWeekPom,
                dateEnd:    year + '-' + month + '-' + endOfWeekPom
            });
            currentWeek.add(7, 'd');
        }

        return output;
    };
    var dd = moment().set('date', 1).format("YYYY-MM-DD");
    $scope.okresy = weeks(moment(dd, 'YYYY-MM-DD', 'pl'));
    $scope.miesiac = moment(dd, 'YYYY-MM-DD', 'pl').format('MMMM');
    //console.log($scope.okresy.join(' , ') + " *** " + $scope.okresy.length);
    
    
    
    var arr = [];
    for (var i = 0; i < numberOfWeeks; i++) {
        arr.push({ title: 'Tydzień ' + (i + 1), content: 'Tydzień ' + (i + 1) });
    };
    
    $scope.tabs = arr;
    //console.log($scope.tabs);
    
    function showDuties() {
	    $http.post("./api/duties.php", parameterDuties)
	        .then(function (response) {
	            console.log(response.data.records);
	            var dutiesObj = response.data.records;
	            $scope.duties = dutiesObj;
	        });
    };
    
    var parameterDuties = JSON.stringify({type: "duties", id_grupy: $cookies.get('id_grupy')});
    showDuties();
    
    $scope.slide = function() {
		$("#form").slideDown("slow");
	};

	$scope.hide = function() { 
		$("#form").slideUp("slow");
	};
    
    $scope.addDuty = function() {
//		alert("dodaj klienta");

		var parameterAddDuty = JSON.stringify({type: "addDuty", dutyName: $scope.dutyName, id_grupy: $cookies.get('id_grupy')});

		$http.post("./api/addDuty.php", parameterAddDuty)
            .then(function (response) {
                console.log(response.data.records); 
                $('#alertDodano').show();
                showDuties();
                $scope.dutyName = "";
            });
	};
    
    $scope.getDuties = function(starting) {
	    
        var parameterGetDuties = JSON.stringify({type: "dutiesUsers", id_grupy: $cookies.get('id_grupy'), date_start: starting});
        
        $http.post("./api/getDuties.php", parameterGetDuties)
	        .then(function (response) {
	            console.log(response.data.records);
	            var dutiesList = response.data.records;
	            $scope.dutiesList = dutiesList;
	        });
    };
    
//    var tabIndex = '';
//    $scope.setIndex = function(index) {
//        console.log('index: ' + index);
//        tabIndex = index;
//    };
//    if (tabIndex == '')
//        tabIndex = 0;
//    console.log('tabIndex: ' + tabIndex);
//    var start = $scope.okresy[tabIndex].dateStart;
//    console.log(start + ' start');
//    var parameterGetDuties = JSON.stringify({type: "dutiesUsers", id_grupy: $cookies.get('id_grupy'), date_start: start});
//    getDuties();
    
    function getUsers() {
	    $http.post("./api/users.php", parameterUsers)
	        .then(function (response) {
	            console.log(response.data.records);
	            var groupUsers = response.data.records;
	            $scope.users = groupUsers;
	        });
    };
     
    var parameterUsers = JSON.stringify({type: "dutiesUsers", id_grupy: $cookies.get('id_grupy')});
    getUsers();
    
//    $scope.saveDuty = function(duty, user, start, end) {
//		console.log(duty.nazwa + ' ' + duty.id_zadania_typ + ' ' + duty.id_grupy);
//        console.log(user + ' ' + start + ' ' + end);
//        
//        var parameterSaveDuty = JSON.stringify({type: "saveDuty", id_uzytkownika: user, id_grupy: duty.id_grupy, id_zadania_typ: duty.id_zadania_typ, data_od: start, data_do: end});
//
//        $http.post("./api/saveDuty.php", parameterSaveDuty)
//            .then(function (response) {
//                console.log(response.data.records);
//            });
//        
////		var parameterDeleteShopping = JSON.stringify({type: "deleteShopping", id_zakupu: deletingId});
////
////        if ($window.confirm("Czy chcesz usunąc wybrane zakupy")) {
////
////            $http.post("./api/deleteShopping.php", parameterDeleteShopping)
////            .then(function (response) {
////                console.log(response.data.records); 
////              //  $('#alertDodano').show();
////                refreshTable(parameterShopping);
////            });
////        }
//	};
    
    $scope.modalAssign = function () {
		var uibModalInstance = $uibModal.open({
            templateUrl: './app/components/duties/duties-assign.template.html',
            scope: $scope
		});

        $scope.saveDuty = function(duty, user, index) {
            console.log(duty + ' ' + user + ' ' + index + ' ' + $scope.okresy[index].dateStart + ' ' + $scope.okresy[index].dateEnd);

            var parameterSaveDuty = JSON.stringify({type: "saveDuty", id_uzytkownika: user, id_grupy: $cookies.get('id_grupy'), id_zadania_typ: duty,
                                                    data_od: $scope.okresy[index].dateStart, data_do: $scope.okresy[index].dateEnd});

            $http.post("./api/saveDuty.php", parameterSaveDuty)
                .then(function (response) {
                    console.log(response.data.records);
                    alert('Zapisano!');
                    uibModalInstance.close();
                });
        };

	};
    
});
