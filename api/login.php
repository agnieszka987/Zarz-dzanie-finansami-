<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("SELECT id_grupy, id_uzytkownika, login, haslo FROM Uzytkownicy WHERE login = '$data->username' AND haslo = '$data->password'");

$outp = "";


while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"login":"'  . $rs["login"] . '",';
    $outp .= '"id_uzytkownika":"'. $rs["id_uzytkownika"]     . '",';
    $outp .= '"haslo":"'. $rs["haslo"]     . '",';
    $outp .= '"id_grupy":"'. $rs["id_grupy"]     . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp); 
//echo($data);
?>