<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("SELECT id_grupy, login, haslo FROM Grupy WHERE login = '$data->groupName' AND haslo = '$data->password'");

while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	$id_grupy = $rs["id_grupy"];
}

if ($result == true) 
	$result2 = $conn->query("UPDATE Uzytkownicy SET id_grupy = '$id_grupy' WHERE login = '$data->username'");

$conn->close();

echo($result2); 

?>