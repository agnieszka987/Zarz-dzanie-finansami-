<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("SELECT Zakupy.id_uzytkownika, Zakupy.id_grupy, Zakupy.nazwa, koszt, data_zakupu, Uzytkownicy.login as login, Grupy.login as nazwa_grupy FROM Zakupy, Uzytkownicy, Grupy  WHERE Zakupy.id_uzytkownika = Uzytkownicy.id_uzytkownika AND Zakupy.id_grupy = '$data->id_grupy' AND Grupy.id_grupy = '$data->id_grupy'");

$outp = "";


while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id_uzytkownika":"'  . $rs["id_uzytkownika"] . '",';
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