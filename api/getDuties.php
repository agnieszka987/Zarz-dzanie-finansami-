<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("SELECT Zadania.id_zadania, Zadania.id_uzytkownika, Zadania.id_grupy, Zadania.id_zadania_typ, data_od, data_do, Uzytkownicy.login as login, Uzytkownicy.imie as imie, Uzytkownicy.nazwisko as nazwisko, Zadania_typ.nazwa as nazwa_zadania FROM Zadania, Uzytkownicy, Zadania_typ WHERE Zadania.id_uzytkownika = Uzytkownicy.id_uzytkownika AND Zadania.id_zadania_typ = Zadania_typ.id_zadania_typ AND Zadania.id_grupy = '$data->id_grupy' AND data_od = '$data->date_start'");

$outp = "";

while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id_zadania":"'  . $rs["id_zadania"] . '",';
    $outp .= '"id_uzytkownika":"'  . $rs["id_uzytkownika"] . '",';
    $outp .= '"id_grupy":"'  . $rs["id_grupy"] . '",';
    $outp .= '"id_zadania_typ":"'  . $rs["id_zadania_typ"] . '",';
    $outp .= '"data_od":"'  . $rs["data_od"] . '",';
    $outp .= '"data_do":"'  . $rs["data_do"] . '",';
    $outp .= '"login":"'  . $rs["login"] . '",';
    $outp .= '"imie":"'  . $rs["imie"] . '",';
    $outp .= '"nazwisko":"'  . $rs["nazwisko"] . '",';
    $outp .= '"nazwa_zadania":"'. $rs["nazwa_zadania"]     . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp); 

?>