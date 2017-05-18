MyApp.controller("dutiesController", function ($scope, $cookies, $http) {
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
    }

    function weeks (m) {
        var lastOfMonth     = m.clone().endOf('month'),
            lastOfMonthDate = lastOfMonth.date(),
            firstOfMonth    = m.clone().startOf('month'),
            currentWeek     = firstOfMonth.clone().weekday(0),
            output          = [],
            startOfWeek,
            endOfWeek;

        while (currentWeek < lastOfMonth) {
            startOfWeek = sameMonth(currentWeek.clone().weekday(0), firstOfMonth, 1);
            endOfWeek = sameMonth(currentWeek.clone().weekday(6), firstOfMonth, lastOfMonthDate);

            output.push(startOfWeek + ' - ' + endOfWeek);
            currentWeek.add(7, 'd');
        }

        return output;
    };
    var dd = moment().set('date', 1).format("YYYY-MM-DD");
    $scope.okresy = weeks(moment(dd, 'YYYY-MM-DD', 'pl'));
    $scope.miesiac = moment(dd, 'YYYY-MM-DD', 'pl').format('MMMM');
    console.log($scope.okresy.join(' , ') + " *** " + $scope.okresy.length);
    
    
    
    var arr = [];
    for (var i = 0; i < numberOfWeeks; i++) {
        arr.push({ title: 'Tydzień ' + (i + 1), content: 'Tydzień ' + (i + 1) });
    };
    
    $scope.tabs = arr;
    console.log($scope.tabs);
    
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
    
});
