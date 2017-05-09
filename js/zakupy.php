<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$shoppingDateFrom = $data->shoppingDateFrom;
$shoppingDateTo = $data->shoppingDateTo;
$login = $data->login;


/*

if ($shoppingDateFrom == '') {
    $shoppingDateFrom == '0000-00-00';
}

if ($shoppingDateTo == '') {
    $shoppingDateTo == '9999-99-99';
}


*/


if ($shoppingDateFrom == '' AND $shoppingDateTo == '' AND $login == '')  {
	$result = $conn->query("SELECT Zakupy.id_zakupu, Zakupy.id_uzytkownika, Zakupy.id_grupy, Zakupy.nazwa, koszt, data_zakupu, Uzytkownicy.login as login, Grupy.login as nazwa_grupy FROM Zakupy, Uzytkownicy, Grupy  WHERE Zakupy.id_uzytkownika = Uzytkownicy.id_uzytkownika AND Zakupy.id_grupy = '$data->id_grupy' AND Grupy.id_grupy = '$data->id_grupy'");
}

if ($data->shoppingDateFrom != '' AND $data->shoppingDateTo == '' AND $data->login == '')  {
	$result = $conn->query("SELECT Zakupy.id_zakupu, Zakupy.id_uzytkownika, Zakupy.id_grupy, Zakupy.nazwa, koszt, data_zakupu, Uzytkownicy.login as login, Grupy.login as nazwa_grupy FROM Zakupy, Uzytkownicy, Grupy  WHERE Zakupy.id_uzytkownika = Uzytkownicy.id_uzytkownika AND Zakupy.id_grupy = '$data->id_grupy' AND Grupy.id_grupy = '$data->id_grupy' AND Zakupy.data_zakupu > '$shoppingDateFrom'");
}

if ($data->shoppingDateFrom == '' AND $data->shoppingDateTo == '' AND $data->login != '')  {
    $result = $conn->query("SELECT Zakupy.id_zakupu, Zakupy.id_uzytkownika, Zakupy.id_grupy, Zakupy.nazwa, koszt, data_zakupu, Uzytkownicy.login as login, Grupy.login as nazwa_grupy FROM Zakupy, Uzytkownicy, Grupy  WHERE Zakupy.id_uzytkownika = Uzytkownicy.id_uzytkownika AND Zakupy.id_grupy = '$data->id_grupy' AND Grupy.id_grupy = '$data->id_grupy' AND Uzytkownicy.login = '$login'");
}

if ($data->shoppingDateFrom == '' AND $data->shoppingDateTo != '' AND $data->login === '')  {
    $result = $conn->query("SELECT Zakupy.id_zakupu, Zakupy.id_uzytkownika, Zakupy.id_grupy, Zakupy.nazwa, koszt, data_zakupu, Uzytkownicy.login as login, Grupy.login as nazwa_grupy FROM Zakupy, Uzytkownicy, Grupy  WHERE Zakupy.id_uzytkownika = Uzytkownicy.id_uzytkownika AND Zakupy.id_grupy = '$data->id_grupy' AND Grupy.id_grupy = '$data->id_grupy' AND Zakupy.data_zakupu < '$shoppingDateTo'");
}

if ($data->shoppingDateFrom != '' AND $data->shoppingDateTo != '' AND $data->login == '')  {
	$result = $conn->query("SELECT Zakupy.id_zakupu, Zakupy.id_uzytkownika, Zakupy.id_grupy, Zakupy.nazwa, koszt, data_zakupu, Uzytkownicy.login as login, Grupy.login as nazwa_grupy FROM Zakupy, Uzytkownicy, Grupy  WHERE Zakupy.id_uzytkownika = Uzytkownicy.id_uzytkownika AND Zakupy.id_grupy = '$data->id_grupy' AND Grupy.id_grupy = '$data->id_grupy' AND Zakupy.data_zakupu > '$shoppingDateFrom' AND Zakupy.data_zakupu < '$shoppingDateTo'");
}

if ($data->shoppingDateFrom != '' AND $data->shoppingDateTo != '' AND $data->login != '')  {
	$result = $conn->query("SELECT Zakupy.id_zakupu, Zakupy.id_uzytkownika, Zakupy.id_grupy, Zakupy.nazwa, koszt, data_zakupu, Uzytkownicy.login as login, Grupy.login as nazwa_grupy FROM Zakupy, Uzytkownicy, Grupy  WHERE Zakupy.id_uzytkownika = Uzytkownicy.id_uzytkownika AND Zakupy.id_grupy = '$data->id_grupy' AND Grupy.id_grupy = '$data->id_grupy' AND Zakupy.data_zakupu > '$shoppingDateFrom' AND Zakupy.data_zakupu < '$shoppingDateTo' AND Uzytkownicy.login = '$login'");
}

if ($data->shoppingDateFrom != '' AND $data->shoppingDateTo == '' AND $data->login != '')  {
	$result = $conn->query("SELECT Zakupy.id_zakupu, Zakupy.id_uzytkownika, Zakupy.id_grupy, Zakupy.nazwa, koszt, data_zakupu, Uzytkownicy.login as login, Grupy.login as nazwa_grupy FROM Zakupy, Uzytkownicy, Grupy  WHERE Zakupy.id_uzytkownika = Uzytkownicy.id_uzytkownika AND Zakupy.id_grupy = '$data->id_grupy' AND Grupy.id_grupy = '$data->id_grupy' AND Zakupy.data_zakupu > '$shoppingDateFrom' AND Uzytkownicy.login = '$login'");
}

if ($data->shoppingDateFrom == '' AND $data->shoppingDateTo != '' AND $data->login != '')  {
    $result = $conn->query("SELECT Zakupy.id_zakupu, Zakupy.id_uzytkownika, Zakupy.id_grupy, Zakupy.nazwa, koszt, data_zakupu, Uzytkownicy.login as login, Grupy.login as nazwa_grupy FROM Zakupy, Uzytkownicy, Grupy  WHERE Zakupy.id_uzytkownika = Uzytkownicy.id_uzytkownika AND Zakupy.id_grupy = '$data->id_grupy' AND Grupy.id_grupy = '$data->id_grupy' AND Zakupy.data_zakupu < '$shoppingDateTo' AND Uzytkownicy.login = '$login'");
}


$outp = "";


while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id_uzytkownika":"'  . $rs["id_uzytkownika"] . '",';
    $outp .= '"id_zakupu":"'. $rs["id_zakupu"]     . '",';
    $outp .= '"id_grupy":"'. $rs["id_grupy"]     . '",';
    $outp .= '"login":"'. $rs["login"]     . '",';
    $outp .= '"nazwa_grupy":"'. $rs["nazwa_grupy"]     . '",';
    $outp .= '"nazwa":"'. $rs["nazwa"]     . '",';
    $outp .= '"data_zakupu":"'. $rs["data_zakupu"]     . '",';
    $outp .= '"koszt":"'. $rs["koszt"]     . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp); 
//echo($data);
?>