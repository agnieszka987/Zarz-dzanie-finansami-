<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));
$login = $data->login;
$password = $data->password;

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("INSERT INTO Uzytkownicy() VALUES('$data->username',)");

$outp = "";


while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"login":"'  . $rs["login"] . '",';
    $outp .= '"haslo":"'. $rs["haslo"]     . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp); 
//echo($data); json_encode($data)
?>